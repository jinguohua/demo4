import Loadable from "react-loadable";
import { Loading } from "../components/loading";
export const UserRoute = [
  {
    path: "/test/user",
    exact: false,
    component: Loadable({
      loader: () => import(/* webpackChunkName: 'testroute' */ "./user"),
      loading: Loading,
      timeout: 10000
    })
  }
];
