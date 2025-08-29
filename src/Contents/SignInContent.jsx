import * as React from 'react';
import * as yup from 'yup';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import TextField from '@mui/material/TextField';
import { Link } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginUser } from '../API calls/UserServices';
import { useNavigate } from 'react-router-dom';
import { useModal } from '../Contexts/ModalContext';
import RegisterContent from './RegisterContent';

export default function SignInContent({onClose}){
    const schema = yup.object({
        UsernameOrEmail: yup.string().required("Username required"),
        Password: yup.string().required("Password required"),
    });

    const navigate = useNavigate();

    const {openModal, closeModal} = useModal();

    const {
        control,
        handleSubmit,
        formState: {errors},
        setError,
    } = useForm({
        resolver: yupResolver(schema),
    });
 
    const handleSignIn = async (data) =>{
        console.log(data);
        try{
            const response = await loginUser(data);
            const accToken = response.accessToken
            sessionStorage.setItem('jwtToken', accToken);
            alert("success");
            navigate('/HomePage')
            onClose();
        }catch(err){
            const backendErrors = err.response?.data?.errors;

    if (backendErrors) {
        const errorEntries = Object.entries(backendErrors);

        // If error is not tied to a field (like ""), assign it to both fields or a general field
        errorEntries.forEach(([key, messages]) => {
            const message = Array.isArray(messages) ? messages[0] : messages;

            if (!key || key === '') {
                // Show the error under both fields (or just one if you prefer)
                setError('UsernameOrEmail', { type: 'server', message });
                setError('Password', { type: 'server', message });
            } else {
                setError(key, { type: 'server', message });
            }
        });
    } else {
        alert("Login failed");
    }
        }
    };

    return(   
    <>
    <form onSubmit={handleSubmit(handleSignIn)}>
        <CardActionArea>
            <CardMedia
                component="img"
                height="160"
                image="playstationLogo.png"
                alt="playstationLogo"
                sx={{
                    objectFit: 'contain',  
                    width: '100%',        
                    maxHeight: '140px',   
                }}        
            />
        </CardActionArea>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    Sign In
                </Typography>
                <Typography variant="body2" sx={{color: 'text.secondary'}}>
                    Please input your credentials to sign in.
                </Typography>
                    <div>
                    <Controller
                    name='UsernameOrEmail'
                    control={control}
                    defaultValue=""
                    render={({field}) =>(
                        <TextField {...field}
                        fullWidth
                        id="usernameOrEmail" 
                        label="Username/Email" 
                        variant="outlined" 
                        margin='normal'
                        error={!!errors.UsernameOrEmail}
                        helperText={errors.UsernameOrEmail?.message}
                        />)}
                    />    
                    </div>
                    <div>
                    <Controller
                    name='Password'
                    control={control}
                    defaultValue=''
                    render={({field}) =>(                    
                        <TextField {...field}
                        fullWidth 
                        id="Password" 
                        label="Password" 
                        variant="outlined" 
                        type="password" 
                        margin='normal'
                        error={!!errors.Password}
                        helperText={errors.Password?.message} 
                        />)}
                    />
                    </div>                    
            </CardContent>                        
            <CardActions sx={{ flexDirection: 'column', width: '100%', gap: 1 }}>
                <Button size="large" color="primary" variant="contained" type='submit'
                    sx={{ width: '250px' }}>
                        Sign In
                </Button>
                <Typography variant="body2" color="text.secondary" 
                    sx={{ mt: 1 }}>
                        I don't have an account. <Link
                                                    component="button"
                                                    variant="body2"
                                                    onClick={()=>{
                                                        openModal(<RegisterContent onClose={closeModal}/>)
                                                    }}>Register here.</Link>
                </Typography>
            </CardActions>  
    </form>             
    </>           
    )
}