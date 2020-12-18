sberbank_acquring

@link https://github.com/kctrud/sberbank_acquring

@author Gayduk Anton - antohag@yandex.ru

@copyright KCT - mail@kctrud.ru

Библиотека отвечающая за взаимодействие с пинпадом сбербанка
Получение запросов по http локальной сети, их обработка и возврат результата

Поддерживаемые методы:
/acquring?sum=x - Запрос оплаты, сумма в рублях
/ping - Бесполезная в настоящее время хрень
/close - Сверка итогов (Закрытие смены)
/menu - Вызов меню UPOS

Формат ответа: application/json
{"statusCode":int,"error":null/string,"result":null/string,"message":null/string,"data":array}
