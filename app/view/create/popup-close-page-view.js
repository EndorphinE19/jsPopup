import ClassPopup from '../../classPopup/classPopup.js';

/**
 * Создает экземпляр Create
 * Создает основные html элементы
 * @this {ClassPopup}
 */
export default class Create extends ClassPopup {

    /**
     * @this {ClassPopup}
     * @return {Object} HTML элемент и класс
     */
    createElementPopup() {

        var mainBlockPopup = document.createElement('div'),
            option = `<div class="option-popup">
        <span>⚙</span>
        <div class="option-popup__content">
            <input type="text" name="replace-header" placeholder="Новый заголовок">
            <input type="text" name="replace-postheader" placeholder="Новый подзаголовок">
            <input type="email" name="replace-email" placeholder="Новый Email">
            <button class="save-option save">Сохранить</button>
            <span class="error-message"></span>
        </div>`;

        mainBlockPopup.classList.add(this._classPopup.classClosePage[0], this._classPopup.mainClassPopup);

        mainBlockPopup.innerHTML = `<div class="${this._classPopup.classClosePage[2].identifyClass[0]} ${this._classPopup.classClosePage[2].animatedClass}"><div class="close">&#10006;</div>
        <div class="popup-module-close-page__content">
            <h2 class="header-h2"></h2>
            <h5 class="header-h5"></h5>
            <form name="person" class="popup-form-module" data-type="${this._classPopup.classClosePage[1].nameForm.callback}">
                <label for="popup-phone">Ваш телефон:</label><br>
                <input type="tel" name="phone" required placeholder="+7 499 222-22-22" id="popup-phone" maxlength="18" min="18">
                <button type="button" class="btn-style-module js-module-send">Позвоните мне →</button>
            </form>
            </div>
            ${option}
            </div>
            `;

        return {block:mainBlockPopup, class:this._classPopup.classClosePage};
   }

   /**
    * @this {ClassPopup}
    * @return {Object} HTML элемент
    */
   createPhoneElement() {

        var mainPhoneBlock = document.createElement('div');

        mainPhoneBlock.classList.add(this._classPhone.mainCLassPhone);

        mainPhoneBlock.innerHTML = `<img src="../img/telephone-handle-silhouette.svg" alt="telephone-handle-silhouette.svg">`

        return mainPhoneBlock
   }

    /**
    * @this {ClassPopup}
    * @return {Object} HTML элемент
    */
   createElementPopupTime() {

        var mainBlockPopupTime = document.createElement('div'),
            option = `<div class="option-popup">
        <span>⚙</span>
        <div class="option-popup__content">
            <input type="text" name="replace-header" placeholder="Новый заголовок">
            <input type="text" name="replace-postheader" placeholder="Новый подзаголовок">
            <input type="email" name="replace-email" placeholder="Новый Email">
            <button class="save-option save">Сохранить</button>
            <span class="error-message"></span>
        </div>`;

        mainBlockPopupTime.classList.add(this._classPopup.classClosePage[0], this._classPopup.mainClassPopup);

        mainBlockPopupTime.innerHTML = `<div class="${this._classPopup.classClosePage[2].identifyClass[1]} ${this._classPopup.classClosePage[2].animatedClass}"><div class="close">&#10006;</div>
        <div class="popup-module-close-page__content">
            <h2 class="header-h2"></h2>
            <h5 class="header-h5"></h5>
            <form name="person" class="popup-form-module" data-type="${this._classPopup.classClosePage[1].nameForm.discount}">
                <label for="popup-phone">Ваш телефон:</label><br>
                <input type="tel" name="phone" required placeholder="+7 499 222-22-22" id="popup-phone" maxlength="18" min="18">
                <button type="button" class="btn-style-module js-module-send">Получить скидку →</button>
            </form>
            </div>
            ${option}
            </div>
            `;

        return mainBlockPopupTime
   }
} 