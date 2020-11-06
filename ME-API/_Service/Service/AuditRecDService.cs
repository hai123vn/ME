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
using ME_API.ViewModel;
using Microsoft.EntityFrameworkCore;

namespace ME_API._Service.Service
{
    public class AuditRecDService : IAuditRecDService
    {
        private readonly IAuditRecDRepository _repoD;
        private readonly IMapper _mapper;
        private readonly MapperConfiguration _config;
        private readonly IMesAuditOrgRepository _repoMes;
        private readonly IAuditTypeRepository _repoType;
        private readonly IAuditPicDService _auditPicDService;
        private readonly IAuditRecMRepository _repoM;
        private readonly IAuditPicDRepository _repoAuditPicD;

        public AuditRecDService(IAuditRecDRepository repoD, IMapper mapper, MapperConfiguration config, IAuditRecMRepository repoM, IAuditPicDService auditPicDService, IAuditTypeRepository repoType, IMesAuditOrgRepository repoMes, IAuditPicDRepository repoAuditPicD)
        {
            _repoAuditPicD = repoAuditPicD;
            _repoM = repoM;
            _auditPicDService = auditPicDService;
            _repoType = repoType;
            _repoMes = repoMes;
            _repoD = repoD;
            _mapper = mapper;
            _config = config;
        }

        public Task<bool> Add(AuditRecDDto model)
        {
            throw new System.NotImplementedException();
        }

        public Task<bool> AddRecD(AuditRecDDto model)
        {
            throw new System.NotImplementedException();
        }

        public Task<bool> Delete(object id)
        {
            throw new System.NotImplementedException();
        }

        public async Task<List<AuditRecDDto>> GetAllAsyn()
        {
            var list = await _repoD.FindAll().ProjectTo<AuditRecDDto>(_config).OrderByDescending(x => x.Updated_Time).ToListAsync();
            return list;
        }

        public async Task<PagedList<AuditRecDto>> GetAllAuditRecViewModel(PaginationParams param)
        {
            var listAuditRecM = _repoM.FindAll();
            var listAuditRecD = _repoD.FindAll();
            var listAuditMes = _repoMes.FindAll(x => x.Status == 1);
            var listAuditRecDto = listAuditRecD.Join(listAuditRecM, x => x.Record_ID, y => y.Record_ID, (x, y) => new { x, y }).Join(listAuditMes, z => z.y.Line, t => t.Line_ID_2, (z, t)
                => new AuditRecDto
                {
                    Record_ID = z.x.Record_ID,
                    Record_Time = z.y.Record_Time,
                    After_Picture = z.x.After_Picture,
                    Audit_Item = z.x.Audit_Item,
                    Audit_Type_ID = z.x.Audit_Type_ID,
                    Audit_Type = z.x.Audit_Type_ID == null || z.x.Audit_Type_ID == "" ? "" : _repoType.FindById(z.x.Audit_Type_ID).Audit_Type1 + "-" + _repoType.FindById(z.x.Audit_Type_ID).Audit_Type2,
                    Before_Picture = z.x.Before_Picture,
                    Finished_Date = z.x.Finished_Date,
                    ERCS = z.x.ERCS,
                    Implement_Time = z.x.Implement_Time,
                    Implement_User = z.x.Implement_User,
                    Issue_EN = z.x.Issue_EN,
                    Issue_LL = z.x.Issue_LL,
                    Issue_ZW = z.x.Issue_ZW,
                    Building = z.y.Building,
                    PDC = z.y.PDC,
                    Line = z.y.Line,
                    Line_Name = t.Line_ID_2_Name,
                    ME_PIC = z.x.ME_PIC,
                    Model_Name = z.y.Model_Name,
                    Model_No = z.y.Model_No,
                    Chief = z.y.Chief,
                    Recorder = z.y.Recorder,
                    Attendees = z.y.Attendees,
                    PD_PIC = z.x.PD_PIC,
                    PD_Department = z.x.PD_Department,
                    PD_Building = z.x.PD_Building,
                    Remark = z.x.Remark,
                    Status = z.x.Status,
                    Item_no = z.x.Item_no,
                    Updated_By = z.x.Updated_By,
                    Updated_Time = z.x.Updated_Time,
                });
            return await PagedList<AuditRecDto>.CreateAsync(listAuditRecDto, param.PageNumber, param.PageSize);
        }

        public async Task<PagedList<AuditRecDto>> SearchByModel(PaginationParams param, AuditRecSearch model)
        {
            var listAuditRecM = _repoM.FindAll();
            var listAuditRecD = _repoD.FindAll();
            var listAuditMes = _repoMes.FindAll().Where(x => x.Status == 1);
            var listAuditRecDto = listAuditRecD.Join(listAuditRecM, x => x.Record_ID, y => y.Record_ID, (x, y) => new { x, y }).Join(listAuditMes, z => z.y.Line, t => t.Line_ID_2, (z, t)
                           => new AuditRecDto
                           {
                               Record_ID = z.x.Record_ID,
                               Record_Time = z.y.Record_Time,
                               Audit_Item = z.x.Audit_Item,
                               Audit_Type_ID = z.x.Audit_Type_ID,
                               Audit_Type = z.x.Audit_Type_ID == null || z.x.Audit_Type_ID == "" ? "" : _repoType.FindById(z.x.Audit_Type_ID).Audit_Type1 + "-" + _repoType.FindById(z.x.Audit_Type_ID).Audit_Type2,
                               Before_Picture = z.x.Before_Picture,
                               Finished_Date = z.x.Finished_Date,
                               ERCS = z.x.ERCS,
                               Implement_Time = z.x.Implement_Time,
                               Implement_User = z.x.Implement_User,
                               Issue_EN = z.x.Issue_EN,
                               Issue_LL = z.x.Issue_LL,
                               Issue_ZW = z.x.Issue_ZW,
                               Building = z.y.Building,
                               PDC = z.y.PDC,
                               Line = z.y.Line,
                               Line_Name = t.Line_ID_2_Name,
                               ME_PIC = z.x.ME_PIC,
                               Model_Name = z.y.Model_Name,
                               Model_No = z.y.Model_No,
                               Updated_By = z.x.Updated_By,
                               Updated_Time = z.y.Updated_Time
                           }).ToList();
            if (model.Status != "")
            {
                listAuditRecDto = listAuditRecDto.Where(x => x.Status.Trim() == model.Status.Trim()).ToList();
            }
            if (model.Building != "")
            {
                listAuditRecDto = listAuditRecDto.Where(x => x.Building.Trim() == model.Building.Trim()).ToList();
            }

            if (model.Line != "")
            {
                listAuditRecDto = listAuditRecDto.Where(x => x.Line.Trim() == model.Line.Trim()).ToList();
            }

            if (model.PDC != "")
            {
                listAuditRecDto = listAuditRecDto.Where(x => x.PDC.Trim() == model.PDC.Trim()).ToList();
            }

            if (model.From_Date != "" && model.To_Date != "")
            {
                listAuditRecDto = listAuditRecDto.Where(x => x.Record_Time >= Convert.ToDateTime(model.From_Date + " 00 : 00") && x.Record_Time <= Convert.ToDateTime(model.To_Date + " 00:00")).ToList();
            }

            if (model.Model_No != "")
            {
                listAuditRecDto = listAuditRecDto.Where(x => x.Model_No.Trim() == model.Model_No.Trim()).ToList();
            }

            if (model.Model_Name != "")
            {
                listAuditRecDto = listAuditRecDto.Where(x => x.Model_Name.Trim() == model.Model_Name.Trim()).ToList();
            }

            if (model.Audit_Type_1 != "")
            {
                var auditTypeMFind = await _repoType.FindAll(x => x.Audit_Type1.Trim() == model.Audit_Type_1 &&
                                                            x.Audit_Type2.Trim() == model.Audit_Type_2).FirstOrDefaultAsync();
                listAuditRecDto = listAuditRecDto.Where(x => x.Audit_Type_ID.Trim() == auditTypeMFind.Audit_Type_ID).ToList();
            }
            listAuditRecDto = listAuditRecDto.Select(x =>
            {
                x.ME_PIC_Name = GetMePicByID(x.ME_PIC);
                x.PD_PIC_Name = GetPdPicByID(x.PD_PIC);
                return x;
            }).OrderByDescending(x => x.Record_Time).ThenBy(x => x.Item_no).ToList();
            return PagedList<AuditRecDto>.Create(listAuditRecDto, param.PageNumber, param.PageSize);
        }

        public Task<List<AuditPicDDto>> GetAllExcel()
        {
            var listAuditRecM = _repoM.FindAll();
            var listAuditRecD = _repoD.FindAll();
        }

        public async Task<List<string>> GetAllStatus()
        {
            return await _repoD.FindAll().GroupBy(x=>x.Status).Select(x=>x.Key).ToListAsync();
        }

        public string GetMePicByID(string Resp_Id)
        {
            var data = _repoAuditPicD.FindAll(x => x.PIC_Type_ID == "1" && x.Status == "1" && x.Resp_ID == Resp_Id).FirstOrDefault();
            var Name = Resp_Id;
            if (data != null)
            {
                Name = (data.Resp_ID + '_' + data.Resp_ZW + '_' + data.Resp_LL).ToString();
            }
            return Name;
        }

        public string GetPdPicByID(string Resp_id)
        {
            var data = _repoAuditPicD.FindAll(x => x.PIC_Type_ID == "2" && x.Status == "1" && x.Resp_ID == Resp_id).FirstOrDefault();
            var Name = Resp_id;
            if (Name != null)
            {
                Name = (data.Resp_ID + '_' + data.Resp_ZW + '_' + data.Resp_LL).ToString();
            }

            return Name;
        }

        public Task<AuditPicDDto> GetById(string record_ID)
        {
            throw new System.NotImplementedException();
        }

        public AuditRecDDto GetById(object id)
        {
            throw new System.NotImplementedException();
        }

        public Task<List<string>> GetListMail(string line)
        {
            throw new System.NotImplementedException();
        }

        public Task<AuditRecDDto> GetRecDById(string record_ID, int item_no)
        {
            throw new System.NotImplementedException();
        }

        public async Task<PagedList<AuditRecDDto>> GetWithPaginations(PaginationParams param)
        {
            var lists =  _repoD.FindAll().ProjectTo<AuditRecDDto>(_config).OrderByDescending(x=>x.Updated_Time);
            return await PagedList<AuditRecDDto>.CreateAsync(lists, param.PageNumber, param.PageSize);
        }

        public Task<List<ImproveProjectDto>> ImproveProjectRecordImplementedRateLastMonth()
        {
            throw new System.NotImplementedException();
        }

        public Task<List<ImproveProjectDto>> ImproveProjectRecordsImplementedRateThisMonth()
        {
            throw new System.NotImplementedException();
        }

        public Task<PagedList<AuditRecDDto>> Search(PaginationParams param, object text)
        {
            throw new System.NotImplementedException();
        }

        public Task<List<AuditPicDDto>> SearchExcel(AuditRecSearch model, string WT = "1")
        {
            throw new System.NotImplementedException();
        }

        public Task<bool> Update(AuditRecDDto model)
        {
            throw new System.NotImplementedException();
        }

        public Task<bool> UpdateRecD(AuditRecDDto model)
        {
            throw new System.NotImplementedException();
        }
    }
}