using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using ME_API._Repositories.Interfaces;
using ME_API._Service.Interface;
using ME_API.DTO;
using Microsoft.EntityFrameworkCore;

namespace ME_API._Service.Service
{
    public class MesOrgService : IMesOrgService
    {
        private readonly MapperConfiguration _config;
        private readonly IMapper _mapper;
        private readonly IMesOrgRepository _mesOrgRepository;
        public MesOrgService(IMesOrgRepository mesOrgRepository, IMapper mapper, MapperConfiguration config)
        {
            _mesOrgRepository = mesOrgRepository;
            _mapper = mapper;
            _config = config;
        }

        public async Task<List<MesOrgDto>> GetAllAsync()
        {
            var lists = await _mesOrgRepository.FindAll().ProjectTo<MesOrgDto>(_config).ToListAsync();
            return lists;
        }
        public async Task<object> GetAllBuilding(string pdc)
        {
            var queryData = _mesOrgRepository.FindAll(x => x.Status == 1);
            if (!String.IsNullOrEmpty(pdc))
                queryData = queryData.Where(x => x.PDC_ID.Trim() == pdc.Trim());
            return await queryData.GroupBy(x => new { x.Building }).Select(x => x.Key).ToListAsync();
        }

        public async Task<object> GetAllLineID(string pdc, string building)
        {
            var queryData = _mesOrgRepository.FindAll(x => x.Status == 1);
            if (!String.IsNullOrEmpty(pdc))
            {
                if (!String.IsNullOrEmpty(building))
                    queryData = queryData.Where(x => x.PDC_ID.Trim() == pdc && x.Building.Trim() == building.Trim());
                else
                    queryData = queryData.Where(x => x.PDC_ID.Trim() == pdc);
            }

            return await queryData.GroupBy(x => x.Line_ID_2).Select(x => x.Key.Trim()).ToListAsync();
        }

        public async Task<object> GetAllPDC()
        {
            return await _mesOrgRepository.FindAll(x=>x.Status == 1).GroupBy(x=>x.PDC_ID).Select(x=>x.Key).ToListAsync();
        }
    }
}