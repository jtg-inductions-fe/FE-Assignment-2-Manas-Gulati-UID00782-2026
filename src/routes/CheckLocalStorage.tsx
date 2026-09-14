import { PropsWithChildren, useEffect } from 'react';

import { initializeUser } from 'store/cartSlice';
import { useTypeDispatch, useTypeSelector } from 'store/hooks';
import { get } from 'store/restaurantSlice';

export const CheckLocalStorage = ({ children }: PropsWithChildren) => {
    const dispatch = useTypeDispatch();
    const user = useTypeSelector((state) => state.auth.user);

    useEffect(() => {
        if (!user) return;
        dispatch(get({ role: user.role, userId: user.userId }));
        dispatch(initializeUser(user.userId));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    return children;
};
