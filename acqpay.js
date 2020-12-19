const cmd = require('node-cmd');
const iconv = require('iconv-lite');
const fs = require('fs');
const tool = require('./tool');

module.exports = {
  execute: function (resultJson, sum) {
    return execute(resultJson, sum)
  },
};

/**
 * Оплата суммы
 * @param  Array resultJson Массив данных для ответа
 * @param  Float sum        Сумма оплаты в рублях
 * @return Array            Массив данных для ответа - {"statusCode":int,"error":null/string,"result":null/string,"message":null/string,"data":array}
 */
function execute(resultJson, sum)
{
  sum = sum*100;
  tool.fastlog('Открыли соединение.');
  tool.fastlog('Попытка обращения к драйверу пин-пада, сумма - ' + (sum / 100) + 'руб.');
  cmd.runSync('driver_acquring\\LoadParm.exe 1 ' + sum);
  tool.fastlog('Сеанс завершен.');
  tool.fastlog('Ищем результаты работы.');

  // NOTE: Работа с файлом результата
  filename = 'driver_acquring/p';
  try {
    if (fs.existsSync(filename)) {
      // NOTE: Данные получены, рабираем
      contents = iconv.decode(fs.readFileSync(filename), 'CP866').split("\n");
      var card = null;              //Номер карты
      var result = null;            //Результат операции
      var autorizationcode = null;  //Код авторизации
      tool.fastlog('Все отлично, вот данные.');
      for(var i=0;i<contents.length;i++)
      {
        if (contents[i].includes('Карта:')) {
          card = contents[i];
          card = tool.clearString(card.replace('Карта:',''));
          console.log(card);
        }
        if (contents[i].includes('ОДОБРЕНО')) {
          result = contents[i];
          result = tool.clearString(result);
          console.log(result);
        }
        if (contents[i].includes('Код авторизации:')) {
          autorizationcode = contents[i];
          autorizationcode = tool.clearString(autorizationcode.replace('Код авторизации:',''));
          console.log(autorizationcode);
        }
      }
      if (result) {
          resultJson['message'] = 'Оплата прошла успешно';
          resultJson['result'] = 'Accept';
          resultJson['data'] = {'code':autorizationcode,'card':card,'result':result,'sum':sum/100};
      }
      // NOTE: Логируем чек
      fs.copyFile('driver_acquring/p', 'result_p/p_'+new Date().getFullYear() +'.'+ (new Date().getMonth() + 1) +'.'+ new Date().getDate()+'_'+new Date().getHours() +'.'+ new Date().getMinutes() +'.'+ new Date().getSeconds(), callback);
    }
    else {
      // NOTE: Все остальные пути отсекаем
      tool.fastlog('Ошибка оплаты или отказ от оплаты. - Нет результирующего файла.');
      resultJson['error'] = 'Ошибка оплаты или отказ от оплаты.';
    }
  } catch(err) {
    // NOTE: Все остальные пути отсекаем
    tool.fastlog('Ошибка оплаты или отказ от оплаты. - Ошибка чтения файла.');
    console.log(err);
    resultJson['error'] = 'Ошибка оплаты или отказ от оплаты.';
  }
  tool.fastlog('Закрыли соединение.');
  return resultJson;
}

function callback(err) {
  if (err) throw err;
  //console.log('source.txt was copied to destination.txt');
}
