import React, { useState } from 'react';
import AddressFooter from 'components/footer/AddressFooter';
import CarList from 'components/home/CarList';
import SearchArea from 'components/home/SearchArea';
import { getDropDownData } from 'services/data.service';
import styles from 'styles/Showroom.module.scss';
import useSWR from "swr"; 
import { Button } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';

const Cars = ({ token, dropDownData }: any) => {
    const [page, setPage] = useState(0);
    const fetcher = (url: any) => fetch(url).then((res) => res.json());
    const { data , error } = useSWR(
            `/api/cars?take=8&skip=${page * 8}`, 
        fetcher
    );
    const handlePaginator = async (action: string) => {
        if (action === 'next') {
            setPage(page + 1);
        } else {
            setPage(page - 1);
        }
    };

    if (!data) {
        return <>Loading...</>
    }

    return (
        <div className={styles.container}>
            <SearchArea dropDownData={dropDownData}/>
            <div className={styles.carListContainer}>
                {
                    data && <CarList token={token} cars={data?.result?.cars}/>
                }
                <div className={styles.paginator}>
                    <Button variant="contained" className={styles.button} startIcon={<ArrowBackIos />} onClick={() => handlePaginator('previous')} disabled={page === 0} style={{backgroundColor: page === 0 ? 'gray' : ''}}>
                        Previous
                    </Button>
                    <Button variant="contained" className={styles.button} endIcon={<ArrowForwardIos />} onClick={() => handlePaginator('next')} disabled={!data?.result?.hasMore} style={{backgroundColor: data?.result?.hasMore ? '' : 'gray'}}>
                        Next
                    </Button>
                </div>
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
