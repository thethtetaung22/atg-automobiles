import React from 'react';
import AddressFooter from 'components/footer/AddressFooter';
import CarList from 'components/home/CarList';
import SearchArea from 'components/home/SearchArea';
import { getDropDownData } from 'services/data.service';
import styles from 'styles/Cars.module.scss';

const Cars = ({ token, dropDownData }: any) => {

  return (
      <div className={styles.container}>
        <SearchArea dropDownData={dropDownData}/>
        <div className={styles.carListContainer}>
            <CarList token={token} />
        </div>
        <div className={styles.footerContainer}>
            <AddressFooter />
        </div>
      </div>
  );
}

export default Cars;

export const getServerSideProps = async () => {
    let dropDownData: any = null;
    const dropDownResults = await getDropDownData();
    if (dropDownResults?.status === 200 && dropDownResults?.data) {
        dropDownData = dropDownResults.data;
    }
    return {
        props: {
            dropDownData
        }
    }
}
