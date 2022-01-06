import { CameraAltOutlined } from '@mui/icons-material';
import { Button, FormControl, InputLabel, MenuItem, Paper, Select, TextField } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react'
import Dropzone, { useDropzone } from 'react-dropzone';
import { carTypes, carSteeringPosition, colors, transmissions, keyTypes, fuelTypes } from '../data/constants';
import { createMedia, uploadToS3, validateToken } from '../services/data.service';
import styles from '../styles/CreateCar.module.scss';

const CreateCar = () => {
    const [token, setToken] = useState<string>();
    const [type, setType] = useState<string>(carTypes[0]);
    const [customType, setCustomType] = useState<string>();
    const [steeringPosition, setSteeringPosition] = useState<string>(carSteeringPosition[0]);
    const [transmission, setTransmission] = useState<string>(transmissions[0]);
    const [keyType, setKeyType] = useState<string>(keyTypes[0]);
    const [fuelType, setFuelType] = useState<string>(fuelTypes[0]);
    const [color, setColor] = useState<string>(colors[0]);
    const [otherColor, setOtherColor] = useState<string>();

    const validateSessionToken = async (token?: string|null) => {
        try {
            if (token && await validateToken(token)) {
                setToken(token);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const onDrop = useCallback(async (acceptedFiles, isPreview?: boolean) => {
        for (let i = 0; i < acceptedFiles.length; i++) {
            const reader = new FileReader();

            if (typeof token === 'string') {
                const obj = {
                    name: acceptedFiles[i].name,
                    mimeType: acceptedFiles[i].type,
                    size: Number(acceptedFiles[i].size)
                }

                const result = await createMedia(token, obj);

                if (result?.status === 201 && result.result) {
                    reader.onabort = () => console.log('file reading was aborted')
                    reader.onerror = () => console.log('file reading has failed')
                    reader.onload = async () => {
                        const binaryStr = reader.readAsBinaryString(acceptedFiles[i])
                        console.log(binaryStr)
                        const uploadResult = await uploadToS3(result.result.presignedUrl, binaryStr);
                        console.log(uploadResult);
                    }
                    // reader.readAsArrayBuffer(acceptedFiles[i])
                }
            }
        }
    }, []);

    useEffect(() => {
        const token = window?.sessionStorage.getItem('token');
        validateSessionToken(token);
    }, [token]);

    const handlePreviewUpload = () => {

    }

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

    return (
        <div className={styles.container}>
            <Dropzone onDrop={acceptedFiles => onDrop(acceptedFiles, true)}>
                {({getRootProps, getInputProps}) => (
                    <section>
                        <div {...getRootProps()} className={styles.previewUploadArea}>
                            <input {...getInputProps()} multiple={false} accept='image/*, video/*'/>
                            <CameraAltOutlined /><span> Upload Preview</span>
                        </div>
                    </section>
                )}
            </Dropzone>
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
