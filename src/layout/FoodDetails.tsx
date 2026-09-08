import { useState } from 'react';

import {
    AlertColor,
    Button,
    Dialog,
    DialogActions,
    DialogTitle,
    Typography,
} from '@mui/material';
import CustomizedSnackbar from 'components/Snackbar.component';
import FromTextField from 'components/TextField.component';
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
    StyledDialogContent,
    StyledFoodWrapper,
} from 'styles/Fooditem.styles';
import { AutoGridProps, FooditemFormData } from 'types';

import { MESSAGES, RESTAURANT_VALIDATION } from '../constants';

export default function AutoGrid({ data }: AutoGridProps) {
    const [addOpen, setAddOpen] = useState(false);
    const methods = useForm<FooditemFormData>();
    const dispatch = useTypeDispatch();
    const role = useTypeSelector((state) => state?.auth?.user?.role);

    const handleClose = () => {
        setAddOpen(false);
    };

    //set snackbar
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success' as AlertColor,
    });

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
            <StyledFoodWrapper>
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
                            <FooditemCard data={item} />
                        </CustomCardGrid>
                    ))}
                    {role === 'owner' && (
                        <CustomCardGrid size={{ sm: 12, md: 6, lg: 4 }}>
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
            </StyledFoodWrapper>
            <Dialog
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
                        <DialogTitle>Add Food Item</DialogTitle>

                        <StyledDialogContent>
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
