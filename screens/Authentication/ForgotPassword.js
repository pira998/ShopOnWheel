import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    KeyboardAvoidingView,
    Image
} from 'react-native';
import AuthLayout from './AuthLayout';
import {COLORS,SIZES,FONTS,icons} from '../../constants'


import { FormInput,CustomSwitch,AuthTextButton,TextIconButton } from '../../components';
import {utils} from '../../utils'
import {forgotPassword} from '../../firebase/api.js'
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { gql, useQuery } from '@apollo/client';




const GET_USERS = gql`
    {
        users {
            id
            email
        }
    }

`

const ForgotPassword = ({navigation}) => {
    const LoginSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Required'),
    });

    const {
    handleChange,
    handleBlur,
    values,
    handleSubmit,
    errors,
    touched,
    setFieldValue
  } = useFormik({
    validationSchema: LoginSchema,
    initialValues: { email: '', password: '', remember: false ,showPass:false },
    onSubmit: async (values) => {
      
        forgotPassword(values.email);
        navigation.navigate('EmailSentSuccess')
       
    }
  });




    function isEnabledSignIn(){
        return values.email != "" && typeof errors.email == 'undefined'
    }

    const {loading,error,data} = useQuery(GET_USERS,{
        onCompleted:(data) =>{
            console.log(data)
         
        }
    })


    return (
        <KeyboardAvoidingView style={{flex:1,justifyContent:"center"}} >
       <AuthLayout
        title="Password Recovery"
        subtitle="Please enter your email address to server"
        titleContainerStyle={{
            marginTop:SIZES.padding*2
        }}
       >
            {/* Form Input  */}
            {/* <Query 
                query = {GET_USERS}
            >
                {({data})=>{
                    if(typeof data.users=== undefined) return null
                    {console.log(data)}
}}

            </Query> */}
            <View
                style={{
                     flex:1,
                     marginTop:SIZES.padding*2
                }}
            >
               <FormInput 
                label="Email"
                keyboardType = "email-address"
                autoCompleteType = "email"
                onChangeText = {handleChange("email")}
                errorMsg= {errors.email}
                appendComponent={
                    <View
                        style={{
                            justifyContent:'center'
                        }}
                    >
                        <Image 
                            source={values.email==""||(values.email!=""&& typeof errors.email == 'undefined')? icons.correct:icons.cross} 
                            style = {{
                                height:20,
                                width:20,
                                tintColor:values.email==""?COLORS.gray : (values.email!=""&& typeof errors.email == 'undefined')? COLORS.green: COLORS.red
                            }}
                            />
                    </View>
                }
            
            />
             
            </View>


            {/* Button  */}
            <AuthTextButton 
                label="Send Email"
                disabled={isEnabledSignIn()?false:true}
                buttonContainerStyle={{
                    height:55,
                    alignItems:'center',
                    marginTop:SIZES.padding,
                    borderRadius: SIZES.radius,
                    backgroundColor: isEnabledSignIn()? COLORS.primary:COLORS.transparentPrimary,

                }}
                onPress={handleSubmit}
            >

            </AuthTextButton>


       
       </AuthLayout>
       </KeyboardAvoidingView>
    )
}

export default ForgotPassword;