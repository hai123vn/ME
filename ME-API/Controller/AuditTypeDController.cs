using System;
using System.IO;
using System.Net.Http.Headers;
using System.Security.Claims;
using System.Threading.Tasks;
using ME_API._Service.Interface;
using ME_API.DTO;
using ME_API.Helpers;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ME_API.Controller
{
    [ApiController]
    [Route("api/controller")]
    public class AuditTypeDController : ControllerBase
    {
        private readonly IAuditTypeDService _auditTypeDService;
        private readonly IWebHostEnvironment _webHostEnvironment;
        public AuditTypeDController(IAuditTypeDService auditTypeDService, IWebHostEnvironment webHostEnvironment)
        {
            _webHostEnvironment = webHostEnvironment;
            _auditTypeDService = auditTypeDService;
        }

        [HttpGet(Name = "GetAuditTypeDs")]
        public async Task<IActionResult> GetAuditTypes([FromQuery] PaginationParams param)
        {
            var auditTypes = await _auditTypeDService.GetWithPaginations(param);
            Response.AddPagination(auditTypes.CurrentPage, auditTypes.PageSize, auditTypes.TotalCount, auditTypes.TotalPages);
            return Ok(auditTypes);
        }



        [HttpPost("search", Name = "SearchAuditTypeD")]
        public async Task<IActionResult> Search([FromQuery] PaginationParams param, AuditTypeDParam auditTypeDParam)
        {
            var lists = await _auditTypeDService.SearchAuditTypeD(param, auditTypeDParam);
            Response.AddPagination(lists.CurrentPage, lists.PageSize, lists.TotalCount, lists.TotalPages);
            return Ok(lists);
        }

        [HttpGet("auditItem/{auditTypeID}")]
        public async Task<IActionResult> SearchAuditItem(string auditTypeID)
        {
            var data = await _auditTypeDService.SearchAuditItem(auditTypeID);
            return Ok(data);
        }


          [HttpGet("GetAllAuditType")]
        public async Task<IActionResult> GetAll()
        {
            var auditTypes = await _auditTypeDService.getAllAuditTypeM();
            return Ok(auditTypes);
        }
        [HttpPost("create")]
        public async Task<IActionResult> Create([FromForm] AuditType_D_Dto auditTypeDto)
        {
            IFormFile filevideo = Request.Form.Files["filevideo"];
            auditTypeDto.Audit_Type_ID = Request.Form["audit_Type_ID"];
            auditTypeDto.Audit_Item_ID = Request.Form["audit_Item_ID"];
            auditTypeDto.Audit_Type3_ZW = Request.Form["audit_Type3_ZW"];
            auditTypeDto.Audit_Type3_EN = Request.Form["audit_Type3_EN"];
            auditTypeDto.Audit_Type3_LL = Request.Form["audit_Type3_LL"];
            auditTypeDto.Audit_Item_EN = Request.Form["audit_Item_EN"];
            auditTypeDto.Audit_Item_LL = Request.Form["audit_Item_LL"];
            auditTypeDto.Audit_Item_ZW = Request.Form["audit_Item_ZW"];
            auditTypeDto.Rating_0 = Request.Form["rating_0"].ToInt();
            auditTypeDto.Rating_1 = Request.Form["rating_1"].ToInt();
            auditTypeDto.Rating_2 = Request.Form["rating_2"].ToInt();

            string name = _auditTypeDService.GetNameVideoByID(auditTypeDto.Audit_Type_ID);
            string folder = _webHostEnvironment.WebRootPath + "\\uploaded\\video";
            var file = filevideo;
            if (filevideo != null)
            {
                var filenameB4 = ContentDispositionHeaderValue
                         .Parse(file.ContentDisposition)
                         .FileName
                         .Trim('"');
                filenameB4 = name + "_" + auditTypeDto.Audit_Item_ID + "_" + Path.GetExtension(filenameB4);
                string filePathB4 = Path.Combine(folder, filenameB4);
                using (FileStream fs = System.IO.File.Create(filePathB4))
                {
                    filevideo.CopyTo(fs);
                    fs.Flush();
                }
                auditTypeDto.Movie_Name = filenameB4;
            }

            var username = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            auditTypeDto.Updated_By = username;
           // auditTypeDto.Updated_Time = DateTime.Now;
            if (await _auditTypeDService.Add(auditTypeDto))
            {
                return CreatedAtRoute("GetAuditTypeDs", new { });
            }

            throw new Exception("Creating the AuditType failed on save");
        }
    }
}