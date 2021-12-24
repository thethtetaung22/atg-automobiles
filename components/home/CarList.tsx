import { ArrowForwardIos } from "@mui/icons-material";
import { Button, Divider } from "@mui/material";
import { color } from "@mui/system";
import Image from "next/image";
import { useState } from "react";
import { sampleCarList } from "../../data/sample";
import styles from '../../styles/CarList.module.scss';

const CarList = () => {
    const [skip, setSkip] = useState(0);
    const data: any = [];

    for(let i=0; i < 20; i++) {
        data.push({
            id: i+1,
            ...sampleCarList[0]
        });
    }

    return (
        <div className={styles.container}>
            <span className={styles.title}> New Arrivals </span>

            <Divider variant='middle' className={styles.divider} />

            <div className={styles.carListContainer}>
                {
                    data?.map((car: any, i: number) => {
                        return (
                            <div className={styles.carContainer} key={car.id}>
                                <div className={styles.previewImage}>
                                    <Image
                                        alt={car.name}
                                        src={car.previewUrl}
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
                                            <span>{car.fuelType}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.viewDetailContainer}>
                                    <Button className={styles.viewDetailBtn} variant="contained" endIcon={<ArrowForwardIos/>}> View Details </Button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default CarList;
