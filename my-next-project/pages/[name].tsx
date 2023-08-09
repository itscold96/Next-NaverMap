import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import type { Store } from '../types/store';
import useCurrentStore from '@/hooks/useCurrentStore';
import Home from '.';

interface Props {
  stores: Store[];
  store: Store;
}

const StoreDetail: NextPage<Props> = ({ store, stores }) => {
  const { setCurrentStore } = useCurrentStore();
  setCurrentStore(store);
  return <Home stores={stores} />;
};
export default StoreDetail;

export const getStaticPaths: GetStaticPaths = async () => {
  const stores = (await import('../public/stores.json')).default;
  const paths = stores.map((store) => ({ params: { name: store.name } }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const stores = (await import('../public/stores.json')).default;
  const store = stores.find((store) => store.name === params?.name);

  return { props: { store, stores } };
};
