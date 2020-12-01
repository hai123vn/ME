using System;
using System.IO;
using System.Threading.Tasks;
using Aspose.Cells;
using ME_API._Service.Interface;
using ME_API.Helpers;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;

namespace ME_API.Controller
{
    [ApiController]
    [Route("api/conrtoller")]
    public class WaterSpiderReportController : ControllerBase
    {
        private readonly IWaterSpiderReportService _waterSpiderReportService;
        private readonly IAuditPicDService _auditPicDService;
        private readonly IAuditRateService _auditRateService;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public WaterSpiderReportController(IWaterSpiderReportService waterSpiderReportService, IAuditPicDService auditPicDService, IAuditRateService auditRateService, IWebHostEnvironment webHostEnvironment)
        {
            _waterSpiderReportService = waterSpiderReportService;
            _auditPicDService = auditPicDService;
            _auditRateService = auditRateService;
            _webHostEnvironment = webHostEnvironment;
        }

        [HttpPost("waterspider-list")]
        public async Task<IActionResult> GetListWaterSpiderScoreRecord([FromQuery] PaginationParams paginationParams, ScoreRecordParam scoreRecordParam)
        {
            var data = await _waterSpiderReportService.GetLisWaterSpiderScoreRecord(paginationParams, scoreRecordParam);
            Response.AddPagination(data.CurrentPage, data.PageSize, data.TotalCount, data.TotalPages);
            return Ok(data);
        }

        [HttpPost("ExportExcelWaterSpider")]
        public async Task<IActionResult> ExportExcelSMERecord([FromQuery] PaginationParams paginationParams, ScoreRecordParam scoreRecordParam)
        {
            var data = await _waterSpiderReportService.GetLisWaterSpiderScoreRecord(paginationParams, scoreRecordParam);
            var path = Path.Combine(_webHostEnvironment.ContentRootPath, "Resource\\Template\\WaterSpider_Score_Record_Template.xlsx");
            WorkbookDesigner designer = new WorkbookDesigner();
            designer.Workbook = new Workbook(path);
            Worksheet ws = designer.Workbook.Worksheets[0];

            designer.SetDataSource("result", data);
            designer.Process();

            MemoryStream stream = new MemoryStream();
            designer.Workbook.Save(stream, SaveFormat.Xlsx);

            byte[] result = stream.ToArray();
            return File(result, "application/xlsx", "WaterSpider_Score_Record" + DateTime.Now.ToString("dd_MM_yyyy_HH_mm_ss") + ".xlsx");
        }

        [HttpGet("getaudittype1bywaterspider")]
        public async Task<IActionResult> GetListAuditType1ByWaterSpider()
        {
            var data = await _waterSpiderReportService.GetAuditType1ByWaterSpider();
            return Ok(data);
        }
    }
}