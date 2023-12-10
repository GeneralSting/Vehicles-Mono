import { Models, NewModel, EditModel } from '../pages/vehicleModels';
import { Navigate } from 'react-router-dom';
import PageNotFound from '../pages/PageNotFound';
import { AppRoute } from '../interfaces/AppRoute';

const routes: AppRoute[] = [
  {
    path: '/',
    element: <Navigate to="/models" />
  },
  {
    path: '/models',
    element: <Models />
  },
  {
    path: '/models/new',
    element: <NewModel />
  },
  {
    path: '/models/:modelId',
    element: <EditModel />
  },
  {
    path: '*',
    element: <PageNotFound />
  }
];

export default routes;