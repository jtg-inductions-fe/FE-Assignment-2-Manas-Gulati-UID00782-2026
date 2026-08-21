import { API_ENDPOINTS, HTTPS_CODES, HTTPS_METHODS } from './apiConstants';

export const API_CONTRACT = {
    AUTH: {
        LOGIN: {
            METHOD: HTTPS_METHODS.GET,
            ENDPOINT: API_ENDPOINTS.AUTH.LOGIN,
            SUCCESS: HTTPS_CODES.OK,
            ERROR: [
                HTTPS_CODES.UNAUTHORIZED,
                HTTPS_CODES.BAD_REQUEST,
                HTTPS_CODES.TOO_MANY_REQUESTS,
                HTTPS_CODES.INTERNAL_SERVER_ERROR,
                HTTPS_CODES.BAD_GATEWAY,
            ],
        },
        SIGNUP: {
            METHOD: HTTPS_METHODS.POST,
            ENDPOINT: API_ENDPOINTS.AUTH.SIGNUP,
            SUCCESS: HTTPS_CODES.CREATED,
            ERROR: [
                HTTPS_CODES.BAD_REQUEST,
                HTTPS_CODES.CONFLICT,
                HTTPS_CODES.TOO_MANY_REQUESTS,
                HTTPS_CODES.INTERNAL_SERVER_ERROR,
            ],
        },
    },
    RESTAURANTS: {
        MAIN: {
            METHOD: HTTPS_METHODS.GET,
            ENDPOINT: API_ENDPOINTS.RESTAURANTS.MAIN,
            SUCCESS: HTTPS_CODES.OK,
            ERROR: [HTTPS_CODES.INTERNAL_SERVER_ERROR, HTTPS_CODES.BAD_GATEWAY],
        },
        ID: {
            METHOD: HTTPS_METHODS.GET,
            ENDPOINT: API_ENDPOINTS.RESTAURANTS.ID,
            SUCCESS: HTTPS_CODES.OK,
            ERROR: [HTTPS_CODES.INTERNAL_SERVER_ERROR, HTTPS_CODES.BAD_GATEWAY],
        },
        ADD: {
            METHOD: HTTPS_METHODS.POST,
            ENDPOINT: API_ENDPOINTS.RESTAURANTS.MAIN,
            SUCCESS: HTTPS_CODES.CREATED,
            ERROR: [
                HTTPS_CODES.BAD_REQUEST,
                HTTPS_CODES.FORBIDDEN,
                HTTPS_CODES.CONFLICT,
                HTTPS_CODES.INTERNAL_SERVER_ERROR,
                HTTPS_CODES.BAD_GATEWAY,
            ],
        },
        EDIT: {
            METHOD: HTTPS_METHODS.PUT,
            ENDPOINT: API_ENDPOINTS.RESTAURANTS.ID,
            SUCCESS: HTTPS_CODES.OK,
            ERROR: [
                HTTPS_CODES.BAD_REQUEST,
                HTTPS_CODES.FORBIDDEN,
                HTTPS_CODES.INTERNAL_SERVER_ERROR,
                HTTPS_CODES.BAD_GATEWAY,
            ],
        },
        DELETE: {
            METHOD: HTTPS_METHODS.DELETE,
            ENDPOINT: API_ENDPOINTS.RESTAURANTS.ID,
            SUCCESS: HTTPS_CODES.NO_CONTENT,
            ERROR: [
                HTTPS_CODES.FORBIDDEN,
                HTTPS_CODES.INTERNAL_SERVER_ERROR,
                HTTPS_CODES.BAD_GATEWAY,
            ],
        },
        STOREHOURS: {
            METHOD: HTTPS_METHODS.PUT,
            ENDPOINT: API_ENDPOINTS.RESTAURANTS.HOURS,
            SUCCESS: HTTPS_CODES.OK,
            ERROR: [
                HTTPS_CODES.FORBIDDEN,
                HTTPS_CODES.INTERNAL_SERVER_ERROR,
                HTTPS_CODES.BAD_GATEWAY,
            ],
        },
    },
    MENU: {
        MAIN: {
            METHOD: HTTPS_METHODS.GET,
            ENDPOINT: API_ENDPOINTS.MENU.MAIN,
            SUCCESS: HTTPS_CODES.OK,
            ERROR: [HTTPS_CODES.INTERNAL_SERVER_ERROR, HTTPS_CODES.BAD_GATEWAY],
        },
        FOODID: {
            METHOD: HTTPS_METHODS.GET,
            ENDPOINT: API_ENDPOINTS.MENU.FOODID,
            SUCCESS: HTTPS_CODES.OK,
            ERROR: [HTTPS_CODES.INTERNAL_SERVER_ERROR, HTTPS_CODES.BAD_GATEWAY],
        },
        ADD: {
            METHOD: HTTPS_METHODS.POST,
            ENDPOINT: API_ENDPOINTS.MENU.MAIN,
            SUCCESS: HTTPS_CODES.CREATED,
            ERROR: [
                HTTPS_CODES.BAD_REQUEST,
                HTTPS_CODES.FORBIDDEN,
                HTTPS_CODES.CONFLICT,
                HTTPS_CODES.INTERNAL_SERVER_ERROR,
                HTTPS_CODES.BAD_GATEWAY,
            ],
        },
        EDIT: {
            METHOD: HTTPS_METHODS.PUT,
            ENDPOINT: API_ENDPOINTS.MENU.FOODID,
            SUCCESS: HTTPS_CODES.OK,
            ERROR: [
                HTTPS_CODES.BAD_REQUEST,
                HTTPS_CODES.FORBIDDEN,
                HTTPS_CODES.INTERNAL_SERVER_ERROR,
                HTTPS_CODES.BAD_GATEWAY,
            ],
        },
        DELETE: {
            METHOD: HTTPS_METHODS.DELETE,
            ENDPOINT: API_ENDPOINTS.MENU.FOODID,
            SUCCESS: HTTPS_CODES.NO_CONTENT,
            ERROR: [
                HTTPS_CODES.FORBIDDEN,
                HTTPS_CODES.INTERNAL_SERVER_ERROR,
                HTTPS_CODES.BAD_GATEWAY,
            ],
        },
        STOCK: {
            METHOD: HTTPS_METHODS.PUT,
            ENDPOINT: API_ENDPOINTS.MENU.STOCK,
            SUCCESS: HTTPS_CODES.OK,
            ERROR: [
                HTTPS_CODES.FORBIDDEN,
                HTTPS_CODES.INTERNAL_SERVER_ERROR,
                HTTPS_CODES.BAD_GATEWAY,
            ],
        },
    },
    CART: {
        MAIN: {
            METHOD: HTTPS_METHODS.GET,
            ENDPOINT: API_ENDPOINTS.CART.MAIN,
            SUCCESS: HTTPS_CODES.OK,
            ERROR: [
                HTTPS_CODES.UNAUTHORIZED,
                HTTPS_CODES.INTERNAL_SERVER_ERROR,
                HTTPS_CODES.BAD_GATEWAY,
            ],
        },
    },
    ORDER: {
        CUSTOMER: {
            METHOD: HTTPS_METHODS.GET,
            ENDPOINT: API_ENDPOINTS.ORDER.CUSTOMER,
            SUCCESS: HTTPS_CODES.OK,
            ERROR: [
                HTTPS_CODES.FORBIDDEN,
                HTTPS_CODES.INTERNAL_SERVER_ERROR,
                HTTPS_CODES.BAD_GATEWAY,
            ],
        },
        OWNER: {
            METHOD: HTTPS_METHODS.GET,
            ENDPOINT: API_ENDPOINTS.ORDER.OWNER,
            SUCCESS: HTTPS_CODES.OK,
            ERROR: [
                HTTPS_CODES.FORBIDDEN,
                HTTPS_CODES.INTERNAL_SERVER_ERROR,
                HTTPS_CODES.BAD_GATEWAY,
            ],
        },
        CREATE: {
            METHOD: HTTPS_METHODS.POST,
            ENDPOINT: API_ENDPOINTS.ORDER.CUSTOMER,
            SUCCESS: HTTPS_CODES.CREATED,
            ERROR: [
                HTTPS_CODES.FORBIDDEN,
                HTTPS_CODES.INTERNAL_SERVER_ERROR,
                HTTPS_CODES.BAD_GATEWAY,
            ],
        },
        CHANGESTATUS: {
            METHOD: HTTPS_METHODS.PUT,
            ENDPOINT: API_ENDPOINTS.ORDER.STATUS,
            SUCCESS: HTTPS_CODES.OK,
            ERROR: [
                HTTPS_CODES.FORBIDDEN,
                HTTPS_CODES.INTERNAL_SERVER_ERROR,
                HTTPS_CODES.BAD_GATEWAY,
            ],
        },
    },
};
