using System.Threading.Tasks;
using ME_API._Service.Interface;
using Microsoft.AspNetCore.Mvc;

namespace ME_API.Controller
{
    [ApiController]
    [Route("api/[controller]")]
    public class MesOrgController : ControllerBase
    {
        private readonly IMesOrgService _service;
        private readonly IMesAuditOrgService _mesAuditOrgService;
        public MesOrgController(IMesOrgService service, IMesAuditOrgService mesAuditOrgService)
        {
            _mesAuditOrgService = mesAuditOrgService;
            _service = service;
        }

        [HttpGet("allPdc")]
        public async Task<IActionResult> GetAllPdc()
        {
            var data = await _mesAuditOrgService.GetAllPDC();
            return Ok(data);
        }
        [HttpGet("allBuilding")]
        public async Task<IActionResult> GetAllBuilding(string pdc)
        {
            var data = await _mesAuditOrgService.GetAllBuilding(pdc);
            return Ok(data);

        }
        [HttpGet("allLineID")]
        public async Task<IActionResult> GetLineID(string pdc, string building)
        {
            var data = await _mesAuditOrgService.GetAllLineID(pdc, building);
            return Ok(data);

        }
    }
}