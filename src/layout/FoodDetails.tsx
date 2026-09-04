import { useState } from 'react';

import CustomizedSnackbar from 'components/Snackbar.component';
import FromTextField from 'components/TextField.component';
import { MESSAGES } from 'constants/restaurantSnackbarConstant';
import { RESTAURANT_VALIDATION } from 'constants/restaurantValidationConstants';
import FooditemCard from 'layout/FooditemCard';
import { FormProvider, useForm } from 'react-hook-form';
import { add } from 'store/fooditemSlice';
import { useTypeDispatch, useTypeSelector } from 'store/hooks';
import { AutoGridProps, FooditemFormData } from 'types';

import AddIcon from '@mui/icons-material/Add';
import {
    Button,
    Card,
    CardContent,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography,
} from '@mui/material';
import { AlertColor } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';

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
            <Box sx={{ width: '100%', display: 'flex', flexGrow: 1 }}>
                <Grid
                    container
                    spacing={{ sm: 3, md: 4 }}
                    rowGap={18}
                    sx={{ mx: 'auto', mt: 5 }}
                >
                    {data.map((item, index) => (
                        <Grid
                            key={index}
                            size={{ sm: 12, md: 6, lg: 4 }}
                            sx={{ display: 'flex', justifyContent: 'center' }}
                        >
                            <FooditemCard data={item} />
                        </Grid>
                    ))}
                    {role === 'owner' && (
                        <Grid
                            size={{ sm: 12, md: 6, lg: 4 }}
                            sx={{ display: 'flex', justifyContent: 'center' }}
                        >
                            <Card
                                onClick={() => {
                                    setAddOpen(true);
                                }}
                                sx={(theme) => ({
                                    width: '90%',
                                    minHeight: 400,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    cursor: 'pointer',
                                    filter: 'grayscale(100%)',
                                    opacity: 0.7,
                                    transition: '0.3s',
                                    border: `2px dashed ${theme.palette.faded?.main}`,
                                    borderRadius: 3,
                                    color: '#6b554d',
                                    backgroundColor: theme.palette.faded?.light,

                                    '&:hover': {
                                        opacity: 1,
                                        filter: 'grayscale(0%)',
                                        color: theme.palette.primary.main,
                                        backgroundColor:
                                            theme.palette.common.white,
                                        borderColor:
                                            theme.palette.primary.light,
                                    },
                                })}
                            >
                                <CardContent
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        flex: 1,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        textAlign: 'center',
                                    }}
                                >
                                    <AddIcon
                                        sx={{
                                            fontSize: 60,
                                            mb: 1,
                                        }}
                                    />

                                    <Typography variant="h4" component="div">
                                        Add More Item
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    )}
                </Grid>
            </Box>
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

                        <DialogContent
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '20px',
                                mt: '20px',
                            }}
                        >
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
                        </DialogContent>

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
