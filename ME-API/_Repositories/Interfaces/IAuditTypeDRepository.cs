using ME_API.Models;

namespace ME_API._Repositories.Interfaces
{
    public interface IAuditTypeDRepository
    {
        string GetAuditItemLL(string auditTypeId, string auditItemId);
        string GetAuditItemEN(string auditTypeId, string auditItemId);
        string GetAuditItemZW(string auditTypeId, string auditItemId);
        int GetTypeDrating0(string auditTypeId, string auditItemId);
        int GetTypeDrating1(string auditTypeId, string auditItemId);
        int GetTypeDrating2(string auditTypeId, string auditItemId);
        MES_Audit_Type_D Get_Audit_Type_D(string ID, string item);
    }
}