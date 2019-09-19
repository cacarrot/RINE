import Dexie from "dexie";

export type ImageItem = {
  id?: string;
  value?: string;
};

/**
 * https://github.com/dfahlander/Dexie.js
 */
class ImageDB extends Dexie {
  public imageTable: Dexie.Table<ImageItem, string>;

  public constructor() {
    super("ImageDB");
    this.version(1).stores({
      imageTable: "&id",
    });
    this.imageTable = this.table("imageTable");
  }
}

export class ImageDao {
  static insert = (item: ImageItem, callback: Function) => {
    const { id, value } = item;
    const db = new ImageDB();
    db.transaction("rw", db.imageTable, async () => {
      const key = await db.imageTable.add({ id: id, value: value });
      callback(key);
    }).catch(e => {
      console.error(e.stack || e);
    });
  };

  static select = (id: string, callback: Function) => {
    const db = new ImageDB();
    db.transaction("rw", db.imageTable, async () => {
      const items = await db.imageTable
        .where("id")
        .equals(id)
        .toArray();
      if (items.length > 0) {
        callback(items[0]);
      } else {
        callback(null);
      }
    }).catch(e => {
      console.error(e.stack || e);
    });
  };

  static clear = () => {
    const db = new ImageDB();
    db.transaction("rw", db.imageTable, async () => {
      await db.imageTable.clear();
    }).catch(e => {
      console.error(e.stack || e);
    });
  };
}
