using System;
using System.Security.Claims;
using System.Threading.Tasks;
using ME_API._Service.Interface;
using ME_API.DTO;
using ME_API.Helpers;
using Microsoft.AspNetCore.Mvc;

namespace ME_API.Controller
{
    [ApiController]
    [Route("api/[controller]")]

    public class AuditPicMController : ControllerBase
    {
        private readonly IAuditPicMService _auditPicMService;
        public AuditPicMController(IAuditPicMService auditPicMService)
        {
            _auditPicMService = auditPicMService;
        }

        [HttpGet("all", Name = "GetAllPicM")]
        public async Task<IActionResult> GetAll()
        {
            var model = await _auditPicMService.GetAllAsyn();
            return Ok(model);
        }

        [HttpGet("GetAllPicMs")]
        public async Task<IActionResult> GetAuditPicMs([FromQuery] PaginationParams param)
        {
            var model = await _auditPicMService.GetWithPaginations(param);
            Response.AddPagination(model.CurrentPage, model.PageSize, model.TotalCount, model.TotalPages);
            return Ok(model);
        }

        [HttpGet("search/{text}")]
        public async Task<IActionResult> Search([FromQuery] PaginationParams param, string text)
        {
            var lists = await _auditPicMService.Search(param, text);
            Response.AddPagination(lists.CurrentPage, lists.PageSize, lists.TotalCount, lists.TotalPages);
            return Ok(lists);
        }
        [HttpPost("create")]
        public async Task<IActionResult> Create(AuditPicMDto auditPicM)
        {
            var userName = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            if (await _auditPicMService.Add(auditPicM))
            {
                return CreatedAtRoute("GetAuditPicMs", new { });
            }
            throw new Exception("Creating the Audit PicM failed on save");
        }

        [HttpPost("delete/{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            if (await _auditPicMService.Delete(id))
            {
                return NoContent();
            }
            throw new Exception("Error deleting Audit PicM");
        }

        [HttpPost("edit")]
        public async Task<IActionResult> Update([FromBody] AuditPicMDto auditPicM)
        {
            if (await _auditPicMService.Update(auditPicM))
            {
                return NoContent();
            }
            throw new Exception($"Updating Audit PicM {auditPicM.PIC_Type_ID} failed on save");
        }
    }
}