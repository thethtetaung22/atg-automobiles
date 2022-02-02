import { ArrowForwardIos, MoreHoriz } from '@mui/icons-material';
import { 
    Button, 
    Card, 
    Dialog, 
    DialogActions, 
    DialogContent, 
    DialogTitle, 
    Divider, 
    IconButton, 
    Menu, 
    MenuItem 
} from '@mui/material';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import styles from 'styles/CarCard.module.scss';
import { shimmer, toBase64 } from './common';

const CarCard = ({ token, car, bgTransparent }: any) => {
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
                const result = await axios.delete(`/api/cars/${menuActiveCar.id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (result?.status === 204) {
                    setSuccessMessage('Your car is deleted successfully!');
                    setOpenSuccessDialog(true);
                }
            } else if (action === 'sold') {
                const result = await axios.put(`/api/cars/${menuActiveCar.id}`, { is_sold: !menuActiveCar.is_sold }, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
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
        <Card className={styles.carContainer} key={car.id} style={{background: bgTransparent ? 'transparent': ''}}>
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
