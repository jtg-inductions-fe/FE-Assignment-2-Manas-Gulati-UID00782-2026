import { useState } from 'react';

import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import { Box, Stack } from '@mui/material';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import FromTextField from 'components/TextField.component';
import { RESTAURANT_VALIDATION } from 'constants/restaurantValidationConstants';
import { FormProvider, useForm } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { useTypeDispatch, useTypeSelector } from 'store/hooks';
import { del, edit } from 'store/restaurantSlice';
import {
    StyledCard,
    StyledCardActionArea,
    StyledCardContent,
    StyledCategoryBox,
    StyledCategoryTextfield,
    StyledDescription,
    StyledDialogContent,
    StyledMenuItem,
    StyledOwnerDeleteButton,
    StyledOwnerEditButton,
} from 'styles/Restaurant.styles';

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
            <StyledCard>
                <StyledCardActionArea>
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
                        <Stack direction="row" alignItems="center" gap={1}>
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
                                    <StyledOwnerEditButton
                                        variant="contained"
                                        size="small"
                                        onClick={(e) => {
                                            editHandler();
                                            e.stopPropagation();
                                        }}
                                    >
                                        Edit
                                    </StyledOwnerEditButton>
                                    <StyledOwnerDeleteButton
                                        variant="outlined"
                                        size="small"
                                        onClick={(e) => {
                                            deleteHandler();
                                            e.stopPropagation();
                                        }}
                                    >
                                        Delete
                                    </StyledOwnerDeleteButton>
                                </Stack>
                            )}
                        </Box>
                    </StyledCardContent>
                </StyledCardActionArea>
            </StyledCard>
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                <FormProvider {...methods}>
                    <form
                        onSubmit={(e) => {
                            void methods.handleSubmit(onSubmit)(e);
                        }}
                    >
                        <DialogTitle>Edit Restaurant</DialogTitle>

                        <StyledDialogContent>
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
                        </StyledDialogContent>

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

                <StyledDialogContent>
                    <Typography variant="body1">
                        Are you sure you want to delete this restaurant
                    </Typography>
                    <Typography
                        variant="subtitle2"
                        sx={{ color: 'error.dark' }}
                    >
                        *this action can&apos;t be reversed
                    </Typography>
                </StyledDialogContent>

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
