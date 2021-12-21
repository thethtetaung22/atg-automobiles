import { Divider } from "@mui/material";
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
                                        src={car.previewUrl}
                                        layout="responsive"
                                        height={200}
                                        width={300}
                                        priority
                                    />
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
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default CarList;
