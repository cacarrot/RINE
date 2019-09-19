/**
 * https://developer.mozilla.org/ja/docs/Web/Guide/API/Vibration
 */
export default class VibrationUtil {
  static vibrate = (pattern: number | number[]): void => {
    window.navigator.vibrate(pattern);
  };
}
