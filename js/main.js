//ссылка из гугл таблиц
//https://script.google.com/macros/s/AKfycbxbmCFnaCigUTHa2zCMGhWJIYPH7fz_FzNI1NCQkLUfM6CDinJgHDFxpUrGgy92YmFosg/exec
//ссылка для доступа к табл
//https://docs.google.com/spreadsheets/d/1rvJvg_y2z0Va_an_JR5gwVbLJLSI5REeXdxcBM53WNc/edit?usp=sharing

let formRespond = document.querySelector('.g-form__title_respond');
console.log(formRespond);
formRespond.classList.add('hidden');

$(function () {
   $(".g-form").submit(function (event) {
      event.preventDefault();

      // Ссылка, которую получили на этапе публикации приложения
      let appLink = "https://script.google.com/macros/s/AKfycbxbmCFnaCigUTHa2zCMGhWJIYPH7fz_FzNI1NCQkLUfM6CDinJgHDFxpUrGgy92YmFosg/exec";

      // Сообщение при успешной отправке данных
      let successRespond = 'Сообщение успешно отправлено!';

      // Сообщение при ошибке в отправке данных
      let errorRespond = 'Не удалось отправить сообщение. Cвяжитесь с администратором сайта по адресу <a href="mailto:tkadasha98@gmail.com">tkadasha98@gmail.com</a>';

      // Id текущей формы
      let form = $('#' + $(this).attr('id'))[0];

      // h2 с ответом формы
      let formRespond = $(this).find('.g-form__title_respond');
      console.log(formRespond);
      formRespond.classList.add('hidden');
      //Выбор алкоголя
      let formAlko = $(this).find('.g-form__title_main');
      // h2 с заголовком формы
      let formTitle = $(this).find('.g-form__title_main');

      // Блок прелоадера
      let preloader = $(this).find('.g-form__preloader');

      // Кнопка отправки формы
      let submitButton = $(this).find('.g-form__button');


      // FormData
      let fd = new FormData(form);
      $.ajax({

         url: appLink,
         type: "POST",
         data: fd,
         processData: false,
         contentType: false,
         beforeSend: function () {

            if (fd.get('honeypot').length) {
               return false;
            } else {
               fd.delete('honeypot');
            }

            // Показываем прелоадер
            preloader.css('opacity', '1');

            // Делаем неактивной кнопку отправки
            submitButton.prop('disabled', true);

            // валидация других полей.

         },
      }).done(function (res, textStatus, jqXHR) {

         if (jqXHR.readyState === 4 && jqXHR.status === 200) {

            // Прячем заголовок формы
            formTitle.css({
               'display': 'none'
            });

            // Прячем прелоадер
            preloader.css('opacity', '0');

            // Выводим ответ формы.
            formRespond.className.remove('hidden');
            formRespond.html(successRespond).css('color', '#4d3e2a');

            // Возвращаем активность кнопке отправки
            submitButton.prop('disabled', false);

            // Очищаем поля формы
            form.reset();
         } else {
            formTitle.css({
               'display': 'none'
            });
            formRespond.html(errorRespond).css('color', '#c64b4b');
            preloader.css('opacity', '0');
            setTimeout(() => {
               formRespond.css({
                  'display': 'none'
               });
               formTitle.css({
                  'display': 'block'
               });

               submitButton.prop('disabled', false);
            }, 5000);

            console.log('Гугл не ответил статусом 200');
         }
      }).fail(function (res, textStatus, jqXHR) {
         formTitle.css({
            'display': 'none'
         });
         preloader.css('opacity', '0');
         formRespond.html('Не удалось отправить сообщение. Cвяжитесь с администратором сайта другим способом').css('color', '#c64b4b');
         setTimeout(() => {
            formRespond.css({
               'display': 'none'
            });
            formTitle.css({
               'display': 'block'
            });
            submitButton.prop('disabled', false);
         }, 5000);
         console.log('Не удалось выполнить запрос по указанному в скрипте пути');
      });
   });
}(jQuery));