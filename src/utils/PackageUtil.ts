import pkg from "../../package.json";

export default class PackageUtil {
  static getVersion = () => {
    return pkg.version;
  };
}
