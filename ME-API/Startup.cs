using System.Text;
using AutoMapper;
using ME_API._Repositories.Interfaces;
using ME_API._Repositories.Repositories;
using ME_API._Service.Interface;
using ME_API._Service.Service;
using ME_API.Data;
using ME_API.Helpers.AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;

namespace ME_API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors();
            services.AddControllers();
            services.AddDbContext<DataContext>(options => options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));

            //Auto Mapper
            services.AddAutoMapper(typeof(Startup));
            services.AddScoped<IMapper>(sp =>
            {
                return new Mapper(AutoMapperConfig.RegisterMappings());
            });
            services.AddSingleton(AutoMapperConfig.RegisterMappings());
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
               .AddJwtBearer(options =>
               {
                   options.RequireHttpsMetadata = false;
                   options.SaveToken = true;
                   options.TokenValidationParameters = new TokenValidationParameters
                   {
                       ValidateIssuerSigningKey = true,
                       IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII
                           .GetBytes(Configuration.GetSection("AppSettings:Token").Value)),
                       ValidateIssuer = false,
                       ValidateAudience = false
                   };
               });

            //Repository
            services.AddScoped<IAuthRepository, AuthRepository>();
            services.AddScoped<IBrandRepository, BrandRepository>();
            services.AddScoped<IAuditTypeRepository, AuditTypeRepository>();
            services.AddScoped<IAuditTypeDRepository, AuditTypeDRepository>();
            services.AddScoped<IMesUserRepository, MesUserRepository>();
            services.AddScoped<IAuditRolesRepository, AuditRolesRepository>();
            services.AddScoped<IAuditRoleUserRepository, AuditRoleUserRepository>();
            services.AddScoped<IAuditPicMRepository, AuditPicMRepository>();
            services.AddScoped<IAuditPicDRepository, AuditPicDRepository>();
            services.AddScoped<IMesUserRepository, MesUserRepository>();
            services.AddScoped<IMesAuditOrgRepository, MesAuditOrgRepository>();
            services.AddScoped<IMesOrgRepository, MesOrgRepository>();
            services.AddScoped<IAuditRecDRepository, AuditRecDRepository>();
            services.AddScoped<IAuditRecMRepository, AuditRecMRepository>();
            services.AddScoped<IMesMoRepository, MesMoRepository>();
            services.AddScoped<IAuditRateDRepository, AuditRateDRepository>();
            services.AddScoped<IAuditRateMRepository, AuditRateMRepository>();
            services.AddScoped<IVWMEAuditEOLRPPHRepository, VWMEAuditEOLRPPHRepository>();

            //Services
            services.AddScoped<IAuthService, AuthService>();
            services.AddScoped<IBrandService, BrandService>();
            services.AddScoped<IAuditTypeService, AuditTypeService>();
            services.AddScoped<IAuditTypeDService, AuditTypeDService>();
            services.AddScoped<IMesUserService, MesUserService>();
            services.AddScoped<IAuditPicMService, AuditPicMService>();
            services.AddScoped<IAuditPicDService, AuditPicDService>();
            services.AddScoped<IMesUserService, MesUserService>();
            services.AddScoped<IMesAuditOrgService, MesAuditOrgService>();
            services.AddScoped<IMesOrgService, MesOrgService>();
            services.AddScoped<IAuditRecDService, AuditRecDService>();
            services.AddScoped<IAuditRecMService, AuditRecMService>();
            services.AddScoped<IMesMoService, MesMoService>();
            services.AddScoped<IAuditRateDService, AuditRateDService>();
            services.AddScoped<IAuditRateMService, AuditRateMService>();
            services.AddScoped<IAuditRateService, AuditRateService>();
            services.AddScoped<ISMERecordService, SMERecordService>();
            services.AddScoped<ISixsRecordService, SixsRecordService>();
            services.AddScoped<ISixsReportService, SixsReportService>();
            services.AddScoped<IVWMESAuditEOLRPPHService, VWMESAuditEOLRPPHService>();
            services.AddScoped<IChartByMonthlyService, ChartByMonthlyService>();
            services.AddScoped<IWaterSpiderRecordService, WaterSpiderRecordService>();
            services.AddScoped<IWaterSpiderReportService, WaterSpiderReportService>();
            services.AddScoped<IWTTrackingReportService, WTTrackingReportService>();

            // Swagger
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "QMS API", Version = "v1" });
                c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    In = ParameterLocation.Header,
                    Description = "Please insert JWT with Bearer into field",
                    Name = "Authorization",
                    Type = SecuritySchemeType.ApiKey
                });
                c.AddSecurityRequirement(new OpenApiSecurityRequirement {
                    {
                        new OpenApiSecurityScheme
                        {
                        Reference = new OpenApiReference
                        {
                            Type = ReferenceType.SecurityScheme,
                            Id = "Bearer"
                        }
                        },
                        new string[] { }
                        }
                    });
            });

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());
            app.UseHttpsRedirection();
            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();
            app.UseStaticFiles();


            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "QMS API V1");
            });
        }
    }
}
