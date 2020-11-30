using ME_API._Repositories.Interfaces;
using ME_API.Data;
using ME_API.Models;

namespace ME_API._Repositories.Repositories
{
    public class VWMEAuditEOLRPPHRepository : MERepository<VW_MES_Audit_EOLR_PPH>, IVWMEAuditEOLRPPHRepository
    {
        private readonly DataContext _context;
        public VWMEAuditEOLRPPHRepository(DataContext context) : base(context)
        {
            _context = context;
        }
    }
}