import type { NextPage } from 'next';
import AddressFooter from 'components/footer/AddressFooter';
import Banner from 'components/landing/BannerComp';
import Brands from 'components/landing/Brands';
import NewArrivals from 'components/landing/NewArrivals';
import { getCarsList } from 'services/data.service';
import styles from 'styles/Landing.module.scss';

const Landing: NextPage = ({ token, cars }: any) => {

  return (
    <div className={styles.container}>
        <Banner />
        <NewArrivals cars={cars} token={token}/>
        <Brands />
        <AddressFooter />
    </div>
  )
};

export default Landing;

export const getServerSideProps = async () => {
  let cars: any = null;
  const response = await getCarsList('take=4&skip=0');
  if (response?.status === 200 && response?.data?.result) {
    cars = response.data.result;
  }
  return {
      props: {
          cars
      }
  }
}
