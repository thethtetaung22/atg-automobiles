import { Alert, Button, TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react"
import { login } from "../services/data.service";
import styles from '../styles/Login.module.scss';

const Login = () => {
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');

    const onSubmit = async () => {
        const result = await login(email, password);
        console.log(result)
        if (result?.data?.token) {
            alert('Login Success!')
        }
    }

    return (
        <div className={styles.container}>
            <h1> Login </h1>
            <TextField required variant='outlined' label='Email' onChange={(e: any)=> setEmail(e.target.value)} className={styles.input}></TextField>
            <TextField type='password' required variant='outlined' label='Password' onChange={(e: any)=> setPassword(e.target.value)} className={styles.input}></TextField>
            <Button onClick={onSubmit} variant='contained' className={styles.button}> Login </Button>
            {/* <div> {email} : {password} </div> */}
        </div>
    )
}

export default Login;
