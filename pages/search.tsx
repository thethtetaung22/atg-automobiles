import { Divider } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import CarCard from '../components/CarCard';
import AddressFooter from '../components/footer/AddressFooter';
import { getCarsList } from '../services/data.service';
import styles from '../styles/SearchResult.module.scss';

const SearchResult = ({ token, cars }: any) => {
    const router = useRouter();
    const query = router.query;

    return (
        <div className={styles.container}>
            <div className={styles.body} style={{minHeight: cars.length < 5 ? '600px': ''}}>
                <span className={styles.title}> Search Results </span>
                <Divider variant='middle' className={styles.divider} />

                {
                    cars?.length > 0 ? 
                        <div className={styles.carsContainer}>
                            {
                                cars?.map((car: any, i: number) => {
                                    return (
                                        <CarCard  token={token} car={car} key={i}/>
                                    )
                                })
                            }
                        </div> :
                        <div className={styles.noResultContainer}>
                            <span>No Result!</span>
                        </div>
                }
            </div>
            <AddressFooter />
        </div>
    );
}

export default SearchResult;

export const getServerSideProps = async (context: any) => {
    const { query } = context;
    const { brand, color, type, model } = query;
    const arr = [];
    if (brand) {
        arr.push(`brand=${brand}`);
    }

    if (color) {
        arr.push(`color=${color}`);
    }

    if (type) {
        arr.push(`type=${type}`)
    }

    if (model) {
        arr.push(`model=${model}`);
    }
    let cars = null;
    const response = await getCarsList(arr.join('&'));
    if (response?.status === 200 && response?.data?.result) {
      cars = response.data.result;
    }
    return {
        props: {
            cars
        }
    }
};
