import Create from './view/create/popup-close-page-view.js';
import Add from './view/popup-close-page.js';
import ClassPopup from "./classPopup/classPopup.js";
import ApiData from './apidata/apidata.js';
import validate from './validate/validate.js';


const api = new ApiData();
const classPopup = new ClassPopup();
const add = new Add();
const create = new Create();

document.addEventListener("DOMContentLoaded", ready);

function ready() {

    appendLink()
    
    api.getApiData()
    .then(

        result => {
     
            if (validate.urlsite(result[0].site_exceptions, result[0].site_mirror, result[0].site_url)) {

                // попап при закрытии страницы
                if (Number(result[0].active_closeform)) {
                    
                    document.querySelector('body').addEventListener('mouseleave', function(e) {

                        if (classPopup.popup) {
                            console.log(e.clientY)
                            if (e.layerY > 0) {
                                
                                callPopupClosePage('mouseleave', {title: result[0].form_title, subtitle: result[0].form_subtitle})
                            }
                        }
                    })
                }

                // виджет(кнопка c телефоном)
                if (Number(result[0].active_widget)) {
                    
                    document.body.appendChild(create.createPhoneElement())

                    document.querySelector('.phone-popup-module').addEventListener('click', function(e) {

                        callPopupClosePage('click', {title: result[0].form_title, subtitle: result[0].form_subtitle}) 
                
                    })
                }

                //попап по времени 
                if (Number(result[0].active_discount)) {
                    
                    setTimeout(function(){
                        if (classPopup.popupTime) {
                            callPopupTime({title: result[0].form_discount_title, subtitle: result[0].form_discount_subtitle})
                        }
                    }, result[0].form_discount_timeout * classPopup._factor)
                }
            }
        }
    ).catch(e => {
        console.log('Ошибка работы API!'+'index.js', e)
    })

    /**
     * Добавляет попап при закрытии страницы
     * @param {String} e событие 
     * @param {Object} title Заголовки 
     */
    function callPopupClosePage(e, title) {

        add.addPopupAtPage(create.createElementPopup().block, title)
    
        e === 'mouseleave' ? classPopup.popup = !classPopup.popup : null;
    }

    /**
     * Добавляет попап по времени
     * @param {Object} title Заголовки 
     */
    function callPopupTime(title) {

        add.addPopupAtPage(create.createElementPopupTime(), title)

        classPopup.popupTime = !classPopup.popupTime

    }

    function appendLink() {

        let head = document.head,
            link = document.createElement('link');

        link.rel = "stylesheet";
        link.href = "./popupmodule.css";
        link.media = 'none'

        link.onload = function() {
            if (link.media === 'none') {
               
                link.setAttribute('media', 'all')
            }
        }

        head.appendChild(link)
    }
}