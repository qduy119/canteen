import createAxiosInstance from "./axios";

export const axiosBaseQuery =
    ({ baseUrl } = { baseUrl: "" }) =>
    async ({ url, method = "GET", body, params, headers, options }) => {
        try {
            const privateAxios = createAxiosInstance();
            const result = await privateAxios({
                url: baseUrl + url,
                method,
                data: body,
                params,
                headers,
                ...options,
            });
            return { data: result.data };
        } catch (axiosError) {
            let err = axiosError;
            return {
                error: {
                    status: err.response?.status,
                    data: err.response?.data || err.message,
                },
            };
        }
    };
