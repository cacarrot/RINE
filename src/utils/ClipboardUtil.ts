export default class ClipboardUtil {
  static copy = async (text: string) => {
    const listener = (event: any) => {
      event.clipboardData.setData("text/plain", text);
      event.preventDefault();
      document.removeEventListener("copy", listener);
    };
    document.addEventListener("copy", listener);
    document.execCommand("copy");
  };
}
