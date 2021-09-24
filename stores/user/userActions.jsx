export const SET_USER_TYPE ='SET_USER_TYPE'

export const setUserTypeSuccess =(userType) =>({
    type:SET_USER_TYPE,
    payload:{userType}
})

export function setUserType(userType){
    return dispatch =>{
        dispatch(setUserTypeSuccess(userType))
    }
}
