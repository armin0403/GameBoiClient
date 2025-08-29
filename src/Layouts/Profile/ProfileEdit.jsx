import { Box, Button, Paper, Stack, styled, TextField } from "@mui/material";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import * as yup from "yup";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { useEffect } from "react";
import { getCurrentUser, updateUser } from "../../API calls/UserServices";

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
})

const schema = yup.object().shape({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    dateOfBirth: yup.string().required("Date of birth required."),
    biography: yup.string().nullable(),
    country: yup.string().required("Country is required."),
    favoritePlatform: yup.string().nullable(),
    favoriteGenre: yup.string().nullable(),
});

export default function ProfileEdit() {
    const {
        register,
        control,
        handleSubmit,
        setValue,
        formState:{errors, isSubmitting},
    } = useForm({
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        async function fetchUser(){
            try{
                const user = await getCurrentUser();
                setValue("firstName", user.firstName)
                setValue("lastName", user.lastName)
                setValue("dateOfBirth", user.dateOfBirth)
                setValue("biography", user.biography)
                setValue("country", user.country)
                setValue("favoritePlatform", user.favoritePlatform)
                setValue("favoriteGenre", user.favoriteGenre)
            } catch(err){
                console.error("Failed to fetch user", err)
            }
        }
        fetchUser();
    }, [setValue]);

    const onSubmit = async (data) => {
        try{
            await updateUser(data);
            alert("Profile updated");
        } catch(error){
            alert("Update failed!");
        }
    };


    return(
<LocalizationProvider dateAdapter={AdapterDateFns}>
<Box sx={{p:1}}>        
    <Box component={Paper} elevation={5} sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
            <Box sx={{width:700}}>
                <Stack
                sx={{p:2}}
                direction="row" spacing={5} justifyContent="center">
                    <Button
                        component="label"
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        startIcon={<AddAPhotoIcon/>}
                    >
                     Upload profile photo   
                     <VisuallyHiddenInput type="file"/>
                    </Button>
                    <Button
                        component="label"
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        startIcon={<AddAPhotoIcon/>}
                    >
                     Upload cover photo   
                     <VisuallyHiddenInput type="file"/>
                    </Button>
                </Stack>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={2} sx={{p:2}}>
                    <TextField
                    label="First name" {...register("firstName")}
                    error={!!errors.firstName} helperText={errors.firstName?.message}
                    variant="outlined" 
                    >                    
                    </TextField>
                    <TextField
                    label="Last name" {...register("lastName")}
                    error={!!errors.lastName} helperText={errors.lastName?.message}
                    variant="outlined">
                    </TextField>
                    <Controller
                        name="dateOfBirth"
                        control={control}
                        render={({field}) => (
                        <DatePicker
                            label="Date of birth"
                            disableFuture
                            openTo="years"
                            views={['year', 'month', 'day']}
                            {...field}
                            renderInput={(params) => (
                                <TextField
                                {...params}
                                error={!!errors.dateOfBirth}
                                helperText={errors.dateOfBirth?.message}
                                />
                            )}
                        />
                        )}
                    />
                    <TextField
                    label="Biography" {...register("biography")}
                    variant="outlined"
                    multiline
                    maxRows={4}
                    >
                    </TextField>
                    <TextField
                        label="Country" {...register("country")}
                        error={!!errors.country} helperText={errors.country?.message}
                        variant="outlined"
                    >
                    </TextField>
                    <TextField
                        label="Favorite platform" {...register("favoritePlatform")}
                        error={!!errors.favoritePlatform} helperText={errors.favoritePlatform?.message}
                        variant="outlined"
                    >                        
                    </TextField>
                    <TextField
                        label="Favorite genre" {...register("favoriteGenre")}
                        error={!!errors.favoriteGenre} helperText={errors.favoriteGenre?.message}
                        variant="outlined"
                    >
                    </TextField>
                    <Button variant="outlined" size="large">
                        Save changes
                    </Button>
                </Stack>
            </form>
            </Box>   
    </Box>
</Box>
</LocalizationProvider>
    )
}