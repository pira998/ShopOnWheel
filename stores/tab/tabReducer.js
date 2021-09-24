import * as tabActionTypes from './tabActions';

const initailState ={
    selectedTab :""
}

const tabReducer =(state =initailState,action) =>{
    switch(action.type){
        case tabActionTypes.SET_SELECTED_TAB:
            return {
                ...state,
                selectedTab:action.payload.selectedTab
            }
        default:
            return state
    }
}

export default tabReducer;