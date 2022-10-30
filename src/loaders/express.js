import bodyParser from 'body-parser';
import authRoutes from '../express/routes/auth';

export default function ExpressLoader(app) {
  app.use(bodyParser.json());
  authRoutes(app);
}
