/**
 * https://developer.mozilla.org/ja/docs/Web/API/Navigator/share
 */
export default class ShareUtil {
  static canUseWebShareApi = () => {
    if (window.navigator.share !== undefined) return true;
    return false;
  };
  static share = async (url, text, title) => {
    const data = {
      url: url,
      text: text,
      title: title,
    };
    if (ShareUtil.canUseWebShareApi()) {
      await window.navigator.share(data);
    } else {
      console.log(data);
    }
  };
}
