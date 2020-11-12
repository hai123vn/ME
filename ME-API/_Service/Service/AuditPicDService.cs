using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using ME_API._Repositories.Interfaces;
using ME_API._Service.Interface;
using ME_API.DTO;
using ME_API.Helpers;
using ME_API.Models;
using Microsoft.EntityFrameworkCore;

namespace ME_API._Service.Service
{
    public class AuditPicDService : IAuditPicDService
    {
        private readonly MapperConfiguration _config;
        private readonly IMapper _mapper;
        private readonly IMesAuditOrgRepository _repoOrg;
        private readonly IAuditPicDRepository _repo;
        public AuditPicDService(IAuditPicDRepository repo,
                                IMapper mapper,
                                MapperConfiguration config,
                                IMesAuditOrgRepository repoOrg)
        {
            _repo = repo;
            _mapper = mapper;
            _config = config;
            _repoOrg = repoOrg;
        }

        public async Task<bool> Add(AuditPicDDto model)
        {
            var auditPicD = _mapper.Map<MES_Audit_PIC_D>(model);
            _repo.Add(auditPicD);
            return await _repo.SaveAll();
        }

        public async Task<bool> Delete(object id)
        {
            var model = _repo.FindById(id);
            _repo.Remove(model);
            return await _repo.SaveAll();
        }

        public async Task<bool> Delete(AuditPicDDto model)
        {
            var modelFind = await _repo.FindAll(x => x.PIC_Type_ID.Trim() == model.PIC_Type_ID.Trim() && x.Resp_ID.Trim() == model.Resp_ID.Trim()).FirstOrDefaultAsync();
            _repo.Remove(modelFind);
            return await _repo.SaveAll();
        }

        public async Task<bool> Update(AuditPicDDto model)
        {
            var audit = _mapper.Map<MES_Audit_PIC_D>(model);
            _repo.Update(audit);
            return await _repo.SaveAll();
        }

        public async Task<List<AuditPicDDto>> GetAllAsyn()
        {
            var lists = await _repo.FindAll().ProjectTo<AuditPicDDto>(_config).OrderByDescending(x => x.Updated_Time).ToListAsync();
            return lists;
        }

        public async Task<object> GetAllMePic()
        {
            var data = await _repo.FindAll(x => x.PIC_Type_ID == "1" && x.Status == "1").
                                    GroupBy(x => new { x.Resp_ID, x.Resp_ZW, x.Resp_LL }).
                                    Select(x => new { Id = x.Key.Resp_ID, Name = x.Key.Resp_ID + '_' + x.Key.Resp_ZW + '_' + x.Key.Resp_LL }).ToListAsync();
            return data;
        }

        public async Task<object> GetAllPdPic()
        {
            var data = await _repo.FindAll(x => x.PIC_Type_ID == "2" && x.Status == "1").
                                    GroupBy(x => new { x.Resp_ID, x.Resp_ZW, x.Resp_LL }).
                                    Select(x => new { Id = x.Key.Resp_ID, Name = x.Key.Resp_ID + '_' + x.Key.Resp_ZW + '_' + x.Key.Resp_LL }).ToListAsync();
            return data;
        }

        public async Task<string> GetBuildingByID(string building)
        {
            var data = await _repoOrg.FindAll(x => x.Building == building).FirstOrDefaultAsync();
            var Name = building;
            if (data != null)
            {
                Name = (data.Building_Name).ToString();
            }
            return Name;
        }

        public AuditPicDDto GetById(object id)
        {
            var audiFind = _repo.FindById(id);
            var model = _mapper.Map<MES_Audit_PIC_D, AuditPicDDto>(audiFind);
            return model;
        }

        public async Task<string> GetMePicByID(string Resp_id)
        {
            var data = await _repo.FindAll(x => x.Resp_ID == "1" && x.Status == "1" && x.Resp_ID == Resp_id).FirstOrDefaultAsync();
            var Name = Resp_id;
            if (Name != null)
            {
                Name = (data.Resp_ID + '_' + data.Resp_ZW + '_' + data.Resp_LL).ToString();
            }

            return Name;
        }

        public async Task<string> GetPdPicByID(string Resp_id)
        {
            var data = await _repo.FindAll(x => x.Resp_ID == "2" && x.Status == "1" && x.Resp_ID == Resp_id).FirstOrDefaultAsync();
            var Name = Resp_id;
            if (Name != null)
            {
                Name = (data.Resp_ID + '_' + data.Resp_ZW + '_' + data.Resp_LL).ToString();
            }

            return Name;
        }

        public async Task<string> GetPdBuilding(string pdc)
        {
            var pdBuilding = await _repo.FindAll(x => x.Resp_ID.Trim() == pdc.Trim()).FirstOrDefaultAsync();
            return pdBuilding.PDC.ToString();
        }

        public async Task<string> GetPdDepartment(string pdc)
        {
            var pdDept = await _repo.FindAll(x => x.Resp_ID.Trim() == pdc.Trim()).FirstOrDefaultAsync();
            return pdDept.PDC.ToString();
        }

        public async Task<PagedList<AuditPicDDto>> GetWithPaginations(PaginationParams param)
        {
            var lists = _repo.FindAll().ProjectTo<AuditPicDDto>(_config).OrderByDescending(x => x.Updated_Time);
            return await PagedList<AuditPicDDto>.CreateAsync(lists, param.PageNumber, param.PageSize);
        }

        public async Task<PagedList<AuditPicDDto>> Search(PaginationParams param, object text)
        {
            var lists = _repo.FindAll(x => x.PIC_Type_ID.Contains(text.ToString()) ||
                                        x.Resp_EN.Contains(text.ToString()) ||
                                        x.Resp_ZW.Contains(text.ToString()) ||
                                        x.Resp_LL.Contains(text.ToString()) ||
                                        x.Updated_By.Contains(text.ToString())).ProjectTo<AuditPicDDto>(_config)
                                        .OrderByDescending(x => x.Updated_Time);
            return await PagedList<AuditPicDDto>.CreateAsync(lists, param.PageNumber, param.PageSize);
        }
    }
}