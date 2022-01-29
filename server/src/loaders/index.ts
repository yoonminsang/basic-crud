import { Application } from 'express';
import expressLoader from './express-loader';

const loaders = async (app: Application): Promise<void> => {
  expressLoader(app);
  console.info('express load');
};

export default loaders;
