import ClassPopup from '../classPopup/classPopup.js';
import validate from '../validate/validate.js';
import XHR from '../xhr/xhr.js';
import ApiData from '../apidata/apidata.js';

const classpopup = new ClassPopup();
const api = new ApiData();

/**
 * Создает экземпляр Events
 * Хранит методы обработчики событий и другие побочный методы
 * @this {ClassPopup}
 */
export default class Events extends ClassPopup {

    /**
     * анимируем popup
     * @param {String} popup
     * @param {Object} title Заголовки 
     */
    addPopupAndAnimate(popup, title) {
        
        if (document.querySelector('.popup-module') === null) {

            //добавляем
            this.addPopup(popup, title)

        } else {
            document.querySelector(`.${classpopup._classPopup.mainClassPopup}`).remove()

            //добавляем
            this.addPopup(popup, title)
        
        }
    }
    /**
     * добавляем popup
     * @param {String} popup
     * @param {Object} title Заголовки 
     */
    addPopup(popup, title) {
        
        document.querySelector('body').append(popup)

        document.querySelector(`.${classpopup._classPopup.classClosePage[2].animatedClass}`)
        .style.cssText = `margin-top:5%; animation: visible-popup-open ${classpopup._ms};`

        if (document.querySelector(`.${classpopup._classPopup.classClosePage[2].identifyClass[0]}`)) {

            executor (
                        [
                            title.title.length === 0 ? classpopup._titleDefault : title.title,
                            title.subtitle.length === 0 ? classpopup._subTitleDefault : title.subtitle
                        ]
                )

        } else if (document.querySelector(`.${classpopup._classPopup.classClosePage[2].identifyClass[1]}`)) {

            executor (
                        [
                            title.title.length === 0 ? classpopup._discountTitleDefault : title.title,
                            title.subtitle.length === 0 ? classpopup._discountSubTitleDefault : title.subtitle
                        ]
                )
        }

        function executor(titles) {

            document.querySelector(`.popup-module-close-page__content h2`).innerHTML = titles[0]
            document.querySelector(`.popup-module-close-page__content h5`).innerHTML = titles[1]
        
        }
    }


    /**
     * маска для номера телефона
     * @param {Object} event 
     */
    phoneMask(event) {
        
        if( !(event.key == 'ArrowLeft' || event.key == 'ArrowRight' || event.key == 'Backspace' || event.key == 'Tab')) { event.preventDefault() }
         var mask = '+7 (111) 111-11-11'; // Задаем маску
         
         if (/[0-9\+\ \-\(\)]/.test(event.key)) {
             
             var currentString = this.value;
             var currentLength = currentString.length;

             if (/[0-9]/.test(event.key)) {

                 if (mask[currentLength] == '1') {

                     this.value = currentString + event.key;

                 } else {

                     for (var i = currentLength; i < mask.length; i++) {

                     if (mask[i] == '1') {
                         
                         this.value = currentString + event.key;
                         break;
                     }

                     currentString += mask[i];

                     }
                 }
             }
         } 
    }

    phoneMaskAddCode() {
        this.value = '+7';
    }

    // END маска для номера телефона

    /**
     * закрываем popup
     * @param {Object} e 
     */
    closePopup(e) {

        e.stopPropagation()

        const popupAnimated = document.querySelector(`.${this._classPopup.classClosePage[2].animatedClass}`);

        if (/popup-close-page/g.test(e.target.attributes.class.nodeValue)) {

            close(popupAnimated)

        } else if (/close/g.test(e.target.attributes.class.nodeValue)) {

            close(popupAnimated)

        }

        function close(popupAnimated) {
        
            popupAnimated.style.cssText = `animation: hidden-popup ${classpopup._ms}; margin-top:0;`
        
            setTimeout(()=>{
                
                document.querySelector(`.${classpopup._classPopup.mainClassPopup}`).remove()
                
            }, classpopup._msNumber)   
        }
    }

    /**
     * открытие окна настройки
     * @param {Object} e 
     */
    openOption(e) {

        e.stopPropagation()
        
        const option = document.querySelector('.option-popup__content');

        if (option.style.opacity !== '1') {

            visivleOrHiddenOption(`animation:visible-option ${classpopup._ms}`, "opacity:1; z-index:0;")

        } else {

            visivleOrHiddenOption(`animation:hidden-option ${classpopup._ms}`, "opacity:0; z-index:-1;")

        }

        /**
         * Анимация окна настройки
         * @param {String} anim 
         * @param {String} mainStyle 
         */
        function visivleOrHiddenOption(anim, mainStyle) {

            option.style.cssText = anim;

            setTimeout(()=>{

                option.style.cssText = mainStyle;

            }, classpopup._msNumber)
        }
    }

    /**
     * замена заголовка
     * @param {Object} t 
     */
    inputChangeHeader(t) {

       document.querySelector('.popup-module-close-page__content h2').innerHTML = t.target.value.replace(/^\s$/g, '')

    }
    /**
     * 
     * @param {Object} t 
     */
    inputChangePostHeader(t) {

        document.querySelector('.popup-module-close-page__content h5').innerHTML = t.target.value.replace(/^\s$/g, '')

     }

    /**
     * отправка почты
     */
    sendEmailViaAjax() {

        if (/utm/.test(window.location.href)) {
            utmMarker()
        } else {
            notUtmMarker()
        }

        /**
         * обрабатывает данные с UTM метками
         */
        function utmMarker() {

            api.getApiData()
            .then(result => {

                let g = window.location.href.match(/utm_.{1,}=.{1,}/igm);
                g = g[0].split('&');
                
                let email = validate.validateEmail(document.querySelector('.option-popup__content input[name="replace-email"]').value) ? 
                '&email='+document.querySelector('.option-popup__content input[name="replace-email"]').value : '&email=' + result[0].mail_email,
    
                data = 'phone='+validate.validateInput(document.forms.person.children[2].value)
                    +'&nameForm='+encodeURIComponent(document.querySelector('.popup-module form').getAttribute('data-type'))
                    +'&nameWebsite='+encodeURIComponent(document.querySelector('title').innerHTML)
                    +'&urlWebsite='+encodeURIComponent(result[0].site_url)
                    +'&nameWebsitePage='+encodeURIComponent(classpopup._nameWebsiteFull)
                    +'&headerMail='+encodeURIComponent(result[0].mail_subject)
                    +'&utm_source='+encodeURIComponent(g[0])
                    +'&utm_medium='+encodeURIComponent(g[1])
                    +'&utm_term='+encodeURIComponent(g[2])
                    +'&utm_content='+encodeURIComponent(g[3])
                    +'&utm_campaign='+encodeURIComponent(g[4])
                    +'&active_bitrix24='+encodeURIComponent(result[0].active_bitrix24)
                    +'&bitrix_user='+encodeURIComponent(result[0].bitrix_user)
                    +'&bitrix_api='+encodeURIComponent(result[0].bitrix_api)
                    +email; // значение не сохранялось при использовании отдельной функции
                
                if (!/phone=false/.test(data)) {
                    document.querySelector(classpopup.sendBtn).setAttribute('disabled', 'disabled')
                    XHR._XHREmail(data);
                }
            }).catch(e => {
                console.log('Ошибка работы API!'+'events.js', e)
            })
        }

        /**
         * обрабатывает данные без UTM меток
         */
        function notUtmMarker() {

            api.getApiData()
            .then(result => {

                let email = validate.validateEmail(document.querySelector('.option-popup__content input[name="replace-email"]').value) ? 
                '&email='+document.querySelector('.option-popup__content input[name="replace-email"]').value : '&email=' + result[0].mail_email,

                data = 'phone='+validate.validateInput(document.forms.person.children[2].value)
                    +'&nameForm='+encodeURIComponent(document.querySelector('.popup-module form').getAttribute('data-type'))
                    +'&nameWebsite='+encodeURIComponent(document.querySelector('title').innerHTML)
                    +'&urlWebsite='+encodeURIComponent(result[0].site_url)
                    +'&nameWebsitePage='+encodeURIComponent(classpopup._nameWebsiteFull)
                    +'&headerMail='+encodeURIComponent(result[0].mail_subject)
                    +'&active_bitrix24='+encodeURIComponent(result[0].active_bitrix24)
                    +'&bitrix_user='+encodeURIComponent(result[0].bitrix_user)
                    +'&bitrix_api='+encodeURIComponent(result[0].bitrix_api)
                    +email; // значение не сохранялось при использовании отдельной функции
                    
                if (!/phone=false/.test(data)) {
                    document.querySelector(classpopup.sendBtn).setAttribute('disabled', 'disabled')
                    XHR._XHREmail(data);

                }
            }).catch(e => {
                console.log('Ошибка работы API!'+'events.js', e)
            })
        }
    }

    /**
     * сохрание данных
    */
    saveOption() {
        let inputChangeHeader = document.querySelector('.popup-module-close-page__content h2').innerHTML,
            inputChangePostHeader = document.querySelector('.popup-module-close-page__content h5').innerHTML;
    }
}