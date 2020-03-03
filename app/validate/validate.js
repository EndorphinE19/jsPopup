import ClassPopup from '../classPopup/classPopup.js';
import message from '../message/message.js';
import punycode from '../punycode/punycode.js';

const classpopup = new ClassPopup();

/**
 * Создает экземпляр Validate
 * Хранит методы валидации
 * @this {ClassPopup}
 */
class Validate extends ClassPopup {

    /**
     * Возвращает закодированную строку для URL
     * 
     * @param {String} 
     * @return {String} 
     */
    validateInput(data) {

        if (data.length !== 0 && data.length === 18) {

            document.querySelector(`.${classpopup._classPopup.classClosePage[0]} input[type="tel"]`).style.border = '1px solid green'
            return encodeURIComponent(data)

        } else {

            document.querySelector(`.${classpopup._classPopup.classClosePage[0]} input[type="tel"]`).style.border = '1px solid red'
            return false

        }
    }

    /**
     * Проверяет email на корректность
     * @param {String}
     * @return {Boolean}
     */
    validateEmail(email) {

        if (classpopup._validateEmailRegExp.test(email)) {

            return true

        }
       
        message.errorMessageAtValidation()
        
        return false
    }

    /**
     * Определяет работу popup на сайте
     * @param {String} url_exc Исключение
     * @param {String} url_mirror Зеркала
     * @param {String} url_site Текущий сайт
     */
    urlsite(url_exc, url_mirror, url_site) {

        var url = [], exc = [], url_page = '';
        classpopup._nameWebsite = punycode.ToUnicode(classpopup._nameWebsite)

        if (typeof url_site === 'string' && url_site.length !== 0) {

            url_site = url_site.split(',').length > 1 ? url_site : String(url_site).replace(/.{1,}:\/\//, '').replace(/\..{1,}/, '')
            url_exc = url_exc.split(',')
            url_page = punycode.ToUnicode(location.href.replace(/.{1,}:\/\/.{1,}\//, ''))

            for (var j = 0; j < url_exc.length; j++) {

                exc.push(url_exc[j].replace(/.{1,}:\/\/.{1,}\//, ''))

                if (punycode.ToUnicode(exc[j]) === url_page && (punycode.ToUnicode(exc[j]).length !== 0 && url_page.length !== 0)) {
                    //console.log('/')
                    return false

                } else if (exc[j].length === 0 || url_page.length === 0) {

                    if (punycode.ToUnicode(url_site) === classpopup._nameWebsite) {
                        //console.log('url')
                        return true
                        
                    }
                }
            }
        }

        if (typeof url_mirror === 'string' && url_mirror.length !== 0) {

            url_mirror = url_mirror.split(',')
            
            for (var i = 0; i < url_mirror.length; i++) {
                
                url.push(url_mirror[i].replace(/.{1,}:\/\//, '').replace(/\..{1,}/, ''))
                
                if (url[i] === classpopup._nameWebsite) {
                    return true
                }
            }
        }

        return true
    }
}

var validate = new Validate();
export default validate;