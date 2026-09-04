import { RegisterOptions } from 'react-hook-form';

//defining props for password component
export interface PasswordProps {
    name: string;
    id: string;
    label?: string;
    rules?: RegisterOptions;
}
