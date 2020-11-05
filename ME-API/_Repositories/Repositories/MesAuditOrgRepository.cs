using ME_API._Repositories.Interfaces;
using ME_API.Data;
using ME_API.Models;

namespace ME_API._Repositories.Repositories
{
    public class MesAuditOrgRepository : MERepository<MES_Audit_Org>, IMesAuditOrgRepository
    {
        private readonly DataContext _context;
        public MesAuditOrgRepository(DataContext context) : base(context)
        {
            _context = context;
        }
    }
}