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
    public class SMERecordController : ControllerBase
    {
        private readonly IAuditRateService _auditRateService;
        private readonly IAuditPicDService _auditPicDService;
        private readonly ISMERecordService _smeRecordService;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public SMERecordController(IAuditRateService auditRateService, IAuditPicDService auditPicDService, ISMERecordService smeRecordService, IWebHostEnvironment webHostEnvironment)
        {
            _auditRateService = auditRateService;
            _auditPicDService = auditPicDService;
            _smeRecordService = smeRecordService;
            _webHostEnvironment = webHostEnvironment;
        }

        [HttpPost("sme-list")]
        public async Task<IActionResult> GetListSMEScoreRecord([FromQuery] PaginationParams paginationParams, ScoreRecordParam scoreRecordParam)
        {
            var data = await _smeRecordService.GetListSMEScoreRecord(paginationParams, scoreRecordParam);
            Response.AddPagination(data.CurrentPage, data.PageSize, data.TotalCount, data.TotalPages);
            return Ok(data);
        }

        [HttpPost("ExportExcelSME")]
        public async Task<IActionResult> ExportExcelSMERecord([FromQuery] PaginationParams paginationParams, ScoreRecordParam sixsScoreRecordParam)
        {
            var data = await _smeRecordService.GetListSMEScoreRecord(paginationParams, sixsScoreRecordParam, false);
            var path = Path.Combine(_webHostEnvironment.ContentRootPath, "Resource\\Template\\SME_Score_Record_Template.xlsx");
            WorkbookDesigner designer = new WorkbookDesigner();
            designer.Workbook = new Workbook(path);
            Worksheet ws = designer.Workbook.Worksheets[0];
            designer.SetDataSource("result", data);
            designer.Process();

            MemoryStream stream = new MemoryStream();
            designer.Workbook.Save(stream, SaveFormat.Xlsx);

            byte[] result = stream.ToArray();
            return File(result, "application/xlsx", "SME_Score_Record" + DateTime.Now.ToString("dd_MM_yyyy_HH_mm_ss") + ".xlsx");
        }

        [HttpGet("ExportExcelScoreRecordDetail")]
        public async Task<IActionResult> ExportExcelScoreRecordDetail(string recordId)
        {
            var data = await _auditRateService.GetScoreRecoreDetail(recordId);
            var Building = await _auditPicDService.GetBuildingByID(data.auditRateM.Building);
            var path = Path.Combine(_webHostEnvironment.ContentRootPath, "Resource\\Template\\SME_Score_Record_Detail_Template.xlsx");
            WorkbookDesigner designer = new WorkbookDesigner();
            designer.Workbook = new Workbook(path);
            Worksheet ws = designer.Workbook.Worksheets[0];
            // Gan gia tri trinh
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

            return File(result, "application/xlsx", "SME_Score_Record_Detail" + DateTime.Now.ToString("dd_MM_yyyy_HH_mm_ss") + ".xlsx");
        }
        [HttpGet("getbrandbysme")]
        public async Task<IActionResult> GetListBrandBySME()
        {
            var data = await _smeRecordService.GetBrandBySME();
            return Ok(data);
        }
        [HttpGet("getaudittypebybrandbysme")]
        public async Task<IActionResult> GetListAuditTypeByBrandBySME(string brand)
        {
            var data = await _smeRecordService.GetAuditTypeByBrandBySME(brand);
            return Ok(data);
        }

        [HttpGet("getaudittype1bysme")]
        public async Task<IActionResult> GetListAuditType1BySME()
        {
            var data = await _smeRecordService.GetAuditType1BySME();
            return Ok(data);
        }
    }
}