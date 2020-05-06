/* Класс "Модель таблицы протоколов".
 * Название: Project.
 * Язык: C#.
 * Краткое описание:
 *      Данный класс описывает таблицу протоколов.
 * Свойства, описанные в классе:
 *      Id - поле Id таблицы протоколов;
 *      NameProject - поле NameProject таблицы протоколов;
 *      DirectorProject - поле DirectorProject таблицы протоколов;
 *      DescriptionProject - поле DescriptionProject таблицы протоколов;
 *      DateCreateProject - поле DateCreateProject таблицы протоколов;
 *      DirectorProjectNavigation - связь протокола и его создателя;
 *      Comments - связь конкретного протокола и комментариев к нему;
 *      ProjectCommand - связь конкретного протокола и программных команд, которые использует данный протокол;
 *      ProjectDevice - связь конкретного протокола и устройств, которые использует данный протокол;
 *      ProjectInterface - связь конкретного протокола и интерфейсов, которые использует данный протокол;
 *      ProjectMeasure - связь конкретного протокола и измерений, которые использует данный протокол;
 *      ProjectTelemetry - связь конкретного протокола и телеметрий, которые использует данный протокол.
 */

using System;
using System.Collections.Generic;

namespace ASPOSystem.DBModels
{
    public partial class Project
    {
        /* Конструктор класса Project. */
        public Project()
        {
            Comments = new HashSet<Comments>();
            ProjectCommand = new HashSet<ProjectCommand>();
            ProjectDevice = new HashSet<ProjectDevice>();
            ProjectInterface = new HashSet<ProjectInterface>();
            ProjectMeasure = new HashSet<ProjectMeasure>();
            ProjectTelemetry = new HashSet<ProjectTelemetry>();
        }

        public Guid Id { get; set; }
        public string NameProject { get; set; }
        public Guid? DirectorProject { get; set; }
        public string DescriptionProject { get; set; }
        public DateTime? DateCreateProject { get; set; }

        public Users DirectorProjectNavigation { get; set; }
        public ICollection<Comments> Comments { get; set; }
        public ICollection<ProjectCommand> ProjectCommand { get; set; }
        public ICollection<ProjectDevice> ProjectDevice { get; set; }
        public ICollection<ProjectInterface> ProjectInterface { get; set; }
        public ICollection<ProjectMeasure> ProjectMeasure { get; set; }
        public ICollection<ProjectTelemetry> ProjectTelemetry { get; set; }
    }
}
