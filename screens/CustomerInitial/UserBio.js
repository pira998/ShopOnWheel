import React from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
    ActivityIndicator
} from 'react-native';
import * as firebase from 'firebase'
import { FormInput,CustomSwitch,AuthTextButton ,AuthTextIconButton } from '../../components';
import { connect } from 'react-redux';
import {COLORS,SIZES,FONTS,icons} from '../../constants'

import { useFormik } from 'formik';
import * as Yup from 'yup';
import Layout from './Layout'

const UserBio = ({userType,navigation}) => {
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    const LoginSchema = Yup.object().shape({
    lastname: Yup.string()
    .min(6, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
    mobile: Yup.string()
    .matches(phoneRegExp, 'Phone number is not valid'),
    username: Yup.string().min(6,'Too Short!').max(50,'Too Long!').required('Required'),
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
    initialValues: { username: '', mobile: '', lastname: "" },
    onSubmit: async (values) => {
        navigation.navigate('CustomerLanguage')
    }})
    function isFormFilled(){
        return values.username != "" && values.lastname != "" && typeof errors.mobile == 'undefined'
    }


    return (
       <Layout
            // title={userType=="customer"?"Let's Sign Customer in":"Let's Sign Vendor in"}
            title="Fill in your bio to get started"
            subtitle= "This data will be displayed in your account profile for security"
        >
             <View 
                style={{
                    flex:1,
                    marginTop:SIZES.padding
                }}
           >
            {/* Form inputs */}
            <FormInput 
                label="First name"
                keyboardType = "default"
                autoCompleteType = "username"
                onChangeText = {handleChange("username")}
                errorMsg= {errors.username}
                appendComponent={
                    <View
                        style={{
                            justifyContent:'center'
                        }}
                    >
                        <Image 
                            source={values.username==""||(values.username!=""&& typeof errors.username == 'undefined')? icons.correct:icons.cross} 
                            style = {{
                                height:20,
                                width:20,
                                tintColor:values.username==""?COLORS.gray : (values.username!=""&& typeof errors.username == 'undefined')? COLORS.green: COLORS.red
                            }}
                            />
                    </View>
                }
            
            />
            <FormInput 
                label="Last name"
                keyboardType = "default"
                autoCompleteType = "username"
                onChangeText = {handleChange("lastname")}
                errorMsg= {errors.lastname}
                appendComponent={
                    <View
                        style={{
                            justifyContent:'center'
                        }}
                    >
                        <Image 
                            source={values.lastname==""||(values.lastname!=""&& typeof errors.lastname == 'undefined')? icons.correct:icons.cross} 
                            style = {{
                                height:20,
                                width:20,
                                tintColor:values.lastname==""?COLORS.gray : (values.lastname!=""&& typeof errors.lastname == 'undefined')? COLORS.green: COLORS.red
                            }}
                            />
                    </View>
                }
            
            />
            <FormInput 
                label="Mobile"
                keyboardType = "numeric"
                autoCompleteType = "tel"
                onChangeText = {handleChange("mobile")}
                errorMsg= {errors.mobile}
                appendComponent={
                    <View
                        style={{
                            justifyContent:'center'
                        }}
                    >
                        <Image 
                            source={values.mobile==""||(values.mobile!=""&& typeof errors.mobile == 'undefined')? icons.correct:icons.cross} 
                            style = {{
                                height:20,
                                width:20,
                                tintColor:values.mobile==""?COLORS.gray : (values.mobile!=""&& typeof errors.mobile == 'undefined')? COLORS.green: COLORS.red
                            }}
                            />
                    </View>
                }
            
            />
          
            {/* Save me and Forget lastname */}

          

            {/* Sign in */}

            <AuthTextButton
                label="Next"
                disabled ={isFormFilled()?false:true}
                buttonContainerStyle={{
                    height:55,
                    alignItems:"center",
                    marginTop:SIZES.padding,
                    borderRadius:SIZES.radius,
                    backgroundColor: isFormFilled()? COLORS.primary:'rgba(227, 120, 75, 0.4)'
                }}
                onPress={handleSubmit}

            >

            </AuthTextButton>

       


           </View>



       </Layout>
    )
}

export default UserBio
