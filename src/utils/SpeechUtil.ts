import LanguageUtil from "./LanguageUtil";

/**
 * https://developer.mozilla.org/ja/docs/Web/API/SpeechSynthesisUtterance
 */
export default class SpeechUtil {
  /**
   * SpeechUtil.getVoices((voices: SpeechSynthesisVoice[]) => {
   *   voices.forEach(voice => {
   *     console.log(voice);
   *   });
   * });
   */
  static getVoices = (callback: Function): void => {
    const lang = LanguageUtil.getBrowserLanguage();
    try {
      window.speechSynthesis.onvoiceschanged = () => {
        const voices = speechSynthesis.getVoices();
        let targetVoices: SpeechSynthesisVoice[] = [];
        voices.forEach(voice => {
          if (voice.lang.indexOf(lang) >= 0) {
            targetVoices.push(voice);
          }
        });
        callback(targetVoices);
      };
    } catch (error) {
      console.log(error);
      callback([]);
    }
  };

  static speak = (
    text: string,
    handleEnd?: Function,
    option?: { pitch: number; rate: number },
  ): void => {
    try {
      const ssu = new SpeechSynthesisUtterance();
      const lang = LanguageUtil.getBrowserLanguage();
      ssu.text = text;
      ssu.pitch = 1;
      ssu.rate = 0.8;
      ssu.lang = lang;
      if (handleEnd) {
        ssu.onend = event => {
          handleEnd();
        };
      }
      window.speechSynthesis.speak(ssu);
    } catch (error) {
      console.log(error);
    }
  };
}
