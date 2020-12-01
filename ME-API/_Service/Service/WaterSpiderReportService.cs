using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using ME_API._Repositories.Interfaces;
using ME_API._Service.Interface;
using ME_API.DTO;
using ME_API.Helpers;
using Microsoft.EntityFrameworkCore;

namespace ME_API._Service.Service
{
    public class WaterSpiderReportService : IWaterSpiderReportService
    {
        private readonly IAuditRateDRepository _auditRateDRepository;
        private readonly IAuditRateMRepository _auditRateMRepository;
        private readonly IAuditTypeDRepository _auditTypeDRepository;
        private readonly IAuditTypeRepository _auditTypeMRepository;
        private readonly MapperConfiguration _mapperConfiguration;
        private readonly IMesAuditOrgRepository _mesAuditOrgRepository;

        public WaterSpiderReportService(IAuditRateDRepository auditRateDRepository, IAuditRateMRepository auditRateMRepository, IAuditTypeDRepository auditTypeDRepository, IAuditTypeRepository auditTypeMRepository, MapperConfiguration mapperConfiguration, IMesAuditOrgRepository mesAuditOrgRepository)
        {
            _auditRateDRepository = auditRateDRepository;
            _auditRateMRepository = auditRateMRepository;
            _auditTypeDRepository = auditTypeDRepository;
            _auditTypeMRepository = auditTypeMRepository;
            _mapperConfiguration = mapperConfiguration;
            _mesAuditOrgRepository = mesAuditOrgRepository;
        }

        public async Task<List<string>> GetAuditType1ByWaterSpider()
        {
            //WS la gia tri fix cung
            var auditType1 = await _auditTypeMRepository.FindAll(x => x.Audit_Kind.Trim() == "WS").Select(x => x.Audit_Type1).Distinct().ToListAsync();
            return auditType1;
        }

        public async Task<PagedList<WaterSpiderRecordDto>> GetLisWaterSpiderScoreRecord(PaginationParams paginationParams, ScoreRecordParam scoreRecordParam, bool isPaging = true)
        {
            // WS la gia tri fix cung
            var paramAuditTypeIdByWaterSpider = await _auditTypeMRepository.FindAll(x => x.Audit_Kind.Trim() == "WS").Select(x => x.Audit_Type_ID).ToListAsync();
            var queryAuditRateM = _auditRateMRepository.FindAll(x => paramAuditTypeIdByWaterSpider.Contains(x.Audit_Type_ID));
            var queryAuditRateD = _auditRateDRepository.FindAll();
            var listAuditMes = _mesAuditOrgRepository.FindAll(x => x.Status == 1);
            if (scoreRecordParam.PDC != "")
            {
                queryAuditRateM = queryAuditRateM.Where(x => x.PDC.Trim() == scoreRecordParam.PDC);
            }
            if (scoreRecordParam.Building != "")
            {
                queryAuditRateM = queryAuditRateM.Where(x => x.Building.Trim() == scoreRecordParam.Building);
            }
            if (scoreRecordParam.Line != "")
            {
                queryAuditRateM = queryAuditRateM.Where(x => x.Line.Trim() == scoreRecordParam.Line);
            }
            if (scoreRecordParam.AuditType1 != "")
            {
                queryAuditRateM = queryAuditRateM.Where(x => x.Audit_Type1.Trim() == scoreRecordParam.AuditType1);
            }
            if (scoreRecordParam.AuditType2 != "")
            {
                queryAuditRateM = queryAuditRateM.Where(x => x.Audit_Type2.Trim() == scoreRecordParam.AuditType2);
            }
            if (scoreRecordParam.FromDate != "" && scoreRecordParam.ToDate != "")
            {
                DateTime d1 = Convert.ToDateTime(scoreRecordParam.FromDate + " 00:00:00");
                DateTime d2 = Convert.ToDateTime(scoreRecordParam.ToDate + " 23:59:59");
                queryAuditRateM = queryAuditRateM.Where(x => x.Record_Date >= d1 && x.Record_Date <= d2);
            }
            var data = queryAuditRateM.Join(listAuditMes, x => x.Line, t => t.Line_ID_2, (x, t) =>
                new WaterSpiderRecordDto
                {
                    RecordId = x.Record_ID,
                    AuditType = x.Audit_Type1,
                    AuditDate = x.Record_Date,
                    LineId = x.Line,
                    Line_Name = t.Line_ID_2_Name,
                    Score = _auditRateDRepository.SumEachRating1InAuditTypeDAndAuditRateD(x.Record_ID),
                    Loss = _auditRateDRepository.SumEachRating1InAuditTypeDAndAuditRateD(x.Record_ID),
                    NA = _auditRateDRepository.SumEachRatingNaInAuditTypeDAndAuditRateD(x.Record_ID),
                    CheckAnswerAllYet = queryAuditRateD.Where(y => y.Record_ID == x.Record_ID && y.Rate_NA == 0 && y.Rating_2 == 0).Count() > 0 ? false : true
                }).OrderByDescending(x => x.AuditDate);
            return await PagedList<WaterSpiderRecordDto>.CreateAsync(data, paginationParams.PageNumber, paginationParams.PageSize, isPaging);
        }
    }
}