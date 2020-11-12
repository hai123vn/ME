using ME_API._Repositories.Interfaces;
using ME_API.Data;
using ME_API.Models;

namespace ME_API._Repositories.Repositories
{
    public class AuditRateMRepository : MERepository<MES_Audit_Rate_M>, IAuditRateMRepository
    {
        private readonly DataContext _context;
        public AuditRateMRepository(DataContext context) : base(context)
        {
            _context = context;
        }
    }
}