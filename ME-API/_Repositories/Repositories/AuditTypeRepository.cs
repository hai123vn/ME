using System.Collections.Generic;
using ME_API._Repositories.Interfaces;
using ME_API.Data;
using ME_API.Models;

namespace ME_API._Repositories.Repositories
{
    public class AuditTypeRepository : MERepository<MES_Audit_Type_M>, IAuditTypeRepository
    {
        private readonly DataContext _context;
        public AuditTypeRepository(DataContext context) : base(context)
        {
            _context = context;
        }

        public void AddMultiple(List<MES_Audit_Type_D> listAuditTypeD)
        {
            throw new System.NotImplementedException();
        }
    }
}