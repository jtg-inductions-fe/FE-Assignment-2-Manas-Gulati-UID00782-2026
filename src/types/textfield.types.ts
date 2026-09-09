import { RegisterOptions } from 'react-hook-form';

//defining props for the text field component
export interface LabelProps {
    name: string;
    rules: RegisterOptions;
    id: string;
    defaultVal?: string | number;
    type?: string;
}
