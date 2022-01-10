import { ArrowForwardIos } from "@mui/icons-material";
import { Button, Divider } from "@mui/material";
import { color } from "@mui/system";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { sampleCarList } from "../../data/sample";
import { getCarsList } from "../../services/data.service";
import styles from '../../styles/CarList.module.scss';

const CarList = () => {
    const router = useRouter();
    const [isLoading, setLoading] = useState(true);
    const [skip, setSkip] = useState(0);
    const [carsList, setCarsList] = useState<any>(null);

    const onViewDetail = (e: any, carId: string) => {
        e.preventDefault();
        router.push(`/car/${carId}`)
    }

    useEffect(() => {
        const fetchCarsList = async () => {
            const response = await getCarsList('take=8&skip=5');
            if (response?.status === 200 && response.data?.result) {
                console.log('CarList:', response.data?.result)
                setCarsList(response.data?.result);
                setLoading(false);
            }
        }
        fetchCarsList();
    }, []);

    if (isLoading) {
        return (
            <div>
                Loading...
            </div>
        )
    }

    return (
        <div className={styles.container}>
            <span className={styles.title}> New Arrivals </span>

            <Divider variant='middle' className={styles.divider} />

            <div className={styles.carListContainer}>
                {
                    carsList?.map((car: any, i: number) => {
                        return (
                            <div className={styles.carContainer} key={car.id}>
                                <div className={styles.previewImage}>
                                    <Image
                                        alt={car.name}
                                        src={car.preview_url}
                                        layout="responsive"
                                        height={200}
                                        width={300}
                                        priority
                                    />
                                </div>
                                <div className={styles.statusContainer} style={{backgroundColor: i ===2 || i==5 ? '#C60021': ''}}>
                                    <span>{i ===2 || i==5 ? 'Sold Out' : 'Available'}</span>
                                </div>

                                <div className={styles.detailsContainer}>
                                    <span className={styles.carName}> {car.name} </span>

                                    <div className={styles.fullDetails}>
                                        <div >
                                            <span>Mileage</span>
                                            <span>{car.mileage || 'N/A'} km</span>
                                        </div>
                                        <Divider variant='middle' />
                                        <div >
                                            <span>Type</span>
                                            <span>{car.type}</span>
                                        </div>
                                        <Divider variant='middle' />
                                        <div >
                                            <span>Fuel Type</span>
                                            <span>{car.fuel_type}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.viewDetailContainer}>
                                    <Button className={styles.viewDetailBtn} variant="contained" endIcon={<ArrowForwardIos/>} onClick={e => onViewDetail(e, car.id)}> View Details </Button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}

export default CarList;
