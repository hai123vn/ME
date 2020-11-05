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
    public class AuditPicDController : ControllerBase
    {
        private readonly IAuditPicDService _auditPicDService;
        public AuditPicDController(IAuditPicDService auditPicDService)
        {
            _auditPicDService = auditPicDService;
        }

        [HttpGet("all", Name = "GetAllPicD")]
        public async Task<IActionResult> GetAll()
        {
            var models = await _auditPicDService.GetAllAsyn();
            return Ok(models);
        }

        [HttpGet("search/{text}")]
        public async Task<IActionResult> Search([FromQuery] PaginationParams param, string text)
        {
            var list = await _auditPicDService.Search(param, text);
            Response.AddPagination(list.CurrentPage, list.PageSize, list.TotalCount, list.TotalPages);
            return Ok(list);
        }

        [HttpGet(Name = "GetAuditPicDs")]
        public async Task<IActionResult> GetAuditPicDs([FromQuery] PaginationParams param)
        {
            var auditPicDs = await _auditPicDService.GetWithPaginations(param);
            Response.AddPagination(auditPicDs.CurrentPage, auditPicDs.PageSize, auditPicDs.TotalCount, auditPicDs.TotalPages);
            return Ok(auditPicDs);
        }

        [HttpGet("allPdPic")]
        public async Task<IActionResult> GetAllPdPic()
        {
            var picD = await _auditPicDService.GetAllPdPic();
            return Ok(picD);
        }
        [HttpGet("getPdDepartment/{pdc}", Name = "getPdDepartment")]
        public async Task<IActionResult> GetPdDepartment(string pdc)
        {
            var data = await _auditPicDService.GetPdDepartment(pdc);
            return Ok(new { dataResult = data });
        }

        [HttpGet("getBuilding/{pdc}", Name = "getBuilding")]
        public async Task<IActionResult> GetBuilding(string pdc)
        {
            var data = await _auditPicDService.GetPdBuilding(pdc);
            return Ok(new { dataResult = data });
        }

        [HttpGet("allMePic")]
        public async Task<IActionResult> GetAllMePic()
        {
            var picD = await _auditPicDService.GetAllMePic();
            return Ok(picD);
        }

        [HttpGet("GetPdPicByID/{Resp_id}")]
        public async Task<IActionResult> GetPdPicByID(string Resp_id)
        {
            var data = await _auditPicDService.GetMePicByID(Resp_id);
            return Ok(new { dataResult = data });
        }

        [HttpGet("GetMePicByID/{Resp_id}")]
        public async Task<IActionResult> GetMePicByID(string Resp_id)
        {
            var data = await _auditPicDService.GetMePicByID(Resp_id);
            return Ok(new { dataResult = data });
        }

        [HttpGet("GetBuildingByID/{Building}")]
        public async Task<IActionResult> GetBuildingByID(string Building)
        {
            var data = await _auditPicDService.GetBuildingByID(Building);
            return Ok(new { dataResult = data });
        }

        [HttpPost("create")]
        public async Task<IActionResult> Create(AuditPicDDto data)
        {
            // var username = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            data.Updated_By = "SD3";
            if (await _auditPicDService.Add(data))
            {
                return CreatedAtRoute("GetAuditPicDs", new { });
            }
            throw new Exception("Creating the Audit Pic D failed !!!");
        }

        [HttpPost("update")]
        public async Task<IActionResult> Update([FromBody] AuditPicDDto model)
        {
            if (await _auditPicDService.Update(model))
            {
                return NoContent();
            }

            throw new Exception($"Updating Audit PicD {model.PIC_Type_ID} failed on save");
        }

        [HttpPost("delete")]
        public async Task<IActionResult> Delete([FromBody] AuditPicDDto model)
        {
            if (await _auditPicDService.Delete(model))
            {
                return NoContent();
            }
            throw new Exception("Error Delete Audit Pic D");
        }
    }
}