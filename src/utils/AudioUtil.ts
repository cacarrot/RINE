export default class AudioUtil {
  static play = (src: string, isLoop: boolean = false) => {
    const audio = new Audio(src);
    audio.loop = isLoop;
    audio.play();
  };

  static playTelephoneRing = (isLoop: boolean = false) => {
    AudioUtil.play(require("../audio/telephone_ring.mp3"), isLoop);
  };

  static playMessageReceived = (isLoop: boolean = false) => {
    AudioUtil.play(require("../audio/piko.mp3"), isLoop);
  };
}
