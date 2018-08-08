import {
    GET_PUBLIC_API_START,
    GET_PUBLIC_API_ERROR,
    GET_PUBLIC_API_SUCCESS
} from 'actions/public-api';

const initialState = {
    loading: false,
    error: null,
    publicApi: null
};

const actionMap = {
    [GET_PUBLIC_API_START]: (state) => {
        return {
            ...state,
            loading: true
        };
    },
    [GET_PUBLIC_API_SUCCESS]: (state, action) => {
        const publicApi = action.data.reduce((acc, item) => {
            const key = item.Category;
            if (acc[key]) {
                acc[key].push(item);
            } else {
                acc[key] = [item];
            }
            return acc;
        }, {});

        return {
            ...state,
            publicApi,
            loading: false
        };
    },
    [GET_PUBLIC_API_ERROR]: (state, action) => {
        const error = action.error;
        return {
            ...state,
            error,
            loading: false
        };
    }
};

export default function reducer(state = initialState, action = {}) {
    const fn = actionMap[action.type];
    return fn ? fn(state, action) : state;
}
