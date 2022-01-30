import React from 'react';
import AddressFooter from '../../components/footer/AddressFooter';
import CarList from '../../components/home/CarList';
import SearchArea from '../../components/home/SearchArea';
import { getCarsList, getDropDownData } from '../../services/data.service';
import styles from '../../styles/Cars.module.scss';

const Cars = ({ token, cars, haveMore, dropDownData }: any) => {
  return (
      <div className={styles.container}>
        <SearchArea dropDownData={dropDownData}/>
        <div className={styles.carListContainer}>
            <CarList token={token} cars={cars} haveMore={haveMore}/>
        </div>
        <div className={styles.footerContainer}>
            <AddressFooter />
        </div>
      </div>
  );
}

export default Cars;

export const getServerSideProps = async (ctx: any) => {
    const { params } = ctx
    let cars: any = null;
    let haveMore = false;
    let dropDownData: any = null;
    const response = await getCarsList(`take=8&skip=${(params.page - 1) * 8}`);
    const dropDownResults = await getDropDownData();
    if (dropDownResults?.status === 200 && dropDownResults?.data) {
        dropDownData = dropDownResults.data;
    }
    if (response?.status === 200 && response?.data?.result) {
        cars = response.data.result;
        if (params.page < 2) {
            haveMore = response.data?.count < response.data.total;
        } else {
            haveMore = response.data?.total > (response.data?.count + ((params.page - 1) * 8));
        }
    }
    return {
        props: {
            cars,
            haveMore,
            dropDownData
        }
    }
}
