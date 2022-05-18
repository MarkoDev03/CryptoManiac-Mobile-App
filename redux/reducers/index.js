import { combineReducers } from "redux";
import marketReducer from "./marketReducer";
import marketHourReducer from "./marketHourReducer";
import orderReducer from "./orderReducer";
import priceReducer from "./priceReducer"

let reducers = combineReducers({
    marketReducer:marketReducer,
    marketHourReducer:marketHourReducer,
    orderReducer:orderReducer,
    priceReducer:priceReducer
});

const rootReducer = (state, action) => {
    return reducers(state, action)
};

export default rootReducer;