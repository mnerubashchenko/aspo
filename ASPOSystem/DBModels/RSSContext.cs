using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace ASPOSystem.DBModels
{
    public partial class RSSContext : DbContext
    {
        public RSSContext()
        {
        }

        public RSSContext(DbContextOptions<RSSContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Brands> Brands { get; set; }
        public virtual DbSet<Category> Category { get; set; }
        public virtual DbSet<Comments> Comments { get; set; }
        public virtual DbSet<Devices> Devices { get; set; }
        public virtual DbSet<DevicesMeasure> DevicesMeasure { get; set; }
        public virtual DbSet<Interfaces> Interfaces { get; set; }
        public virtual DbSet<Measure> Measure { get; set; }
        public virtual DbSet<MeasureProtocol> MeasureProtocol { get; set; }
        public virtual DbSet<Posts> Posts { get; set; }
        public virtual DbSet<PrcommandsProtocol> PrcommandsProtocol { get; set; }
        public virtual DbSet<Programmcommands> Programmcommands { get; set; }
        public virtual DbSet<Project> Project { get; set; }
        public virtual DbSet<ProjectProtocol> ProjectProtocol { get; set; }
        public virtual DbSet<Protocol> Protocol { get; set; }
        public virtual DbSet<Roles> Roles { get; set; }
        public virtual DbSet<Telemetry> Telemetry { get; set; }
        public virtual DbSet<TelemetryProtocol> TelemetryProtocol { get; set; }
        public virtual DbSet<Typedev> Typedev { get; set; }
        public virtual DbSet<Typeinter> Typeinter { get; set; }
        public virtual DbSet<Typemeasure> Typemeasure { get; set; }
        public virtual DbSet<Users> Users { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Server=DESKTOP-8E0AOJU\\SQLEXPRESS;Initial Catalog=RSS;Persist Security Info=False;User ID=RSSadmin;Password=#Qteltn3;MultipleActiveResultSets=False;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Brands>(entity =>
            {
                entity.HasKey(e => e.IdBrand);

                entity.ToTable("BRANDS");

                entity.HasIndex(e => e.NameBrand)
                    .HasName("UQ__BRANDS__0ADC6A6010CCCD31")
                    .IsUnique();

                entity.Property(e => e.IdBrand)
                    .HasColumnName("ID_brand")
                    .HasDefaultValueSql("(newsequentialid())");

                entity.Property(e => e.NameBrand)
                    .HasColumnName("Name_brand")
                    .HasMaxLength(40)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Category>(entity =>
            {
                entity.HasKey(e => e.IdCategory);

                entity.ToTable("CATEGORY");

                entity.HasIndex(e => e.NameCategory)
                    .HasName("UQ__CATEGORY__C955470C89FA830A")
                    .IsUnique();

                entity.Property(e => e.IdCategory)
                    .HasColumnName("ID_category")
                    .HasDefaultValueSql("(newsequentialid())");

                entity.Property(e => e.NameCategory)
                    .HasColumnName("Name_category")
                    .HasMaxLength(30)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Comments>(entity =>
            {
                entity.HasKey(e => e.IdComment);

                entity.ToTable("COMMENTS");

                entity.Property(e => e.IdComment)
                    .HasColumnName("ID_comment")
                    .HasDefaultValueSql("(newsequentialid())");

                entity.Property(e => e.AuthorComment).HasColumnName("Author_comment");

                entity.Property(e => e.DateTimeComment)
                    .HasColumnName("DateTime_comment")
                    .HasColumnType("datetime");

                entity.Property(e => e.ProtocolComment).HasColumnName("Protocol_comment");

                entity.Property(e => e.TextComment)
                    .HasColumnName("Text_comment")
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.HasOne(d => d.AuthorCommentNavigation)
                    .WithMany(p => p.Comments)
                    .HasForeignKey(d => d.AuthorComment)
                    .HasConstraintName("FK__COMMENTS__Author__0C85DE4D");

                entity.HasOne(d => d.ProtocolCommentNavigation)
                    .WithMany(p => p.Comments)
                    .HasForeignKey(d => d.ProtocolComment)
                    .HasConstraintName("FK__COMMENTS__Protoc__0B91BA14");
            });

            modelBuilder.Entity<Devices>(entity =>
            {
                entity.HasKey(e => e.IdDevice);

                entity.ToTable("DEVICES");

                entity.Property(e => e.IdDevice)
                    .HasColumnName("ID_device")
                    .HasDefaultValueSql("(newsequentialid())");

                entity.Property(e => e.ActualIpDevice)
                    .HasColumnName("ActualIp_device")
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.BrandDevice).HasColumnName("Brand_device");

                entity.Property(e => e.CaptionDevice)
                    .HasColumnName("Caption_device")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.InterfaceDevice).HasColumnName("Interface_device");

                entity.Property(e => e.IpInputDevice)
                    .HasColumnName("IpInput_device")
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.ModelDevice)
                    .HasColumnName("Model_device")
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.PortDevice)
                    .HasColumnName("Port_device")
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.StatusDevice)
                    .HasColumnName("Status_device")
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.TypeDevice).HasColumnName("Type_device");

                entity.HasOne(d => d.BrandDeviceNavigation)
                    .WithMany(p => p.Devices)
                    .HasForeignKey(d => d.BrandDevice)
                    .HasConstraintName("FK__DEVICES__Brand_d__5AEE82B9");

                entity.HasOne(d => d.InterfaceDeviceNavigation)
                    .WithMany(p => p.Devices)
                    .HasForeignKey(d => d.InterfaceDevice)
                    .HasConstraintName("FK__DEVICES__Interfa__59FA5E80");

                entity.HasOne(d => d.TypeDeviceNavigation)
                    .WithMany(p => p.Devices)
                    .HasForeignKey(d => d.TypeDevice)
                    .HasConstraintName("FK__DEVICES__Type_de__5BE2A6F2");
            });

            modelBuilder.Entity<DevicesMeasure>(entity =>
            {
                entity.HasKey(e => e.IdDevmeas);

                entity.ToTable("DEVICES_MEASURE");

                entity.Property(e => e.IdDevmeas)
                    .HasColumnName("ID_devmeas")
                    .HasDefaultValueSql("(newsequentialid())");

                entity.Property(e => e.DeviceLink).HasColumnName("Device_link");

                entity.Property(e => e.MeasureLink).HasColumnName("Measure_link");

                entity.HasOne(d => d.DeviceLinkNavigation)
                    .WithMany(p => p.DevicesMeasure)
                    .HasForeignKey(d => d.DeviceLink)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK__DEVICES_M__Devic__68487DD7");

                entity.HasOne(d => d.MeasureLinkNavigation)
                    .WithMany(p => p.DevicesMeasure)
                    .HasForeignKey(d => d.MeasureLink)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK__DEVICES_M__Measu__693CA210");
            });

            modelBuilder.Entity<Interfaces>(entity =>
            {
                entity.HasKey(e => e.IdInterface);

                entity.ToTable("INTERFACES");

                entity.Property(e => e.IdInterface)
                    .HasColumnName("ID_interface")
                    .HasDefaultValueSql("(newsequentialid())");

                entity.Property(e => e.ActualIpInterface)
                    .HasColumnName("ActualIp_interface")
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.IpInputInterface)
                    .HasColumnName("IpInput_interface")
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.IsReadyStatusInterface)
                    .HasColumnName("IsReadyStatus_interface")
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.IsUsedInterface)
                    .HasColumnName("IsUsed_interface")
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.NameInterface)
                    .HasColumnName("Name_interface")
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.SelectedPortInterface)
                    .HasColumnName("SelectedPort_interface")
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.TypeInterface).HasColumnName("Type_interface");

                entity.HasOne(d => d.TypeInterfaceNavigation)
                    .WithMany(p => p.Interfaces)
                    .HasForeignKey(d => d.TypeInterface)
                    .HasConstraintName("FK__INTERFACE__Type___5629CD9C");
            });

            modelBuilder.Entity<Measure>(entity =>
            {
                entity.HasKey(e => e.IdMeasure);

                entity.ToTable("MEASURE");

                entity.Property(e => e.IdMeasure)
                    .HasColumnName("ID_measure")
                    .HasDefaultValueSql("(newsequentialid())");

                entity.Property(e => e.DateCreateMeasure)
                    .HasColumnName("DateCreate_measure")
                    .HasColumnType("datetime");

                entity.Property(e => e.GroupMeasure)
                    .HasColumnName("Group_measure")
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.InterfaceMeasure).HasColumnName("Interface_measure");

                entity.Property(e => e.IsCheckMeasure)
                    .HasColumnName("isCheck_measure")
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.ManualMeasure)
                    .HasColumnName("Manual_measure")
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.NameMeasure)
                    .HasColumnName("Name_measure")
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.StatusMeasure)
                    .HasColumnName("Status_measure")
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.TypeMeasure).HasColumnName("Type_measure");

                entity.HasOne(d => d.InterfaceMeasureNavigation)
                    .WithMany(p => p.Measure)
                    .HasForeignKey(d => d.InterfaceMeasure)
                    .HasConstraintName("FK__MEASURE__Interfa__6477ECF3");

                entity.HasOne(d => d.TypeMeasureNavigation)
                    .WithMany(p => p.Measure)
                    .HasForeignKey(d => d.TypeMeasure)
                    .HasConstraintName("FK__MEASURE__Type_me__6383C8BA");
            });

            modelBuilder.Entity<MeasureProtocol>(entity =>
            {
                entity.HasKey(e => e.IdMeasprot);

                entity.ToTable("MEASURE_PROTOCOL");

                entity.Property(e => e.IdMeasprot)
                    .HasColumnName("ID_measprot")
                    .HasDefaultValueSql("(newsequentialid())");

                entity.Property(e => e.MeasureLink).HasColumnName("Measure_link");

                entity.Property(e => e.ProtocolMeasureLink).HasColumnName("Protocol_measure_link");

                entity.HasOne(d => d.MeasureLinkNavigation)
                    .WithMany(p => p.MeasureProtocol)
                    .HasForeignKey(d => d.MeasureLink)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK__MEASURE_P__Measu__1EA48E88");

                entity.HasOne(d => d.ProtocolMeasureLinkNavigation)
                    .WithMany(p => p.MeasureProtocol)
                    .HasForeignKey(d => d.ProtocolMeasureLink)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK__MEASURE_P__Proto__1F98B2C1");
            });

            modelBuilder.Entity<Posts>(entity =>
            {
                entity.HasKey(e => e.IdPost);

                entity.ToTable("POSTS");

                entity.HasIndex(e => e.NamePost)
                    .HasName("UQ__POSTS__7DAD8A7C1FE32DAB")
                    .IsUnique();

                entity.Property(e => e.IdPost)
                    .HasColumnName("ID_post")
                    .HasDefaultValueSql("(newsequentialid())");

                entity.Property(e => e.NamePost)
                    .HasColumnName("Name_post")
                    .HasMaxLength(30)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<PrcommandsProtocol>(entity =>
            {
                entity.HasKey(e => e.IdPrcprot);

                entity.ToTable("PRCOMMANDS_PROTOCOL");

                entity.Property(e => e.IdPrcprot)
                    .HasColumnName("ID_prcprot")
                    .HasDefaultValueSql("(newsequentialid())");

                entity.Property(e => e.CommandLink).HasColumnName("Command_link");

                entity.Property(e => e.ProtocolCommandLink).HasColumnName("Protocol_command_link");

                entity.HasOne(d => d.CommandLinkNavigation)
                    .WithMany(p => p.PrcommandsProtocol)
                    .HasForeignKey(d => d.CommandLink)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK__PRCOMMAND__Comma__151B244E");

                entity.HasOne(d => d.ProtocolCommandLinkNavigation)
                    .WithMany(p => p.PrcommandsProtocol)
                    .HasForeignKey(d => d.ProtocolCommandLink)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK__PRCOMMAND__Proto__160F4887");
            });

            modelBuilder.Entity<Programmcommands>(entity =>
            {
                entity.HasKey(e => e.IdCommand);

                entity.ToTable("PROGRAMMCOMMANDS");

                entity.Property(e => e.IdCommand)
                    .HasColumnName("ID_command")
                    .HasDefaultValueSql("(newsequentialid())");

                entity.Property(e => e.CodeCommand)
                    .HasColumnName("Code_command")
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.DescriptionCommand)
                    .HasColumnName("Description_command")
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.NameCommand)
                    .HasColumnName("Name_command")
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.PurposeCommand)
                    .HasColumnName("Purpose_command")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.TelemetryCommand)
                    .HasColumnName("Telemetry_command")
                    .HasMaxLength(30)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Project>(entity =>
            {
                entity.HasKey(e => e.IdProject);

                entity.ToTable("PROJECT");

                entity.Property(e => e.IdProject)
                    .HasColumnName("ID_project")
                    .HasDefaultValueSql("(newsequentialid())");

                entity.Property(e => e.CategoryProject).HasColumnName("Category_project");

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

                entity.HasOne(d => d.CategoryProjectNavigation)
                    .WithMany(p => p.Project)
                    .HasForeignKey(d => d.CategoryProject)
                    .HasConstraintName("FK__PROJECT__Categor__04E4BC85");

                entity.HasOne(d => d.DirectorProjectNavigation)
                    .WithMany(p => p.Project)
                    .HasForeignKey(d => d.DirectorProject)
                    .HasConstraintName("FK__PROJECT__Directo__03F0984C");
            });

            modelBuilder.Entity<ProjectProtocol>(entity =>
            {
                entity.HasKey(e => e.IdProjprot);

                entity.ToTable("PROJECT_PROTOCOL");

                entity.Property(e => e.IdProjprot)
                    .HasColumnName("ID_projprot")
                    .HasDefaultValueSql("(newsequentialid())");

                entity.Property(e => e.ProjectLink).HasColumnName("Project_link");

                entity.Property(e => e.ProtocolProjectLink).HasColumnName("Protocol_project_link");

                entity.HasOne(d => d.ProjectLinkNavigation)
                    .WithMany(p => p.ProjectProtocol)
                    .HasForeignKey(d => d.ProjectLink)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK__PROJECT_P__Proje__10566F31");

                entity.HasOne(d => d.ProtocolProjectLinkNavigation)
                    .WithMany(p => p.ProjectProtocol)
                    .HasForeignKey(d => d.ProtocolProjectLink)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK__PROJECT_P__Proto__114A936A");
            });

            modelBuilder.Entity<Protocol>(entity =>
            {
                entity.HasKey(e => e.IdProtocol);

                entity.ToTable("PROTOCOL");

                entity.Property(e => e.IdProtocol)
                    .HasColumnName("ID_protocol")
                    .HasDefaultValueSql("(newsequentialid())");

                entity.Property(e => e.DateCreateProtocol)
                    .HasColumnName("DateCreate_protocol")
                    .HasColumnType("datetime");

                entity.Property(e => e.NameProtocol)
                    .HasColumnName("Name_protocol")
                    .HasMaxLength(30)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Roles>(entity =>
            {
                entity.HasKey(e => e.IdRole);

                entity.ToTable("ROLES");

                entity.HasIndex(e => e.NameRole)
                    .HasName("UQ__ROLES__28A576BD136E77D2")
                    .IsUnique();

                entity.Property(e => e.IdRole)
                    .HasColumnName("ID_role")
                    .HasDefaultValueSql("(newsequentialid())");

                entity.Property(e => e.NameRole)
                    .HasColumnName("Name_role")
                    .HasMaxLength(30)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Telemetry>(entity =>
            {
                entity.HasKey(e => e.IdTelemetry);

                entity.ToTable("TELEMETRY");

                entity.Property(e => e.IdTelemetry)
                    .HasColumnName("ID_telemetry")
                    .HasDefaultValueSql("(newsequentialid())");

                entity.Property(e => e.ByteNumberTelemetry).HasColumnName("ByteNumber_telemetry");

                entity.Property(e => e.LenghtTelemetry).HasColumnName("Lenght_telemetry");

                entity.Property(e => e.LongNameTelemetry)
                    .HasColumnName("LongName_telemetry")
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.PossibleValuesTelemetry)
                    .HasColumnName("PossibleValues_telemetry")
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.ShortNameTelemetry)
                    .HasColumnName("ShortName_telemetry")
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.StartBitTelemetry).HasColumnName("StartBit_telemetry");
            });

            modelBuilder.Entity<TelemetryProtocol>(entity =>
            {
                entity.HasKey(e => e.IdTelprot);

                entity.ToTable("TELEMETRY_PROTOCOL");

                entity.Property(e => e.IdTelprot)
                    .HasColumnName("ID_telprot")
                    .HasDefaultValueSql("(newsequentialid())");

                entity.Property(e => e.ProtocolTelemetryLink).HasColumnName("Protocol_telemetry_link");

                entity.Property(e => e.TelemetryLink).HasColumnName("Telemetry_link");

                entity.HasOne(d => d.ProtocolTelemetryLinkNavigation)
                    .WithMany(p => p.TelemetryProtocol)
                    .HasForeignKey(d => d.ProtocolTelemetryLink)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK__TELEMETRY__Proto__1AD3FDA4");

                entity.HasOne(d => d.TelemetryLinkNavigation)
                    .WithMany(p => p.TelemetryProtocol)
                    .HasForeignKey(d => d.TelemetryLink)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK__TELEMETRY__Telem__19DFD96B");
            });

            modelBuilder.Entity<Typedev>(entity =>
            {
                entity.HasKey(e => e.IdTypedev);

                entity.ToTable("TYPEDEV");

                entity.HasIndex(e => e.NameTypedev)
                    .HasName("UQ__TYPEDEV__417AA4F395CF1910")
                    .IsUnique();

                entity.Property(e => e.IdTypedev)
                    .HasColumnName("ID_typedev")
                    .HasDefaultValueSql("(newsequentialid())");

                entity.Property(e => e.NameTypedev)
                    .HasColumnName("Name_typedev")
                    .HasMaxLength(30)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Typeinter>(entity =>
            {
                entity.HasKey(e => e.IdTypeinter);

                entity.ToTable("TYPEINTER");

                entity.HasIndex(e => e.NameTypeinter)
                    .HasName("UQ__TYPEINTE__BFCBA776585B17CC")
                    .IsUnique();

                entity.Property(e => e.IdTypeinter)
                    .HasColumnName("ID_typeinter")
                    .HasDefaultValueSql("(newsequentialid())");

                entity.Property(e => e.NameTypeinter)
                    .HasColumnName("Name_typeinter")
                    .HasMaxLength(30)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Typemeasure>(entity =>
            {
                entity.HasKey(e => e.IdTypemeasure);

                entity.ToTable("TYPEMEASURE");

                entity.HasIndex(e => e.NameTypemeasure)
                    .HasName("UQ__TYPEMEAS__9AE04A4836F7D046")
                    .IsUnique();

                entity.Property(e => e.IdTypemeasure)
                    .HasColumnName("ID_typemeasure")
                    .HasDefaultValueSql("(newsequentialid())");

                entity.Property(e => e.NameTypemeasure)
                    .HasColumnName("Name_typemeasure")
                    .HasMaxLength(30)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Users>(entity =>
            {
                entity.HasKey(e => e.IdUser);

                entity.ToTable("USERS");

                entity.HasIndex(e => e.LoginUser)
                    .HasName("UQ__USERS__81FA3DEDC8DCE653")
                    .IsUnique();

                entity.Property(e => e.IdUser)
                    .HasColumnName("ID_user")
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
                    .HasMaxLength(40)
                    .IsUnicode(false);

                entity.Property(e => e.PostUser).HasColumnName("Post_user");

                entity.Property(e => e.RoleUser).HasColumnName("Role_user");

                entity.HasOne(d => d.PostUserNavigation)
                    .WithMany(p => p.Users)
                    .HasForeignKey(d => d.PostUser)
                    .HasConstraintName("FK__USERS__Post_user__7F2BE32F");

                entity.HasOne(d => d.RoleUserNavigation)
                    .WithMany(p => p.Users)
                    .HasForeignKey(d => d.RoleUser)
                    .HasConstraintName("FK__USERS__Role_user__00200768");
            });
        }
    }
}
