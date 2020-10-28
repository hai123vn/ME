using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using ME_API._Repositories.Interfaces;
using ME_API._Service.Interface;
using ME_API.Data;
using ME_API.DTO;
using ME_API.Helpers;
using ME_API.Models;
using Microsoft.EntityFrameworkCore;

namespace ME_API._Service.Service
{
    public class AuditTypeDService : IAuditTypeDService
    {
        private readonly IAuditTypeRepository _repoauditType;
        private readonly MapperConfiguration _configMapper;
        private readonly IMapper _mapper;
        private readonly IAuditTypeDRepository _repoauditTypeD;
        public AuditTypeDService(IAuditTypeDRepository repoauditTypeD,
                                IMapper mapper,
                                MapperConfiguration configMapper,
                                IAuditTypeRepository repoauditType,
                                DataContext db)
        {
            _repoauditTypeD = repoauditTypeD;
            _mapper = mapper;
            _configMapper = configMapper;
            _repoauditType = repoauditType;
        }

        public async Task<bool> Add(AuditType_D_Dto model)
        {
            var auditType = _mapper.Map<MES_Audit_Type_D>(model);
            _repoauditTypeD.Add(auditType);
            return await _repoauditTypeD.SaveAll();
        }

        public async Task<bool> ChangeVisiable(string ID, string item)
        {
            var model = _repoauditTypeD.Get_Audit_Type_D(ID, item);
            model.Visible = !model.Visible;
            var modelRepo = _mapper.Map<MES_Audit_Type_D>(model);
            return await _repoauditTypeD.SaveAll();
        }

        public async Task<bool> Delete(object id)
        {
            var model = _repoauditTypeD.FindById(id);
            _repoauditTypeD.Remove(model);
            return await _repoauditTypeD.SaveAll();
        }

        public async Task<List<AuditType_D_Dto>> GetAllAsyn()
        {
            return await _repoauditTypeD.FindAll().ProjectTo<AuditType_D_Dto>(_configMapper).OrderByDescending(x => x.Updated_Time).ToListAsync();

        }

        public async Task<object> getAllAuditTypeM()
        {
            var result = await _repoauditType.FindAll().ToListAsync();
            var data = from a in result
                       select new
                       {
                           audit_type_ID = result.Where(y => y.Audit_Kind == a.Audit_Kind && y.Audit_Type1 == a.Audit_Type1 &&
                           y.Audit_Type2 == a.Audit_Type2 && y.Brand == a.Brand &&
                           y.Version == result.Where(x => x.Audit_Kind == a.Audit_Kind
                           && x.Audit_Type1 == a.Audit_Type1
                           && x.Audit_Type2 == a.Audit_Type2
                           && x.Brand == a.Brand).OrderByDescending(x => x.Version).FirstOrDefault().Version)
                           .OrderByDescending(x => x.Audit_Type_ID).FirstOrDefault().Audit_Type_ID,
                           Audit_Kind = a.Audit_Kind == null ? "" : a.Audit_Kind,
                           Audit_Type1 = a.Audit_Type1 == null ? "" : a.Audit_Type1,
                           Audit_Type2 = a.Audit_Type2 == null ? "" : a.Audit_Type2,
                           Version = result.Where(x => x.Audit_Kind == a.Audit_Kind && x.Audit_Type1 == a.Audit_Type1 
                           && x.Audit_Type2 == a.Audit_Type2 && x.Brand == a.Brand).OrderByDescending(x => x.Version).FirstOrDefault().Version
                       };
            return data.Distinct();
        }

        public AuditType_D_Dto GetById(object id)
        {
            return _mapper.Map<MES_Audit_Type_D, AuditType_D_Dto>(_repoauditTypeD.FindById(id));
        }

        public string GetNameVideoByID(string auditTypeID)
        {
            var data = _repoauditType.FindAll().Where(x => x.Audit_Type_ID.Trim() == auditTypeID).ToList();
            var result = (from a in data
                          select new
                          {
                              Name = a.Brand + '-' + a.Audit_Kind + '-' + a.Audit_Type1
                          }).ToList();
            return result[0].Name;
        }

        public async Task<PagedList<AuditType_D_Dto>> GetWithPaginations(PaginationParams param)
        {
            var lists = _repoauditTypeD.FindAll().ProjectTo<AuditType_D_Dto>(_configMapper).OrderByDescending(x => x.Updated_Time);
            return await PagedList<AuditType_D_Dto>.CreateAsync(lists, param.PageNumber, param.PageSize);
        }

        public async Task<PagedList<AuditType_D_Dto>> Search(PaginationParams param, object text)
        {
            var lists = _repoauditTypeD.FindAll().ProjectTo<AuditType_D_Dto>(_configMapper).Where(x => x.Audit_Type_ID.Trim() == text.ToString().Trim()).OrderByDescending(x => x.Updated_Time);
            return await PagedList<AuditType_D_Dto>.CreateAsync(lists, param.PageNumber, param.PageSize);
        }

        public async Task<List<string>> SearchAuditItem(string auditTypeID)
        {
            return await _repoauditTypeD.FindAll().ProjectTo<AuditType_D_Dto>(_configMapper)
            .Where(x => x.Audit_Type_ID.Trim() == auditTypeID.Trim())
            .OrderByDescending(x => x.Updated_Time).Select(x => x.Audit_Type_ID).ToListAsync();
        }

        public async Task<PagedList<AuditType_D_Dto>> SearchAuditTypeD(PaginationParams param, AuditTypeDParam auditTypeDParam)
        {
            var query = _repoauditTypeD.FindAll();
            MES_Audit_Type_M auditTypeID = new MES_Audit_Type_M();
            if (!String.IsNullOrEmpty(auditTypeDParam.audit_Type_1))
            {
                if (!String.IsNullOrEmpty(auditTypeDParam.audit_Type_2))
                {
                    auditTypeID = await _repoauditType.FindAll().Where(x => x.Audit_Type1.Trim() ==
                   auditTypeDParam.audit_Type_1.Trim() && x.Audit_Type2.Trim() == auditTypeDParam.audit_Type_2).
                   OrderByDescending(x => x.Audit_Type_ID).FirstOrDefaultAsync();
                }
                else
                {

                    auditTypeID = await _repoauditType.FindAll().Where(x => x.Audit_Type1.Trim() == auditTypeDParam.audit_Type_1.Trim()).FirstOrDefaultAsync();
                    query = query.Where(x => x.Audit_Type_ID.Trim() == auditTypeID.Audit_Type_ID.Trim());
                }
                query = query.Where(x => x.Audit_Type_ID.Trim() == auditTypeID.Audit_Type_ID.Trim());
            }
            var result = await _repoauditType.FindAll().ToListAsync();
            var data = (
                from a in result
                select new
                {
                    audit_type_ID = result.Where(y => y.Audit_Kind == a.Audit_Kind && y.Audit_Type1 == a.Audit_Type1
                   && y.Audit_Type2 == a.Audit_Type2 && y.Brand == a.Brand &&
                   y.Version == result.Where(x => x.Audit_Kind == a.Audit_Kind
                   && x.Audit_Type1 == a.Audit_Type1 && x.Audit_Type2 == a.Audit_Type2 && x.Brand == a.Brand).OrderByDescending(x => x.Version).FirstOrDefault().Version).OrderByDescending(x => x.Audit_Type_ID).FirstOrDefault().Audit_Type_ID,
                });
            var dataTest = data.Select(x => x.audit_type_ID).ToList();
            query = query.Where(x => dataTest.Contains(x.Audit_Type_ID));
            var lists = query.ProjectTo<AuditType_D_Dto>(_configMapper).OrderByDescending(x => x.Updated_Time);
            return await PagedList<AuditType_D_Dto>.CreateAsync(lists, param.PageNumber, param.PageSize);

        }


        public async Task<PagedList<AuditType_D_Dto>> SearchByAuditType(PaginationParams param, string audit_Type1, string audit_Type2)
        {
           return null;
        }

        public Task<bool> Update(AuditType_D_Dto model)
        {
            throw new System.NotImplementedException();
        }
    }
}