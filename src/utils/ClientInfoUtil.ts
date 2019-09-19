import axios from "axios";

export default class BrowserInfoUtil {
  /**
   * https://developer.mozilla.org/ja/docs/Web/API/NavigatorID/userAgent
   */
  static getUserAgent = (): string => {
    return window.navigator.userAgent;
  };

  /**
   * https://developer.mozilla.org/ja/docs/Web/API/NavigatorOnLine/onLine
   */
  static isOnline = (): boolean => {
    return window.navigator.onLine;
  };

  /**
   * https://ifconfig.io/
   */
  static getIpAddress = async () => {
    try {
      const response = await axios.get(
        "https://cacarrot-cors-proxy.herokuapp.com/ip.php",
      );
      if (response.status !== 200) {
        return "";
      }
      return response.data;
    } catch (error) {
      console.error(error);
      return "";
    }
  };
}
