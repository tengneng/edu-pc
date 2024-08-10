import { useQuery } from '@apollo/client';
import { connectFactory, useAppContext } from '../utils/contextFactory';
import { GET_USER } from '@/graphql/user';
import { IUser } from '../utils/types';
import { useNavigate, useLocation } from 'react-router-dom';

const KEY = 'userInfo';
const DEFAULT_VALUE = {

};

export const useUserContext = () => useAppContext(KEY);

export const connect = connectFactory(KEY, DEFAULT_VALUE);

export const useGetUser = () => {
  const { setStore } = useUserContext();
  const location = useLocation();
  const nav = useNavigate();
  const { loading } = useQuery<{ getUserInfo: IUser }>(GET_USER, {
    onCompleted: (data) => {
      if(data.getUserInfo) {
        const { id, name, tel } = data.getUserInfo;
        setStore({id, name, tel});
        if(location.pathname.startsWith('/login')) {
          nav('/');
        }
        return;
      }
      if(location.pathname !== '/login') {
        nav(`/login?orgUrl=${window.location.pathname}`);
      }
    },
    onError: () => {
      if(location.pathname !== '/login'){
        nav(`/login?orgUrl=${window.location.pathname}`);
      }
    }
  })
  return { loading };
}