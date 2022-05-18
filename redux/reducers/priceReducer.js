let defaultState = {
    selectedItems: {title:"$ USD", value:"usdt", api:"usd", symbol:"$"},
};

let priceReducer = (state = defaultState, action) => {
    switch(action.type) {
       case "CHANGE_CURRENCY": {
           let newState = {...state};

           newState.selectedItems = {
               title: action.payload.title,
               value: action.payload.value,
               api: action.payload.api,
               symbol: action.payload.symbol
           } 
          
           return newState;
       }
      default:
          return state
    }
}

export default priceReducer;