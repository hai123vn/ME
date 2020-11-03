using System.Collections.Generic;
using System.Threading.Tasks;
using ME_API.DTO;

namespace ME_API._Service.Interface
{
    public interface IMesUserService : IMEService<UserForDetailDto>
    {
        Task<object> GetRoleByUser(string user);
        Task<bool> saveRole(List<AuditRoleSaveDto> auditRoleUser, string userName);
    }
}