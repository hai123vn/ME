using ME_API.Models;
using Microsoft.EntityFrameworkCore;

namespace ME_API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }
        public DbSet<MES_Audit_Brand> MES_Audit_Brand { get; set; }
        public DbSet<MES_Audit_Type_D> MES_Audit_Type_D { get; set; }
        public DbSet<MES_Audit_Type_M> MES_Audit_Type_M { get; set; }
        public DbSet<MES_User> MES_User { get; set; }
        public DbSet<MES_Audit_Roles> MES_Audit_Roles { get; set; }
        public DbSet<MES_Audit_RoleUser> MES_Audit_RoleUser { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<MES_Audit_Type_D>().HasKey(x => new { x.Audit_Type_ID, x.Audit_Item_ID });
            modelBuilder.Entity<MES_Audit_Roles>().HasKey(x => new { x.role_unique });
            modelBuilder.Entity<MES_Audit_RoleUser>().HasKey(x => new { x.role_unique, x.user_account });
            modelBuilder.Entity<MES_User>().HasKey(x => new { x.Factory_ID, x.User_ID });
        }
    }
}