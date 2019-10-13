/**
 * https://developer.mozilla.org/ja/docs/Web/Guide/API/Vibration
 */
export default class VibrationUtil {
  static vibrate = (pattern: number | number[]): void => {
    if (typeof window.navigator.vibrate !== "function") return;
    window.navigator.vibrate(pattern);
  };
}
