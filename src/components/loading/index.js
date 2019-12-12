import React from 'react';
import './index.less';

export const Loading = ({ pastDelay, timedOut, error }) => {
    console.log(pastDelay, timedOut, error)
    if (pastDelay) {
        return '加载中';
    } else if (timedOut) {
        return '超时';
    } else if (error) {
        return '错误';
    }
    return null;
};
