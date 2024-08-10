/* eslint-disable react-refresh/only-export-components */
import style from './index.module.less';
import { useUserContext } from '@/hooks/userHooks';

/**
*
*/
const Home = () => {
  const { store } = useUserContext();
  console.log('home store', store);
  return (<div className={style.container}>{store.tel}</div>);
};

export default Home;
