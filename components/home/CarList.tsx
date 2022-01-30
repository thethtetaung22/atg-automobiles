import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { Button, Divider } from "@mui/material";
import { useRouter } from "next/router";
import styles from '../../styles/CarList.module.scss';
import CarCard from "../CarCard";

const CarList = ({ token, cars, haveMore }: any) => {
    const router = useRouter();
    const pageNumber = Number(router?.query?.page);
    
    const handlePaginator = async (action: string) => {
        if (action === 'next') {
            router.push(`/cars/${Number(pageNumber)+1}`)
        } else {
            router.back();
        }
    }

    return (
        <div className={styles.container}>

            <span className={styles.title}> ATG Automobiles </span>

            <Divider variant='middle' className={styles.divider} />

            <div className={styles.carListContainer}>
                {
                    cars?.map((car: any, i: number) => {
                        return (
                            <CarCard  token={token} car={car} key={i}/>
                        )
                    })
                }
            </div>

            <div className={styles.paginator}>
                <Button variant="contained" className={styles.button} startIcon={<ArrowBackIos />} onClick={() => handlePaginator('previous')} disabled={pageNumber <= 1} style={{backgroundColor: pageNumber <= 1 ? 'gray' : ''}}>
                    Previous
                </Button>
                <Button variant="contained" className={styles.button} endIcon={<ArrowForwardIos />} onClick={() => handlePaginator('next')} disabled={!haveMore} style={{backgroundColor: haveMore ? '' : 'gray'}}>
                    Next
                </Button>
            </div>
        </div>
    );
}

export default CarList;
