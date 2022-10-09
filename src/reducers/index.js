import { combineReducers } from "redux";

import { TransactionReducer } from "./transaction";
import AuthorizationReducer from "./userAuth";

const rootReducer = combineReducers({
  transactions: TransactionReducer,
  auths: AuthorizationReducer,
});
export default rootReducer;
