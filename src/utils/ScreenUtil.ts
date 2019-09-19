/**
 * https://developer.mozilla.org/ja/docs/Web/API/Fullscreen_API
 */
export default class ScreenUtil {
  static isFullScreen = (): boolean => {
    if (document.fullscreenElement) return true;
    return false;
  };

  static toggleFullScreen = (onEnter?: Function, onExit?: Function): void => {
    document.addEventListener("fullscreenchange", () => {
      if (ScreenUtil.isFullScreen()) {
        if (onEnter !== undefined) onEnter();
      } else {
        if (onExit !== undefined) onExit();
      }
    });
    if (ScreenUtil.isFullScreen()) {
      document.exitFullscreen();
    } else {
      document.body.requestFullscreen();
    }
  };
}
