import moment from "moment";

export const FORMAT_TIME = "H:mm";
export const FORMAT_DATETIME = "YYYY/MM/DD H:mm";

export default class DateUtil {
  static getNowTime = (): string => {
    return moment().format(FORMAT_TIME);
  };

  static getNowDateTime = (): string => {
    return moment().format(FORMAT_DATETIME);
  };
}
