import { useState } from 'react';

import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import { Box, Stack } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import ReusableButton from 'components/Button.component';
import ReusableDialog, {
    ReusableDialogActions,
    ReusableDialogContent,
    ReusableDialogTitle,
} from 'components/Dialog.component';
import FromTextField from 'components/TextField.component';
import { MESSAGES } from 'constants/restaurantSnackbarConstant';
import { RESTAURANT_VALIDATION } from 'constants/restaurantValidationConstants';
import { FormProvider, useForm } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { get } from 'store/fooditemSlice';
import { useTypeDispatch, useTypeSelector } from 'store/hooks';
import { del, edit } from 'store/restaurantSlice';
import { selectRestaurant } from 'store/selectRestaurantSlice';
import {
    StyledCard,
    StyledCardActionArea,
    StyledCardContent,
    StyledCategoryBox,
    StyledCategoryTextfield,
    StyledDescription,
    StyledMenuItem,
} from 'styles/Restaurant.styles';
import { RestaurantCardProps, RestaurantFormData } from 'types';

import { FONT_SIZE } from '@constant';

export default function MultiActionAreaCard({ data }: RestaurantCardProps) {
    //handle open/close modals
    const [open, setOpen] = useState(false);
    const [delOpen, setDelOpen] = useState(false);

    const methods = useForm<RestaurantFormData>();
    const navigate = useNavigate();
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
        setSnackbar({
            open: true,
            message: MESSAGES.DELETE,
            severity: 'success',
        });
        setDelOpen(false);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleDelClose = () => {
        setDelOpen(false);
    };

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
        setOpen(false);
    };

    const selectRestaurantHandler = () => {
        dispatch(
            selectRestaurant({ id: data.restaurantId, name: data.heading }),
        );
        dispatch(get(data.restaurantId));
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        navigate(`/dashboard/${data.restaurantId}`);
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

                        <StyledDescription variant="body2">
                            {data.description}
                        </StyledDescription>
                        <Box display="flex" mt="auto" justifyContent="flex-end">
                            {role === 'owner' && (
                                <Stack direction="row" spacing={4}>
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
                            Edit Restaurant
                        </ReusableDialogTitle>

                        <ReusableDialogContent>
                            <FromTextField
                                name="heading"
                                id="heading"
                                rules={{
                                    required: RESTAURANT_VALIDATION.REQUIRED,
                                    maxLength: {
                                        value: 50,
                                        message:
                                            RESTAURANT_VALIDATION.LIMIT.replace(
                                                '{{name_count}}',
                                                '50',
                                            ),
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
                                name="location"
                                id="location"
                                rules={{
                                    required: RESTAURANT_VALIDATION.REQUIRED,
                                }}
                                defaultVal={formData.location}
                            />
                            <FromTextField
                                name="description"
                                id="description"
                                rules={{
                                    required: RESTAURANT_VALIDATION.REQUIRED,
                                }}
                                defaultVal={formData.description}
                            />
                            <Controller
                                name="category"
                                control={methods.control}
                                defaultValue={formData.category}
                                rules={{
                                    required: RESTAURANT_VALIDATION.REQUIRED,
                                }}
                                render={({ field, fieldState }) => (
                                    <StyledCategoryTextfield
                                        {...field}
                                        required
                                        size="small"
                                        select
                                        label="Category"
                                        error={!!fieldState.error}
                                        helperText={fieldState.error?.message}
                                    >
                                        <StyledMenuItem value="veg">
                                            Veg
                                        </StyledMenuItem>
                                        <StyledMenuItem value="non-veg">
                                            Non-Veg
                                        </StyledMenuItem>
                                    </StyledCategoryTextfield>
                                )}
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
                <ReusableDialogTitle>Delete Restaurant</ReusableDialogTitle>

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
        </>
    );
}
