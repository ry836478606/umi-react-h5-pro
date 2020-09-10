// import 'lib-flexible'
import { RequestConfig } from 'umi';

export const request: RequestConfig = {
    credentials: 'include',
    errorConfig: {
        adaptor: resData => {
            return {
                ...resData,
                data: resData.data,
                success: resData.meta.code === 200,
                errorMessage: resData.meta.message,
            };
        },
    },
};

// dva会吞掉抛错
export const dva = {
    config: {
        onError(e: { message: any }) {
            console.error(e.message);
        },
    },
};
