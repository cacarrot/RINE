import domtoimage from "dom-to-image";
import FileSaver from "file-saver";

export default class FileUtil {
  /**
   * https://developer.mozilla.org/ja/docs/Web/API/FileReader
   * https://stackoverflow.com/questions/32508191/uncaught-typeerror-failed-to-execute-readasdataurl-on-filereader-parameter
   * const callback = (event) => {
   *   const base64 = event.target.result;
   * }
   */
  static loadImageFileToBase64 = (target: any, callback: Function) => {
    if (target.files === undefined || target.files.length === undefined) return;
    const fr = new FileReader();
    fr.onload = event => {
      callback(event);
    };
    const file = target.files[0];
    if (file) {
      fr.readAsDataURL(file);
    }
  };

  /**
   * https://github.com/tsayen/dom-to-image
   * https://github.com/eligrey/FileSaver.js/
   */
  static download = (targetNode: Node, fileName: string) => {
    domtoimage.toBlob(targetNode).then(blob => {
      FileSaver.saveAs(blob, fileName);
    });
  };
}
