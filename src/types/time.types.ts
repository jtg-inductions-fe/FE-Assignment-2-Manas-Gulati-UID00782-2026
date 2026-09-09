import { RegisterOptions } from 'react-hook-form';

export interface FormTimeFieldProps {
    name: string;
    id: string;
    label: string;
    rules?: RegisterOptions;
}
