export const SET_USER_TYPE ='SET_USER_TYPE'
export const SET_COUNT = 'SET_COUNT'


export const setUserTypeSuccess =(userType) =>({
    type:SET_USER_TYPE,
    payload:{userType}
})

export function setUserType(userType){
    return dispatch =>{
        dispatch(setUserTypeSuccess(userType))
    }
}
export const setCountSuccess =(count) =>({
    type:SET_COUNT,
    payload:{count}
})

export function setCount(count){
    return dispatch =>{
        dispatch(setCountSuccess(count))
    }
}
