using System.Collections.Generic;
using System.Threading.Tasks;
using ME_API._Service.Interface;
using ME_API.DTO;
using ME_API.Helpers;

namespace ME_API._Service.Service
{
    public class AuditTypeDService : IAuditTypeDService
    {
        public AuditTypeDService()
        {
        }

        public Task<bool> Add(AuditType_D_Dto model)
        {
            throw new System.NotImplementedException();
        }

        public Task<bool> ChangeVisiable(string ID, string item)
        {
            throw new System.NotImplementedException();
        }

        public Task<bool> Delete(object id)
        {
            throw new System.NotImplementedException();
        }

        public Task<List<AuditType_D_Dto>> GetAllAsyn()
        {
            throw new System.NotImplementedException();
        }

        public Task<object> getAllAuditTypeM()
        {
            throw new System.NotImplementedException();
        }

        public AuditType_D_Dto GetById(object id)
        {
            throw new System.NotImplementedException();
        }

        public string GetNameVideoByID(string auditTypeID)
        {
            throw new System.NotImplementedException();
        }

        public Task<PagedList<AuditType_D_Dto>> GetWithPaginations(PaginationParams param)
        {
            throw new System.NotImplementedException();
        }

        public Task<PagedList<AuditType_D_Dto>> Search(PaginationParams param, object text)
        {
            throw new System.NotImplementedException();
        }

        public Task<List<string>> SearchAuditItem(string auditTypeID)
        {
            throw new System.NotImplementedException();
        }

        public Task<PagedList<AuditType_D_Dto>> SearchAuditTypeD(PaginationParams param, AuditTypeDParam auditTypeDParam)
        {
            throw new System.NotImplementedException();
        }

        public Task<PagedList<AuditType_D_Dto>> SearchByAuditType(PaginationParams param, string audit_Type1, string audit_Type2)
        {
            throw new System.NotImplementedException();
        }

        public Task<bool> Update(AuditType_D_Dto model)
        {
            throw new System.NotImplementedException();
        }
    }
}