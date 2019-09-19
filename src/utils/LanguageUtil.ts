export default class LanguageUtil {
  static getBrowserLanguage = (): string => {
    const language =
      (window.navigator.languages && window.navigator.languages[0]) ||
      window.navigator.language;
    return language;
  };
}
