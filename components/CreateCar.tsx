import { AddCircleRounded, CameraAltOutlined, CloseRounded } from '@mui/icons-material';
import {
    Alert,
    Backdrop,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Slide,
    Snackbar,
    TextField
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import Image from 'next/image';
import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Dropzone from 'react-dropzone';
import {
    carTypes,
    carSteeringPosition,
    colors,
    transmissions,
    keyTypes,
    fuelTypes
} from 'data/constants';
import { createNewCarApi, getPresignedURL, updateCarApi, uploadToS3 } from 'services/data.service';
import styles from 'styles/CreateCar.module.scss';
import { Box } from '@mui/system';
import axios from 'axios';

const CreateCar = ({ token, carDetails }: any) => {
    const router = useRouter();
    
    // Flags
    const [openAlert, setOpenAlert] = useState<boolean>(false);
    const [showLoading, setShowLoading] = useState<boolean>(false);
    const [openSuccessDialog, setOpenSuccessDialog] = useState<boolean>(false);

    // Error
    const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
    const [message, setMessage] = useState<string>();

    // Form Data
    const [name, setName] = useState<string>();
    const [brand, setBrand] = useState<string>();
    const [model, setModel] = useState<any>(new Date());
    const [previewUrl, setPreviewUrl] = useState<string>();
    const [moreImages, setMoreImages] = useState<string[]>([]);
    const [enginePower, setEnginerPower] = useState<number>(0);
    const [mileage, setMileage] = useState<number>(0);
    const [description, setDescription] = useState<string>();

    const [steeringPosition, setSteeringPosition] = useState<string>(carSteeringPosition[0]);
    const [transmission, setTransmission] = useState<string>(transmissions[0]);
    const [fuelType, setFuelType] = useState<string>(fuelTypes[0]);

    const [keyType, setKeyType] = useState<string>(keyTypes[0]);
    const [customKeyType, setCustomKeyType] = useState<string>();

    const [type, setType] = useState<string>(carTypes[0]);
    const [customType, setCustomType] = useState<string>();

    const [color, setColor] = useState<string>(colors[0]);
    const [customColor, setCustomColor] = useState<string>();

    const handleSignOut = () => {
        window?.sessionStorage.removeItem('token');
        router.replace('/').then(() => {
            router.reload();
        });
    }

    const checkToken = (token: string | null) => {
        let isValid: any = true;
        if (token) {
            fetch(`/api/validateToken/${token}`)
                .then(res => res.json())
                .then(data => {
                    isValid = data?.isValid;
                });
        }
        if (!token || !isValid) {
            setOpenAlert(true);
        }
        return true;
    }

    const onDrop = useCallback(async (acceptedFiles, isPreview: boolean = false) => {
        if (acceptedFiles.length > 0) {
            setShowLoading(true);
        }
        for (let i = 0; i < acceptedFiles.length; i++) {

            if (token) {
                const query = {
                    name: acceptedFiles[i].name,
                    mimeType: acceptedFiles[i].type,
                    token
                }

                const { status, data } = await axios.post('/api/getPresignedURL', query);
                if (status === 200 && data?.presignedUrl) {
                    const uploadResult = await uploadToS3(data?.presignedUrl, acceptedFiles[i], query.mimeType);
                    if (uploadResult?.status === 200) {
                        if (isPreview) {
                            setPreviewUrl(data?.url);
                        } else {
                            const images = moreImages;
                            images.push(data?.url)
                            setMoreImages(images);
                        }
                    }
                    // reader.readAsArrayBuffer(acceptedFiles[i])
                }
            }
        }
        setShowLoading(false);
    }, []);

    const handleOnRemove = (e: any, i: number) => {
        e.preventDefault();
        setShowLoading(true);
        const images = moreImages;
        images.splice(i, 1);
        setMoreImages(images);
        setTimeout(() => {
            setShowLoading(false);
        }, 300)
    }

    const handleSnackarClose = () => {
        setOpenSnackbar(false);
        setMessage('');
      };

    const renderSnackar = () => {
        return <Snackbar
            style={{width: '80%', alignSelf: 'center', display: openSnackbar ? '' : 'none'}}
            open={openSnackbar}
            autoHideDuration={5000}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center'}}
            TransitionComponent={(props) => <Slide {...props} direction="up" />}
        >
            <Alert onClose={handleSnackarClose} severity="error" sx={{ width: '100%' }} style={{backgroundColor: '#C60021', color: 'white', display: openSnackbar ? '' : 'none'}}>
                {message}
            </Alert>
        </Snackbar>
    }

    const renderSessionExpireDialog = () => {
        return <Dialog open={openAlert} fullWidth>
            <DialogTitle>Session Expired!</DialogTitle>
            <DialogContent>
                <span>Session expired, please login and try again.</span>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleSignOut} variant="contained" color='error'>
                    Sign Out
                </Button>
            </DialogActions>
        </Dialog>
    }

    const renderCreateSuccessDialog = () => {
        return <Dialog open={openSuccessDialog} fullWidth>
        <DialogTitle>Success!</DialogTitle>
        <DialogContent>
            <span>{ carDetails ? 'Car details updated successfully!' : 'New car is created successfully!' }</span>
        </DialogContent>
        <DialogActions>
            <Button onClick={() => {
                setOpenSuccessDialog(false);
                router.replace('/showroom');
            }} color="error">
                OK
            </Button>
        </DialogActions>
    </Dialog>
    }

    const checkFormValidation = () => {
        let isValid = true;
        let errorMessage = '';
        if (!previewUrl) {
            isValid = false;
            errorMessage = 'Preview Image is required.';
        } else if (!name) {
            isValid = false;
            setName('');
            errorMessage = 'Name is required.';
        } else if (!brand) {
            isValid = false;
            setBrand('');
            errorMessage = 'Brand is required.';
        } else if (type.toLowerCase() === 'other' && !customType) {
            isValid = false;
            setCustomType('');
            errorMessage = 'Custom Car Type is required.';
        } else if(color.toLowerCase() === 'other' && !customColor) {
            isValid = false;
            setCustomColor('');
            errorMessage = 'Custom Color is required.';
        } else if(keyType.toLowerCase() === 'other' && !customKeyType) {
            isValid = false;
            setCustomKeyType('');
            errorMessage = 'Custom Key Type is required.';
        } else if (!enginePower || enginePower === 0) {
            isValid = false;
            errorMessage = 'Engine Power is required.';
        }
        if(!isValid) {
            setMessage(errorMessage);
            setOpenSnackbar(true);
        }
        return isValid;
    }

    const handleFormSubmit = async (event: any) => {
        event.preventDefault();
        const isValid = checkFormValidation();
        if (isValid) {
            let reqBody: any = {
                name,
                preview_url: previewUrl,
                more_image_urls: moreImages,
                brand,
                model: new Date(model)?.getFullYear(),
                type: type.toLowerCase() === 'other' ? customType : type,
                steering_position: steeringPosition,
                transmission: transmission,
                key: keyType,
                engine_capacity: 0,
                engine_power: enginePower,
                fuel_type: fuelType,
                color: color.toLowerCase() === 'other' ? customColor : color,
                mileage: mileage,
                description: description
            };
    
            const token = window?.sessionStorage.getItem('token');
            if (token) {
                setShowLoading(true);
                const isValid = await checkToken(token);
                setShowLoading(false);
                if (isValid) {
                    setShowLoading(true);
                    let result: any;
                    if (carDetails) {
                        result = await axios.put(`/api/cars/${carDetails.id}`, reqBody, {
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${token}`
                            }
                        });
                    } else {
                        result = await axios.post('/api/cars', reqBody, {
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${token}`
                            }
                        });
                    }
                    if (result.status === 201 || result.status === 200) {
                        setShowLoading(false);
                        setOpenSuccessDialog(true);
                    }
                }
            }
        }
    }

    useEffect(() => {
        if (token) {
            checkToken(token);
        }
        if(carDetails) {
            setPreviewUrl(carDetails.preview_url);
            setMoreImages(carDetails.more_image_urls);
            setName(carDetails.name);
            setBrand(carDetails.brand);
            setColor(carDetails.color);
            setModel(new Date().setFullYear(carDetails.model));
            setEnginerPower(carDetails.engine_power);
            setFuelType(carDetails.fuel_type);
            setMileage(carDetails.mileage);
            setDescription(carDetails.description);
            setTransmission(carDetails.transmission);
            setSteeringPosition(carDetails.steering_position);
    
            if (carTypes.includes(carDetails.type)) {
                setType(carDetails.type);
            } else {
                setType('Other');
                setCustomType(carDetails.type);
            }

            if (keyTypes.includes(carDetails.key)) {
                setKeyType(carDetails.key);
            } else {
                setKeyType('Other');
                setCustomKeyType(carDetails.key);
            }

            if (colors.includes(carDetails.color)) {
                setColor(carDetails.color);
            } else {
                setColor('Other');
                setCustomColor(carDetails.color);
            }
        }
    }, []);

    return (
        <div className={styles.container}>
            {
                renderSessionExpireDialog()
            }
            {
                renderCreateSuccessDialog()
            }

            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={showLoading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>

            {
                renderSnackar()
            }
            <Dropzone onDrop={acceptedFiles => onDrop(acceptedFiles, true)}>
                {({ getRootProps, getInputProps }) => (
                    <section>
                        <div {...getRootProps()} className={styles.previewUploadArea}>
                            <input {...getInputProps()} multiple={false} accept='image/*, video/*' />
                            {
                                previewUrl &&
                                <Image
                                    src={previewUrl}
                                    alt={'preview'}
                                    width={200}
                                    height={160}
                                />
                            }
                            <div className={styles.body}>
                                <CameraAltOutlined />
                                {!previewUrl && <span> Upload Preview</span>}
                            </div>
                        </div>
                    </section>
                )}
            </Dropzone>

            <div className={styles.moreImgContainer}>
                <div className={styles.imagesContainer}>
                    {moreImages.length === 0 && <span className={styles.label}>Add More Images</span>}
                    {
                        moreImages?.map((image, i) => {
                            return image &&
                                <div className={styles.image} key={image}>
                                    <div className={styles.removeBtn} onClick={(e) => handleOnRemove(e, i)}>
                                        <CloseRounded />
                                    </div>
                                    <Image
                                        src={image}
                                        alt={`image-${i}`}
                                        width={100}
                                        height={100}
                                    />
                                </div>
                        })
                    }
                </div>
                <Dropzone onDrop={acceptedFiles => onDrop(acceptedFiles)}>
                    {({ getRootProps, getInputProps }) => (
                        <section>
                            <div {...getRootProps()} className={styles.imagesUploadArea}>
                                <input {...getInputProps()} multiple={false} accept='image/*, video/*' />
                                <div className={styles.body}>
                                    <AddCircleRounded style={{ color: '#C60021' }} />
                                </div>
                            </div>
                        </section>
                    )}
                </Dropzone>
            </div>

            <Box className={styles.form} component={'form'} onSubmit={handleFormSubmit}>
                <TextField
                    error={name?.trim().length === 0}
                    helperText={name?.trim().length === 0 ? 'Name is required.' : ''}
                    id='name'
                    variant='outlined'
                    label='Name'
                    className={styles.textInput}
                    autoFocus={true}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder='BMW 5 Series' />

                <TextField
                    error={brand?.trim().length === 0}
                    helperText={brand?.trim().length === 0 ? 'Brand is required.' : ''}
                    id="brand"
                    variant='outlined'
                    label='Brand'
                    className={styles.textInput}
                    placeholder='BMW'
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)} />

                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        views={['year']}
                        label="Model"
                        value={model}
                        onChange={(newValue) => {
                            if (newValue) {
                                setModel(newValue);
                            }
                        }}
                        minDate={new Date('1990-1-1')}
                        maxDate={new Date()}
                        renderInput={(params) => <TextField {...params} helperText={null} className={styles.textInput} />}
                    />
                </LocalizationProvider>

                <FormControl fullWidth className={styles.textInput}>
                    <InputLabel id="type-select-label">Type</InputLabel>
                    <Select
                        labelId='type-select-label'
                        label="Type"
                        value={type}
                        onChange={(e) => setType(e.target.value)}>
                        {
                            carTypes.map((type: string, i: number) => {
                                return <MenuItem value={type} key={i}>{type}</MenuItem>
                            })
                        }
                    </Select>
                </FormControl>

                {
                    type?.toLowerCase() === 'other' &&
                    <TextField 
                        error={customType?.trim().length === 0}
                        helperText={customType?.trim().length === 0 ? 'Custom Type is required.' : ''}
                        id='custom-type'
                        variant='outlined' 
                        label='Enter Car Type' 
                        className={styles.textInput} 
                        placeholder='Sport' 
                        value={customType} 
                        onChange={(e) => setCustomType(e.target.value)} />
                }

                <FormControl fullWidth className={styles.textInput}>
                    <InputLabel id="position-select-label">Steering Position</InputLabel>
                    <Select
                        labelId='position-select-label'
                        label='Steering Position'
                        value={steeringPosition}
                        onChange={(e) => setSteeringPosition(e.target.value)}>
                        {
                            carSteeringPosition.map((type: string, i: number) => {
                                return <MenuItem value={type} key={i}>{type}</MenuItem>
                            })
                        }
                    </Select>
                </FormControl>

                <FormControl fullWidth className={styles.textInput}>
                    <InputLabel id="transmission-select-label">Transmission</InputLabel>
                    <Select
                        labelId='transmission-select-label'
                        label="Transmission"
                        value={transmission}
                        onChange={(e) => setTransmission(e.target.value)}>
                        {
                            transmissions.map((data: string, i: number) => {
                                return <MenuItem value={data} key={i}>{data}</MenuItem>
                            })
                        }
                    </Select>
                </FormControl>

                <FormControl fullWidth className={styles.textInput}>
                    <InputLabel id="key-select-label">Key Type</InputLabel>
                    <Select
                        labelId='key-select-label'
                        label='Key Type'
                        value={keyType}
                        onChange={(e) => setKeyType(e.target.value)}>
                        {
                            keyTypes.map((type: string, i: number) => {
                                return <MenuItem value={type} key={i}>{type}</MenuItem>
                            })
                        }
                    </Select>
                </FormControl>

                {
                    keyType?.toLowerCase() === 'other' &&
                    <TextField 
                        error={customKeyType?.trim().length === 0}
                        helperText={customKeyType?.trim().length === 0 ? 'Custom Key Type is required.' : ''}
                        id='custom-key-type'
                        variant='outlined' 
                        label='Enter Key Type' 
                        className={styles.textInput}
                        value={customKeyType} 
                        onChange={(e) => setCustomKeyType(e.target.value)} />
                }

                <FormControl fullWidth className={styles.textInput}>
                    <InputLabel id="fuel-select-label">Fuel Type</InputLabel>
                    <Select
                        labelId='fuel-select-label'
                        label='Fuel Type'
                        value={fuelType}
                        onChange={(e) => setFuelType(e.target.value)}>
                        {
                            fuelTypes.map((type: string, i: number) => {
                                return <MenuItem value={type} key={i}>{type}</MenuItem>
                            })
                        }
                    </Select>
                </FormControl>

                <FormControl fullWidth className={styles.textInput}>
                    <InputLabel id="color-select-label">Color</InputLabel>
                    <Select
                        labelId='color-select-label'
                        label='Color'
                        value={color}
                        onChange={(e) => setColor(e.target.value)}>
                        {
                            colors.map((type: string, i: number) => {
                                return <MenuItem value={type} key={i}>{type}</MenuItem>
                            })
                        }
                    </Select>
                </FormControl>

                {
                    color?.toLowerCase() === 'other' &&
                    <TextField 
                        className={styles.textInput} 
                        error={customColor?.trim().length === 0}
                        helperText={customColor?.trim().length === 0 ? 'Custom Color is required.' : ''}
                        id="custom-color" 
                        label='Custom Color' 
                        variant='outlined' 
                        placeholder='Pearl White' 
                        value={customColor} 
                        onChange={(e) => setCustomColor(e.target.value)} />
                }

                <TextField 
                    id="enginePower" 
                    variant='outlined' 
                    label='Engine Power' 
                    className={styles.textInput} 
                    placeholder='140.00 kW (187 bhp)'
                    type={'number'}
                    value={enginePower}
                    onChange={(e) => {
                        setEnginerPower(parseInt(e.target.value));
                    }}/>

                <TextField 
                    id="mileage" 
                    variant='outlined' 
                    label='Mileage' 
                    className={styles.textInput} 
                    placeholder='111 km' 
                    type={'number'}
                    value={mileage}
                    onChange={(e) => {
                        setMileage(parseInt(e.target.value));
                    }}/>

                <TextField 
                    id="description" 
                    variant='outlined' 
                    label='Description' 
                    className={styles.descInput} 
                    multiline
                    maxRows={5}
                    value={description}
                    onChange={(e) => {
                        setDescription(e.target.value);
                    }}/>
                <Button type="submit" variant='contained' className={styles.createBtn}> {carDetails ? 'Update' : 'Create'} </Button>
            </Box>
        </div>
    )
}

export default CreateCar;
