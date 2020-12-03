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
    [Route("api/[controller]")]
    public class SMEReportController : ControllerBase
    {
        private ISMERecordService _iSMERecordService;
        private readonly IWebHostEnvironment _webHostEnvironment;
        private readonly IAuditRateService _auditRateService;
        private readonly IAuditPicDService _auditPicDService;

        public SMEReportController(ISMERecordService iSMERecordService, IWebHostEnvironment webHostEnvironment, IAuditRateService auditRateService, IAuditPicDService auditPicDService)
        {
            _iSMERecordService = iSMERecordService;
            _webHostEnvironment = webHostEnvironment;
            _auditRateService = auditRateService;
            _auditPicDService = auditPicDService;
        }

        [HttpPost("sme-list")]
        public async Task<IActionResult> GetListSMEScoreRecord([FromQuery] PaginationParams paginationParams, ScoreRecordParam scoreRecordParam)
        {
            var data = await _iSMERecordService.GetListSMEScoreRecord(paginationParams, scoreRecordParam);
            Response.AddPagination(data.CurrentPage, data.PageSize, data.TotalCount, data.TotalPages);
            return Ok(data);
        }
        [HttpPost("ExportExcelSME")]
        public async Task<IActionResult> ExportExcelSMERecord([FromQuery] PaginationParams paginationParams, ScoreRecordParam scoreRecordParam)
        {
            var data = await _iSMERecordService.GetListSMEScoreRecord(paginationParams, scoreRecordParam, false);
            var path = Path.Combine(_webHostEnvironment.ContentRootPath, "Resource\\Template\\SME_Score_Record_Template.xlsx");
            WorkbookDesigner ds = new WorkbookDesigner();
            ds.Workbook = new Workbook(path);
            Worksheet ws = ds.Workbook.Worksheets[0];
            ds.SetDataSource("result", data);
            ds.Process();

            MemoryStream stream = new MemoryStream();
            ds.Workbook.Save(stream, SaveFormat.Xlsx);

            byte[] result = stream.ToArray();
            return File(result, "application/xlsx", "SME_Score_Record" + DateTime.Now.ToString("dd_MM_yyyy_HH_mm_ss") + ".xlsx");
        }

        [HttpGet("ExportExcelScoreRecordDetail")]
        public async Task<IActionResult> ExportExcelScoreRecordDetail(string recordId)
        {
            var data = await _auditRateService.GetScoreRecoreDetail(recordId);
            var Building = await _auditPicDService.GetBuildingByID(data.auditRateM.Building);
            var path = Path.Combine(_webHostEnvironment.ContentRootPath, "Resource\\Template\\SME_Score_Record_Detail_Template.xlsx");
            WorkbookDesigner ds = new WorkbookDesigner();
            ds.Workbook = new Workbook();
            Worksheet ws = ds.Workbook.Worksheets[0];
            // gan gia tri tinh
            ws.Cells["B2"].PutValue(data.auditRateM.Record_Date);
            ws.Cells["D2"].PutValue(data.auditRateM.PDC);
            ws.Cells["F2"].PutValue(Building);
            ws.Cells["B3"].PutValue(data.auditRateM.Updated_By);
            ws.Cells["D3"].PutValue(data.auditRateM.Updated_Time);
            ws.Cells["F3"].PutValue(data.auditRateM.Line_ID_2_Name);
            ws.Cells["F4"].PutValue(data.auditRateM.Audit_Type2);

            ds.SetDataSource("result", data.listAuditRateD);
            ds.Process();

            MemoryStream stream = new MemoryStream();
            ds.Workbook.Save(stream, SaveFormat.Xlsx);
            byte[] result = stream.ToArray();
            return File(result, "application/xlsx", "SME_Score_Record_Detail" + DateTime.Now.ToString("dd_MM_yyyy_HH_mm_ss") + "xlsx");
        }

        [HttpGet("getaudittype1bysme")]
        public async Task<IActionResult> GetListAuditType1BySME()
        {
            var data = await _iSMERecordService.GetAuditType1BySME();
            return Ok(data);
        }
    }

}