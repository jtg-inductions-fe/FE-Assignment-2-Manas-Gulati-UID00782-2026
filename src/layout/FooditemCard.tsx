import { useEffect, useState } from 'react';

import Counter from 'components/Counter.component';
import CustomizedSnackbar from 'components/Snackbar.component';
import FromTextField from 'components/TextField.component';
import { MESSAGES } from 'constants/restaurantSnackbarConstant';
import { RESTAURANT_VALIDATION } from 'constants/restaurantValidationConstants';
import { FormProvider, useForm } from 'react-hook-form';
import { addFood } from 'store/cartSlice';
import { del, edit } from 'store/fooditemSlice';
import { useTypeDispatch, useTypeSelector } from 'store/hooks';
import { FoodCardProps, FooditemFormData } from 'types';

import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, IconButton, Stack } from '@mui/material';
import { AlertColor } from '@mui/material';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';

import { FONT_SIZE, FONT_WEIGHT } from '@constant';

export default function MultiActionAreaCard({ data }: FoodCardProps) {
    //handle open/close modals
    const [open, setOpen] = useState(false);
    const [delOpen, setDelOpen] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const cartFood = useTypeSelector((state) => state.cart.food);
    let quantity;
    cartFood.forEach((food) => {
        if (food.foodId === data.foodId) {
            quantity = food.quantity;
        }
    });

    const [count, setCount] = useState(quantity ?? 0);
    const methods = useForm<FooditemFormData>();
    const dispatch = useTypeDispatch();
    const role = useTypeSelector((state) => state?.auth?.user?.role);

    //set snackbar
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success' as AlertColor,
    });

    //set initial form state for adding new restaurant
    const [formData, setFormData] = useState({
        img: '',
        alt: '',
        heading: '',
        description: '',
        ingredients: '',
        stock: 0,
    });

    //set initial form state for editing restaurant
    const editHandler = () => {
        setFormData({
            img: data.img,
            alt: data.alt,
            heading: data.heading,
            description: data.description,
            ingredients: data.ingredients,
            stock: data.stock,
        });
        setOpen(true);
    };

    useEffect(() => {
        setDisabled(data.stock == 0);
    }, [data.stock]);

    const deleteHandler = () => {
        setDelOpen(true);
    };

    const confirmDeleteHandler = () => {
        dispatch(del(data.foodId));
        setDelOpen(false);
        setSnackbar({
            open: true,
            message: MESSAGES.DELETE,
            severity: 'success',
        });
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleDelClose = () => {
        setDelOpen(false);
    };

    const addToCartHandler = () => {
        setCount(1);
        dispatch(addFood({ data: data, quantity: 1 }));
    };

    const increaseHandler = () => {
        dispatch(addFood({ data: data, quantity: count + 1 }));
        setCount(count + 1);
    };

    const decreaseHandler = () => {
        dispatch(addFood({ data: data, quantity: count - 1 }));
        setCount(count - 1);
    };

    const onSubmit = (editFormData: FooditemFormData) => {
        dispatch(
            edit({
                id: data.foodId,
                data: editFormData,
            }),
        );

        setOpen(false);
        setSnackbar({
            open: true,
            message: MESSAGES.EDIT,
            severity: 'success',
        });
    };
    return (
        <>
            <Card
                sx={(theme) => ({
                    maxWidth: '90%',
                    display: 'flex',
                    flexDirection: 'column',
                    filter: disabled ? 'grayscale(100%)' : 'none',
                    border: `1px solid ${theme.palette.faded?.light}`,
                    borderRadius: 3,
                    transition: 'transform 180ms ease, box-shadow 180ms ease',
                    '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0px 4px 4px 4px rgba(28, 35, 40, 0.10)',
                    },
                })}
            >
                <Box sx={{ position: 'relative' }}>
                    <CardMedia
                        component="img"
                        height="250"
                        image={data.img}
                        alt={data.alt}
                        sx={{ objectFit: 'cover' }}
                    />
                    {disabled && (
                        <Box
                            sx={{
                                position: 'absolute',
                                inset: 0,
                                display: 'grid',
                                placeItems: 'center',
                                backdropFilter: 'blur(10px)',
                            }}
                        >
                            <Typography
                                variant="h4"
                                sx={(theme) => ({
                                    px: 2.25,
                                    py: 0.75,
                                    color: theme.palette.common.white,
                                    borderRadius: 5,
                                    border: `2px solid ${theme.palette.common.white}`,
                                    backgroundColor: theme.palette.faded?.dark,
                                    textTransform: 'uppercase',
                                })}
                            >
                                Out of Stock
                            </Typography>
                        </Box>
                    )}
                </Box>
                <CardContent
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        flex: 1,
                        p: 3.5,
                    }}
                >
                    <Stack
                        direction="row"
                        alignItems="flex-start"
                        justifyContent="space-between"
                        gap={2}
                    >
                        <Typography gutterBottom variant="h3" component="div">
                            {data.heading}
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={(theme) => ({
                                mt: 3,
                                flexShrink: 0,
                                color: theme.palette.primary.main,
                                fontSize: FONT_SIZE.XL,
                                fontWeight: FONT_WEIGHT.BOLD,
                                ...theme.mixins.lineClamp(3),
                            })}
                        >
                            &#8377; {data.price}
                        </Typography>
                    </Stack>
                    <Typography
                        variant="subtitle2"
                        sx={(theme) => ({
                            color: 'text.primary',
                            ...theme.mixins.lineClamp(3),
                        })}
                    >
                        {data.description}
                    </Typography>
                    <Typography
                        variant="subtitle2"
                        sx={(theme) => ({
                            color: theme.palette.faded?.dark,
                            fontStyle: 'italic',
                            ...theme.mixins.lineClamp(2),
                        })}
                    >
                        {data.ingredients}
                    </Typography>

                    <Box
                        display="flex"
                        mt="auto"
                        alignItems="center"
                        justifyContent="space-between"
                    >
                        <Typography
                            variant="body2"
                            sx={(theme) => ({
                                color: theme.palette.primary.main,
                                fontWeight: FONT_WEIGHT.SEMIBOLD,
                                ...theme.mixins.lineClamp(3),
                            })}
                        >
                            {disabled ? 'Out of Stock' : `Stock: ${data.stock}`}
                        </Typography>
                        {role === 'owner' && (
                            <Stack direction="row" spacing={1}>
                                <IconButton
                                    aria-label="edit"
                                    onClick={editHandler}
                                >
                                    <EditIcon
                                        sx={(theme) => ({
                                            fontSize: FONT_SIZE['3XL'],
                                            color: theme.palette.success.light,
                                        })}
                                    />
                                </IconButton>
                                <IconButton
                                    aria-label="delete"
                                    onClick={deleteHandler}
                                >
                                    <DeleteIcon
                                        sx={(theme) => ({
                                            fontSize: FONT_SIZE['3XL'],
                                            color: theme.palette.error.main,
                                        })}
                                    />
                                </IconButton>
                            </Stack>
                        )}
                        {role === 'customer' && count <= 0 && (
                            <IconButton
                                aria-label="delete"
                                onClick={addToCartHandler}
                            >
                                <AddShoppingCartIcon
                                    sx={{
                                        fontSize: FONT_SIZE['3XL'],
                                        display: disabled
                                            ? 'none'
                                            : 'inline-block',
                                    }}
                                />
                            </IconButton>
                        )}
                        {role === 'customer' && count > 0 && (
                            <Counter
                                count={count}
                                increaseHandler={increaseHandler}
                                decreaseHandler={decreaseHandler}
                            />
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
                        <DialogTitle>Edit Food Item</DialogTitle>

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
                            />
                            <FromTextField
                                name="img"
                                id="img"
                                rules={{
                                    required: RESTAURANT_VALIDATION.REQUIRED,
                                }}
                                defaultVal={formData.img}
                            />
                            <FromTextField
                                name="alt"
                                id="alt"
                                rules={{
                                    required: RESTAURANT_VALIDATION.REQUIRED,
                                }}
                                defaultVal={formData.alt}
                            />
                            <FromTextField
                                name="description"
                                id="description"
                                rules={{
                                    required: RESTAURANT_VALIDATION.REQUIRED,
                                }}
                                defaultVal={formData.description}
                            />
                            <FromTextField
                                name="ingredients"
                                id="ingredients"
                                rules={{
                                    required: RESTAURANT_VALIDATION.REQUIRED,
                                }}
                                defaultVal={formData.ingredients}
                            />
                            <FromTextField
                                name="stock"
                                id="stock"
                                rules={{
                                    required: RESTAURANT_VALIDATION.REQUIRED,
                                }}
                                defaultVal={formData.stock}
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
                <DialogTitle>Delete Food Item</DialogTitle>

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
            <CustomizedSnackbar
                severity={snackbar.severity}
                message={snackbar.message}
                state={snackbar.open}
                onClose={() =>
                    setSnackbar((prev) => ({
                        ...prev,
                        open: false,
                    }))
                }
            />
        </>
    );
}
