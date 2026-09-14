/**
 * Routes
 * @constant
 */
export const ROUTES = {
    HOME: '/',
    DASHBOARD: '/dashboard',
    FOOD_ROUTE: '/dashboard/:restaurantId',
    FOOD: (restaurantId: number | string) => `/dashboard/${restaurantId}`,

    CART_ROUTE: '/dashboard/cart/:userId',
    CART: (userId: number | string) => `/dashboard/cart/${userId}`,
    ORDER: '/dashboard/order',
    ERROR: '404',
};
