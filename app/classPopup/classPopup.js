/**
 * Создает экземпляр ClassPopup
 * Хранит общие параметры
 * @constructor
 * @this {ClassPopup}
 */
export default class ClassPopup {
    constructor() {
        /**@property {Object} классы для основного popup окна*/
        this._classPopup = {
            mainClassPopup:'popup-module',
            classClosePage:[
                'popup-module-close-page',
                {nameForm: {
                    callback: 'Callback',
                    discount: 'Discount'
                }},
                {identifyClass: [
                    'wrapper-popup-module-content',
                    'wrapper-popuptime-module-content',
                    'wrapper-popuptest-module-content'
                ],
                animatedClass: 'animate-popup-module'}
            ]
        },
        /**@property {String} ссылка на текущий сайт*/
        this._nameWebsite = location.host.replace(/.{1,}:\/\//, '').replace(/\..{1,}/, ''),
        this._nameWebsiteFull = location.href

        this.currentValue = '',
        this.email = '',

        /**@property {RegExp} маска для email*/
        this._validateEmailRegExp = /.{1,}@{1,}.{1,}/,

        /**@property {Object} хранит обьекты с сообщениями */
        this._errorMessage = {

            /**@property {Object} хранит сообщения для окна настроек */
            option: {
                optionMessage: 'некорректный адрес, письмо будет отправленно на указанный ранее ящик',
                optionTag: "error-message"
            }
        },
        
        this.popup = true,

        /**@property {Object} хранит имя класса для элемента с телефоном */
        this._classPhone = {
            mainCLassPhone:'phone-popup-module'
        },
        /**@property {String} длительность анимации(для css) */
        this._ms = '.3s',

        /**@property {Number} длительность анимации*/
        this._msNumber = 300,

        this.popupTime = true,
        this._factor = 1000,

        this._titleDefault = 'У вас есть вопросы? Мы можем позвонить вам абсолютно бесплатно!',
        this._subTitleDefault = 'Мы свяжемся с вами и ответим на любые возникшие вопросы!',

        this._discountTitleDefault = 'Внимание скидка!',
        this._discountSubTitleDefault = 'Отправив заявку сейчас Вы получите скидку 10% на все услуги',

        this.sendBtn = '.js-module-send'
    }
}