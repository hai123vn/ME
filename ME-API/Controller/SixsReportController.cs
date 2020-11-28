using System;
using System.IO;
using System.Threading.Tasks;
using Aspose.Cells;
using ME_API._Service.Interface;
using ME_API.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;

namespace ME_API.Controller
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class SixsReportController : ControllerBase
    {
        private readonly ISixsReportService _iSixsReportService;
        private readonly IWebHostEnvironment _webHostEnvironment;
        private readonly IAuditRateService _auditRateService;
        private readonly IAuditPicDService _auditPicDService;

        public SixsReportController(ISixsReportService iSixsReportService, IWebHostEnvironment webHostEnvironment, IAuditRateService auditRateService, IAuditPicDService auditPicDService)
        {
            _iSixsReportService = iSixsReportService;
            _webHostEnvironment = webHostEnvironment;
            _auditRateService = auditRateService;
            _auditPicDService = auditPicDService;
        }

        [HttpPost("sixs-list")]
        public async Task<IActionResult> GetListSixsScoreRecord([FromQuery] PaginationParams paginationParams, ScoreRecordParam scoreRecordParam)
        {
            var data = await _iSixsReportService.GetListSixsScoreRecord(paginationParams, scoreRecordParam);
            Response.AddPagination(data.CurrentPage, data.PageSize, data.TotalCount, data.TotalPages);
            return Ok(data);
        }
        [HttpPost("ExportExcelSixs")]
        public async Task<ActionResult> ExportExcelSixsRecord([FromQuery] PaginationParams paginationParams, ScoreRecordParam sixsScoreRecordParam)
        {
            var data = await _iSixsReportService.GetListSixsScoreRecord(paginationParams, sixsScoreRecordParam, false);
            var path = Path.Combine(_webHostEnvironment.ContentRootPath, "Resource\\Template\\Sixs_Score_Record_Template.xlsx");
            WorkbookDesigner designer = new WorkbookDesigner();
            designer.Workbook = new Workbook(path);
            Worksheet ws = designer.Workbook.Worksheets[0];
            designer.SetDataSource("result", data);
            designer.Process();

            MemoryStream stream = new MemoryStream();
            designer.Workbook.Save(stream, SaveFormat.Xlsx);

            byte[] result = stream.ToArray();
            return File(result, "application/xlsx", "Sixs_Score_Record" + DateTime.Now.ToString("dd_MM_yyyy_HH_mm_ss") + ".xlsx");
        }
        [HttpGet("ExportExcelScoreRecordDetail")]
        public async Task<ActionResult> ExportExcelScoreRecordDetail(string recordId)
        {
            var data = await _auditRateService.GetScoreRecoreDetail(recordId);
            var Building = await _auditPicDService.GetBuildingByID(data.auditRateM.Building);
            var path = Path.Combine(_webHostEnvironment.ContentRootPath, "Resource\\Template\\Sixs_Score_Record_Detail_Template.xlsx");
            WorkbookDesigner designer = new WorkbookDesigner();
            designer.Workbook = new Workbook();

            Worksheet ws = designer.Workbook.Worksheets[0];
            // Gan gia tri tinh
            ws.Cells["B2"].PutValue(data.auditRateM.Record_Date);
            ws.Cells["D2"].PutValue(data.auditRateM.PDC);
            ws.Cells["F2"].PutValue(Building);
            ws.Cells["B3"].PutValue(data.auditRateM.Updated_By);
            ws.Cells["D3"].PutValue(data.auditRateM.Updated_Time);
            ws.Cells["F3"].PutValue(data.auditRateM.Line_ID_2_Name);
            ws.Cells["F4"].PutValue(data.auditRateM.Audit_Type2);

            designer.SetDataSource("result", data.listAuditRateD);
            designer.Process();


            MemoryStream stream = new MemoryStream();
            designer.Workbook.Save(stream, SaveFormat.Xlsx);

            byte[] result = stream.ToArray();

            return File(result, "application/xlsx", "Sixs_Score_Record_Detail" + DateTime.Now.ToString("dd_MM_yyyy_HH_mm_ss"));
        }

        [HttpGet("getaudittype1bysixs")]
        public async Task<ActionResult> GetListAuditType1BySixs()
        {
            var data = await _iSixsReportService.GetAuditType1BySixs();
            return Ok(data);
        }
    }
}