using System.Collections.Generic;
using System.Threading.Tasks;

namespace ME_API._Service.Interface
{
    public interface IMEService<T> where T : class
    {
        Task<bool> Add(T model);
        Task<bool> Update(T model);
        Task<bool> Delete(object id);
        Task<List<T>> GetAllAsyn();

    }
}