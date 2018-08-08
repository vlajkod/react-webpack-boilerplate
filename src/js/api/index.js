import { fetchResource } from 'api/fetch';


const URL = 'https://api.publicapis.org';

function getPublicApi() {
    return fetchResource(URL, 'entries');
}

export default {
    getPublicApi
};
