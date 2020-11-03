using System.Collections.Generic;
using System.Threading.Tasks;
using ME_API.DTO;
using ME_API.Helpers;

namespace ME_API._Service.Interface
{
    public interface IAuditTypeDService : IMEService<AuditType_D_Dto>
    {

        Task<PagedList<AuditType_D_Dto>> SearchAuditTypeD(PaginationParams param, AuditTypeDParam auditTypeDParam);

        Task<PagedList<AuditType_D_Dto>> SearchByAuditType(PaginationParams param, string audit_Type_ID, string audit_Item_ID);
        Task<List<string>> SearchAuditItem(string auditTypeID);
        Task<bool> ChangeVisiable(string ID, string item);
        Task<object> getAllAuditTypeM();
        string GetNameVideoByID(string auditTypeID);
        Task<bool> DeteleD(string id1, string id2);
    }
}