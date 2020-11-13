using System;
using System.Collections.Generic;
using System.IO;
using System.Net.Http.Headers;
using System.Security.Claims;
using System.Threading.Tasks;
using ME_API._Service.Interface;
using ME_API.DTO;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ME_API.Controller
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuditRateController : ControllerBase
    {
        private readonly IAuditRateService _auditRateService;
        private readonly IAuditRateDService _auditRatDService;
        private readonly IAuditRateMService _auditRatMService;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public AuditRateController(IAuditRateService auditRateService, IAuditRateDService auditRatDService, IAuditRateMService auditRatMService, IWebHostEnvironment webHostEnvironment)
        {
            _auditRateService = auditRateService;
            _auditRatDService = auditRatDService;
            _auditRatMService = auditRatMService;
            _webHostEnvironment = webHostEnvironment;
        }

        [HttpGet("getlistquesrecord")]
        public async Task<IActionResult> GetListQuesReocord(string auditTypeId)
        {
            var data = await _auditRateService.GetListQuesScoreRecord(auditTypeId);
            return Ok(data);
        }

        [HttpPost("save")]
        public async Task<IActionResult> SaveScopeRecordRate(ScoreRecordAnsDto param)
        {
            if (await _auditRateService.SaveScopeRecord(param))
            {
                return NoContent();
            };
            throw new Exception("Error !! 🛑🛑");
        }

        [HttpGet("detail/{recordId}")]
        public async Task<IActionResult> GetScoreRecordDetail(string recordId)
        {
            var data = await _auditRateService.GetScoreRecoreDetail(recordId);
            if (data != null)
            {
                return Ok(data);
            }
            return NoContent();
        }

        [HttpPost("upload")]
        public async Task<IActionResult> UploadPicture(IFormFile file, string recordId, string auditItemId)
        {
            recordId = Request.Form["recordId"];
            auditItemId = Request.Form["auditItemId"];
            if (file != null)
            {
                var filename = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                var uploadPicture = "AuditRateRemark_" + recordId + "_" + auditItemId + Path.GetExtension(filename);
                string folder = _webHostEnvironment.WebRootPath + "\\upload\\images";
                if (!Directory.Exists(folder))
                {
                    Directory.CreateDirectory(folder);
                }
                string filePath = Path.Combine(folder, uploadPicture);
                //kiem tra  file cu co chua xoa di
                if (System.IO.File.Exists(filePath))
                {
                    System.IO.File.Delete(filePath);
                }

                using (FileStream fs = System.IO.File.Create(filePath))
                {
                    file.CopyTo(fs);
                    fs.Flush();
                }
                if (await _auditRatDService.UpdateUploadPicture(recordId, auditItemId, uploadPicture))
                {
                    return NoContent();
                }
                throw new Exception("Error XXX");
            }
            return NoContent();
        }

        [HttpGet("getlanguage/{user}")]
        public async Task<IActionResult> GetLanguage(string user)
        {
            var data = await _auditRateService.GetLanguage(user);
            if (data != null)
            {
                return Ok(data);
            }
            return NoContent();
        }

        [HttpPost("update-score-record-detail")]
        public async Task<IActionResult> UpdateScoreRecordDetail(List<AuditRateDDto> listParams)
        {
            if (await _auditRateService.UpdateListScopeRecordDetail(listParams, User.FindFirst(ClaimTypes.NameIdentifier).Value))
            {
                return NoContent();
            }
            throw new Exception("Error Update");
        }
    }
}