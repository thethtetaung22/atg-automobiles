import { Button, TextField, Backdrop, CircularProgress } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import { login } from "../services/data.service";
import styles from '../styles/Login.module.scss';

const Login = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = () => {
        setLoading(true);
        fetch('/api/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(resp => resp.json())
        .then(data => {
            if (data?.token) {
                setLoading(false);
                window?.sessionStorage.setItem('token', data?.token);
                router.replace('/').then(() => {
                    router.reload();
                });
            }
        });
        
    }

    return (
        <div className={styles.container}>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <h1> Login </h1>
            <TextField required variant='outlined' label='Email' onChange={(e: any)=> setEmail(e.target.value)} className={styles.input}></TextField>
            <TextField type='password' required variant='outlined' label='Password' onChange={(e: any)=> setPassword(e.target.value)} className={styles.input}></TextField>
            <Button onClick={onSubmit} variant='contained' className={styles.button}> Login </Button>
        </div>
    )
}

export default Login;
