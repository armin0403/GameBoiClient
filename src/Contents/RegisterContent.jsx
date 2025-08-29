import React from 'react';
import {
  Button,
  CardContent,
  CardMedia,
  CardActionArea,
  TextField,
  Typography,
  Box,
  Grid,
  Link,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import * as yup from 'yup';
import { subYears } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../API calls/UserServices';
import { useModal } from '../Contexts/ModalContext';
import SignInContent from './SignInContent';

const schema = yup.object().shape({
  FirstName: yup.string().required('First name is required'),
  LastName: yup.string().required('Last name is required'),
  Email: yup.string().email('Invalid email').required('Email is required'),
  Username: yup.string().required('Username is required'),
  Password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
  ReTypePassword: yup
    .string()
    .oneOf([yup.ref('Password'), null], 'Passwords must match')
    .required('Confirm your password'),
  DateOfBirth: yup
    .date()
    .nullable()
    .max(subYears(new Date(), 18), 'You must be at least 18 years old')
    .required('Date of birth is required'),
  Gamertag: yup.string().nullable(),
  FavPlatform: yup.string().nullable(),
  FavGenre: yup.string().nullable(),
});

export default function RegisterContent() {
  const navigate = useNavigate();
  const {openModal, closeModal} = useModal();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      FirstName: '',
      LastName: '',
      Email: '',
      Username: '',
      Password: '',
      ReTypePassword: '',
      DateOfBirth: null,
      Gamertag: '',
      FavPlatform: '',
      FavGenre: '',
    },
  });

  const onSubmit = async (userData) => {

    const date = new Date(userData.DateOfBirth);
    const formatedDate = date.toISOString();

    console.log("Original date:", userData.DateOfBirth);
    console.log("Formatted:", formatedDate)

    const formattedData = {
    ...userData,
    DateOfBirth: formatedDate
    };

    try{
      await registerUser(formattedData)
      navigate('/HomePage');
    }catch(err){
      if(err.response?.data?.errors){
        const backendErrors = err.response.data.errors;

        Object.entries(backendErrors).forEach(([field, messages]) =>{
          setError(field,{type:'server',message: messages[0]});
      });
    }else{
      alert("Unexpected error occured.");
    }
  }};

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="150"
            image="playstationLogo.png"
            alt="PlayStation logo"
            sx={{
              objectFit: 'contain',
              maxHeight: '150px',
              width: '100%',
            }}
          />
        </CardActionArea>

        <CardContent>
          <Typography variant="h5" gutterBottom>
            Register a new user
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Carefully enter required fields to create an account.
          </Typography>

          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <Controller
                name="FirstName"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="First Name"
                    fullWidth
                    error={!!errors.FirstName}
                    helperText={errors.FirstName?.message}
                  />
                )}
              />
              <Controller
                name="LastName"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Last Name"
                    fullWidth
                    sx={{ mt: 2 }}
                    error={!!errors.LastName}
                    helperText={errors.LastName?.message}
                  />
                )}
              />
              <Controller
                name="Username"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Username"
                    fullWidth
                    sx={{ mt: 2 }}
                    error={!!errors.Username}
                    helperText={errors.Username?.message}
                  />
                )}
              />
              <Controller
                name="Password"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Password"
                    type="password"
                    fullWidth
                    sx={{ mt: 2 }}
                    error={!!errors.Password}
                    helperText={errors.Password?.message}
                  />
                )}
              />
              <Controller
                name="ReTypePassword"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Retype Password"
                    type="password"
                    fullWidth
                    sx={{ mt: 2 }}
                    error={!!errors.ReTypePassword}
                    helperText={errors.ReTypePassword?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="Email"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Email"
                    fullWidth
                    sx={{ mt: 0 }}
                    error={!!errors.Email}
                    helperText={errors.Email?.message}
                  />
                )}
              />
              <Controller
                name="DateOfBirth"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    label="Date of Birth"
                    disableFuture
                    openTo="year"
                    views={['year', 'month', 'day']}
                    {...field}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        sx={{ mt: 2 }}
                        error={!!errors.DateOfBirth}
                        helperText={errors.DateOfBirth?.message}
                      />
                    )}
                  />
                )}
              />
              <Controller
                name="Gamertag"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Gamertag"
                    fullWidth
                    sx={{ mt: 2 }}
                  />
                )}
              />
              <Controller
                name="Country"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Country"
                    fullWidth
                    sx={{ mt: 2 }}
                  />
                )}
              />
              <Controller
                name="FavPlatform"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Favorite Platform"
                    fullWidth
                    sx={{ mt: 2 }}
                  />
                )}
              />
              <Controller
                name="FavGenre"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Favorite Genre"
                    fullWidth
                    sx={{ mt: 2 }}
                  />
                )}
              />
            </Grid>
          </Grid>

          <Box display="flex" justifyContent="center" mt={3}>
            <Button type="submit" variant="contained" color="primary" sx={{ width: '250px' }}>
              Register New User
            </Button>
          </Box>

          <Box display="flex" justifyContent="center" mt={2}>
            <Typography variant="body2" color="text.secondary">
              Already have an account?{' '}
              <Link 
                component="button" 
                variant="body2" 
                onClick={() => 
                  openModal(<SignInContent onClose={closeModal}/>)
                }
              >
                Log in here
              </Link>
            </Typography>
          </Box>
        </CardContent>
      </form>
    </LocalizationProvider>
  );
}
