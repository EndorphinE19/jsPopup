/**
 * Создает экземпляр ApiData
 * Хранит методы для рабоыт с API
 */
export default class ApiData {

    /**
     * Возвращает промис с данными для сайта
     */
    getApiData() {
        
        /**
         * Рекомендуется заменить ссылку в запросе на более надежную
         * Пример файла находится в папке app/lead.json
         */
        return fetch("https://jspopup.000webhostapp.com/lead.json", {
            methods: 'POST'
        })
         .then(response => response.json())
     }
}