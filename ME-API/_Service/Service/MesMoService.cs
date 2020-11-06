using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using ME_API._Repositories.Interfaces;
using ME_API._Service.Interface;
using Microsoft.EntityFrameworkCore;

namespace ME_API._Service.Service
{
    public class MesMoService : IMesMoService
    {
        private readonly IMesMoRepository _repo;
        private readonly IMapper _mapper;
        private readonly MapperConfiguration _config;

        public MesMoService(IMesMoRepository repo, IMapper mapper, MapperConfiguration config)
        {
            _repo = repo;
            _mapper = mapper;
            _config = config;
        }

        public async Task<List<string>> GetAllModelNo()
        {
            return await _repo.FindAll().GroupBy(x => x.Style_No).Select(x => x.Key.Trim()).ToListAsync();
        }

        public async Task<string> GetModelName(string modelNo)
        {
            var mesMeFind = await _repo.FindAll().Where(x => x.Style_No.Trim() == modelNo.Trim()).FirstOrDefaultAsync();
            return mesMeFind.Style_Name.ToString();
        }
    }
}