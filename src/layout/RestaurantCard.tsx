import { useState } from 'react';

import FromTextField from 'components/TextField.component';
import { RESTAURANT_VALIDATION } from 'constants/restaurantValidationConstants';
import { FormProvider, useForm } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { useTypeDispatch, useTypeSelector } from 'store/hooks';
import { del, edit } from 'store/restaurantSlice';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, IconButton, Stack } from '@mui/material';
import { MenuItem } from '@mui/material';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { FONT_SIZE } from '@constant';

interface CardData {
    restaurantId: number;
    img: string;
    alt: string;
    heading: string;
    location: string;
    description: string;
    category: string;
}

interface EditFormData {
    img: string;
    alt: string;
    heading: string;
    location: string;
    description: string;
    category: string;
}

interface CardProps {
    data: CardData;
}

export default function MultiActionAreaCard({ data }: CardProps) {
    //handle open/close modals
    const [open, setOpen] = useState(false);
    const [delOpen, setDelOpen] = useState(false);

    const methods = useForm<EditFormData>();
    const dispatch = useTypeDispatch();
    const role = useTypeSelector((state) => state?.auth?.user?.role);

    //set initial form state for adding new restaurant
    const [formData, setFormData] = useState({
        img: '',
        alt: '',
        heading: '',
        location: '',
        description: '',
        category: '',
    });

    //set initial form state for editing restaurant
    const editHandler = () => {
        setFormData({
            img: data.img,
            alt: data.alt,
            heading: data.heading,
            location: data.location,
            description: data.description,
            category: data.category,
        });
        setOpen(true);
    };

    const deleteHandler = () => {
        setDelOpen(true);
    };

    const confirmDeleteHandler = () => {
        dispatch(del(data.restaurantId));
        setDelOpen(false);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleDelClose = () => {
        setDelOpen(false);
    };

    const onSubmit = (editFormData: EditFormData) => {
        dispatch(
            edit({
                id: data.restaurantId,
                data: editFormData,
            }),
        );

        setOpen(false);
    };
    return (
        <>
            <Card
                sx={{
                    maxWidth: '90%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <CardMedia
                    component="img"
                    height="250"
                    image={data.img}
                    alt={data.alt}
                />
                <CardContent
                    sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}
                >
                    <Typography gutterBottom variant="h3" component="div">
                        {data.heading}
                    </Typography>
                    <Typography
                        variant="subtitle2"
                        sx={{ color: 'text.primary' }}
                    >
                        {data.location}
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={(theme) => ({
                            color: 'text.secondary',
                            mb: '17px',
                            ...theme.mixins.lineClamp(3),
                        })}
                    >
                        {data.description}
                    </Typography>
                    <Box
                        display="flex"
                        mt="auto"
                        justifyContent="space-between"
                    >
                        {data.category === 'non-veg' && (
                            <Box
                                component="img"
                                src="/Assets/images (1).webp"
                                alt="restaurant icon"
                                sx={{
                                    width: 20,
                                    objectFit: 'contain',
                                }}
                            />
                        )}
                        {data.category === 'veg' && (
                            <Box
                                component="img"
                                src="/Assets/veg.webp"
                                alt="restaurant icon"
                                sx={{
                                    width: 20,
                                    objectFit: 'contain',
                                }}
                            />
                        )}
                        {role === 'owner' && (
                            <Stack direction="row" spacing={1}>
                                <IconButton
                                    aria-label="edit"
                                    onClick={editHandler}
                                >
                                    <EditIcon
                                        sx={{ fontSize: FONT_SIZE['3XL'] }}
                                    />
                                </IconButton>
                                <IconButton
                                    aria-label="delete"
                                    onClick={deleteHandler}
                                >
                                    <DeleteIcon
                                        sx={{ fontSize: FONT_SIZE['3XL'] }}
                                    />
                                </IconButton>
                            </Stack>
                        )}
                    </Box>
                </CardContent>
            </Card>
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
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
                                    required: RESTAURANT_VALIDATION.REQUIRED,
                                    maxLength: {
                                        value: 50,
                                        message: RESTAURANT_VALIDATION.LIMIT,
                                    },
                                }}
                                defaultVal={formData.heading}
                            ></FromTextField>
                            <FromTextField
                                name="img"
                                id="img"
                                rules={{
                                    required: RESTAURANT_VALIDATION.REQUIRED,
                                }}
                                defaultVal={formData.img}
                            ></FromTextField>
                            <FromTextField
                                name="alt"
                                id="alt"
                                rules={{
                                    required: RESTAURANT_VALIDATION.REQUIRED,
                                }}
                                defaultVal={formData.alt}
                            ></FromTextField>
                            <FromTextField
                                name="location"
                                id="location"
                                rules={{
                                    required: RESTAURANT_VALIDATION.REQUIRED,
                                }}
                                defaultVal={formData.location}
                            ></FromTextField>
                            <FromTextField
                                name="description"
                                id="description"
                                rules={{
                                    required: RESTAURANT_VALIDATION.REQUIRED,
                                }}
                                defaultVal={formData.description}
                            ></FromTextField>
                            <Controller
                                name="category"
                                control={methods.control}
                                defaultValue={formData.category}
                                rules={{
                                    required: RESTAURANT_VALIDATION.REQUIRED,
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
                                                fontSize: FONT_SIZE['XL'],
                                            },
                                            '& .MuiInputLabel-root': {
                                                fontSize: FONT_SIZE['XL'],
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
                                                    fontSize: FONT_SIZE['XL'],
                                                },
                                        })}
                                    >
                                        <MenuItem
                                            value="veg"
                                            sx={{
                                                '&.MuiMenuItem-root': {
                                                    fontSize: FONT_SIZE['XL'],
                                                },
                                            }}
                                        >
                                            Veg
                                        </MenuItem>
                                        <MenuItem
                                            value="non-veg"
                                            sx={{
                                                '&.MuiMenuItem-root': {
                                                    fontSize: FONT_SIZE['XL'],
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
            <Dialog
                open={delOpen}
                onClose={handleDelClose}
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle>Delete Restaurant</DialogTitle>

                <DialogContent
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '20px',
                        mt: '20px',
                    }}
                >
                    <Typography variant="body1">
                        Are you sure you want to delete this restaurant
                    </Typography>
                    <Typography
                        variant="subtitle2"
                        sx={{ color: 'error.dark' }}
                    >
                        *this action can&apos;t be reversed
                    </Typography>
                </DialogContent>

                <DialogActions>
                    <Button
                        size="small"
                        onClick={handleDelClose}
                        color="inherit"
                    >
                        Cancel
                    </Button>

                    <Button
                        size="small"
                        type="button"
                        onClick={confirmDeleteHandler}
                        variant="contained"
                    >
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
