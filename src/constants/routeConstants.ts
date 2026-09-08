/**
 * Routes
 * @constant
 */
export const ROUTES = {
    HOME: '/',
    DASHBOARD: '/dashboard',
    FOOD: (restaurantId: number | string) => `/dashboard/${restaurantId}`,

    CART: (userId: number | string) => `/dashboard/cart/${userId}`,
    ORDER: '/dashboard/order',
};
