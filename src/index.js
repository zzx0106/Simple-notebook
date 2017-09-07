import React from "react";
import {render} from "react-dom";
import App from "./App.jsx";
import {Provider} from "react-redux";
import registerServiceWorker from "./registerServiceWorker";
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {createStore, combineReducers, applyMiddleware, compose} from "redux";
import {ConnectedRouter, routerReducer, routerMiddleware} from "react-router-redux";
import logger from "redux-logger"
import thunk from "redux-thunk"
import createHistory from "history/createBrowserHistory";
import {reducers} from "./reducers/index";
// 创建您选择的历史（在这种情况下我们使用浏览器历史）
const history = createHistory();
// 构建拦截和调度导航行为的中间件
const middleware = routerMiddleware(history); //添加router的中间件

// 将reducer 添加到 store on the `router` key
const store = createStore(combineReducers({
  ...reducers,
  router: routerReducer
}), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), compose(applyMiddleware(middleware, thunk, logger)) //插件调试，未安装会报错
);
// Now you can dispatch navigation actions from anywhere!
// store.dispatch(push('/foo'))
const rooter = document.getElementById("root");
render(
  <Provider store={store}>
  {/* <Router> */}
  <ConnectedRouter history={history}>
    <App/>
  </ConnectedRouter>
  {/* </Router> */}
</Provider>, rooter);
registerServiceWorker();
