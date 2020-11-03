using System.Linq;
using System.Threading.Tasks;
using ME_API._Repositories.Interfaces;
using ME_API._Service.Interface;
using ME_API.DTO;
using Microsoft.EntityFrameworkCore;

namespace ME_API._Service.Service
{
    public class AuthService : IAuthService
    {
        private readonly IAuditRoleUserRepository _repoRoleUser;
        private readonly IAuditRolesRepository _repoRole;
        private readonly IMesUserRepository _repoUser;

        public AuthService(IMesUserRepository repoUser, IAuditRolesRepository repoRole, IAuditRoleUserRepository repoRoleUser)
        {
            _repoUser = repoUser;
            _repoRole = repoRole;
            _repoRoleUser = repoRoleUser;
        }

        public async Task<UserForLogged_Dto> GetUser(string username, string password)
        {
            var user = _repoUser.FindSingle(x => x.User_ID.Trim() == username.Trim());
            //Kiem tra user co ton tai khong
            if (user == null)
            {
                return null;
            }
            if (user.Password != password)
            {
                return null;
            }

            var roleUser = _repoRoleUser.FindAll(x => x.user_account == user.User_ID);
            var role = _repoRole.FindAll();
            var roleName = await roleUser.Join(role, x => x.role_unique, y => y.role_unique, (x, y)
            => new Role_Dto { Name = y.role_unique, Position = y.role_sequence }).ToListAsync();

            var result = new UserForLogged_Dto
            {
                Id = user.User_ID,
                Email = user.Email,
                Username = user.User_Name,
                Name = user.User_Name,
                Role = roleName.OrderBy(x => x.Position).Select(x => x.Name).ToList()
            };
            return result;
        }
    }
}