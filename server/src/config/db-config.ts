import { JsonDB } from 'node-json-db';
import { Config } from 'node-json-db/dist/lib/JsonDBConfig';

const connect = () => new JsonDB(new Config(process.env.DB as string, true, true, '/'));

export default connect;
