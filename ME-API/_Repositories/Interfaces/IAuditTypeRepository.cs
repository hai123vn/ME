using System.Collections.Generic;
using ME_API.Data;
using ME_API.Models;

namespace ME_API._Repositories.Interfaces
{
    public interface IAuditTypeRepository : IMERepository<MES_Audit_Type_M>
    {
        void AddMultiple(List<MES_Audit_Type_D> listAuditTypeD);
    }
}