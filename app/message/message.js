import ClassPopup from "../classPopup/classPopup";

/**
 * Создает экземпляр Message
 * Хранит методы для вывода сообщений
 * @this {ClassPopup}
 */
class Message extends ClassPopup {

    /**
     * Сообщение об ошибке
     */
    errorMessageAtValidation() {
        document.querySelector('.'+this._errorMessage.option.optionTag).innerHTML = this._errorMessage.option.optionMessage
    }

    /**
     * 
     * @param {JSON} s ответ сервера(положительный) 
     */
    success_status(s) {

        s = JSON.parse(s)
    
        var elem = document.createElement('h2'),
            classPopupContent = document.querySelector('.popup-module-close-page__content'),
            h = document.querySelector('.popup-module-close-page__content'),
            option = document.querySelector('.option-popup__content');
        
        elem.classList.add('header-h2')
        elem.style.textAlign = 'center'
        elem.append(s)

        h.parentNode.insertBefore(elem, classPopupContent)
        h.remove()

        option.style.cssText = 'animation:hidden-option;'
    }

    /**
     * 
     * @param {JSON} e ответ сервера(отрицательный) 
     */
    error_status(e) {

        e = JSON.parse(e)

        var elem = document.createElement('h2'),
            classPopupContent = document.querySelector('.popup-module-close-page__content'),
            h = document.querySelector('.popup-module-close-page__content');
        
        elem.classList.add('header-h2')
        elem.style.textAlign = 'center'
        elem.append(e)

        h.parentNode.insertBefore(elem, classPopupContent)
        h.remove()
    }
}

var message = new Message();
export default message;