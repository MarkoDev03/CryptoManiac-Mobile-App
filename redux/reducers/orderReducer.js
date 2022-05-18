let defaultState = {
    selectedItems: { order: "market_cap_desc", title:"Market Cap Descending"},
};

let orderReducer = (state = defaultState, action) => {
    switch(action.type) {
       case "ORDER_BY": {
           let newState = {...state};

           newState.selectedItems = {
               order: action.payload.order,
               title: action.payload.title
           } 
           return newState;
       }
      default:
          return state
    }
}

export default orderReducer;