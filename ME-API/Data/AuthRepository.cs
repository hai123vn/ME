using System.Linq;
using System.Threading.Tasks;
using ME_API.Models;
using Microsoft.EntityFrameworkCore;

namespace ME_API.Data
{
    public class AuthRepository : IAuthRepository
    {
        private readonly DataContext _context;
        public AuthRepository(DataContext context)
        {
            _context = context;

        }

        public Task<MES_User> Login(string username, string password)
        {
            throw new System.NotImplementedException();
        }
    }
}