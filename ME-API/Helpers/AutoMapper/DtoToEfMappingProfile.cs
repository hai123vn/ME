using ME_API.Models;
using AutoMapper;
using ME_API.DTO;
using ME_API.ViewModel;

namespace ME_API.Helpers.AutoMapper
{
    public class DtoToEfMappingProfile : Profile
    {
        public DtoToEfMappingProfile()
        {
            CreateMap<BrandDto, MES_Audit_Brand>();
            CreateMap<AuditTypeDto, MES_Audit_Type_M>();
            CreateMap<AuditType_D_Dto, MES_Audit_Type_D>();
            CreateMap<AuditRoleUserDto, MES_Audit_RoleUser>();
            CreateMap<AuditRolesDto, MES_Audit_Roles>();
            CreateMap<UserForDetailDto, MES_User>();
            CreateMap<AuditPicMDto, MES_Audit_PIC_M>();
            CreateMap<AuditPicDDto, MES_Audit_PIC_D>();
            CreateMap<MesOrgDto, MES_Org>();
            CreateMap<AuditRecMDto, MES_Audit_Rec_M>();
            CreateMap<AuditRecDDto, MES_Audit_Rec_D>();
            CreateMap<AuditRateDDto, MES_Audit_Rate_D>();
            CreateMap<AuditRateMDto, MES_Audit_Rate_M>();
            CreateMap<AuditRecDViewModel, MES_Audit_Rec_D>();
        }
    }
}