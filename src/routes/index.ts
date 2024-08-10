import Login from '@/containers/Login';
import Home from '@/containers/Home';

export const ROUTE_CONFIG = [
  {
    key: 'home',
    path: '/',
    element: Home,
    title: '首页',
  },
  {
    key: 'login',
    path: '/login',
    element: Login,
    title: '登录',
  },
];