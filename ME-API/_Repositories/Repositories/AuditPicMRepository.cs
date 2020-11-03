using System.Threading.Tasks;
using ME_API._Repositories.Interfaces;
using ME_API.Data;
using ME_API.Models;

namespace ME_API._Repositories.Repositories
{
    public class AuditPicMRepository : MERepository<MES_Audit_PIC_M>, IAuditPicMRepository
    {
        private readonly DataContext _context;
        public AuditPicMRepository(DataContext context) : base(context)
        {
            _context = context;
        }

        public Task<bool> CheckAuditPicMExists(string picTypeID)
        {
            throw new System.NotImplementedException();
        }
    }
}