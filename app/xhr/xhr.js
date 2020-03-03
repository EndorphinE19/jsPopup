import message from "../message/message";

/**
 * Создает экземпляр XHR
 * Хранит ajax методы
 */
class XHR {

    /**
     * 
     * @param {String} data URL 
     */
    _XHREmail(data) {
        
        let XHRorXD = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
        let xhr = new XHRorXD();

        xhr.open('POST', '/php/email-popup-module.php', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        
        xhr.send(data);

        xhr.onload = function(s) {
            message.success_status(s.explicitOriginalTarget.responseText)
        }

        xhr.onerror = function(e) {
            message.error_status(e.explicitOriginalTarget.responseText)
        }
    }
}

var classXHR = new XHR();
export default classXHR;