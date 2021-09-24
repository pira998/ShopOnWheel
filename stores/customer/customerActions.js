export const SET_CUSTOMER_USERNAME = 'SET_CUSTOMER_USERNAME'
export const SET_CUSTOMER_LASTNAME = 'SET_CUSTOMER_LASTNAME'
export const SET_CUSTOMER_MOBILE = 'SET_CUSTOMER_MOBILE'
export const SET_CUSTOMER_PAYMENT_METHOD = 'SET_CUSTOMER_PAYMENT_METHOD'
export const SET_CUSTOMER_MAP_REGION = 'SET_CUSTOMER_MAP_REGION'
export const SET_CUSTOMER_LANGUAGE = 'SET_CUSTOMER_LANGUAGE'


export const setSelectedTabSuccess =(selectedTab) =>({
    type:SET_SELECTED_TAB,
    payload:{selectedTab}
})

export function setSelectedTab(selectedTab){
    return dispatch =>{
        dispatch(setSelectedTabSuccess(selectedTab))
    }
}

