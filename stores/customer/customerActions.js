export const SET_CUSTOMER_USERNAME = 'SET_CUSTOMER_USERNAME'
export const SET_CUSTOMER_LASTNAME = 'SET_CUSTOMER_LASTNAME'
export const SET_CUSTOMER_MOBILE = 'SET_CUSTOMER_MOBILE'
export const SET_CUSTOMER_PAYMENT_METHOD = 'SET_CUSTOMER_PAYMENT_METHOD'
export const SET_CUSTOMER_MAP_COORDS = 'SET_CUSTOMER_MAP_COORDS'
export const SET_CUSTOMER_LANGUAGE = 'SET_CUSTOMER_LANGUAGE'
export const SET_CUSTOMER_ADDRESS = 'SET_CUSTOMER_ADDRESS'

export const setUsernameSuccess =(username) =>({
    type:SET_CUSTOMER_USERNAME,
    payload:{username}
})

export function setUsername(username){
    return dispatch =>{
        dispatch(setUsernameSuccess(username))
    }
}

export const setLastnameSuccess =(lastname) =>({
    type:SET_CUSTOMER_LASTNAME,
    payload:{lastname}
})

export function setLastname(lastname){
    return dispatch =>{
        dispatch(setLastnameSuccess(lastname))
    }
}
export const setLanguageSuccess =(language) =>({
    type:SET_CUSTOMER_LANGUAGE,
    payload:{language}
})

export function setLanguage(language){
    return dispatch =>{
        dispatch(setLanguageSuccess(language))
    }
}

export const setMobileSuccess =(mobile) =>({
    type:SET_CUSTOMER_MOBILE,
    payload:{mobile}
})

export function setMobile(mobile){
    return dispatch =>{
        dispatch(setMobileSuccess(mobile))
    }
}

export const setPaymentMethodSuccess =(paymentMethod) =>({
    type:SET_CUSTOMER_PAYMENT_METHOD,
    payload:{paymentMethod}
})

export function setPaymentMethod(paymentMethod){
    return dispatch =>{
        dispatch(setPaymentMethodSuccess(paymentMethod))
    }
}

export const setMapCoordsSuccess =(mapCoords) =>({
    type:SET_CUSTOMER_MAP_COORDS,
    payload:{mapCoords}
})

export function setMapCoords(mapCoords){
    return dispatch =>{
        dispatch(setMapCoordsSuccess(mapCoords))
    }
}

export const setAddressSuccess =(address) =>({
    type:SET_CUSTOMER_ADDRESS,
    payload:{address}
})

export function setAddress(address){
    return dispatch =>{
        dispatch(setAddressSuccess(address))
    }
}









