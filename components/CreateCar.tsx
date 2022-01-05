import { CameraAltOutlined } from '@mui/icons-material';
import { Button, MenuItem, Paper, Select, TextField } from '@mui/material';
import React, { useState } from 'react'
import { useDropzone } from 'react-dropzone';
import { carType, carSteeringPosition, colors } from '../data/constants';
import styles from '../styles/CreateCar.module.scss';

const CreateCar = () => {
    const [type, setType] = useState<string>(carType[0]);
    const [customType, setCustomType] = useState<string>('');
    const [steeringPosition, setSteeringPosition] = useState<string>(carSteeringPosition[0]);
    const [color, setColor] = useState<string>(colors[0]);
    const maxLength = 128;

    function nameLengthValidator(file: any) {
        if (file.name.length > maxLength) {
          return {
            code: "name-too-large",
            message: `Name is larger than ${maxLength} characters`
          };
        }
        return null
    }   

    const {
        acceptedFiles,
        fileRejections,
        getRootProps,
        getInputProps
      } = useDropzone({
        validator: nameLengthValidator
      });

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

      console.log(type);
    } 

    return (
        <div className={styles.container}>
            <Paper elevation={2} className={styles.previewUploadArea} {...getRootProps()}>
                <input {...getInputProps()} multiple={false} accept='image/*, video/*'/>
                <CameraAltOutlined />
                <span> Upload Preview</span>
            </Paper>
            <form onSubmit={handleFormSubmit}>
                <TextField id='name' variant='outlined' label='Name' className={styles.textInput} autoFocus={true} placeholder='BMW 5 Series'/>
                <TextField id="brand" variant='outlined' label='Brand' className={styles.textInput} placeholder='BMW'/>
                <TextField id="model" variant='outlined' label='Model (Year)' className={styles.textInput} placeholder='2021'/>
                <Select 
                    labelId='type-select-label'
                    value={type}
                    className={styles.textInput}
                    onChange={(e) => setType(e.target.value)}>
                    {
                    carType.map((type: string) => {
                        return <MenuItem value={type}>{type}</MenuItem>
                    })
                    }
                </Select>
                {
                    type.toLowerCase() === 'other' &&
                    <TextField variant='outlined' label='Enter Car Type' className={styles.textInput} placeholder='Sport' onChange={(e) => setCustomType(e.target.value)}/>
                }
                <TextField id="enginePower" variant='outlined' label='Engine Power' className={styles.textInput} placeholder='140.00 kW (187 bhp)'/>
                <TextField id="steeringPosition" variant='outlined' label='Steering Position' className={styles.textInput} placeholder='Left'/>
                <TextField id="transmission" variant='outlined' label='Transmission' className={styles.textInput} placeholder='Automatic'/>
                <TextField id="keyType" variant='outlined' label='Key/Remote' className={styles.textInput} placeholder='Smart Key'/>
                <TextField id="engineCapacity" variant='outlined' label='Engine Capacity(cc)' className={styles.textInput} placeholder='2354 cc'/>
                <TextField id="fuelType" variant='outlined' label='Fuel Type' className={styles.textInput} placeholder='Pectrol'/>
                <TextField id="color" variant='outlined' label='Color' className={styles.textInput} placeholder='Pearl White'/>
                <TextField id="mileage" variant='outlined' label='Mileage' className={styles.textInput} placeholder='111 km'/>
                <TextField id="description" variant='outlined' label='Description' className={styles.descInput} multiline/>
                <Button type="submit" variant='contained' className={styles.createBtn}> Create </Button>
            </form>
        </div>
    )
}

export default CreateCar;
