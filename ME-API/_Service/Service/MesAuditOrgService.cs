using System;
using System.Linq;
using System.Threading.Tasks;
using ME_API._Repositories.Interfaces;
using ME_API._Service.Interface;
using Microsoft.EntityFrameworkCore;

namespace ME_API._Service.Service
{
    public class MesAuditOrgService : IMesAuditOrgService
    {
        private readonly IMesAuditOrgRepository _mesAuditOrgRepository;
        public MesAuditOrgService(IMesAuditOrgRepository mesAuditOrgRepository)
        {
            _mesAuditOrgRepository = mesAuditOrgRepository;
        }

        public async Task<object> GetAllPDC()
        {
            return await _mesAuditOrgRepository.FindAll(x => x.Status == 1).GroupBy(x => new { x.PDC_ID, x.PDC_Name }).Select(x => new { Id = x.Key.PDC_ID, Name = x.Key.PDC_Name }).ToListAsync();
        }

        public async Task<object> GetAllLineID(string pdc, string building)
        {
            var queryData = _mesAuditOrgRepository.FindAll(x => x.Status == 1);
            if (!String.IsNullOrEmpty(pdc))
            {
                if (!String.IsNullOrEmpty(building))
                    queryData = queryData.Where(x => x.PDC_ID.Trim() == pdc && x.Building == building.Trim());
                else
                    queryData = queryData.Where(x => x.PDC_ID.Trim() == pdc);
            }
            return await queryData.GroupBy(x => new { x.Line_ID_2, x.Line_ID_2_Name }).Select(x => new { Id = x.Key.Line_ID_2, Name = x.Key.Line_ID_2_Name }).ToListAsync();
        }

        public async Task<object> GetAllBuilding(string pdc)
        {
            var queryData = _mesAuditOrgRepository.FindAll(x => x.Status == 1);
            if (!String.IsNullOrEmpty(pdc))
                queryData = queryData.Where(x => x.PDC_ID.Trim() == pdc.Trim());
            return await queryData.GroupBy(x=>new { x.Building, x.Building_Name}).Select(x=> new{Id = x.Key.Building, Name = x.Key.Building_Name}).ToListAsync();
        }
    }
}