import { extend } from 'umi-request';
import { get } from 'lodash';
import { Toast } from 'antd-mobile';
import { history } from 'umi';
import { getTokenForStorage } from 'utils/index';

class RequestError extends Error {}

// 请求实例
const Instance = extend({
    timeout: 5000,
});

// request拦截器, 改变url 或 options.
Instance.interceptors.request.use((url, options) => {
    return { url, options };
});

// response拦截器, 处理response
Instance.interceptors.response.use(async response => {
    return response;
});

// 默认请求参数
const defaultFetchOptions = {};

// 默认参数
let oneTimesErrorShow = false; // 避免多次显示
const defaultOptions = {
    // 是否显示错误
    isShowError: true,
    errorShowTime: 2,
    // http-code的对应文本
    codeMessage: {
        200: '服务器成功返回请求的数据。',
        201: '新建或修改数据成功。',
        202: '一个请求已经进入后台排队（异步任务）。',
        204: '删除数据成功。',
        400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
        401: '用户没有权限（令牌、用户名、密码错误）。',
        403: '用户得到授权，但是访问是被禁止的。',
        404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
        406: '请求的格式不可得。',
        410: '请求的资源被永久删除，且不会再得到的。',
        422: '当创建一个对象时，发生一个验证错误。',
        500: '服务器发生错误，请检查服务器。',
        502: '网关错误。',
        503: '服务不可用，服务器暂时过载或维护。',
        504: '网关超时。',
    },
    // 判断是否请求成功
    isSuccessResponse: response => {
        return response.status >= 200 && response.status < 300;
    },
    // 请求前的函数处理
    onBeforeFetch: newFetchOptions => {
        newFetchOptions.headers = {
            ...newFetchOptions.headers,
            Authorization: `Bearer ${getTokenForStorage() || undefined}`, // 从localStorage中获取token
        };
        return newFetchOptions;
    },
    // 获取错误文本
    getErrorText: (hasDataResponse, options) => {
        // 接口错误文本
        const responseErrorText = get(hasDataResponse, 'data.meta.message', '');
        if (responseErrorText) {
            return responseErrorText;
        }
        // http状态码文本
        const httpCodeText = get(
            options.codeMessage,
            hasDataResponse.status,
            '',
        );
        if (httpCodeText) {
            return httpCodeText;
        }

        return '请求出错！';
    },
    // 接口错误处理函数
    /**
   *  interface error {
        name:string,
        data:any,
        type: string,
        response:{
          status:number,
          statusText:string,
          url:string
        }
      }
   */
    requestErrorHandler: (error, options) => {
        const { response, data } = error;
        const { status } = response;
        const hasDataResponse = {
            ...response,
            data,
        };

        if (status === 401) {
            // 登出处理
            console.log('401: 退出登录，返回登录页！');
            history.push('/login');
        } else if (status === 403) {
            // 跳转403
            history.push('/403');
        } else {
            // 显示错误
            const errorText = options.getErrorText(hasDataResponse, options);

            if (options.isShowError && !oneTimesErrorShow) {
                oneTimesErrorShow = true;
                Toast.fail(errorText, options.errorShowTime);
                setTimeout(() => {
                    oneTimesErrorShow = false;
                }, options.errorShowTime);
            }

            // 抛出错误
            const throwError = new RequestError(errorText);
            throwError.response = hasDataResponse;
            throw throwError;
        }
    },
};

// 导出请求
export default async function request(fetchOptions, options) {
    let newFetchOptions = { ...defaultFetchOptions, ...fetchOptions };
    const newOptions = { ...defaultOptions, ...options };

    // 请求前处理函数
    if (typeof newOptions.onBeforeFetch === 'function') {
        newFetchOptions = newOptions.onBeforeFetch(newFetchOptions);
    }

    try {
        // newFetchOptions的格式: { method: 'post', data: {name: 'XMP',...}}
        const response = await Instance(newFetchOptions.url, newFetchOptions);
        return response;
    } catch (error) {
        console.log('error', error);
        // 处理错误
        newOptions.requestErrorHandler(error, newOptions);
    }
}
