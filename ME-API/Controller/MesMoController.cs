using System.Threading.Tasks;
using ME_API._Service.Interface;
using Microsoft.AspNetCore.Mvc;

namespace ME_API.Controller
{
    [ApiController]
    [Route("api/[controller]")]
    public class MesMoController : ControllerBase
    {
        private readonly IMesMoService _service;

        public MesMoController(IMesMoService service)
        {
            _service = service;
        }

        [HttpGet("allModelNo", Name = "AllModelNo")]
        public async Task<IActionResult> GetAllModelNo()
        {
            var data = await _service.GetAllModelNo();
            return Ok(data);
        }

        [HttpGet("getModelName/{modelNo}", Name = "getModelName")]
        public async Task<IActionResult> getModelName(string modelNo)
        {
            var modelName = await _service.GetModelName(modelNo);
            return Ok(new { dataResult = modelName });
        }
    }
}