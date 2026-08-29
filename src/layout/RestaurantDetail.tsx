import { useState } from 'react';

import FromTextField from 'components/TextField';
import RestaurantCard from 'layout/RestaurantCard';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useTypeDispatch, useTypeSelector } from 'store/hooks';
import { add } from 'store/restaurantSlice';

import AddIcon from '@mui/icons-material/Add';
import {
    Button,
    Card,
    CardContent,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    MenuItem,
    TextField,
    Typography,
} from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';

interface AddFormData {
    img: string;
    alt: string;
    heading: string;
    location: string;
    description: string;
    category: string;
}

export default function AutoGrid() {
    const [addOpen, setAddOpen] = useState(false);
    const data = useTypeSelector((state) => state.restaurant);
    const methods = useForm<AddFormData>();
    const dispatch = useTypeDispatch();

    const handleClose = () => {
        setAddOpen(false);
    };
    const onSubmit = (addFormData: AddFormData) => {
        dispatch(add(addFormData));
        setAddOpen(false);
    };

    return (
        <>
            <Box sx={{ width: '100%', display: 'flex', flexGrow: 1 }}>
                <Grid container rowGap={18} sx={{ mx: 'auto', mt: '50px' }}>
                    {data.map((item, index) => (
                        <Grid
                            key={index}
                            size={{ md: 6, lg: 4 }}
                            sx={{ display: 'flex', justifyContent: 'center' }}
                        >
                            <RestaurantCard data={item} />
                        </Grid>
                    ))}
                    <Grid
                        size={{ md: 6, lg: 4 }}
                        sx={{ display: 'flex', justifyContent: 'center' }}
                    >
                        <Card
                            onClick={() => {
                                setAddOpen(true);
                            }}
                            sx={{
                                width: '90%',
                                minHeight: 400,
                                display: 'flex',
                                flexDirection: 'column',
                                filter: 'grayscale(100%)',
                                cursor: 'pointer',
                                opacity: 0.7,
                                transition: '0.3s',
                                border: '2px solid black',

                                '&:hover': {
                                    opacity: 1,
                                    filter: 'grayscale(0%)',
                                },
                            }}
                        >
                            <CardContent
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    flex: 1,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    textAlign: 'center',
                                }}
                            >
                                <AddIcon
                                    sx={{
                                        fontSize: 60,
                                        color: 'text.secondary',
                                        mb: 1,
                                    }}
                                />

                                <Typography
                                    variant="h4"
                                    component="div"
                                    color="text.secondary"
                                >
                                    Add More Item
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
            <Dialog
                open={addOpen}
                onClose={handleClose}
                fullWidth
                maxWidth="sm"
            >
                <FormProvider {...methods}>
                    <form
                        onSubmit={(e) => {
                            void methods.handleSubmit(onSubmit)(e);
                        }}
                    >
                        <DialogTitle>Edit Restaurant</DialogTitle>

                        <DialogContent
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '20px',
                                mt: '20px',
                            }}
                        >
                            <FromTextField
                                name="heading"
                                id="heading"
                                rules={{
                                    required: 'Restaurant name is required',
                                    maxLength: {
                                        value: 50,
                                        message:
                                            'Restaurant name cannot exceed 50 characters',
                                    },
                                }}
                            ></FromTextField>
                            <FromTextField
                                name="img"
                                id="img"
                                rules={{
                                    required: 'Restaurant name is required',
                                }}
                            ></FromTextField>
                            <FromTextField
                                name="alt"
                                id="alt"
                                rules={{
                                    required: 'Restaurant name is required',
                                }}
                            ></FromTextField>
                            <FromTextField
                                name="location"
                                id="location"
                                rules={{
                                    required: 'Restaurant name is required',
                                }}
                            ></FromTextField>
                            <FromTextField
                                name="description"
                                id="description"
                                rules={{
                                    required: 'Restaurant name is required',
                                }}
                            ></FromTextField>
                            <Controller
                                name="category"
                                control={methods.control}
                                rules={{
                                    required: 'Category is required',
                                }}
                                render={({ field, fieldState }) => (
                                    <TextField
                                        {...field}
                                        required
                                        size="small"
                                        select
                                        label="Category"
                                        error={!!fieldState.error}
                                        helperText={fieldState.error?.message}
                                        sx={(theme) => ({
                                            '& .MuiSelect-select': {
                                                fontSize: '20px',
                                            },
                                            '& .MuiInputLabel-root': {
                                                fontSize: '20px',
                                            },
                                            '& .MuiInputLabel-root.Mui-focused':
                                                {
                                                    color: theme.palette.common
                                                        .black,
                                                },
                                            '& .MuiOutlinedInput-notchedOutline':
                                                {
                                                    borderColor:
                                                        theme.palette.grey[700],
                                                },
                                            '&:hover .MuiOutlinedInput-notchedOutline':
                                                {
                                                    borderColor:
                                                        theme.palette.common
                                                            .black,
                                                },
                                            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline':
                                                {
                                                    borderColor:
                                                        theme.palette.common
                                                            .black,
                                                },
                                            '& MuiButtonBase-root-MuiMenuItem-root':
                                                {
                                                    fontSize: '20px',
                                                },
                                        })}
                                    >
                                        <MenuItem
                                            value="veg"
                                            sx={{
                                                '&.MuiMenuItem-root': {
                                                    fontSize: '20px',
                                                },
                                            }}
                                        >
                                            Veg
                                        </MenuItem>
                                        <MenuItem
                                            value="non-veg"
                                            sx={{
                                                '&.MuiMenuItem-root': {
                                                    fontSize: '20px',
                                                },
                                            }}
                                        >
                                            Non-Veg
                                        </MenuItem>
                                    </TextField>
                                )}
                            />
                        </DialogContent>

                        <DialogActions>
                            <Button
                                size="small"
                                onClick={handleClose}
                                color="inherit"
                            >
                                Cancel
                            </Button>

                            <Button
                                size="small"
                                type="submit"
                                variant="contained"
                            >
                                Confirm
                            </Button>
                        </DialogActions>
                    </form>
                </FormProvider>
            </Dialog>
        </>
    );
}
