import axios from 'axios';
import qs from 'qs';
import { message } from 'antd';
// import { message } from 'antd';

// let pending = {};
// const CancelToken = axios.CancelToken;
// //删除重复请求
// const removePending = (key, isRequest = false) => {
//     if (pending[key] && isRequest) {
//         pending[key]('取消重复请求');
//     }
//     delete pending[key];
// };
// const getRequestIdentify = (config, isReuest = false) => {
//     let url = config.url;
//     if (isReuest) {
//         url = config.baseURL + config.url.substring(1, config.url.length);
//     }
//     return config.method === 'get' ? encodeURIComponent(url + JSON.stringify(config.params)) : encodeURIComponent(config.url + JSON.stringify(config.data));
// };

// // http request 拦截器
// axios.interceptors.request.use(
//     config => {
//         //删除重复请求
//         let requestData = getRequestIdentify(config, true);
//         removePending(requestData, true);
//         config.cancelToken = new CancelToken((cancel) => {
//             pending[requestData] = cancel;
//         });
//         return config;
//     },
//     error => {
//         return Promise.reject(error);
//     }
// );

/**
 * 处理状态码 
 * @param {*} response   请求结果
 * @param {*} needHandle   true 自行处理结果值 false 系统处理结果值
 * @param {*} resolve 返回处理数据
 */
const handleResponseStatus = (response, needHandle, resolve) => {
    if (response.data.code === 201) {
        let hn = location.hostname;
        if (hn.indexOf('com') > -1 || hn.indexOf('cn') > -1 || hn.indexOf('net') > -1) {
            location.href = `${Address.path}/login.html`;
        } else {
            location.href = '/ops/p/login';
        }
    } else {
        if (needHandle) {
            resolve(response.data);
        } else {
            if (response.data.code !== 200) {
                message.warn(response.data.message || '系统服务异常');
            } else {
                resolve(response.data.data);
            }
        }
    }
}

// 封装请求
export function fetch({ type = 'post', url, preUrl = '', dataType = 'json', headers = {}, unload = true, stringify = false, data = null, params = null, needHandle = true }) {
    data = stringify ? qs.stringify(data || {}) : data;
    params = stringify ? qs.stringify(params || {}) : params;
    headers = Object.assign({}, { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }, headers);
    return new Promise((resolve, reject) => {
        axios({
            method: type,
            url,
            data,
            params,
            responseType: dataType,
            headers,
        }).then(response => {
            handleResponseStatus(response, needHandle, resolve);
        }).catch(err => {
            reject(err);
            // unload ? loadEnd() : null;
        });
    });
}
