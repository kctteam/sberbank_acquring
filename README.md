sberbank_acquring

@link https://github.com/kctteam/sberbank_acquring

@copyright KCT - https://kct.team mail@kct.team

@author Gayduk Anton - antohag@yandex.ru

Библиотека отвечающая за взаимодействие с пинпадом сбербанка
Получение запросов по http локальной сети, их обработка и возврат результата

Поддерживаемые методы:
/acquring?sum=x - Запрос оплаты, сумма в рублях
/ping - Бесполезная в настоящее время хрень
/close - Сверка итогов (Закрытие смены)
/menu - Вызов меню UPOS

Формат ответа: application/json
```
{"statusCode":int,"error":null/string,"result":null/string,"message":null/string,"data":array}
```

Указание COM Порта устройства: 
driver_acquring_2024\pinpad.ini -> ComPort={port}