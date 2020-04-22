using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace ASPOSystem.DBModels
{
    public partial class RSSForVKRContext : DbContext
    {
        public RSSForVKRContext()
        {
        }

        public RSSForVKRContext(DbContextOptions<RSSForVKRContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Brands> Brands { get; set; }
        public virtual DbSet<Devices> Devices { get; set; }
        public virtual DbSet<Interfaces> Interfaces { get; set; }
        public virtual DbSet<Measure> Measure { get; set; }
        public virtual DbSet<Posts> Posts { get; set; }
        public virtual DbSet<Programmcommands> Programmcommands { get; set; }
        public virtual DbSet<Project> Project { get; set; }
        public virtual DbSet<ProjectCommand> ProjectCommand { get; set; }
        public virtual DbSet<ProjectDevice> ProjectDevice { get; set; }
        public virtual DbSet<ProjectInterface> ProjectInterface { get; set; }
        public virtual DbSet<ProjectMeasure> ProjectMeasure { get; set; }
        public virtual DbSet<ProjectTelemetry> ProjectTelemetry { get; set; }
        public virtual DbSet<Roles> Roles { get; set; }
        public virtual DbSet<Telemetry> Telemetry { get; set; }
        public virtual DbSet<Typedev> Typedev { get; set; }
        public virtual DbSet<Typeinter> Typeinter { get; set; }
        public virtual DbSet<Typemeasure> Typemeasure { get; set; }
        public virtual DbSet<Users> Users { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Server=DESKTOP-DRQFEK8\\SQLEXPRESS;Initial Catalog=RSSForVKR;Persist Security Info=False;User ID=RSSadmin;Password=#Qteltn3;MultipleActiveResultSets=False;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Brands>(entity =>
            {
                entity.ToTable("BRANDS");

                entity.HasIndex(e => e.NameBrand)
                    .HasName("UQ__BRANDS__0ADC6A609412DE95")
                    .IsUnique();

                entity.Property(e => e.Id)
                    .HasColumnName("ID")
                    .HasDefaultValueSql("(newsequentialid())");

                entity.Property(e => e.NameBrand)
                    .HasColumnName("Name_brand")
                    .HasMaxLength(40)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Devices>(entity =>
            {
                entity.ToTable("DEVICES");

                entity.Property(e => e.Id)
                    .HasColumnName("ID")
                    .HasDefaultValueSql("(newsequentialid())");

                entity.Property(e => e.ActualIp)
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.Caption)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.IpInput)
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.Model)
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.Port)
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.PositionNumber)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.Status)
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.HasOne(d => d.BrandNavigation)
                    .WithMany(p => p.Devices)
                    .HasForeignKey(d => d.Brand)
                    .HasConstraintName("FK__DEVICES__Brand__21B6055D");

                entity.HasOne(d => d.TypeNavigation)
                    .WithMany(p => p.Devices)
                    .HasForeignKey(d => d.Type)
                    .HasConstraintName("FK__DEVICES__Type__20C1E124");
            });

            modelBuilder.Entity<Interfaces>(entity =>
            {
                entity.ToTable("INTERFACES");

                entity.Property(e => e.Id)
                    .HasColumnName("ID")
                    .HasDefaultValueSql("(newsequentialid())");

                entity.Property(e => e.ActualIp)
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.IpInput)
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.IsReadyStatus)
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.IsUsed)
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.Name)
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.SelectedPort)
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.HasOne(d => d.TypeNavigation)
                    .WithMany(p => p.Interfaces)
                    .HasForeignKey(d => d.Type)
                    .HasConstraintName("FK__INTERFACES__Type__1CF15040");
            });

            modelBuilder.Entity<Measure>(entity =>
            {
                entity.ToTable("MEASURE");

                entity.Property(e => e.Id)
                    .HasColumnName("ID")
                    .HasDefaultValueSql("(newsequentialid())");

                entity.Property(e => e.Caption)
                    .HasMaxLength(40)
                    .IsUnicode(false);

                entity.Property(e => e.Factor)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.Grouup)
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.IdMeasure)
                    .HasColumnName("id_measure")
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.IsCheck)
                    .HasColumnName("isCheck")
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.IsParent)
                    .HasColumnName("isParent")
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.Name)
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.ParentId)
                    .HasColumnName("parentId")
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.Status)
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.HasOne(d => d.TypeNavigation)
                    .WithMany(p => p.Measure)
                    .HasForeignKey(d => d.Type)
                    .HasConstraintName("FK__MEASURE__Type__29572725");
            });

            modelBuilder.Entity<Posts>(entity =>
            {
                entity.ToTable("POSTS");

                entity.HasIndex(e => e.NamePost)
                    .HasName("UQ__POSTS__7DAD8A7CCA47525C")
                    .IsUnique();

                entity.Property(e => e.Id)
                    .HasColumnName("ID")
                    .HasDefaultValueSql("(newsequentialid())");

                entity.Property(e => e.NamePost)
                    .HasColumnName("Name_post")
                    .HasMaxLength(30)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Programmcommands>(entity =>
            {
                entity.ToTable("PROGRAMMCOMMANDS");

                entity.Property(e => e.Id)
                    .HasColumnName("ID")
                    .HasDefaultValueSql("(newsequentialid())");

                entity.Property(e => e.Code)
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.Device)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.LongName)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Name)
                    .HasMaxLength(30)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Project>(entity =>
            {
                entity.ToTable("PROJECT");

                entity.Property(e => e.Id)
                    .HasColumnName("ID")
                    .HasDefaultValueSql("(newsequentialid())");

                entity.Property(e => e.DateCreateProject)
                    .HasColumnName("DateCreate_project")
                    .HasColumnType("datetime");

                entity.Property(e => e.DescriptionProject)
                    .HasColumnName("Description_project")
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.DirectorProject).HasColumnName("Director_project");

                entity.Property(e => e.NameProject)
                    .HasColumnName("Name_project")
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.HasOne(d => d.DirectorProjectNavigation)
                    .WithMany(p => p.Project)
                    .HasForeignKey(d => d.DirectorProject)
                    .HasConstraintName("FK__PROJECT__Directo__403A8C7D");
            });

            modelBuilder.Entity<ProjectCommand>(entity =>
            {
                entity.ToTable("PROJECT_COMMAND");

                entity.Property(e => e.Id)
                    .HasColumnName("ID")
                    .HasDefaultValueSql("(newsequentialid())");

                entity.Property(e => e.IdCommand).HasColumnName("ID_Command");

                entity.Property(e => e.IdProject).HasColumnName("ID_project");

                entity.HasOne(d => d.IdCommandNavigation)
                    .WithMany(p => p.ProjectCommand)
                    .HasForeignKey(d => d.IdCommand)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK__PROJECT_C__ID_Co__49C3F6B7");

                entity.HasOne(d => d.IdProjectNavigation)
                    .WithMany(p => p.ProjectCommand)
                    .HasForeignKey(d => d.IdProject)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK__PROJECT_C__ID_pr__48CFD27E");
            });

            modelBuilder.Entity<ProjectDevice>(entity =>
            {
                entity.ToTable("PROJECT_DEVICE");

                entity.Property(e => e.Id)
                    .HasColumnName("ID")
                    .HasDefaultValueSql("(newsequentialid())");

                entity.Property(e => e.IdDevice).HasColumnName("ID_device");

                entity.Property(e => e.IdProject).HasColumnName("ID_project");

                entity.HasOne(d => d.IdDeviceNavigation)
                    .WithMany(p => p.ProjectDevice)
                    .HasForeignKey(d => d.IdDevice)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK__PROJECT_D__ID_de__534D60F1");

                entity.HasOne(d => d.IdProjectNavigation)
                    .WithMany(p => p.ProjectDevice)
                    .HasForeignKey(d => d.IdProject)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK__PROJECT_D__ID_pr__52593CB8");
            });

            modelBuilder.Entity<ProjectInterface>(entity =>
            {
                entity.ToTable("PROJECT_INTERFACE");

                entity.Property(e => e.Id)
                    .HasColumnName("ID")
                    .HasDefaultValueSql("(newsequentialid())");

                entity.Property(e => e.IdInterface).HasColumnName("ID_interface");

                entity.Property(e => e.IdProject).HasColumnName("ID_project");

                entity.HasOne(d => d.IdInterfaceNavigation)
                    .WithMany(p => p.ProjectInterface)
                    .HasForeignKey(d => d.IdInterface)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK__PROJECT_I__ID_in__5812160E");

                entity.HasOne(d => d.IdProjectNavigation)
                    .WithMany(p => p.ProjectInterface)
                    .HasForeignKey(d => d.IdProject)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK__PROJECT_I__ID_pr__571DF1D5");
            });

            modelBuilder.Entity<ProjectMeasure>(entity =>
            {
                entity.ToTable("PROJECT_MEASURE");

                entity.Property(e => e.Id)
                    .HasColumnName("ID")
                    .HasDefaultValueSql("(newsequentialid())");

                entity.Property(e => e.IdMeasure).HasColumnName("ID_measure");

                entity.Property(e => e.IdProject).HasColumnName("ID_project");

                entity.HasOne(d => d.IdMeasureNavigation)
                    .WithMany(p => p.ProjectMeasure)
                    .HasForeignKey(d => d.IdMeasure)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK__PROJECT_M__ID_me__44FF419A");

                entity.HasOne(d => d.IdProjectNavigation)
                    .WithMany(p => p.ProjectMeasure)
                    .HasForeignKey(d => d.IdProject)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK__PROJECT_M__ID_pr__440B1D61");
            });

            modelBuilder.Entity<ProjectTelemetry>(entity =>
            {
                entity.ToTable("PROJECT_TELEMETRY");

                entity.Property(e => e.Id)
                    .HasColumnName("ID")
                    .HasDefaultValueSql("(newsequentialid())");

                entity.Property(e => e.IdProject).HasColumnName("ID_project");

                entity.Property(e => e.IdTelemetry).HasColumnName("ID_telemetry");

                entity.HasOne(d => d.IdProjectNavigation)
                    .WithMany(p => p.ProjectTelemetry)
                    .HasForeignKey(d => d.IdProject)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK__PROJECT_T__ID_pr__4D94879B");

                entity.HasOne(d => d.IdTelemetryNavigation)
                    .WithMany(p => p.ProjectTelemetry)
                    .HasForeignKey(d => d.IdTelemetry)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK__PROJECT_T__ID_te__4E88ABD4");
            });

            modelBuilder.Entity<Roles>(entity =>
            {
                entity.ToTable("ROLES");

                entity.HasIndex(e => e.NameRole)
                    .HasName("UQ__ROLES__28A576BDDA971529")
                    .IsUnique();

                entity.Property(e => e.Id)
                    .HasColumnName("ID")
                    .HasDefaultValueSql("(newsequentialid())");

                entity.Property(e => e.NameRole)
                    .HasColumnName("Name_role")
                    .HasMaxLength(30)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Telemetry>(entity =>
            {
                entity.ToTable("TELEMETRY");

                entity.Property(e => e.Id)
                    .HasColumnName("ID")
                    .HasDefaultValueSql("(newsequentialid())");

                entity.Property(e => e.HasItems)
                    .HasColumnName("hasItems")
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.LongName)
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.ParentId)
                    .HasColumnName("parentId")
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.PossibleValues)
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.ShortName)
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.Value)
                    .HasMaxLength(20)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Typedev>(entity =>
            {
                entity.ToTable("TYPEDEV");

                entity.HasIndex(e => e.NameTypedev)
                    .HasName("UQ__TYPEDEV__417AA4F358B31768")
                    .IsUnique();

                entity.Property(e => e.Id)
                    .HasColumnName("ID")
                    .HasDefaultValueSql("(newsequentialid())");

                entity.Property(e => e.NameTypedev)
                    .HasColumnName("Name_typedev")
                    .HasMaxLength(30)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Typeinter>(entity =>
            {
                entity.ToTable("TYPEINTER");

                entity.HasIndex(e => e.NameTypeinter)
                    .HasName("UQ__TYPEINTE__BFCBA7761B4EE0F7")
                    .IsUnique();

                entity.Property(e => e.Id)
                    .HasColumnName("ID")
                    .HasDefaultValueSql("(newsequentialid())");

                entity.Property(e => e.NameTypeinter)
                    .HasColumnName("Name_typeinter")
                    .HasMaxLength(30)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Typemeasure>(entity =>
            {
                entity.ToTable("TYPEMEASURE");

                entity.HasIndex(e => e.NameTypemeasure)
                    .HasName("UQ__TYPEMEAS__9AE04A48A24BE85B")
                    .IsUnique();

                entity.Property(e => e.Id)
                    .HasColumnName("ID")
                    .HasDefaultValueSql("(newsequentialid())");

                entity.Property(e => e.NameTypemeasure)
                    .HasColumnName("Name_typemeasure")
                    .HasMaxLength(30)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Users>(entity =>
            {
                entity.ToTable("USERS");

                entity.HasIndex(e => e.LoginUser)
                    .HasName("UQ__USERS__81FA3DEDCC63796D")
                    .IsUnique();

                entity.Property(e => e.Id)
                    .HasColumnName("ID")
                    .HasDefaultValueSql("(newsequentialid())");

                entity.Property(e => e.LastnameUser)
                    .HasColumnName("Lastname_user")
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.LoginUser)
                    .HasColumnName("Login_user")
                    .HasMaxLength(40)
                    .IsUnicode(false);

                entity.Property(e => e.MiddlenameUser)
                    .HasColumnName("Middlename_user")
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.NameUser)
                    .HasColumnName("Name_user")
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.PasswordUser)
                    .HasColumnName("Password_user")
                    .HasColumnType("text");

                entity.Property(e => e.PostUser).HasColumnName("Post_user");

                entity.Property(e => e.RoleUser).HasColumnName("Role_user");

                entity.HasOne(d => d.PostUserNavigation)
                    .WithMany(p => p.Users)
                    .HasForeignKey(d => d.PostUser)
                    .HasConstraintName("FK__USERS__Post_user__3B75D760");

                entity.HasOne(d => d.RoleUserNavigation)
                    .WithMany(p => p.Users)
                    .HasForeignKey(d => d.RoleUser)
                    .HasConstraintName("FK__USERS__Role_user__3C69FB99");
            });
        }
    }
}
