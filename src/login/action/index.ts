import { fetch } from '../../../assets/fetch';
export function testLogin(data) {
    return fetch({
        url: '/ajax/login',
        stringify: true,
        data,
        needHandle: false
    })
}