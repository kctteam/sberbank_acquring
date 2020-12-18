module.exports = {
  /**
   * Триммируем и удаляем линие пробелы
   * @param  String instring Обрабатываемая строка
   * @return String Обработанная строка
   */
  clearString: function (instring) {
    instring = instring.replace('  ', ' ');
    instring = instring.replace('  ', ' ');
    instring = instring.replace('  ', ' ');
    instring = instring.replace('  ', ' ');
    instring = instring.replace('  ', ' ');
    instring = instring.replace('  ', ' ');
    instring = instring.replace('  ', ' ');
    instring = instring.replace('  ', ' ');
    instring = instring.replace('  ', ' ');
    instring = instring.replace('  ', ' ');
    instring = instring.replace('  ', ' ');
    instring = instring.replace('  ', ' ');
    instring = instring.replace('  ', ' ');
    return instring.trim();
  },
  /**
   * Вывод данных в лог, с указанием времени
   * @param  String message Текст сообщения
   */
  fastlog: function (message) {
    console.log('['+ new Date().getHours() +':'+ new Date().getMinutes() +':'+ new Date().getSeconds() +'] ' + message);
  }
};
