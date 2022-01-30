import { ArrowForwardIos, MoreHoriz } from '@mui/icons-material';
import { Button, Card, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, Menu, MenuItem } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { deleteCarApi, updateCarApi } from '../services/data.service';
import styles from '../styles/CarCard.module.scss';

const CarCard = ({ token, car }: any) => {

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

    const router = useRouter()
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [menuActiveCar, setMenuActiveCar] = useState<any>();
    
    const [successMessage, setSuccessMessage] = useState<string>('');
    const [openSuccessDialog, setOpenSuccessDialog] = useState<boolean>(false);

    const handleClick = (event: any, car: any) => {
        setAnchorEl(event.currentTarget);
        setMenuActiveCar(car);
    };

    const onViewDetail = (e: any, carId: string) => {
        e.preventDefault();
        router.push(`/car/${carId}`)
    }

    
    const handleClose = () => {
        setAnchorEl(null);
    };

    const renderCreateSuccessDialog = () => {
        return <Dialog open={openSuccessDialog} fullWidth>
            <DialogTitle>Success!</DialogTitle>
            <DialogContent>
                <span>{ successMessage }</span>
            </DialogContent>
            <DialogActions>
                <Button color="error" onClick={() => {
                    setSuccessMessage('');
                    setOpenSuccessDialog(false);
                    router.reload();
                }}>
                    OK
                </Button>
            </DialogActions>
        </Dialog>
    }

    const handleMenuClick = async (action: string) => {
        if (menuActiveCar) {
            if (action === 'delete') {
                const result = await deleteCarApi(token, menuActiveCar.id);
                if (result?.status === 200) {
                    setSuccessMessage('Your car is deleted successfully!');
                    setOpenSuccessDialog(true);
                }
            } else if (action === 'sold') {
                const result = await updateCarApi(token, menuActiveCar.id, { is_sold: !menuActiveCar.is_sold });
                if (result?.status === 200) {
                    setSuccessMessage('Your car is sold successfully!');
                    setOpenSuccessDialog(true);
                }
            } else if (action === 'edit') {
                router.push(`/car/create/${menuActiveCar.id}`)
            }
            setAnchorEl(null);
        }
    }

    const renderMenu = () => {
        return <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
            'aria-labelledby': 'basic-button',
            }}
        >
            <MenuItem onClick={() => handleMenuClick('sold')}>{ menuActiveCar?.is_sold ? 'Make Available' : 'Make Sold' }</MenuItem>
            <MenuItem onClick={() => handleMenuClick('edit')}>Edit</MenuItem>
            <MenuItem onClick={() => handleMenuClick('delete')}>Delete</MenuItem>
        </Menu>
    }



    return (
        <Card className={styles.carContainer} key={car.id}>
            {
                renderCreateSuccessDialog()
            }
            {
                renderMenu()
            }
            {
                token && <div className={styles.editBtn}>
                    <IconButton
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={(e) => handleClick(e, car)}
                    >
                        <MoreHoriz />
                    </IconButton>
                </div>
            }
            <div className={styles.previewImage}>
                <Image
                    alt={car.name}
                    src={car.preview_url}
                    layout="responsive"
                    height={120}
                    width={180}
                    priority
                    placeholder='blur'
                    blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
                />
            </div>
            <div className={styles.statusContainer} style={{backgroundColor: car.is_sold ? '#C60021': ''}}>
                <span>{car.is_sold ? 'Sold Out' : 'Available'}</span>
            </div>

            <div className={styles.detailsContainer}>
                <span className={styles.carName}> {car.name} </span>

                <div className={styles.fullDetails}>
                    <div >
                        <span>Mileage</span>
                        <span>{car.mileage} km</span>
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
                <Button
                className={styles.viewDetailBtn} variant="contained" endIcon={<ArrowForwardIos/>} onClick={e => onViewDetail(e, car.id)}> View Details </Button>
            </div>
        </Card>
    );
}

export default CarCard;
