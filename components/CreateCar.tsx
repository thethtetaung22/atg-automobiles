import { AddCircleRounded, CameraAltOutlined, CloseRounded } from '@mui/icons-material';
import { 
    Backdrop, 
    Button, 
    CircularProgress, 
    FormControl, 
    InputLabel, 
    MenuItem, 
    Select, 
    TextField 
} from '@mui/material';
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
} from '../data/constants';
import { getPresignedURL, uploadToS3 } from '../services/data.service';
import styles from '../styles/CreateCar.module.scss';
import { validateToken } from '../services/data.service';

const CreateCar = () => {
    const router = useRouter()
    const [previewUrl, setPreviewUrl] = useState<string>();
    const [moreImages, setMoreImages] = useState<string[]>([]);
    const [showLoading, setShowLoading] = useState<boolean>(false);
    const [type, setType] = useState<string>(carTypes[0]);
    const [customType, setCustomType] = useState<string>();
    const [steeringPosition, setSteeringPosition] = useState<string>(carSteeringPosition[0]);
    const [transmission, setTransmission] = useState<string>(transmissions[0]);
    const [keyType, setKeyType] = useState<string>(keyTypes[0]);
    const [fuelType, setFuelType] = useState<string>(fuelTypes[0]);
    const [color, setColor] = useState<string>(colors[0]);
    const [otherColor, setOtherColor] = useState<string>();

    const checkLoginState = async (token: string|null) => {
        let isValid: any;

        if(token) {
            isValid = await validateToken(token);
        }

        if (!token || !isValid) {
            window?.sessionStorage.removeItem('token');
            router.replace('/').then(() => {
                router.reload();
            });
        }
    }

    const onDrop = useCallback(async (acceptedFiles, isPreview: boolean = false) => {
        if (acceptedFiles.length > 0) {
            setShowLoading(true);
        }
        for (let i = 0; i < acceptedFiles.length; i++) {
            const token = window?.sessionStorage.getItem('token');
            console.log(token)
            if (token) {
                const query = {
                    name: acceptedFiles[i].name,
                    mimeType: acceptedFiles[i].type
                }

                const result = await getPresignedURL(token, query);
                console.log(result);
                if (result?.status === 200 && result.result?.signedRequest) {
                    const uploadResult = await uploadToS3(result.result.signedRequest, acceptedFiles[i], query.mimeType);
                    console.log(uploadResult);
                    if (uploadResult?.status === 200) {
                        if (isPreview) {
                            setPreviewUrl(result.result.url);
                        } else {
                            const images = moreImages;
                            images.push(result.result.url)
                            setMoreImages(images);
                            console.log(moreImages);
                        }
                    }
                    // reader.readAsArrayBuffer(acceptedFiles[i])
                }
            }
        }
        setShowLoading(false);
    }, []);

    const handleFormSubmit = (event: any) => {
        event.preventDefault();
        const { 
            name, 
            brand, 
            model, 
            type, 
            enginePower,
            steeringPosition,
            transmission,
            keyType,
            engineCapacity,
            fuelType,
            color,
            mileage,
            description  
        } = event.target;
        
        // let inputData = {
            //     name: 
            // }
    }

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

    useEffect(() => {
        const token = window?.sessionStorage.getItem('token');
        checkLoginState(token);
    }, []);

    return (
        <div className={styles.container}>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={showLoading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Dropzone onDrop={acceptedFiles => onDrop(acceptedFiles, true)}>
                {({getRootProps, getInputProps}) => (
                    <section>
                        <div {...getRootProps()} className={styles.previewUploadArea}>
                            <input {...getInputProps()} multiple={false} accept='image/*, video/*'/>
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
                    { moreImages.length === 0 && <span className={styles.label}>Add More Images</span>  }
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
                        {({getRootProps, getInputProps}) => (
                            <section>
                                <div {...getRootProps()} className={styles.imagesUploadArea}>
                                    <input {...getInputProps()} multiple={false} accept='image/*, video/*'/>
                                    <div className={styles.body}>
                                        <AddCircleRounded style={{color: '#C60021'}}/>
                                    </div>
                                </div>
                            </section>
                        )}
                    </Dropzone>
            </div>
            <form onSubmit={handleFormSubmit}>
                <TextField id='name' variant='outlined' label='Name' className={styles.textInput} autoFocus={true} placeholder='BMW 5 Series'/>
                <TextField id="brand" variant='outlined' label='Brand' className={styles.textInput} placeholder='BMW'/>
                <TextField id="model" variant='outlined' label='Model (Year)' className={styles.textInput} placeholder='2021'/>
                
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
                    <TextField variant='outlined' value={customType} label='Enter Car Type' className={styles.textInput} placeholder='Sport' onChange={(e) => setCustomType(e.target.value)}/>
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
                    <TextField id="color" value={otherColor} variant='outlined' label='Custom Color' className={styles.textInput} placeholder='Pearl White' onChange={(e) => setOtherColor(e.target.value)}/>
                }
                <TextField id="engineCapacity" variant='outlined' label='Engine Capacity(cc)' className={styles.textInput} placeholder='2354'/>
                <TextField id="enginePower" variant='outlined' label='Engine Power' className={styles.textInput} placeholder='140.00 kW (187 bhp)'/>
                <TextField id="mileage" variant='outlined' label='Mileage' className={styles.textInput} placeholder='111 km'/>
                <TextField id="description" variant='outlined' label='Description' className={styles.descInput} multiline/>
                <Button type="submit" variant='contained' className={styles.createBtn}> Create </Button>
            </form>
        </div>
    )
}

export default CreateCar;
