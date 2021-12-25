import { Card } from '@mui/material';
import Image from 'next/image';
import styles from '../../styles/Car.module.scss';
import { sampleCarList } from "../../data/sample";

const Car = ({ carId }: any) => {
    console.log(carId);
    const car = sampleCarList[0];

    return (
        <div className={styles.container}>
            <Card className={styles.topCard}>

                <span className={styles.carName}>{car.name}</span>
                
                <Card className={styles.imagesCard}>
                    <div className={styles.previewImage}>
                        <Image
                            alt={car.name}
                            src={car.previewUrl}
                            layout='fixed'
                            height={120}
                            width={200}
                        />
                    </div>
                    <div className={styles.moreImagesContainer}>

                    </div>
                </Card>
            </Card>
        </div>
    )
}

export default Car
