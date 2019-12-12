import App from './index';
import { UserRoute } from '../user/route';
export const AppRoute = [
    {
        path: '/test',
        exact: false,
        component: App,
        routes: [
            ...UserRoute
        ]
    }
]