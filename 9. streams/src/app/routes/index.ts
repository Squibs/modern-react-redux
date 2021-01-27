import {
  StreamList,
  PageNotFound,
  StreamCreate,
  StreamEdit,
  StreamDelete,
  StreamShow,
} from '../views/pages';

const routes = [
  {
    path: '/',
    component: StreamList,
    exact: true,
  },
  {
    path: '/streams/new',
    component: StreamCreate,
    exact: true,
  },
  {
    path: '/streams/edit',
    component: StreamEdit,
    exact: true,
  },
  {
    path: '/streams/delete',
    component: StreamDelete,
    exact: true,
  },
  {
    path: '/streams/show',
    component: StreamShow,
    exact: true,
  },
  {
    path: '*', // 404 page / 404.tsx - does not actually send out a 400 status code, sends out 200. Soft 404 page.
    component: PageNotFound,
  },
];

export default routes;
