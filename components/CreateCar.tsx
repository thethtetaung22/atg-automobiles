import { CameraAltOutlined } from '@mui/icons-material';
import { Button, Paper, TextField } from '@mui/material';
import React, { useState } from 'react'
import { useDropzone } from 'react-dropzone';
import styles from '../styles/CreateCar.module.scss';

const CreateCar = () => {
    const maxLength = 64;
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

    return (
        <div className={styles.container}>
            <Paper elevation={2} className={styles.previewUploadArea} {...getRootProps()}>
                <input {...getInputProps()} multiple={false} accept='image/*, video/*'/>
                <CameraAltOutlined />
                <span> Upload Preview</span>
            </Paper>
            <TextField variant='outlined' label='Name' className={styles.textInput} autoFocus={true} placeholder='BMW 5 Series'/>
            <TextField variant='outlined' label='Brand' className={styles.textInput} placeholder='BMW'/>
            <TextField variant='outlined' label='Model (Year)' className={styles.textInput} placeholder='2021'/>
            <TextField variant='outlined' label='Type' className={styles.textInput} placeholder='Sport'/>
            <TextField variant='outlined' label='Engine Power' className={styles.textInput} placeholder='140.00 kW (187 bhp)'/>
            <TextField variant='outlined' label='Steering Position' className={styles.textInput} placeholder='Left'/>
            <TextField variant='outlined' label='Transimission' className={styles.textInput} placeholder='Automatic'/>
            <TextField variant='outlined' label='Key/Remote' className={styles.textInput} placeholder='Smart Key'/>
            <TextField variant='outlined' label='Engine Capacity(cc)' className={styles.textInput} placeholder='2354 cc'/>
            <TextField variant='outlined' label='Fuel Type' className={styles.textInput} placeholder='Pectrol'/>
            <TextField variant='outlined' label='Color' className={styles.textInput} placeholder='Pearl White'/>
            <TextField variant='outlined' label='Mileage' className={styles.textInput} placeholder='111 km'/>
            <TextField variant='outlined' label='Description' className={styles.descInput} multiline/>
            <Button variant='contained' className={styles.createBtn}> Create </Button>
        </div>
    )
}

export default CreateCar;
