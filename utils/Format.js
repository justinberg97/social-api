const addDateSuffix = date => {
    const dateStr = date.toString();
    const lastChar = dateStr.charAt(dateStr.length - 1);
  
    switch (lastChar) {
      case '1':
        if (dateStr !== '11') return `${dateStr}st`;
        break;
      case '2':
        if (dateStr !== '12') return `${dateStr}nd`;
        break;
      case '3':
        if (dateStr !== '13') return `${dateStr}rd`;
        break;
      default:
        return `${dateStr}th`;
    }
  };
  
  const months = {
    short: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    long: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  };
  
  const getFormattedMonth = (monthIndex, monthLength) =>
    months[monthLength][monthIndex];
  
  module.exports = (timestamp, { monthLength = 'short', dateSuffix = true } = {}) => {
    const date = new Date(timestamp);
    const formattedMonth = getFormattedMonth(date.getMonth(), monthLength);
    const dayOfMonth = dateSuffix ? addDateSuffix(date.getDate()) : date.getDate();
    const year = date.getFullYear();
    const hour = (date.getHours() % 12) || 12;
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const periodOfDay = date.getHours() >= 12 ? 'pm' : 'am';
  
    const formattedTimeStamp = `${formattedMonth} ${dayOfMonth}, ${year} at ${hour}:${minutes} ${periodOfDay}`;
  
    return formattedTimeStamp;
  };
  

