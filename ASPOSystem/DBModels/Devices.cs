/* Класс "Модель таблицы устройств".
 * Название: Devices.
 * Язык: C#.
 * Краткое описание:
 *      Данный класс описывает таблицу устройств.
 * Свойства, описанные в классе:
 *      Id - поле Id таблицы устройств;
 *      Type - поле Type таблицы устройств;
 *      Caption - поле Caption таблицы устройств;
 *      Brand - поле Brand таблицы устройств;
 *      Model - поле Model таблицы устройств;
 *      Status - поле Status таблицы устройств;
 *      IpInput - поле IpInput таблицы устройств;
 *      ActualIp - поле ActualIp таблицы устройств;
 *      Port - поле Port таблицы устройств;
 *      PositionNumber - поле PositionNumber таблицы устройств;
 *      BrandNavigation - связь устройства и его бренда;
        TypeNavigation - связь устройства и его типа;
 *      ProjectDevice - связь конкретного устройства и протоколов, использующих данное устройство.
 */

using System;
using System.Collections.Generic;

namespace ASPOSystem.DBModels
{
    public partial class Devices
    {
        /* Конструктор класса Devices. */
        public Devices()
        {
            ProjectDevice = new HashSet<ProjectDevice>();
        }

        public Guid Id { get; set; }
        public Guid? Type { get; set; }
        public string Caption { get; set; }
        public Guid? Brand { get; set; }
        public string Model { get; set; }
        public string Status { get; set; }
        public string IpInput { get; set; }
        public string ActualIp { get; set; }
        public string Port { get; set; }
        public string PositionNumber { get; set; }

        public Brands BrandNavigation { get; set; }
        public Typedev TypeNavigation { get; set; }
        public ICollection<ProjectDevice> ProjectDevice { get; set; }
    }
}
