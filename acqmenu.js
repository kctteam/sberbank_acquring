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
 * Вызов меню UPOS на терминале
 * @param  Array resultJson Массив данных для ответа
 * @return Array            Массив данных для ответа - {"statusCode":int,"error":null/string,"result":null/string,"message":null/string,"data":array}
 */
function execute(resultJson)
{
  tool.fastlog('Открыли соединение.');
  tool.fastlog('Попытка обращения к драйверу пин-пада.');
  cmd.runSync('driver_acquring\\LoadParm.exe 11');
  tool.fastlog('Сеанс завершен.');
  tool.fastlog('Закрыли соединение.');
  resultJson['result'] = 'Menu';
  return resultJson;
}
