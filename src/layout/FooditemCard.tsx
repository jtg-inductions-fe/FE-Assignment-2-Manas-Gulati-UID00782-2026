import { useState } from 'react';

import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Box, IconButton, Stack } from '@mui/material';
import { AlertColor } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import ReusableButton from 'components/Button.component';
import Counter from 'components/Counter.component';
import ReusableDialog, {
    ReusableDialogActions,
    ReusableDialogContent,
    ReusableDialogTitle,
} from 'components/Dialog.component';
import CustomizedSnackbar from 'components/Snackbar.component';
import FromTextField from 'components/TextField.component';
import { FormProvider, useForm } from 'react-hook-form';
import { addFood } from 'store/cartSlice';
import { del, edit } from 'store/fooditemSlice';
import { useTypeDispatch, useTypeSelector } from 'store/hooks';
import {
    StyledCard,
    StyledCardContent,
    StyledDeleteIcon,
    StyledDescText,
    StyledEditIcon,
    StyledIngredientsText,
    StyledOutStockBox,
    StyledOutStockText,
    StyledPriceText,
    StyledStockText,
} from 'styles/Fooditem.styles';
import { FoodCardProps, FooditemFormData } from 'types';

import { FONT_SIZE } from '@constant';

import { MESSAGES, RESTAURANT_VALIDATION } from '../constants';

export default function MultiActionAreaCard({ data }: FoodCardProps) {
    //handle open/close modals
    const [open, setOpen] = useState(false);
    const [delOpen, setDelOpen] = useState(false);
    const cartFood = useTypeSelector((state) => state.cart.food);
    const selectedFood = cartFood.find((food) => food.foodId === data.foodId);

    const count = selectedFood?.quantity ?? 0;
    const disabled = data.stock <= 0;
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
        price: 0,
        stock: 0,
    });

    /**
     * TODO: set form state for editing restaurant
     */
    const editHandler = () => {
        setFormData({
            img: data.img,
            alt: data.alt,
            heading: data.heading,
            description: data.description,
            ingredients: data.ingredients,
            price: data.price,
            stock: data.stock,
        });
        setOpen(true);
    };

    /**
     * TODO: open delete fooditem confirmation modal
     */
    const deleteHandler = () => {
        setDelOpen(true);
    };

    /**
     * TODO: Delete fooditem confirmation
     */
    const confirmDeleteHandler = () => {
        dispatch(del(data.foodId));
        setDelOpen(false);
        setSnackbar({
            open: true,
            message: MESSAGES.DELETE,
            severity: 'success',
        });
    };

    /**
     * TODO: Closes edit dialog box
     */
    const handleClose = () => {
        setOpen(false);
    };

    /**
     * TODO:  Closes delete dialog box
     */
    const handleDelClose = () => {
        setDelOpen(false);
    };

    /**
     * TODO: Add item to card and set its quantity
     */
    const addToCartHandler = () => {
        dispatch(addFood({ data: data, quantity: 1 }));
    };

    /**
     * TODO: Increase cart food item quantity
     */
    const increaseHandler = () => {
        if (count >= data.stock) return;
        dispatch(addFood({ data: data, quantity: count + 1 }));
    };

    /**
     * TODO: decrease cart food item quantity
     */
    const decreaseHandler = () => {
        dispatch(addFood({ data: data, quantity: count - 1 }));
    };

    /**
     * TODO: Edit food item
     * @param editFormData - {FooditemFormData}
     */
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
            <StyledCard>
                <Box sx={{ position: 'relative' }}>
                    <CardMedia
                        component="img"
                        height="250"
                        image={data.img}
                        alt={data.alt}
                        sx={{ objectFit: 'cover' }}
                    />
                    {disabled && (
                        <StyledOutStockBox>
                            <StyledOutStockText variant="h4">
                                Out of Stock
                            </StyledOutStockText>
                        </StyledOutStockBox>
                    )}
                </Box>
                <StyledCardContent>
                    <Stack
                        direction="row"
                        alignItems="flex-start"
                        justifyContent="space-between"
                        gap={2}
                    >
                        <Typography gutterBottom variant="h3" component="div">
                            {data.heading}
                        </Typography>
                        <StyledPriceText variant="body2">
                            &#8377; {data.price}
                        </StyledPriceText>
                    </Stack>
                    <StyledDescText variant="subtitle2">
                        {data.description}
                    </StyledDescText>
                    <StyledIngredientsText variant="subtitle2">
                        {data.ingredients}
                    </StyledIngredientsText>

                    <Box
                        display="flex"
                        mt="auto"
                        alignItems="center"
                        justifyContent="space-between"
                    >
                        <StyledStockText variant="body2">
                            {disabled ? 'Out of Stock' : `Stock: ${data.stock}`}
                        </StyledStockText>
                        {role === 'owner' && (
                            <Stack direction="row" spacing={1}>
                                <IconButton
                                    aria-label="edit"
                                    onClick={editHandler}
                                >
                                    <StyledEditIcon />
                                </IconButton>
                                <IconButton
                                    aria-label="delete"
                                    onClick={deleteHandler}
                                >
                                    <StyledDeleteIcon />
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
                                disableIncrease={count >= data.stock}
                            />
                        )}
                    </Box>
                </StyledCardContent>
            </StyledCard>
            <ReusableDialog
                open={open}
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
                        <ReusableDialogTitle>
                            Edit Food Item
                        </ReusableDialogTitle>

                        <ReusableDialogContent>
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
                                name="price"
                                id="price"
                                rules={{
                                    required: RESTAURANT_VALIDATION.REQUIRED,
                                }}
                                defaultVal={formData.price}
                            />
                            <FromTextField
                                name="stock"
                                id="stock"
                                rules={{
                                    required: RESTAURANT_VALIDATION.REQUIRED,
                                }}
                                defaultVal={formData.stock}
                            />
                        </ReusableDialogContent>

                        <ReusableDialogActions>
                            <ReusableButton
                                size="small"
                                onClick={handleClose}
                                color="inherit"
                            >
                                Cancel
                            </ReusableButton>

                            <ReusableButton
                                size="small"
                                type="submit"
                                variant="contained"
                            >
                                Confirm
                            </ReusableButton>
                        </ReusableDialogActions>
                    </form>
                </FormProvider>
            </ReusableDialog>
            <ReusableDialog
                open={delOpen}
                onClose={handleDelClose}
                fullWidth
                maxWidth="sm"
            >
                <ReusableDialogTitle>Delete Food Item</ReusableDialogTitle>

                <ReusableDialogContent>
                    <Typography variant="body1">
                        Are you sure you want to delete this restaurant
                    </Typography>
                    <Typography
                        variant="subtitle2"
                        sx={{ color: 'error.dark' }}
                    >
                        *this action can&apos;t be reversed
                    </Typography>
                </ReusableDialogContent>

                <ReusableDialogActions>
                    <ReusableButton
                        size="small"
                        onClick={handleDelClose}
                        color="inherit"
                    >
                        Cancel
                    </ReusableButton>

                    <ReusableButton
                        size="small"
                        type="button"
                        onClick={confirmDeleteHandler}
                        variant="contained"
                    >
                        Confirm
                    </ReusableButton>
                </ReusableDialogActions>
            </ReusableDialog>
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
