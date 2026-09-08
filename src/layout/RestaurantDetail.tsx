import { useState } from 'react';

import {
    Button,
    Dialog,
    DialogActions,
    DialogTitle,
    Typography,
} from '@mui/material';
import FromTextField from 'components/TextField.component';
import { RESTAURANT_VALIDATION } from 'constants/restaurantValidationConstants';
import RestaurantCard from 'layout/RestaurantCard';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useTypeSelector } from 'store/hooks';
import {
    CustomCardGrid,
    CustomGridWrapper,
    StyledAddIcon,
    StyledAddMoreCard,
    StyledCardContent,
    StyledCategoryTextfield,
    StyledDialogContent,
    StyledMenuItem,
    StyledRestaurantWrapper,
} from 'styles/Restaurant.styles';

export interface RestaurantFormData {
    img: string;
    alt: string;
    heading: string;
    location: string;
    description: string;
    category: string;
}

export default function AutoGrid() {
    const data = useTypeSelector((state) => state.restaurant);
    const [addOpen, setAddOpen] = useState(false); //for add restaurant dialog box
    const methods = useForm<RestaurantFormData>();
    const role = useTypeSelector((state) => state?.auth?.user?.role);

    const handleClose = () => {
        setAddOpen(false);
    };

    return (
        <>
            <StyledRestaurantWrapper>
                <CustomGridWrapper
                    container
                    spacing={{ sm: 3, md: 4 }}
                    rowGap={18}
                >
                    {data.map((item, index) => (
                        <CustomCardGrid
                            key={index}
                            size={{ sm: 12, md: 6, lg: 4 }}
                        >
                            <RestaurantCard data={item} />
                        </CustomCardGrid>
                    ))}
                    {role === 'owner' && (
                        <CustomCardGrid size={{ sm: 12, md: 6, lg: 4 }}>
                            <StyledAddMoreCard
                                onClick={() => {
                                    setAddOpen(true);
                                }}
                            >
                                <StyledCardContent
                                    sx={{
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        textAlign: 'center',
                                    }}
                                >
                                    <StyledAddIcon />

                                    <Typography
                                        variant="h4"
                                        component="div"
                                        color="text.secondary"
                                    >
                                        Add More Item
                                    </Typography>
                                </StyledCardContent>
                            </StyledAddMoreCard>
                        </CustomCardGrid>
                    )}
                </CustomGridWrapper>
            </StyledRestaurantWrapper>
            <Dialog
                open={addOpen}
                onClose={handleClose}
                fullWidth
                maxWidth="sm"
            >
                <FormProvider {...methods}>
                    <form>
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
                            />
                            <FromTextField
                                name="img"
                                id="img"
                                rules={{
                                    required: RESTAURANT_VALIDATION.REQUIRED,
                                }}
                            />
                            <FromTextField
                                name="alt"
                                id="alt"
                                rules={{
                                    required: RESTAURANT_VALIDATION.REQUIRED,
                                }}
                            />
                            <FromTextField
                                name="location"
                                id="location"
                                rules={{
                                    required: RESTAURANT_VALIDATION.REQUIRED,
                                }}
                            />
                            <FromTextField
                                name="description"
                                id="description"
                                rules={{
                                    required: RESTAURANT_VALIDATION.REQUIRED,
                                }}
                            />
                            <Controller
                                name="category"
                                control={methods.control}
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
        </>
    );
}
