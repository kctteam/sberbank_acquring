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
 * Сверка итогов (Закрытие смены)
 * @param  Array resultJson Массив данных для ответа
 * @return Array            Массив данных для ответа - {"statusCode":int,"error":null/string,"result":null/string,"message":null/string,"data":array}
 */
function execute(resultJson)
{
  // FIXME: Непонятно как ловить актуальный отклик - нет обратной связи нужно исправить.
  tool.fastlog('Открыли соединение.');
  tool.fastlog('Попытка обращения к драйверу пин-пада.');
  cmd.runSync('driver_acquring\\LoadParm.exe 7');
  tool.fastlog('Сеанс завершен.');
  tool.fastlog('Закрыли соединение.');
  resultJson['result'] = 'Close';
  return resultJson;
}
