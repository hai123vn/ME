using System.Threading.Tasks;
using ME_API._Repositories.Interfaces;
using ME_API._Service.Interface;
using ME_API._Service.Service;
using Microsoft.AspNetCore.Mvc;

namespace ME_API.Controller
{
    [ApiController]
    [Route("api/[controller]")]
    public class ImproveProjectController : ControllerBase
    {
        private readonly IAuditRecDService _auditRecDService;
        private readonly IVWMESAuditEOLRPPHService _vWMESAuditEOLRPPHService;

        public ImproveProjectController(IAuditRecDService auditRecDService, IVWMESAuditEOLRPPHService vWMESAuditEOLRPPHService)
        {
            _auditRecDService = auditRecDService;
            _vWMESAuditEOLRPPHService = vWMESAuditEOLRPPHService;
        }

        [HttpGet("ImproveProjectRecordsImplementedRateThisMonth")]
        public async Task<IActionResult> ImproveProjectRecordsImplementedRate()
        {
            var data = await _auditRecDService.ImproveProjectRecordsImplementedRateThisMonth();
            return Ok(data);
        }
        [HttpGet("ImproveProjectRecordsImplementedRateLastMonth")]
        public async Task<IActionResult> ImproveProjectRecordsImplementedRateLastMonth()
        {
            var data = await _auditRecDService.ImproveProjectRecordImplementedRateLastMonth();
            return Ok(data);
        }
        [HttpGet("GetListLine")]
        public async Task<IActionResult> GetListLine()
        {
            var data = await _vWMESAuditEOLRPPHService.GetListLine();
            return Ok(data);
        }
        [HttpGet("GetListStyleNo")]
        public async Task<IActionResult> GetListStyleNo()
        {
            var data = await _vWMESAuditEOLRPPHService.GetListStyleNo();
            return Ok(data);
        }
        [HttpGet("GetDataKpiTrackingChart")]
        public async Task<IActionResult> GetDataKpiTrackingChart(string timeFrom, string timeEnd, string line, string styleNo)
        {
            var data = await _vWMESAuditEOLRPPHService.GetDataKpiTrackingChart(timeFrom, timeEnd, line, styleNo);
            return Ok(data);
        }
    }
}