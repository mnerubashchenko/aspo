/* Класс "Модель таблицы комментариев к протоколам".
 * Название: Comments.
 * Язык: C#.
 * Краткое описание:
 *      Данный класс описывает таблицу комментариев к протоколам.
 * Свойства, описанные в классе:
 *      Id - поле Id таблицы комментариев к протоколам;
 *      AuthorComment - поле AuthorComment таблицы комментариев к протоколам;
 *      ProjectComment - поле ProjectComment таблицы комментариев к протоколам;
 *      BodyComment - поле BodyComment таблицы комментариев к протоколам;
 *      DateCreateComment - поле DateCreateComment таблицы комментариев к протоколам;
 *      AuthorCommentNavigation - связь комментария и его автора;
 *      ProjectCommentNavigation - связь комментария и протокола, к которому он написан.
 */

using System;
using System.Collections.Generic;

namespace ASPOSystem.DBModels
{
    public partial class Comments
    {
        public Guid Id { get; set; }
        public Guid? AuthorComment { get; set; }
        public Guid? ProjectComment { get; set; }
        public string BodyComment { get; set; }
        public DateTime? DateCreateComment { get; set; }

        public Users AuthorCommentNavigation { get; set; }
        public Project ProjectCommentNavigation { get; set; }
    }
}
