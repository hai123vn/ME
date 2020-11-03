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
    public class AuditPicMService : IAuditPicMService
    {
        private readonly IAuditPicMRepository _repoPicM;
        private readonly MapperConfiguration _configmapper;
        private readonly IMapper _mapper;
        public AuditPicMService(IAuditPicMRepository repoPicM, IMapper mapper, MapperConfiguration configmapper)
        {
            _mapper = mapper;
            _configmapper = configmapper;
            _repoPicM = repoPicM;
        }

        public async Task<bool> Add(AuditPicMDto model)
        {
            var auditPicM = _mapper.Map<MES_Audit_PIC_M>(model);
            //Get max ID
            try
            {
                int maxID = _repoPicM.FindAll().Select(x => x.PIC_Type_ID).Select(int.Parse).ToList().Max();
                auditPicM.PIC_Type_ID = (maxID + 1).ToString();
            }
            catch (System.Exception ex)
            {

                throw ex;
            }

            _repoPicM.Add(auditPicM);
            return await _repoPicM.SaveAll();
        }
        public async Task<bool> Delete(object id)
        {
            var model = _repoPicM.FindById(id);
            _repoPicM.Remove(model);
            return await _repoPicM.SaveAll();
        }

        public async Task<bool> Update(AuditPicMDto model)
        {
            var auditPicM = _mapper.Map<MES_Audit_PIC_M>(model);
            _repoPicM.Update(auditPicM);
            return await _repoPicM.SaveAll();
        }

        public async Task<List<AuditPicMDto>> GetAllAsyn()
        {
            return await _repoPicM.FindAll().ProjectTo<AuditPicMDto>(_configmapper).OrderByDescending(x => x.Updated_Time).ToListAsync();
        }

        public AuditPicMDto GetById(object id)
        {
            var findid = _repoPicM.FindById(id);
            var model = _mapper.Map<MES_Audit_PIC_M, AuditPicMDto>(findid);
            return model;
        }

        public async Task<PagedList<AuditPicMDto>> GetWithPaginations(PaginationParams param)
        {
            var lists = _repoPicM.FindAll().ProjectTo<AuditPicMDto>(_configmapper).OrderByDescending(x => x.Updated_Time);
            return await PagedList<AuditPicMDto>.CreateAsync(lists, param.PageNumber, param.PageSize);
        }

        public async Task<PagedList<AuditPicMDto>> Search(PaginationParams param, object text)
        {
            var lists = _repoPicM.FindAll(x => x.PIC_Type_ZW.Contains(text.ToString()) ||
                                                x.PIC_Type_LL.Contains(text.ToString()) ||
                                                x.PIC_Type_EN.Contains(text.ToString()) ||
                                                x.PIC_Type_ID.Contains(text.ToString())).ProjectTo<AuditPicMDto>(_configmapper).OrderByDescending(x => x.Updated_Time);
            return await PagedList<AuditPicMDto>.CreateAsync(lists, param.PageNumber, param.PageSize);
        }

        public async Task<bool> CheckAuditPicMExists(string picTypeID)
        {
            return await _repoPicM.CheckAuditPicMExists(picTypeID);
        }

    }
}