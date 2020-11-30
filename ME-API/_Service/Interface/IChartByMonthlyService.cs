using System.Collections.Generic;
using System.Threading.Tasks;
using ME_API.Helpers;
using ME_API.Models;

namespace ME_API._Service.Interface
{
    public interface IChartByMonthlyService
    {
        Task<List<MES_Audit_Type_M>> GetTypes();
        Task<object> GetChart(ChartMonthlyParam param);
        Task<object> GetChartPreviousMonth();
    }
}