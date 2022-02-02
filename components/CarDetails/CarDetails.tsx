import { EditRounded, MessageOutlined, Phone } from '@mui/icons-material';
import { Button, Divider } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import useWindowSize from 'hooks/useWindowSize';
import styles from 'styles/Car.module.scss';
import { shimmer, toBase64 } from 'components/common';
import AddressFooter from 'components/footer/AddressFooter';
import FullScreenImage from './FullScreenImage';

const CarDetails = ({ carDetails }: any) => {
    const router = useRouter();
    const windowDimensions = useWindowSize();
    const isMobile = windowDimensions.width <= 700;
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isOpenFullView, setOpenFullView] = useState(false);
    const [fullViewImages, setFullViewImages] = useState<any>(null);
    const [fullViewIndex, setFullViewIndex] = useState(0);

    const handleOnImageClick = (e: any, i: number) => {
        e.preventDefault();
        const images = [carDetails.preview_url, ...carDetails.more_image_urls];
        setFullViewImages(images);
        setOpenFullView(true);
        setFullViewIndex(i)
    }

    const closeFullView = () => {
        setOpenFullView(false);
    }

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
                    isOpenFullView &&
                    <FullScreenImage images={fullViewImages} index={fullViewIndex} toggle={closeFullView}/> 
                }
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

                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <div className={styles.button}>
                            <a href="tel:+959777555881">
                                <Phone fontSize={isMobile ? 'medium' : 'small'} /> 
                                <span style={{paddingLeft: '5px', display: isMobile ? 'none' : ''}}>Call Us</span>
                            </a>
                        </div>
                        <div className={styles.button}>
                            <a href="sms://+959777555881">
                                <MessageOutlined fontSize={isMobile ? 'medium' : 'small'} /> 
                                <span style={{paddingLeft: '5px', display: isMobile? 'none': ''}}>Send Message</span>
                            </a>
                        </div>
                        <div className={styles.status} style={{backgroundColor: carDetails.is_sold ? 'red' : ''}}>
                            <span>{ carDetails.is_sold ? 'Sold Out' : 'Available' }</span>
                        </div>
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
                            blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
                            onClick={(e) => handleOnImageClick(e, 0)}
                        />
                        <div className={styles.moreImagesContainer} style={{display: isMobile && carDetails.more_image_urls?.length === 0 ? 'none' : '' }}>
                            {
                                carDetails.more_image_urls?.map((url: string, i: number) => {
                                    return <div className={styles.imageContainer} key={'img-' + i} onClick={(e) => handleOnImageClick(e, i+1)}>
                                        <Image
                                            src={url}
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
