using System.Threading.Tasks;
using ME_API.DTO;

namespace ME_API._Service.Interface
{
    public interface IAuthService
    {
         Task<UserForLogged_Dto> GetUser(string username, string password);
    }
}