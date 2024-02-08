/**
 * @link https://github.com/kctrud/sberbank_acquring
 * @copyright KCT - https://kctrud.ru mail@kctrud.ru
 * @author Gayduk Anton - antohag@yandex.ru
 * Библиотека отвечающая за взаимодействие с пинпадом сбербанка
 * Получение запросов по http локальной сети, их обработка и возврат результата
 * Поддерживаемые методы:
 * /acquring?sum=x - Запрос оплаты, сумма в рублях
 * /ping - Бесполезная в настоящее время хрень
 * /close - Сверка итогов (Закрытие смены)
 * /menu - Вызов меню UPOS
 * Формат ответа: application/json
 * {"statusCode":int,"error":null/string,"result":null/string,"message":null/string,"data":array}
 */

const http = require('http');
const url = require('url');
const tool = require('./tool');
const hostname = '192.168.0.126';
const port = 16733;

const server = http.createServer((req, res) => {
  // NOTE: Отправляем обратно общие данные
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin,Content-Length,Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST');

/*

Access-Control-Allow-Headers: Origin,Content-Length,Content-Type
Access-Control-Allow-Methods: GET,POST,PUT,PATCH,DELETE,HEAD,OPTIONS
Access-Control-Allow-Origin: *
Access-Control-Max-Age: 43200

 */

  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  // NOTE: Результат
  var resultJson = {'statusCode':200, 'error':null, 'result':'refuse', 'message':null, 'data':{}}; //Результирующие данные

  // NOTE: Разбор url
  var url_parts = url.parse(req.url, true);
  var query = url_parts.query;

  if (req.method == "OPTIONS") {
    // NOTE: Отсекаем посторонние запросы
    resultJson['statusCode'] = 204;
  } else {
    if (url_parts.pathname === "/acquring" && query.sum && query.sum > 0 && Number.isInteger(parseInt(query.sum))) {
      const sp_acq_pay = require('./acqpay');
      var sum = query.sum;
      resultJson = sp_acq_pay.execute(resultJson, sum);
    } else if (url_parts.pathname === "/ping") {
      const sp_acq_ping = require('./acqping');
      resultJson = sp_acq_ping.execute(resultJson);
    } else if (url_parts.pathname === "/close") {
      const sp_acq_close = require('./acqclose');
      resultJson = sp_acq_close.execute(resultJson);
    } else if (url_parts.pathname === "/menu") {
      const sp_acq_menu = require('./acqmenu');
      resultJson = sp_acq_menu.execute(resultJson);
    } else {
      // NOTE: Все остальные пути отсекаем
      tool.fastlog('Неверные параметры обращения.');
      resultJson['statusCode'] = 204;
      resultJson['error'] = 'Неверные параметры обращения.';
    }
  }

  res.statusCode = resultJson['statusCode'];
  res.end(JSON.stringify(resultJson));
});

server.listen(port, () => {
  console.log(`Server running at http://${getLocalIp()}:${port}`);
  console.log(`Example http://${getLocalIp()}:${port}/ping`);
});

function getLocalIp() {
  const os = require('os');

  for(let addresses of Object.values(os.networkInterfaces())) {
      for(let add of addresses) {
          if(add.address.startsWith('192.168.')) {
              return add.address;
          }
      }
  }
}
