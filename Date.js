/**
 * 转换 Date 对象
 * @param  {Date} date
 * @returns {Object}
 */
const standardizedDate = date => {
  const stdDate = {};
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const min = date.getMinutes();

  stdDate.year = date.getFullYear();
  stdDate.month = month > 9 ? month : "0" + month;
  stdDate.day = day > 9 ? day : "0" + day;
  stdDate.hour = hour > 9 ? hour : "0" + hour;
  stdDate.minute = min > 9 ? min : "0" + min;

  return stdDate;
};
/**
 * 格式化 Date 对象为相应时间字符串
 * @param  {Date} date
 * @param  {String} type
 * @returns {String}
 */
const formatTime = (date, type) => {
  const currentYear = new Date().getFullYear();
  const stdDate = this.standardizedDate(date);
  let result;
  switch (type) {
    case "short":
      result = stdDate.hour + ":" + stdDate.minute;
      break;
    case "withNoYear":
      result =
        stdDate.month +
        "-" +
        stdDate.day +
        " " +
        stdDate.hour +
        ":" +
        stdDate.minute;
      if (stdDate.year != currentYear) {
        result = stdDate.year + "-" + result;
      }
      break;
    case "y-m-d":
      result = stdDate.year + "-" + stdDate.month + "-" + stdDate.day;
      break;
    case "full":
      result =
        stdDate.year +
        "-" +
        stdDate.month +
        "-" +
        stdDate.day +
        " " +
        stdDate.hour +
        ":" +
        stdDate.minute;
      break;
    default:
      result = "";
  }
  return result;
};

/**
 * 格式化时间戳为相应时间字符串
 * @param  {Number} stamp
 * @param  {String} type
 * @return {String}
 */
const formatTimestamp = (stamp, type) => {
  const date = new Date();
  date.setTime(parseInt(stamp, 10) * 1000);
  const stdDate = this.standardizedDate(date);
  let result;
  switch (type) {
    case "md":
      result = "" + stdDate.month + " / " + stdDate.day;
      break;
    case "ym":
      result = "" + stdDate.year + "-" + parseInt(stdDate.month, 10) + "-";
      break;
    case "ymzh":
      result = "" + stdDate.year + "年" + parseInt(stdDate.month, 10) + "月";
      break;
    case "ymd":
      result = "" + stdDate.year + "-" + stdDate.month + "-" + stdDate.day;
      break;
    case "ymdzh":
      result =
        "" +
        stdDate.year +
        "年" +
        parseInt(stdDate.month, 10) +
        "月" +
        parseInt(stdDate.day, 10) +
        "日";
      break;
    case "ymdhm":
      result =
        "" +
        stdDate.year +
        "-" +
        stdDate.month +
        "-" +
        stdDate.day +
        " " +
        stdDate.hour +
        ":" +
        stdDate.minute;
      break;
    case "ymdhmzh":
      result =
        "" +
        stdDate.year +
        "年" +
        parseInt(stdDate.month, 10) +
        "月" +
        parseInt(stdDate.day, 10) +
        "日 " +
        stdDate.hour +
        ":" +
        stdDate.minute;
      break;
    case "mdhmzh":
      result =
        "" +
        parseInt(stdDate.month, 10) +
        "月" +
        parseInt(stdDate.day, 10) +
        "日 " +
        stdDate.hour +
        ":" +
        stdDate.minute;
      break;
    default:
      result =
        "" +
        stdDate.month +
        "-" +
        stdDate.day +
        " " +
        stdDate.hour +
        ":" +
        stdDate.minute;
      break;
  }
  return result;
};

/** 获取当前 Unix 时间戳
 * @returns {Number}
 */
const getUnixfunction = () => {
  return Math.round(+new Date() / 1000);
};

/**
 * 获取距离今天前一个星期的日期字对象，详细见(getLastWeekDate)
 * @returns {Object}
 */
const getWeekDate = () => {
  return this.getLastWeekDate(new Date());
};

/**
 * 获取给定日期的前一个星期的日期字对象
 * @param  {Date} nowDate
 * @returns {Object}
 */
const getLastWeekDate = nowDate => {
  const lastWeekStamp = nowDate.getTime() - 6 * 3600 * 24 * 1000;
  const lastWeekDate = new Date();
  lastWeekDate.setTime(lastWeekStamp);
  const stdNowDate = this.standardizedDate(nowDate);
  const stdLastWeekDate = this.standardizedDate(lastWeekDate);
  return {
    nowTime: stdNowDate.year + "-" + stdNowDate.month + "-" + stdNowDate.day,
    pastTime:
      stdLastWeekDate.year +
      "-" +
      stdLastWeekDate.month +
      "-" +
      stdLastWeekDate.day
  };
};

/**
 * 根据 unix timestamp 获取对应日期起始 timestamp
 * @param  {Number} timestamp
 * @returns {Number} 返回 Unix 时间戳
 */
const getStartUnixByUnix = timestamp => {
  const dateObj = new Date(parseInt(timestamp, 10) * 1000);
  const startDateObj = new Date(
    dateObj.getFullYear(),
    dateObj.getMonth(),
    dateObj.getDate()
  );
  return startDateObj / 1000;
};

const relativeTime = time => {
  let date;
  if (typeof time === "number") {
    date = new Date();
    date.setTime(time * 1000);
  } else if (typeof time === "string") {
    date = new Date(time);
  } else {
    return false;
  }
  return this.dateToRelativeTime(date);
};

/**
 * 根据跟当前时间的时间长度返回中文时间字符串
 * @param  {Date} date
 * @returns {String}
 */
const dateToRelativeTime = date => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const year = date.getFullYear();
  const distanceMillis = currentDate.getTime() - date.getTime();
  const seconds = Math.floor(Math.abs(distanceMillis) / 1000);
  const minutes = Math.floor(seconds / 60);
  const days = new Date().getDate() - date.getDate();
  let result;

  // more than whole day
  if (seconds >= 86400) {
    if (days == 1) {
      result = "昨天 " + this.formatTime(date, "short");
    } else if (days == 2) {
      result = "前天 " + this.formatTime(date, "short");
    } else if (year === currentYear) {
      result = this.formatTime(date, "withNoYear");
    } else {
      result = this.formatTime(date, "full");
    }
  } else if (days == 1) {
    // more than one day but no whole day
    result = "昨天 " + this.formatTime(date, "short");
  } else if (seconds >= 3600) {
    result = "今天 " + this.formatTime(date, "short");
  } else if (seconds >= 60) {
    result = minutes + " 分钟前";
  } else {
    result = "刚刚";
  }
  return result;
};

/**
 * 获取距离当前时间的时间长度
 * @param  {Number} timestamp
 * @returns {String}
 */
const limeTime = timestamp => {
  return this.simplyToRelativeTime(timestamp);
};

/**
 * 获取距离当前时间的时间长度
 * @param  {Number} timestamp
 * @returns {String}
 */
const simplyToRelativeTime = timestamp => {
  const currentUnixTime = Math.round(new Date().getTime() / 1000);
  const deltaSecond = currentUnixTime - parseInt(timestamp, 10);
  let result;
  if (deltaSecond < 60) {
    result = deltaSecond + "秒前";
  } else if (deltaSecond < 3600) {
    result = Math.floor(deltaSecond / 60) + "分钟前";
  } else if (deltaSecond < 86400) {
    result = Math.floor(deltaSecond / 3600) + "小时前";
  } else {
    result = Math.floor(deltaSecond / 86400) + "天前";
  }
  return result;
};

export {
  standardizedDate,
  formatTime,
  formatTimestamp,
  getUnixfunction,
  getWeekDate,
  getLastWeekDate,
  getStartUnixByUnix,
  relativeTime,
  dateToRelativeTime,
  limeTime,
  simplyToRelativeTime
};
