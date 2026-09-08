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
import FooditemCard from 'layout/FooditemCard';
import { FormProvider, useForm } from 'react-hook-form';
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

import { MESSAGES, RESTAURANT_VALIDATION } from '../constants';

export default function AutoGrid({ data }: FoodAutoGridProps) {
    const [addOpen, setAddOpen] = useState(false);
    const methods = useForm<FooditemFormData>();
    const dispatch = useTypeDispatch();
    const role = useTypeSelector((state) => state?.auth?.user?.role);

    /**
     * Close add more fooditem dialog box
     * @returns {any}
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
     * Add the fooditem into state and render ui
     * @param {any} addFormData:FooditemFormData
     * @returns {any}
     */
    const onSubmit = (addFormData: FooditemFormData) => {
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
                            <FooditemCard data={item} />
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
                        <ReusableDialogTitle>Add Food Item</ReusableDialogTitle>

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
                                name="description"
                                id="description"
                                rules={{
                                    required: RESTAURANT_VALIDATION.REQUIRED,
                                }}
                            />
                            <FromTextField
                                name="ingredients"
                                id="ingredients"
                                rules={{
                                    required: RESTAURANT_VALIDATION.REQUIRED,
                                }}
                            />
                            <FromTextField
                                name="price"
                                id="price"
                                rules={{
                                    required: RESTAURANT_VALIDATION.REQUIRED,
                                }}
                            />
                            <FromTextField
                                name="stock"
                                id="stock"
                                rules={{
                                    required: RESTAURANT_VALIDATION.REQUIRED,
                                }}
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
