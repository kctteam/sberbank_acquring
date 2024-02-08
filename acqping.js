const cmd = require('node-cmd');
const iconv = require('iconv-lite');
const fs = require('fs');
const tool = require('./tool');

module.exports = {
  execute: function (resultJson) {
    return execute(resultJson)
  },
};

/**
 * Бесполезная в настоящее время хрень
 * @param  Array resultJson Массив данных для ответа
 * @return Array            Массив данных для ответа - {"statusCode":int,"error":null/string,"result":null/string,"message":null/string,"data":array}
 */
function execute(resultJson)
{
  // FIXME: Непонятно как ловить актуальный отклик - нет обратной связи нужно исправить.
  tool.fastlog('Открыли соединение.');
  tool.fastlog('Попытка обращения к драйверу пин-пада.');
  cmd.runSync('driver_acquring_2024\\LoadParm.exe 47 2');
  tool.fastlog('Сеанс завершен.');
  tool.fastlog('Закрыли соединение.');
  resultJson['result'] = 'Ping';
  return resultJson;
}
