import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import AddressFooter from '../components/footer/AddressFooter';
import Banner from '../components/landing/BannerComp';
import Brands from '../components/landing/Brands';
import LandingNav from '../components/landing/LandingNav';
import NewArrivals from '../components/landing/NewArrivals';
import SideNav from '../components/sidenav';
import useScrollSize from '../hooks/useScrollSize';
import { getCarsList } from '../services/data.service';
import styles from '../styles/Landing.module.scss';

const Landing: NextPage = ({ token, cars }: any) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNav = () => {
    setIsOpen(!isOpen);
  }

  return (
    <div className={styles.container}>
        <LandingNav token={token} toggle={toggleNav} />
        <SideNav isOpen={isOpen} toggle={toggleNav} isLoggedIn={!!token}/>
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
