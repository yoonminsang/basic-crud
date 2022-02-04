import connect from '@/config/db-config';
import fs from 'fs';

class TestConnect {
  public clear() {
    const dbPath = `${process.env.DB}.json`;
    try {
      fs.accessSync(dbPath);
      fs.unlinkSync(dbPath);
      // eslint-disable-next-line no-empty
    } catch (e) {}
  }

  public delete() {
    const tables = ['/post'];
    tables.forEach((table) => {
      connect().push(table, []);
    });
  }
}

export default TestConnect;
