using ME_API._Repositories.Interfaces;
using ME_API.Data;
using ME_API.Models;

namespace ME_API._Repositories.Repositories
{
    public class MesMoRepository : MERepository<MES_MO>, IMesMoRepository
    {
        public MesMoRepository(DataContext context) : base(context)
        {
        }
    }
}