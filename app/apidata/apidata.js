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
        return fetch("https://stat.sitemanage.ru/api/5/lead", {
            methods: 'POST'
        })
         .then(response => response.json())
     }
}