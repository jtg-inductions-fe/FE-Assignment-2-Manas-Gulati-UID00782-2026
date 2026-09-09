import { useState } from 'react';

import { AlertColor, Typography } from '@mui/material';
import { FormSelectField } from 'components/FormSelect.component';
import { FormTimeField } from 'components/FormTime.component';
import { MultiActionAreaCard } from 'layout/RestaurantCard';
import { useTypeDispatch, useTypeSelector } from 'store/hooks';
import { add } from 'store/restaurantSlice';
import {
    CustomCardGrid,
    CustomGridWrapper,
    StyledAddIcon,
    StyledAddMoreCard,
    StyledCardContent,
    StyledMenuItem,
} from 'styles/Restaurant.styles';
import { RestaurantAutoGridProps, RestaurantFormData } from 'types';

import {
    CustomizedSnackbar,
    FormDialog,
    FormTextField,
    ReusableWrapper,
} from '@components';

import { MESSAGES, RESTAURANT_VALIDATION } from '../constants';

export const AutoGrid = ({ data }: RestaurantAutoGridProps) => {
    const [addOpen, setAddOpen] = useState(false); //for add restaurant dialog box
    const dispatch = useTypeDispatch();
    const role = useTypeSelector((state) => state?.auth?.user?.role);

    //set snackbar
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success' as AlertColor,
    });

    /**
     * TODO: handle add dialog close
     */
    const handleClose = () => {
        setAddOpen(false);
    };

    /**
     * TODO: handle add restaurant form data
     * @param addFormData - {RestaurantFormData}
     */
    const onSubmit = (addFormData: RestaurantFormData) => {
        dispatch(add(addFormData));
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
                    rowGap={8}
                >
                    {data.map((item) => (
                        <CustomCardGrid
                            key={item.restaurantId}
                            size={{ xs: 12, md: 6, lg: 4 }}
                        >
                            <MultiActionAreaCard data={item} />
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
            <FormDialog
                title="Add Restaurant"
                open={addOpen}
                onClose={handleClose}
                onSubmit={onSubmit}
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
