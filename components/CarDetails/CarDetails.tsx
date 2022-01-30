import { EditRounded } from '@mui/icons-material';
import { Button, Divider } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useWindowSize from '../../hooks/useWindowSize';
import styles from '../../styles/Car.module.scss';
import AddressFooter from '../footer/AddressFooter';

const CarDetails = ({ carDetails }: any) => {
    const router = useRouter();
    const windowDimensions = useWindowSize();

    const shimmer = (w: any, h: any) => `
        <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <defs>
            <linearGradient id="g">
            <stop stop-color="#333" offset="20%" />
            <stop stop-color="#222" offset="50%" />
                <stop stop-color="#333" offset="70%" />
                </linearGradient>
            </defs>
            <rect width="${w}" height="${h}" fill="#333" />
            <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
            <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
        </svg>
    `;

    const toBase64 = (str: any) =>
        typeof window === 'undefined'
            ? Buffer.from(str).toString('base64')
            : window.btoa(str);

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = window?.sessionStorage.getItem('token');
        if(token) {
            setIsLoggedIn(true);
        }
    }, []);

    return (
        <div>
            <div className={styles.container}>
                {
                    isLoggedIn &&
                    <div className={styles.editContainer}>
                        <Button 
                            variant='contained' 
                            className={styles.editBtn}
                            endIcon={<EditRounded />}
                            onClick={() => router.push(`/car/create/${carDetails.id}`)}> 
                            Edit 
                        </Button>
                    </div>
                }
                <div className={styles.titleContainer}>
                    <span className={styles.title}>{carDetails.name} ( {carDetails.model} )</span>
                    <div className={styles.status} style={{backgroundColor: carDetails.is_sold ? 'red' : ''}}>
                        <span>{ carDetails.is_sold ? 'Sold Out' : 'Available' }</span>
                    </div>
                </div>
                    <Divider variant='middle' className={styles.divider} />
                <div className={styles.detailsContainer}>
                    <div className={styles.imagesContainer}>
                        <Image
                            priority
                            src={carDetails.preview_url}
                            alt='preview'
                            width={windowDimensions.width < 1650 ? 400 : 600}
                            height={windowDimensions.width < 1650 ? 300 : 500}
                            layout={'responsive'}
                            objectFit='contain'
                            placeholder='blur'
                            blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}/>
                                
                        <div className={styles.moreImagesContainer}>
                            {
                                carDetails.more_image_urls?.map((url: string, i: number) => {
                                    return <div className={styles.imageContainer} key={'img-' + i}>
                                        <Image
                                            src={carDetails.preview_url}
                                            width={110}
                                            height={90}
                                            alt='preview'
                                            layout='fixed'
                                            placeholder='blur'
                                            blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}/>
                                            
                                    </div>
                                })
                            }
                        </div>
                    </div>
                    <div className={styles.detailsContainer}>
                        <div className={styles.detailTitleContainer}>
                            <span>General Information</span>
                            <Divider variant='middle' className={styles.divider} />
                        </div>
                        <div className={styles.detail}>
                            <span>Brand:</span>
                            <span>{carDetails.brand}</span>
                        </div>
                        <Divider variant='middle' className={styles.detailsDivider} />
                        <div className={styles.detail}>
                            <span>Model:</span>
                            <span>{carDetails.model}</span>
                        </div>
                        <Divider variant='middle' className={styles.detailsDivider} />
                        <div className={styles.detail}>
                            <span>Type:</span>
                            <span>{carDetails.type}</span>
                        </div>
                        <Divider variant='middle' className={styles.detailsDivider} />
                        <div className={styles.detail}>
                            <span>Color:</span>
                            <span>{carDetails.color}</span>
                        </div>
                        <Divider variant='middle' className={styles.detailsDivider} />
                        <div className={styles.detail}>
                            <span>Steering Position:</span>
                            <span>{carDetails.steering_position}</span>
                        </div>
                        <Divider variant='middle' className={styles.detailsDivider} />
                        <div className={styles.detail}>
                            <span>Transmission:</span>
                            <span>{carDetails.transmission}</span>
                        </div>
                        <Divider variant='middle' className={styles.detailsDivider} />
                        <div className={styles.detail}>
                            <span>Fuel Type:</span>
                            <span>{carDetails.fuel_type}</span>
                        </div>
                        <Divider variant='middle' className={styles.detailsDivider} />
                        <div className={styles.detail}>
                            <span>Key</span>
                            <span>{carDetails.key}</span>
                        </div>
                        <Divider variant='middle' className={styles.detailsDivider} />
                        <div className={styles.detail}>
                            <span>Engine Power:</span>
                            <span>{carDetails.engine_power} kW</span>
                        </div>
                        <Divider variant='middle' className={styles.detailsDivider} />
                        <div className={styles.detail}>
                            <span>Engine Capacity:</span>
                            <span>{carDetails.engine_capacity} cc</span>
                        </div>
                        <Divider variant='middle' className={styles.detailsDivider} />
                        <div className={styles.detail}>
                            <span>Mileage:</span>
                            <span>{carDetails.mileage} km</span>
                        </div>
                        <Divider variant='middle' className={styles.detailsDivider} />
                        <div className={styles.detail}>
                            <span>Description:</span>
                            <span className={styles.description}>{carDetails.description}</span>
                        </div>
                        <Divider variant='middle' className={styles.detailsDivider} />
                    </div>
                </div>
            </div>
            <AddressFooter />
        </div>
    )
}

export default CarDetails;
