/**
 * import ValsUtil from "../../utils/ValsUtil";
 * import "../../styles/vals.css";
 *
 * ValsUtil.down();
 */
const CLASS_NAME_DOWN = "vals_down";

export default class ValsUtil {
  static down = () => {
    ValsUtil._remove();
    ValsUtil._add();
  };

  private static _getNodeList = (): Element[] => {
    const nodeList: Element[] = [];
    document.querySelectorAll("body *").forEach(node => {
      if (!node.localName.toLowerCase().includes("script")) {
        nodeList.push(node);
      }
    });
    return nodeList;
  };

  private static _remove = () => {
    ValsUtil._getNodeList().forEach(node => {
      node.classList.remove(CLASS_NAME_DOWN);
    });
  };

  private static _add = () => {
    const nodeList = ValsUtil._getNodeList();
    nodeList.forEach(node => {
      node.classList.add(CLASS_NAME_DOWN);
    });
  };
}
