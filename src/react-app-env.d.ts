/// <reference types="react-scripts" />
declare namespace NodeJS {
    interface ProcessEnv {
        NODE_ENV: 'development' | 'production' | 'test'
        REACT_APP_AVAILABILITY: string
        REACT_APP_SELECT_DATE: string
        REACT_APP_SUBMIT: string
        }
    }
    interface Window {
        Stripe: any
    }

    declare module 'places-autocomplete-react';