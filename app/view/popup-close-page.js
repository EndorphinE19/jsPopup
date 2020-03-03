import Events from "../events/events.js";
import ApiData from "../apidata/apidata.js";

const api = new ApiData();

/**
 * Создает экземпляр Add
 * Добавляет на страницу popup и навешивает необходимые события 
 * @this {ClassPopup}
 */
export default class Add extends Events {

    addPopupAtPage(popup, title) {

        //добавляем popup на страницу
        super.addPopupAndAnimate(popup, title)

        //маска для номера телефона
        document.querySelector('#popup-phone').addEventListener('keydown', super.phoneMask)
        document.querySelector('#popup-phone').addEventListener('focus', super.phoneMaskAddCode)

        //навешиваем событие и привязываем нужный контекст(ClassPopup), закрываем popup
        document.querySelector('.close').addEventListener('click', super.closePopup.bind(new Events))
        document.querySelector('.popup-module').addEventListener('click', super.closePopup.bind(new Events))

        //отправляем писмо
        document.querySelector(this.sendBtn).addEventListener('click', super.sendEmailViaAjax.bind(new Events))


        //НАСТРОЙКИ ЭЛЕМЕНТОВ POPUP

        //открываем окно настроек
        document.querySelector('.option-popup span').addEventListener('click', super.openOption)

        //отслеживаем изменние поля для смены элемента popup
        document.querySelector('.option-popup__content input[name="replace-header"]').addEventListener('input', super.inputChangeHeader)
        document.querySelector('.option-popup__content input[name="replace-postheader"]').addEventListener('input', super.inputChangePostHeader)
        
        //событие кнопки save
        document.querySelector('.save').addEventListener('click', super.saveOption)
    }
}