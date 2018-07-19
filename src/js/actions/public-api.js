export const GET_PUBLIC_API_START = '[FreeApi] Get Public API Start'
export const GET_PUBLIC_API_ERROR = '[FreeApi] Get Public API Error';
export const GET_PUBLIC_API_SUCCESS = '[FreeApi] Get Public API Success';


export function getPublicApi() {
    return {
        type: GET_PUBLIC_API_START
    };
}