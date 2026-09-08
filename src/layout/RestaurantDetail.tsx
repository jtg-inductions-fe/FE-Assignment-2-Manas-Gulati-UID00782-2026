import { useState } from 'react';

import { AlertColor, Typography } from '@mui/material';
import ReusableButton from 'components/Button.component';
import ReusableDialog, {
    ReusableDialogActions,
    ReusableDialogContent,
    ReusableDialogTitle,
} from 'components/Dialog.component';
import CustomizedSnackbar from 'components/Snackbar.component';
import FromTextField from 'components/TextField.component';
import ReusableWrapper from 'components/Wrapper.component';
import { RESTAURANT_VALIDATION } from 'constants/restaurantValidationConstants';
import RestaurantCard from 'layout/RestaurantCard';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useTypeDispatch, useTypeSelector } from 'store/hooks';
import { add } from 'store/restaurantSlice';
import {
    CustomCardGrid,
    CustomGridWrapper,
    StyledAddIcon,
    StyledAddMoreCard,
    StyledCardContent,
    StyledCategoryTextfield,
    StyledMenuItem,
} from 'styles/Restaurant.styles';
import { RestaurantAutoGridProps, RestaurantFormData } from 'types';

import { MESSAGES } from '../constants';

export default function AutoGrid({ data }: RestaurantAutoGridProps) {
    const [addOpen, setAddOpen] = useState(false); //for add restaurant dialog box
    const methods = useForm<RestaurantFormData>();
    const dispatch = useTypeDispatch();
    const role = useTypeSelector((state) => state?.auth?.user?.role);

    //set snackbar
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success' as AlertColor,
    });

    /**
     * handle add dialog close
     * @returns {any}
     */
    const handleClose = () => {
        setAddOpen(false);
    };

    /**
     * handle add restaurant form data
     * @param {any} addFormData:RestaurantFormData
     * @returns {any}
     */
    const onSubmit = (addFormData: RestaurantFormData) => {
        dispatch(add(addFormData));
        setAddOpen(false);
        setSnackbar({
            open: true,
            message: MESSAGES.ADD,
            severity: 'success',
        });
    };

    return (
        <>
            <ReusableWrapper>
                <CustomGridWrapper
                    container
                    spacing={{ xs: 3, md: 4 }}
                    rowGap={18}
                >
                    {data.map((item, index) => (
                        <CustomCardGrid
                            key={index}
                            size={{ xs: 12, md: 6, lg: 4 }}
                        >
                            <RestaurantCard data={item} />
                        </CustomCardGrid>
                    ))}
                    {role === 'owner' && (
                        <CustomCardGrid size={{ xs: 12, md: 6, lg: 4 }}>
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

                                    <Typography variant="h4" component="div">
                                        Add More Item
                                    </Typography>
                                </StyledCardContent>
                            </StyledAddMoreCard>
                        </CustomCardGrid>
                    )}
                </CustomGridWrapper>
            </ReusableWrapper>
            <ReusableDialog
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
