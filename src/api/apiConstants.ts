/**
 * HTTPS Status codes
 * @constant
 */
export const HTTPS_CODES = {
    //SUCCESSFUL
    OK: 200,
    CREATED: 201,
    ACCEPTED: 202,
    NO_CONTENT: 204,

    //CLIENT ERROR
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    METHOD_NOT_ALLOWED: 405,
    CONFLICT: 409,
    UNSUPPORTED_MEDIA_TYPE: 415,
    TOO_MANY_REQUESTS: 429,

    //SERVER ERROR
    INTERNAL_SERVER_ERROR: 500,
    BAD_GATEWAY: 502,
};

/**
 * HTTPS Methods
 * @constant
 */
export const HTTPS_METHODS = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
};

/**
 * API ENDPOINTS
 * @constant
 */
export const API_ENDPOINTS = {
    AUTH: {
        LOGIN: '/login',
        SIGNUP: '/signup',
    },
    RESTAURANTS: {
        MAIN: '/restaurants',
        ID: (restaurantId: string) =>
            `/restaurants/${encodeURIComponent(restaurantId)}`,
        HOURS: (restaurantId: string) => `/restaurants/${restaurantId}/hours`,
    },
    MENU: {
        MAIN: (restaurantId: string) =>
            `/restaurants/${encodeURIComponent(restaurantId)}/menu`,
        FOODID: (restaurantId: string, foodId: string) =>
            `/restaurants/${restaurantId}/menu/${encodeURIComponent(foodId)}`,
        STOCK: (restaurantId: string, foodId: string) =>
            `/restaurants/${restaurantId}/menu/${encodeURIComponent(foodId)}/stock`,
    },
    CART: {
        MAIN: (userId: string) => `/cart/${encodeURIComponent(userId)}`,
    },
    ORDER: {
        CUSTOMER: (customerId: string) =>
            `/order/${encodeURIComponent(customerId)}`,
        OWNER: (ownerId: string) => `/order/${encodeURIComponent(ownerId)}`,
        STATUS: (customerId: string) =>
            `/order/${encodeURIComponent(customerId)}/status`,
    },
};
