import { ReactNode } from 'react';

import { RegisterOptions } from 'react-hook-form';

export interface FormSelectFieldProps {
    name: string;
    id: string;
    label: string;
    rules?: RegisterOptions;
    children: ReactNode;
}
