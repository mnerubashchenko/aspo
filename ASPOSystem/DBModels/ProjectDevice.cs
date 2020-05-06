/* Класс "Модель связей протоколов и устройств".
 * Название: ProjectDevice.
 * Язык: C#.
 * Краткое описание:
 *      Данный класс описывает таблицу связей протоколов и устройств.
 * Свойства, описанные в классе:
 *      Id - поле Id таблицы связей протоколов и устройств;
 *      IdProject - поле IdProject таблицы связей протоколов и устройств;
 *      IdDevice - поле IdDevice таблицы связей протоколов и устройств;
 *      IdDeviceNavigation - связь устройства и протокола;
 *      IdProjectNavigation - связь протокола и устройства;
 */

using System;
using System.Collections.Generic;

namespace ASPOSystem.DBModels
{
    public partial class ProjectDevice
    {
        public Guid Id { get; set; }
        public Guid? IdProject { get; set; }
        public Guid? IdDevice { get; set; }

        public Devices IdDeviceNavigation { get; set; }
        public Project IdProjectNavigation { get; set; }
    }
}
