using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using ME_API._Repositories.Interfaces;
using ME_API._Service.Interface;
using ME_API.DTO;
using ME_API.Helpers;
using ME_API.Models;
using Microsoft.EntityFrameworkCore;

namespace ME_API._Service.Service
{
    public class MesUserService : IMesUserService
    {
        private readonly IMesUserRepository _repoUser;
        private readonly IMapper _mapper;
        private readonly MapperConfiguration _configMapper;
        private readonly IAuditRoleUserRepository _roleUserRepository;
        private readonly IAuditRolesRepository _rolesRepository;
        public MesUserService(IMesUserRepository repoUser, IMapper mapper, MapperConfiguration configMapper, IAuditRoleUserRepository roleUserRepository,
        IAuditRolesRepository rolesRepository)
        {
            _rolesRepository = rolesRepository;
            _roleUserRepository = roleUserRepository;
            _configMapper = configMapper;
            _mapper = mapper;
            _repoUser = repoUser;
        }

        public Task<bool> Add(UserForDetailDto model)
        {
            throw new System.NotImplementedException();
        }

        public Task<bool> Delete(object id)
        {
            throw new System.NotImplementedException();
        }

        public Task<List<UserForDetailDto>> GetAllAsyn()
        {
            throw new System.NotImplementedException();
        }

        public UserForDetailDto GetById(object id)
        {
            throw new System.NotImplementedException();
        }

        public async Task<object> GetRoleByUser(string user)
        {
            var roleUser = _roleUserRepository.FindAll().Where(x => x.user_account.Trim() == user.Trim());
            var role = _rolesRepository.FindAll().Where(x => x.role_unique.Trim() != null);
            var data = await (from a in role
                              select new
                              {
                                  role_sequence = a.role_sequence,
                                  user_account = user,
                                  Role_unique = a.role_unique,
                                  Role_name = a.role_name,
                                  Status = roleUser == null ? false : roleUser.Where(x => x.role_unique == a.role_unique).Count() != 0 ? true : false
                              }).OrderBy(x => x.role_sequence).ToListAsync();
            return data;
        }

        public async Task<bool> saveRole(List<AuditRoleSaveDto> auditRoleUser, string userName)
        {
            DateTime timenow = DateTime.Now;
            var data = _roleUserRepository.FindAll().Where(x => x.user_account.Trim() == auditRoleUser[0].user_account.Trim()).ToList();
            _roleUserRepository.RemoveMultiple(data);
            auditRoleUser = auditRoleUser.Where(x => x.status == true).ToList();

            var auditRoleSaveUser = (from a in auditRoleUser
                                     select new AuditRoleUserDto()
                                     {
                                         user_account = a.user_account,
                                         role_unique = a.role_unique,
                                         create_by = a.create_by,
                                         create_time = a.create_time
                                     }).ToList();
            var auditRole = _mapper.Map<List<MES_Audit_RoleUser>>(auditRoleSaveUser);
            _roleUserRepository.AddMultiple(auditRole);
            try
            {
                await _roleUserRepository.SaveAll();
                return true;
            }
            catch (SystemException ex)
            {
                return false;
                throw ex;
            }
        }

        public async Task<PagedList<UserForDetailDto>> GetWithPaginations(PaginationParams param)
        {
            var lists = _repoUser.FindAll().ProjectTo<UserForDetailDto>(_configMapper).OrderByDescending(x => x.Update_Time);
            return await PagedList<UserForDetailDto>.CreateAsync(lists, param.PageNumber, param.PageSize);
        }

        public async Task<PagedList<UserForDetailDto>> Search(PaginationParams param, object text)
        {
            var lists = _repoUser.FindAll().ProjectTo<UserForDetailDto>(_configMapper)
            .Where(x => x.User_ID.Contains(text.ToString()) || x.User_Name.Contains(text.ToString()) || x.Email.Contains(text.ToString()))
            .OrderByDescending(x => x.Update_Time);

            return await PagedList<UserForDetailDto>.CreateAsync(lists, param.PageNumber, param.PageSize);
        }

        public Task<bool> Update(UserForDetailDto model)
        {
            throw new System.NotImplementedException();
        }
    }
}