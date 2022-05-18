let defaultState = {
    selectedItems: { pageNumber: 1 },
};

let marketReducer = (state = defaultState, action) => {
    switch(action.type) {
       case "CHANGE_PAGE": {
           let newState = {...state};

           if (newState.selectedItems.pageNumber < 1) {
               newState.selectedItems = {
                   pageNumber:1
               }
           } else {
            newState.selectedItems = {
                pageNumber:action.payload.pageNumber
            }
           }

           if (newState.selectedItems.pageNumber == 0){
            newState.selectedItems = {
                pageNumber:1
            }
           }

           if (newState.selectedItems.pageNumber > 411) {
            newState.selectedItems = {
                pageNumber:412
            }
           }

           return newState;
       }
      default:
          return state
    }
}

export default marketReducer;