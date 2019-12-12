import Loadable from "react-loadable";
import { Loading } from "../components/loading";
export const LoginRoute = [
  {
    path: "/test/login",
    exact: false,
    component: Loadable({
      loader: () => import(/* webpackChunkName: 'rmslogin' */ "./index"),
      loading: Loading,
      timeout: 10000
    })
  },
];
