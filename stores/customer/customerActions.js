export const SET_CUSTOMER_USERNAME = 'SET_CUSTOMER_USERNAME'
export const SET_CUSTOMER_LASTNAME = 'SET_CUSTOMER_LASTNAME'
export const SET_CUSTOMER_MOBILE = 'SET_CUSTOMER_MOBILE'
export const SET_CUSTOMER_PAYMENT_METHOD = 'SET_CUSTOMER_PAYMENT_METHOD'
export const SET_CUSTOMER_MAP_REGION = 'SET_CUSTOMER_MAP_REGION'
export const SET_CUSTOMER_LANGUAGE = 'SET_CUSTOMER_LANGUAGE'


export const setUsernameSuccess =(username) =>({
    type:SET_SELECTED_TAB,
    payload:{username}
})

export function setUsername(username){
    return dispatch =>{
        dispatch(setUsernameSuccess(username))
    }
}

export const setLastnameSuccess =(lastname) =>({
    type:SET_SELECTED_TAB,
    payload:{lastname}
})

export function setLastname(lastname){
    return dispatch =>{
        dispatch(setLastnameSuccess(lastname))
    }
}
export const setLanguageSuccess =(language) =>({
    type:SET_SELECTED_TAB,
    payload:{language}
})

export function setLanguage(language){
    return dispatch =>{
        dispatch(setLanguageSuccess(language))
    }
}

export const setMobileSuccess =(mobile) =>({
    type:SET_SELECTED_TAB,
    payload:{mobile}
})

export function setMobile(mobile){
    return dispatch =>{
        dispatch(setMobileSuccess(mobile))
    }
}

export const setPaymentMethodSuccess =(paymentMethod) =>({
    type:SET_SELECTED_TAB,
    payload:{paymentMethod}
})

export function setPaymentMethod(paymentMethod){
    return dispatch =>{
        dispatch(setPaymentMethodSuccess(paymentMethod))
    }
}






