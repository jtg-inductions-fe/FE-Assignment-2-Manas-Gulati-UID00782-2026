import { useState } from 'react';

import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import {
    AlertColor,
    Box,
    CardMedia,
    IconButton,
    Stack,
    Typography,
} from '@mui/material';
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

import {
    Counter,
    CustomizedSnackbar,
    FormDialog,
    FormTextField,
    NoFormDialog,
} from '@components';
import { FONT_SIZE } from '@constant';

import { MESSAGES, RESTAURANT_VALIDATION } from '../constants';

export const MultiActionAreaCard = ({ data }: FoodCardProps) => {
    //handle open/close modals
    const [open, setOpen] = useState(false);
    const [delOpen, setDelOpen] = useState(false);
    const cartFood = useTypeSelector((state) => state.cart.food);
    const selectedFood = cartFood.find((food) => food.foodId === data.foodId);

    const count = selectedFood?.quantity ?? 0;
    const disabled = data.stock <= 0;
    const dispatch = useTypeDispatch();
    const role = useTypeSelector((state) => state?.auth?.user?.role);

    //set snackbar
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success' as AlertColor,
    });

    /**
     * TODO: set form state for editing restaurant
     */
    const editHandler = () => {
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
            <FormDialog
                title="Edit Food Item"
                open={open}
                onClose={handleClose}
                onSubmit={onSubmit}
                defaultValues={{
                    img: data.img,
                    alt: data.alt,
                    heading: data.heading,
                    description: data.description,
                    ingredients: data.ingredients,
                    price: data.price,
                    stock: data.stock,
                }}
            >
                <>
                    <FormTextField
                        name="heading"
                        id="heading"
                        rules={{
                            required: RESTAURANT_VALIDATION.REQUIRED,
                            maxLength: {
                                value: 50,
                                message: RESTAURANT_VALIDATION.LIMIT,
                            },
                        }}
                    />
                    <FormTextField
                        name="img"
                        id="img"
                        rules={{
                            required: RESTAURANT_VALIDATION.REQUIRED,
                        }}
                    />
                    <FormTextField
                        name="alt"
                        id="alt"
                        rules={{
                            required: RESTAURANT_VALIDATION.REQUIRED,
                        }}
                    />
                    <FormTextField
                        name="description"
                        id="description"
                        rules={{
                            required: RESTAURANT_VALIDATION.REQUIRED,
                        }}
                    />
                    <FormTextField
                        name="ingredients"
                        id="ingredients"
                        rules={{
                            required: RESTAURANT_VALIDATION.REQUIRED,
                        }}
                    />
                    <FormTextField
                        name="price"
                        type="number"
                        id="price"
                        rules={{
                            required: RESTAURANT_VALIDATION.REQUIRED,
                        }}
                    />
                    <FormTextField
                        name="stock"
                        id="stock"
                        type="number"
                        rules={{
                            required: RESTAURANT_VALIDATION.REQUIRED,
                        }}
                    />
                </>
            </FormDialog>
            <NoFormDialog
                title="Delete Food Item"
                open={delOpen}
                onClose={handleDelClose}
                onConfirm={confirmDeleteHandler}
            >
                <>
                    <Typography variant="body1">
                        Are you sure you want to delete this food item?
                    </Typography>
                    <Typography
                        variant="subtitle2"
                        sx={{ color: 'error.dark' }}
                    >
                        *this action can&apos;t be reversed
                    </Typography>
                </>
            </NoFormDialog>
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
};
