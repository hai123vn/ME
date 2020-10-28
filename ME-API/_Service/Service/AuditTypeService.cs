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
using ME_API.Models;
using ME_API.ViewModel;
using Microsoft.EntityFrameworkCore;

namespace ME_API._Service.Service
{
    public class AuditTypeService : IAuditTypeService
    {
        private readonly IAuditTypeDRepository _repoAuditTypeD;
        private readonly MapperConfiguration _configMapper;
        private readonly IMapper _mapper;
        private readonly IAuditTypeRepository _repoAuditType;
        public AuditTypeService(IAuditTypeRepository repoAuditType, IMapper mapper, MapperConfiguration configMapper, IAuditTypeDRepository repoAuditTypeD)
        {
            _repoAuditType = repoAuditType;
            _mapper = mapper;
            _configMapper = configMapper;
            _repoAuditTypeD = repoAuditTypeD;
        }

        public async Task<PagedList<AuditTypeDto>> GetWithPaginations(PaginationParams param)
        {
            var lists = _repoAuditType.FindAll().ProjectTo<AuditTypeDto>(_configMapper).OrderByDescending(x => x.Updated_Time);
            return await PagedList<AuditTypeDto>.CreateAsync(lists, param.PageNumber, param.PageSize);
        }

        public async Task<bool> Add(AuditTypeDto model)
        {
            string auditTypeId = await GetAuditTypeID();
            model.Audit_Type_ID = auditTypeId;
            var auditType = _mapper.Map<MES_Audit_Type_M>(model);
            _repoAuditType.Add(auditType);
            return await _repoAuditType.SaveAll();
        }

        public async Task<bool> CheckAuditTypeExists(string brand, string auditType1, string auditType2, int version)
        {
            var auditType = await _repoAuditType.FindAll().Where(x => x.Brand.Trim() == brand 
            && x.Audit_Type1.Trim() == auditType1 
            && x.Audit_Type2.Trim() == auditType2 
            && x.Version == version).ToListAsync();
            if (auditType.Count() > 0)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        public async Task<bool> Delete(object id)
        {
            var model = _repoAuditType.FindById(id);
            _repoAuditType.Remove(model);
            return await _repoAuditType.SaveAll();
        }

        public async Task<List<AuditTypeDto>> GetAllAsyn()
        {
            return await _repoAuditType.FindAll().ProjectTo<AuditTypeDto>(_configMapper).OrderByDescending(x => x.Updated_Time).ToListAsync();
        }

        public async Task<List<string>> GetAllAuditType1()
        {
            var lists = await _repoAuditType.FindAll().Select(x => x.Audit_Type1).Distinct().ToListAsync();
            return lists;
        }

        public async Task<List<string>> GetAllAuditType2()
        {
            return await _repoAuditType.FindAll().GroupBy(x => x.Audit_Type2).Select(x => x.Key).ToListAsync();
        }

        public async Task<List<string>> GetAllAuditType2By6s()
        {
            return await _repoAuditType.FindAll().Where(x => x.Audit_Type1.Trim() == "6S").GroupBy(x => x.Audit_Type2).Select(x => x.Key).ToListAsync();
        }

        public async Task<List<string>> GetAllAuditType2BySME()
        {
            return await _repoAuditType.FindAll().Where(x => x.Audit_Type1.Trim() == "SME2.0").GroupBy(x => x.Audit_Type2).Select(x => x.Key).ToListAsync();
        }

        public async Task<object> GetAuditsByAuditType(AuditType1FormDto formData)
        {
            var data = await _repoAuditType.FindAll().ProjectTo<AuditTypeDto>(_configMapper)
            .Where(x => x.Audit_Type1.Trim() == formData.Audit_Type_1.Trim()).OrderByDescending(x => x.Updated_Time).ToListAsync();
            var result = (from a in data
                          select new
                          {
                              audit_type_ID = data.Where(y => y.Audit_Kind == a.Audit_Kind && y.Audit_Type1 == a.Audit_Type1
                              && y.Audit_Type2 == a.Audit_Type2 && y.Brand == a.Brand &&
                              y.Version == data.Where(x => x.Audit_Kind == a.Audit_Kind && x.Audit_Type1 == a.Audit_Type1
                              && x.Audit_Type2 == a.Audit_Type2 && x.Brand == a.Brand).OrderByDescending(x => x.Version).FirstOrDefault().Version)
                          .OrderByDescending(x => x.Audit_Type_ID).FirstOrDefault().Audit_Type_ID,
                              Audit_Kind = a.Audit_Kind,
                              Audit_Type1 = a.Audit_Type1,
                              Audit_Type2 = a.Audit_Type2,
                              Version = data.Where(x => x.Audit_Kind == a.Audit_Kind && x.Audit_Type1 == a.Audit_Type1
                              && x.Audit_Type2 == a.Audit_Type2 && x.Brand == a.Brand).OrderByDescending(x => x.Version).FirstOrDefault().Version
                          }).ToList().Distinct();
            return result;
        }

        public async Task<string> GetAuditTypeID()
        {
            string audit_type_ID = "Audit";
            var items = await _repoAuditType.FindAll().Where(x => x.Audit_Type_ID.Contains(audit_type_ID)).OrderByDescending(x => x.Audit_Type_ID).FirstOrDefaultAsync();
            try
            {
                if (items != null)
                {
                    var serinumber = items.Audit_Type_ID.Substring(6).ToInt();
                    var tmp = (serinumber >= 999) ? (serinumber + 1).ToString() : (serinumber >= 99) ? ("0" + (serinumber + 1)) : (serinumber < 9) ? ("000" + (serinumber + 1)) : ("00" + (serinumber + 1));
                    audit_type_ID = "Audit" + tmp;
                }
            }
            catch (System.Exception ex)
            {

                throw ex;
            }
            return audit_type_ID;
        }

        public async Task<List<AuditTypeViewModel>> GetAuditType_1_2_Version()
        {
            var lists = await _repoAuditType.FindAll().ToListAsync();
            var data = lists.Select(x => new AuditTypeViewModel
            {
                Audit_Type_ID = x.Audit_Type_ID,
                Audit_Type = x.Audit_Type1 + " " + x.Audit_Type2 + " V" + x.Version
            });
            return data.ToList();
        }

        public AuditTypeDto GetById(object id)
        {
            return _mapper.Map<MES_Audit_Type_M, AuditTypeDto>(_repoAuditType.FindById(id));
        }

        public async Task<PagedList<AuditTypeDto>> Search(PaginationParams param, object text)
        {
            var lists = _repoAuditType.FindAll().ProjectTo<AuditTypeDto>(_configMapper)
            .Where(
                x => x.Audit_Type_ID.Contains(text.ToString()) ||
                x.Brand.Contains(text.ToString()) ||
                x.Audit_Type1.Contains(text.ToString()) ||
                x.Audit_Type2.Contains(text.ToString()) ||
                x.Audit_Type2_Name.Contains(text.ToString()) ||
                x.Updated_By.Contains(text.ToString())
            ).
            OrderByDescending(x => x.Updated_Time);
            return await PagedList<AuditTypeDto>.CreateAsync(lists, param.PageNumber, param.PageSize);
        }

        public async Task<bool> Update(AuditTypeDto model)
        {
            var auditType = _mapper.Map<MES_Audit_Type_M>(model);
            auditType.Updated_Time = DateTime.Now;
            _repoAuditType.Update(auditType);
            return await _repoAuditType.SaveAll();
        }
        public async Task<bool> Upgrade(string auditTypeId)
        {
            string auditID = await GetAuditTypeID();
            var auditTypeM = _repoAuditType.FindAll().Where(x => x.Audit_Type_ID.Trim() == auditTypeId.Trim()).FirstOrDefault();
            auditTypeM.Audit_Type_ID = auditID;
            auditTypeM.Updated_Time = DateTime.Now;
            auditTypeM.Version = auditTypeM.Version + 1;
            auditTypeM.Status = "1";

            var auditTypeD = _repoAuditType.FindAll().Where(x => x.Audit_Type_ID.Trim() == auditTypeId.Trim()).ToList().ToList()
            .Select(x =>
            {
                x.Audit_Type_ID = auditID;
                x.Updated_Time = DateTime.Now;
                return x;
            }).ToList();


            var listAuditTypeM = _mapper.Map<MES_Audit_Type_M>(auditTypeM);
            var listAuditTypeD = _mapper.Map<List<MES_Audit_Type_D>>(auditTypeD);

            //add DB
            _repoAuditType.Add(listAuditTypeM);
            _repoAuditType.AddMultiple(listAuditTypeD);
            try
            {
                //save
                return await _repoAuditType.SaveAll();
            }
            catch (SystemException)
            {
                return false;
            }
        }
    }
}