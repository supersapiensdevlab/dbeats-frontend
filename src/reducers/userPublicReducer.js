import { USER_PUBLIC_ERROR, USER_PUBLIC_LOADED, USER_PUBLIC_LOADING } from "../actions/types";

const initialState = {
    isLoading: false,
    user: null,
    error:null
}

export default function (state = initialState, action) {
    switch (action.type) {
        case USER_PUBLIC_LOADING:
            return {
                ...state,
                isLoading: true
            };
        case USER_PUBLIC_LOADED:
            return {
                ...state,
                isLoading: false,
                user: action.payload,
                error:null
            }
        case USER_PUBLIC_ERROR:
            return {
                ...state,
                user:null,
                error:action.payload
            }    
        default:
            return state;
    }
}