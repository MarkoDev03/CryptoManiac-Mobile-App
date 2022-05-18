let defaultState = {
    selectedItems: { hour: "24h"},
};

let marketHourReducer = (state = defaultState, action) => {
    switch(action.type) {
       case "SET_HOUR": {
           let newState = {...state};

           newState.selectedItems = {
               hour: action.payload.hour
           } 
           return newState;
       }
      default:
          return state
    }
}

export default marketHourReducer;