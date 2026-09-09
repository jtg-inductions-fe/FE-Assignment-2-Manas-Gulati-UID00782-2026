import { useState } from 'react';

import { AlertColor, Typography } from '@mui/material';
import { MultiActionAreaCard } from 'layout/FooditemCard';
import { add } from 'store/fooditemSlice';
import { useTypeDispatch, useTypeSelector } from 'store/hooks';
import {
    CustomCardGrid,
    CustomGridWrapper,
    StyledAddIcon,
    StyledAddMoreCard,
    StyledAddMoreContent,
} from 'styles/Fooditem.styles';
import { FoodAutoGridProps, FooditemFormData } from 'types';

import {
    CustomizedSnackbar,
    FormDialog,
    FormTextField,
    ReusableWrapper,
} from '@components';

import { MESSAGES, RESTAURANT_VALIDATION } from '../constants';

export const AutoGrid = ({ data }: FoodAutoGridProps) => {
    const [addOpen, setAddOpen] = useState(false);
    const dispatch = useTypeDispatch();
    const role = useTypeSelector((state) => state?.auth?.user?.role);

    /**
     * TODO: Close add more fooditem dialog box
     */
    const handleClose = () => {
        setAddOpen(false);
    };

    //set snackbar
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success' as AlertColor,
    });

    /**
     * TODO: Add the fooditem into state and render ui
     * @param addFormData - {FooditemFormData}
     */
    const onSubmit = (addFormData: FooditemFormData) => {
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
                            key={item.foodId}
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
                                <StyledAddMoreContent>
                                    <StyledAddIcon />

                                    <Typography variant="h4" component="div">
                                        Add More Item
                                    </Typography>
                                </StyledAddMoreContent>
                            </StyledAddMoreCard>
                        </CustomCardGrid>
                    )}
                </CustomGridWrapper>
            </ReusableWrapper>
            <FormDialog
                title="Add Food Item"
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
                                message: RESTAURANT_VALIDATION.LIMIT,
                            },
                        }}
                    />
                    <FormTextField
                        name="img"
                        id="img"
                        rules={{ required: RESTAURANT_VALIDATION.REQUIRED }}
                    />
                    <FormTextField
                        name="alt"
                        id="alt"
                        rules={{ required: RESTAURANT_VALIDATION.REQUIRED }}
                    />
                    <FormTextField
                        name="description"
                        id="description"
                        rules={{ required: RESTAURANT_VALIDATION.REQUIRED }}
                    />
                    <FormTextField
                        name="ingredients"
                        id="ingredients"
                        rules={{ required: RESTAURANT_VALIDATION.REQUIRED }}
                    />
                    <FormTextField
                        name="price"
                        id="price"
                        type="number"
                        rules={{ required: RESTAURANT_VALIDATION.REQUIRED }}
                    />
                    <FormTextField
                        name="stock"
                        id="stock"
                        type="number"
                        rules={{ required: RESTAURANT_VALIDATION.REQUIRED }}
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
