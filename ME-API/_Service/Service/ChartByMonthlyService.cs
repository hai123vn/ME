using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ME_API._Repositories.Interfaces;
using ME_API._Service.Interface;
using ME_API.DTO;
using ME_API.Helpers;
using ME_API.Models;
using Microsoft.EntityFrameworkCore;

namespace ME_API._Service.Service
{
    public class ChartByMonthlyService : IChartByMonthlyService
    {
        private readonly IAuditRecDRepository _repoAuditRecD;
        private readonly IAuditRecMRepository _repoAuditRecM;
        private readonly IAuditTypeRepository _repoAuditTypeM;

        public ChartByMonthlyService(IAuditRecDRepository repoAuditRecD, IAuditRecMRepository repoAuditRecM, IAuditTypeRepository repoAuditTypeM)
        {
            _repoAuditRecD = repoAuditRecD;
            _repoAuditRecM = repoAuditRecM;
            _repoAuditTypeM = repoAuditTypeM;
        }

        public class DataChart
        {
            public string name { get; set; }
            public List<int?> data { get; set; }
        }

        public async Task<object> GetChart(ChartMonthlyParam param)
        {
            var auditRecMs = await _repoAuditRecM.GetAll().ToListAsync();
            var auditRecDs = await _repoAuditRecD.GetAll().ToListAsync();
            var auditTypeMs = await _repoAuditTypeM.GetAll().ToListAsync();

            if (param.FromDate != "" && param.ToDate != "")
            {
                auditRecMs = auditRecMs.Where(x => x.Record_Time >= Convert.ToDateTime(param.FromDate) && x.Record_Time <= Convert.ToDateTime(param.ToDate + " 23:59:59.997")).ToList();
            }
            if (param.Status != "" && param.Status != "All")
            {
                auditRecDs = auditRecDs.Where(x => x.Status.Trim() == param.Status.Trim()).ToList();
            }
            if (param.Line != "" && param.Line != "All")
            {
                auditRecMs = auditRecMs.Where(x => x.Line.Trim() == param.Line.Trim()).ToList();
            }
            if (param.Model_No != "" && param.Model_No != "All")
            {
                auditRecMs = auditRecMs.Where(x => x.Model_No.Trim() == param.Model_No.Trim()).ToList();
            }
            if (param.Type != "" && param.Type != "All")
            {
                //Lấy AuditTypeM có Version lớn nhất
                var auditTypeM = auditTypeMs.Where(x => x.Audit_Type_ID.Trim() == param.Type.Trim()).FirstOrDefault();
                var auditTypeMVersion = auditTypeMs.Where(x => x.Audit_Kind == auditTypeM.Audit_Kind && x.Audit_Type1 == auditTypeM.Audit_Type1 && x.Audit_Type2 == auditTypeM.Audit_Type2).OrderByDescending(x => x.Version).FirstOrDefault();
                auditTypeMs = auditTypeMs.Where(x => x.Audit_Type_ID.Trim() == auditTypeM.Audit_Type_ID.Trim()).ToList();
            }
            var data1 = (from a in auditRecMs
                         join b in auditRecDs
     on a.Record_ID.Trim() equals b.Record_ID.Trim()
                         select new
                         {
                             Line = a.Line,
                             Item_no = b.Item_no,
                             Model_No = a.Model_No,
                             Audit_Type_ID = b.Audit_Type_ID
                         }).ToList();
            var data2 = (from a in data1
                         join b in auditTypeMs
                         on a.Audit_Type_ID equals b.Audit_Type_ID
                         into cl
                         from d in cl.DefaultIfEmpty()
                         select new ChartByMonthly()
                         {
                             Line = a.Line,
                             Model_No = a.Model_No,
                             Item_no = a.Item_no,
                             Audit_Type1 = d == null ? null : d.Audit_Type1,
                             Audit_Type2 = d == null ? null : d.Audit_Type2
                         });
            var data3 = data2.GroupBy(x => new { x.Line, x.Model_No, x.Audit_Type1, x.Audit_Type2 }).Select(y => new ChartByMonthly()
            {
                Line = y.FirstOrDefault().Line,
                Model_No = y.FirstOrDefault().Model_No,
                Audit_Type = ((y.FirstOrDefault().Audit_Type1) == null) ? "Orther" : y.FirstOrDefault().Audit_Type1 + "-" + y.FirstOrDefault().Audit_Type2,
                Count = y.Count()
            }).ToList();
            var lineModelGroup = data3.GroupBy(x => x.Line_ModelNo).Select(x => x.Key).ToList();
            var auditTypeGroup = data3.GroupBy(x => x.Audit_Type).Select(x => x.Key).ToList();
            var dataresult = new List<DataChart>();
            auditTypeGroup.ForEach(item =>
            {
                var itemChart = new DataChart();
                itemChart.name = item;
                var data4 = new List<int?>();
                foreach (var item1 in lineModelGroup)
                {
                    var ts = data3.Where(x => x.Line_ModelNo == item1 && x.Audit_Type == item).GroupBy(x => new
                    { x.Line_ModelNo, x.Audit_Type }).Select(x => x.Sum(cl => cl.Count)).FirstOrDefault();
                    if (ts != 0)
                    {
                        data4.Add(ts);
                    }
                    else
                    {
                        data4.Add(null);
                    }
                }
                itemChart.data = data4;
                dataresult.Add(itemChart);
            });

            var result = new
            {
                dataChart = dataresult,
                titleX = lineModelGroup,
                columnName = auditTypeGroup
            };
            return result;
        }

        public async Task<List<MES_Audit_Type_M>> GetTypes()
        {
            var data = await _repoAuditTypeM.GetAll().Distinct().ToListAsync();
            return data;
        }

        public async Task<object> GetChartPreviousMonth()
        {
            var auditRecDs = await _repoAuditRecD.GetAll().ToListAsync();
            var auditRecMs = await _repoAuditRecM.GetAll().ToListAsync();
            var auditTypeMs = await _repoAuditTypeM.GetAll().ToListAsync();

            //Lấy khoảng thời gian của tháng trước
            DateTime timeNow = DateTime.Now;
            var startDate = new DateTime(timeNow.Year, timeNow.Month - 1, 1);
            var endDate = startDate.AddMonths(1).AddDays(-1);
            DateTime d1 = Convert.ToDateTime(startDate.ToString("yyyy/MM/dd") + " 00:00:00");
            DateTime d2 = Convert.ToDateTime(endDate.ToString("yyyy/MM/dd") + " 23:59:59");
            auditRecMs = auditRecMs.Where(x => x.Record_Time >= d1 && x.Record_Time <= d2).ToList();

            var data1 = (from a in auditRecMs
                         join b in auditRecDs
                         on a.Record_ID.Trim() equals b.Record_ID.Trim()
                         select new
                         {
                             Line = a.Line,
                             Item_no = b.Item_no,
                             Model_No = a.Model_No,
                             Audit_Type_ID = b.Audit_Type_ID
                         }).ToList();
            var data2 = (from a in data1
                         join b in auditTypeMs
         on a.Audit_Type_ID equals b.Audit_Type_ID into cl
                         from d in cl.DefaultIfEmpty()
                         select new ChartByMonthly()
                         {
                             Line = a.Line,
                             Model_No = a.Model_No,
                             Item_no = a.Item_no,
                             Audit_Type1 = d == null ? null : d.Audit_Type1,
                             Audit_Type2 = d == null ? null : d.Audit_Type2
                         });
            var data3 = data2.GroupBy(x => new { x.Line, x.Model_No, x.Audit_Type1, x.Audit_Type2 }).
            Select(y => new ChartByMonthly()
            {
                Line = y.FirstOrDefault().Line,
                Model_No = y.FirstOrDefault().Model_No,
                Audit_Type = ((y.FirstOrDefault().Audit_Type1 == null) ? "Other" : y.FirstOrDefault().Audit_Type1) + "-" + y.FirstOrDefault().Audit_Type2,
                Count = y.Count(),
            }).ToList();
            var lineModelGroup = data3.GroupBy(x => x.Line_ModelNo).Select(x => x.Key).ToList();
            var auditTypeGroup = data3.GroupBy(x => x.Audit_Type).Select(x => x.Key).ToList();
            var dataResult = new List<DataChart>();
            auditTypeGroup.ForEach(item =>
            {
                var itemChart = new DataChart();
                itemChart.name = item;
                var data4 = new List<int?>();
                foreach (var item1 in lineModelGroup)
                {
                    var ts = data3.Where(x => x.Line_ModelNo == item1 && x.Audit_Type == item).GroupBy(x => new
                    {
                        x.Line_ModelNo,
                        x.Audit_Type
                    }).Select(x => x.Sum(cl => cl.Count)).FirstOrDefault();
                    if (ts != 0)
                    {
                        data4.Add(ts);
                    }
                    else
                    {
                        data4.Add(null);
                    }
                }
                itemChart.data = data4;
                dataResult.Add(itemChart);
            });

            var result = new
            {
                dataChart = dataResult,
                titleX = lineModelGroup,
                columnName = auditTypeGroup
            };
            return result;
        }
    }
}