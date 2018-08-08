function handleApiError(message, data, status) {
    let response = null;
    let isObject = false;

    try {
        response = JSON.parse(data);
        isObject = true;
    } catch (e) {
        response = data;
    }

    return {
        response,
        message,
        status,
        toString: () => `${ this.message }\nResponse:\n
        ${ isObject ? JSON.stringify(this.response, null, 2) : this.response }`
    };
}

export const fetchResource = (urlPath, path, userOptions = {}) => {
    const defaultOptions = {};

    const defaultHeaders = {
    };

    const options = {
        ...defaultOptions,
        ...userOptions,
        headers: {
            ...defaultHeaders,
            ...userOptions.headers
        }
    };

    const url = `${ urlPath }/${ path }`;

    const isFile = typeof window !== 'undefined' && options.body instanceof File;

    if (options.body && typeof options.body === 'object' && !isFile) {
        options.body = JSON.stringify(options.body);
    }

    let response = null;

    return fetch(url, options).then(responseObject => {
        response = responseObject;
        if (response.status === 401) {
            // handle unauthorize requests
        }

        if (response.status < 200 || response.status >= 300) {
            // get response as text
            return response.text();
        }

        return response.json();
    }).then(parseResponse => {
        if (response.status < 200 || response.status >= 300) {
            // Throw error
            throw parseResponse;
        }

        return parseResponse;
    }).catch(error => {
        if (response) {
            throw handleApiError(`Request failed with status ${ response.status }.`, error, response.status);
        } else {
            throw handleApiError(error.toString(), null, 'REQUEST_FAILD');
        }
    });
};
