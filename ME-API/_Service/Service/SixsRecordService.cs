using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using ME_API._Repositories.Interfaces;
using ME_API._Service.Interface;
using ME_API.DTO;
using ME_API.Helpers;
using Microsoft.EntityFrameworkCore;

namespace ME_API._Service.Service
{
    public class SixsRecordService : ISixsRecordService
    {
        private readonly IAuditRateDRepository _auditRateDRepository;
        private readonly IAuditRateMRepository _auditRateMRepository;
        private readonly IAuditTypeRepository _auditTypeRepository;
        private readonly IMesAuditOrgRepository _mesAuditOrgRepository;
        private readonly IAuditTypeDRepository _auditTypeDRepository;
        private readonly MapperConfiguration _configMapper;

        public SixsRecordService(IAuditRateDRepository auditRateDRepository, IAuditRateMRepository auditRateMRepository, IAuditTypeRepository auditTypeRepository, IMesAuditOrgRepository mesAuditOrgRepository, IAuditTypeDRepository auditTypeDRepository, MapperConfiguration configMapper)
        {
            _auditRateDRepository = auditRateDRepository;
            _auditRateMRepository = auditRateMRepository;
            _auditTypeRepository = auditTypeRepository;
            _mesAuditOrgRepository = mesAuditOrgRepository;
            _auditTypeDRepository = auditTypeDRepository;
            _configMapper = configMapper;
        }

        public async Task<List<string>> GetAuditType1BySixs()
        {
            // 6S là giá trị fix cứng
            var auditType1 = await _auditTypeRepository.FindAll(x => x.Audit_Kind.Trim() == "6S").Select(x => x.Audit_Type1).Distinct().ToListAsync();
            return auditType1;
        }

        public async Task<object> GetAuditTypeByBrandBySixs(string brand)
        {
            var auditType = await _auditTypeRepository.FindAll(x => x.Brand.Trim() == brand && x.Audit_Kind.Trim() == "6S").ProjectTo<AuditTypeDto>(_configMapper).Distinct().OrderBy(x => x.Audit_Type_ID).ToListAsync();
            var data = from a in auditType
                       select new
                       {
                           audit_Type_ID = auditType.Where(y => y.Audit_Kind == a.Audit_Kind && y.Audit_Type1 == a.Audit_Type1 && y.Audit_Type2 == a.Audit_Type2 && y.Brand == a.Brand && y.Version == auditType.Where(x => x.Audit_Kind == a.Audit_Kind && x.Audit_Type1 == a.Audit_Type1 && x.Audit_Type2 == a.Audit_Type2 && x.Brand == a.Brand).OrderByDescending(x => x.Version).FirstOrDefault().Version).OrderByDescending(x => x.Audit_Type_ID).FirstOrDefault().Audit_Type_ID,
                           Audit_Kind = a.Audit_Kind,
                           Audit_Type1 = a.Audit_Type1,
                           Audit_Type2 = a.Audit_Type2,
                           Version = auditType.Where(x => x.Audit_Kind == a.Audit_Kind && x.Audit_Type1 == a.Audit_Type1 && x.Audit_Type2 == a.Audit_Type2 && x.Brand == a.Brand).OrderByDescending(x => x.Version).FirstOrDefault().Version
                       };
            return data.Distinct();
        }

        public async Task<List<string>> GetBrandBySixs()
        {
            var brand = await _auditTypeRepository.FindAll(x => x.Audit_Kind.Trim() == "6S").Select(x => x.Brand).Distinct().OrderBy(x => x).ToListAsync();
            return brand;
        }

        public async Task<PagedList<SixsScoreRecordDto>> GetListSixsScoreRecord(PaginationParams paginationParams, ScoreRecordParam scoreRecordParam, bool isPaging = true)
        {
            // 6S là giá trị fix cứng
            var paramAuditTypeBySixs = await _auditTypeRepository.FindAll(x => x.Audit_Kind.Trim() == "6S").Select(x => x.Audit_Type_ID).ToListAsync();
            var queryAuditRateM = _auditRateMRepository.FindAll(x => paramAuditTypeBySixs.Contains(x.Audit_Type_ID));
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

            var data = queryAuditRateM.Join(listAuditMes, x => x.Line, t => t.Line_ID_2, (x, t) => new SixsScoreRecordDto
            {
                RecordId = x.Record_ID,
                AuditDate = x.Record_Date,
                AuditType = x.Audit_Type1,
                AuditType2 = x.Audit_Type2,
                LineId = x.Line,
                Line_Name = t.Line_ID_2_Name,
                UpdateBy = x.Updated_By,
                UpdateTime = x.Updated_Time,
                Rating0 = queryAuditRateD.Where(y => y.Record_ID == x.Record_ID).Sum(z => z.Rating_0),
                Rating1 = queryAuditRateD.Where(y => y.Record_ID == x.Record_ID).Sum(z => z.Rating_1),
                RatingNa = queryAuditRateD.Where(y => y.Record_ID == x.Record_ID).Sum(z => z.Rate_NA) == null ? 0 : queryAuditRateD.Where(y => y.Record_ID == x.Record_ID).Sum(z => z.Rate_NA),
                CheckAnswerAllYet = queryAuditRateD.Where(y => y.Record_ID == x.Record_ID && y.Rate_NA == 0 && y.Rating_0 == 0 && y.Rating_1 == 0 && y.Rating_2 == 0).Count() > 0 ? false : true
            }).OrderByDescending(x => x.UpdateTime);
            return await PagedList<SixsScoreRecordDto>.CreateAsync(data, paginationParams.PageNumber, paginationParams.PageSize, isPaging);
        }
    }
}