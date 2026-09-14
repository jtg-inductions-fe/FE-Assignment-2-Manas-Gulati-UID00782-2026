import { useState } from 'react';

import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import { AlertColor, Box, CardMedia, Stack, Typography } from '@mui/material';
import { FormDialog, NoFormDialog } from 'components/Dialog.component';
import { FormSelectField } from 'components/FormSelect.component';
import { FormTimeField } from 'components/FormTime.component';
import { useNavigate } from 'react-router-dom';
import { initializeRestaurant } from 'store/cartSlice';
import { get } from 'store/fooditemSlice';
import { useTypeDispatch, useTypeSelector } from 'store/hooks';
import { del, edit } from 'store/restaurantSlice';
import { selectRestaurant } from 'store/selectRestaurantSlice';
import {
    StyledCard,
    StyledCardActionArea,
    StyledCardContent,
    StyledCategoryBox,
    StyledDescription,
    StyledMenuItem,
} from 'styles/Restaurant.styles';
import { RestaurantCardProps, RestaurantFormData } from 'types';

import { CustomizedSnackbar, FormTextField, ReusableButton } from '@components';
import { FONT_SIZE, FONT_WEIGHT } from '@constant';

import { MESSAGES, RESTAURANT_VALIDATION, ROUTES } from '../constants';

export const MultiActionAreaCard = ({ data }: RestaurantCardProps) => {
    //handle open/close modals
    const [open, setOpen] = useState(false);
    const [delOpen, setDelOpen] = useState(false);
    const navigate = useNavigate();
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
     * TODO: open delete restaurant modal
     */
    const deleteHandler = () => {
        setDelOpen(true);
    };

    /**
     * TODO: confirm restaurant delete
     */
    const confirmDeleteHandler = () => {
        dispatch(del(data.restaurantId));
        setSnackbar({
            open: true,
            message: MESSAGES.DELETE,
            severity: 'success',
        });
        setDelOpen(false);
    };

    /**
     * TODO: handle edit dialog close
     */
    const handleClose = () => {
        setOpen(false);
    };

    /**
     * TODO: handle delete dialog close
     */
    const handleDelClose = () => {
        setDelOpen(false);
    };

    /**
     * TODO: handle edit form submit
     * @param editFormData - {RestaurantFormData}
     */
    const onSubmit = (editFormData: RestaurantFormData) => {
        dispatch(
            edit({
                id: data.restaurantId,
                data: editFormData,
            }),
        );
        setSnackbar({
            open: true,
            message: MESSAGES.EDIT,
            severity: 'success',
        });
    };

    /**
     * TODO: set which restaurant user selected
     */
    const selectRestaurantHandler = () => {
        dispatch(
            selectRestaurant({ id: data.restaurantId, name: data.heading }),
        );
        dispatch(get(data.restaurantId));
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        navigate(ROUTES.FOOD(data.restaurantId));
        dispatch(initializeRestaurant(data.restaurantId));
    };

    return (
        <>
            <StyledCard>
                <StyledCardActionArea onClick={selectRestaurantHandler}>
                    <CardMedia
                        component="img"
                        height="250"
                        image={data.img}
                        alt={data.alt}
                        sx={{ objectFit: 'cover' }}
                    />
                    <StyledCardContent>
                        <Stack
                            direction="row"
                            alignItems="flex-start"
                            justifyContent="space-between"
                            gap={2}
                        >
                            <Typography
                                gutterBottom
                                variant="h3"
                                component="h4"
                            >
                                {data.heading}
                            </Typography>
                            {data.category === 'non-veg' && (
                                <StyledCategoryBox
                                    src="/Assets/images (1).webp"
                                    alt="restaurant icon"
                                />
                            )}
                            {data.category === 'veg' && (
                                <StyledCategoryBox
                                    src="/Assets/veg.webp"
                                    alt="restaurant icon"
                                />
                            )}
                        </Stack>
                        <Stack
                            direction="row"
                            alignItems="center"
                            gap={1}
                            sx={(theme) => ({
                                color: theme.palette.faded?.main,
                            })}
                        >
                            <PlaceOutlinedIcon
                                sx={{ fontSize: FONT_SIZE.LG }}
                            />
                            <Typography variant="subtitle2">
                                {data.location}
                            </Typography>
                        </Stack>

                        <Typography
                            variant="subtitle2"
                            sx={{ fontWeight: FONT_WEIGHT.SEMIBOLD }}
                        >
                            Time: {data.openingTime} - {data.closingTime}
                        </Typography>

                        <StyledDescription variant="body2">
                            {data.description}
                        </StyledDescription>
                        <Box display="flex" mt="auto" justifyContent="flex-end">
                            {role === 'owner' && (
                                <Stack direction="row" spacing={2}>
                                    <ReusableButton
                                        variant="contained"
                                        size="small"
                                        sx={{
                                            fontSize: FONT_SIZE.MD,
                                            px: 4,
                                        }}
                                        onClick={(e) => {
                                            editHandler();
                                            e.stopPropagation();
                                        }}
                                    >
                                        Edit
                                    </ReusableButton>
                                    <ReusableButton
                                        variant="outlined"
                                        size="small"
                                        color="primary"
                                        sx={{
                                            fontSize: FONT_SIZE.MD,
                                            px: 4,
                                        }}
                                        onClick={(e) => {
                                            deleteHandler();
                                            e.stopPropagation();
                                        }}
                                    >
                                        Delete
                                    </ReusableButton>
                                </Stack>
                            )}
                        </Box>
                    </StyledCardContent>
                </StyledCardActionArea>
            </StyledCard>
            <FormDialog
                title="Edit Restaurant"
                open={open}
                onClose={handleClose}
                onSubmit={onSubmit}
                defaultValues={{
                    img: data.img,
                    alt: data.alt,
                    heading: data.heading,
                    location: data.location,
                    description: data.description,
                    category: data.category,
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
                                message: RESTAURANT_VALIDATION.LIMIT.replace(
                                    '{{name_count}}',
                                    '50',
                                ),
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
                        name="location"
                        id="location"
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
                    <FormSelectField
                        name="category"
                        id="category"
                        label="Category"
                        rules={{
                            required: RESTAURANT_VALIDATION.REQUIRED,
                        }}
                    >
                        <StyledMenuItem value="veg">Veg</StyledMenuItem>
                        <StyledMenuItem value="non-veg">Non-Veg</StyledMenuItem>
                    </FormSelectField>
                    <FormTimeField
                        name="openingTime"
                        id="openingTime"
                        label="Opening time"
                        rules={{
                            required: RESTAURANT_VALIDATION.REQUIRED,
                        }}
                    />

                    <FormTimeField
                        name="closingTime"
                        id="closingTime"
                        label="Closing time"
                        rules={{
                            required: RESTAURANT_VALIDATION.REQUIRED,
                        }}
                    />
                </>
            </FormDialog>
            <NoFormDialog
                title="Delete Restaurant"
                open={delOpen}
                onClose={handleDelClose}
                onConfirm={confirmDeleteHandler}
            >
                <>
                    <Typography variant="body1">
                        Are you sure you want to delete this restaurant
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
