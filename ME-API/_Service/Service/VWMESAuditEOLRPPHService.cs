using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ME_API._Repositories.Interfaces;
using ME_API._Service.Interface;
using ME_API.Models;
using Microsoft.EntityFrameworkCore;

namespace ME_API._Service.Service
{
    public class VWMESAuditEOLRPPHService : IVWMESAuditEOLRPPHService
    {
        private readonly IVWMEAuditEOLRPPHRepository _vWMEAuditEOLRPPHRepository;

        public VWMESAuditEOLRPPHService(IVWMEAuditEOLRPPHRepository vWMEAuditEOLRPPHRepository)
        {
            _vWMEAuditEOLRPPHRepository = vWMEAuditEOLRPPHRepository;
        }

        public async Task<List<VW_MES_Audit_EOLR_PPH>> GetDataKpiTrackingChart(string timeFrom, string timeEnd, string line, string styleNo)
        {
            var query = _vWMEAuditEOLRPPHRepository.FindAll();
            if (string.IsNullOrEmpty(timeFrom) == false && string.IsNullOrEmpty(timeEnd) == false)
            {
                DateTime d1 = Convert.ToDateTime(timeFrom);
                DateTime d2 = Convert.ToDateTime(timeEnd);
                query = query.Where(x => x.Yield_Date >= d1 && x.Yield_Date <= d2);
            }
            if (!string.IsNullOrEmpty(line))
            {
                query = query.Where(x => x.Dept_ID == line);
            }
            if (!string.IsNullOrEmpty(styleNo))
            {
                query = query.Where(x => x.Style_No == styleNo);
            }

            var data = await query.OrderBy(x => x.Yield_Date).ToListAsync();
            return data;
        }

        public async Task<object> GetListLine()
        {
            var data = await _vWMEAuditEOLRPPHRepository.FindAll(x => x.Dept_Name != null).GroupBy(x => new { x.Dept_Name, x.Dept_ID }).Select(x => x.Key).OrderBy(x => x.Dept_ID).ToListAsync();
            return data;
        }

        public async Task<List<string>> GetListStyleNo()
        {
            var data = await _vWMEAuditEOLRPPHRepository.FindAll(x => x.Style_No != null).Select( x=>x.Style_No.Trim()).Distinct().OrderBy(x => x).ToListAsync();
            return data;
        }
    }
}