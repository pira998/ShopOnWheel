import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
    ActivityIndicator
} from 'react-native';
import * as firebase from 'firebase'

import { useFormik } from 'formik';
import * as Yup from 'yup';
import  AuthLayout  from './AuthLayout';
import {COLORS,SIZES,FONTS,icons} from '../../constants'


import { FormInput,CustomSwitch,AuthTextButton,TextIconButton } from '../../components';
import {utils} from '../../utils'
import {vendorRegistration,customerRegistration} from '../../firebase/api.js'
import { connect } from 'react-redux';


  const SignUpSchema = Yup.object().shape({
    password: Yup.string()
    .min(6, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),

    passwordConfirmation: Yup.string()
    .equals([Yup.ref("password")],"Passwords don't match")
    .required('Required'),

    email: Yup.string().email('Invalid email').required('Required'),
});

const SignUp = ({navigation,userType}) => {
    // const [email,setEmail] = React.useState('')
    // const [password,setPassword] = React.useState('')
    // const [username,setUsername] = React.useState('')
    // const [showPass,setShowPass] = React.useState('')

    // const [emailError,setEmailError] = React.useState('')
    // const [usernameError,setUsernameError] = React.useState('')
    // const [passwordError,setPasswordError] = React.useState('')

  


    const {
    handleChange,
    handleBlur,
    handleSubmit,
    errors,
    values,
    touched,
    setFieldValue,
    } = useFormik({
        validationSchema: SignUpSchema,
        initialValues: { email: '', password: '', passwordConfirmation:'',showPass:false },
        onSubmit: (values) =>{
            if(userType=="vendor"){
                   vendorRegistration(values.email,values.password)
            }else if (userType=="customer"){
                customerRegistration(values.email,values.password)
            }
    }});

    function isEnabledSignUp(){
        // console.log(errors.passwordConfirmation)
            console.log(values)
      
        return values.email != "" && values.password != "" && typeof errors.email == "undefined" && typeof errors.passwordConfirmation == "undefined";
    }
    
    
    const [user, setUser] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [initializing, setInitializing] = React.useState(true);
    
    function onAuthStateChanged(user) {
        setUser(user);
        if(user != null){
            navigation.navigate('CustomerUserBio')
        }
        if (initializing) setInitializing(false);
            setLoading(false);
        } 



    React.useEffect(() => {
        const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);



    if (loading) {
        return (
        
        <View style={[styles.container, styles.horizontal]} > 
        <ActivityIndicator size="large" color="#FF6C44" />
        </View>);
    }

    return (
        <AuthLayout
            title="Getting Started"
            subtitle= {userType=="vendor"? "Create a vendor account to connect":'Create a customer account to connect'}
            titleContainerStyle={{
                marginTop:SIZES.radius,
            }}
        >
            {/* Form Input And Sign up */}
            <View
                style={{
                    flex:1,
                    marginTop:SIZES.padding,
                }}
            >
            
            <FormInput 
                label="Email"
                keyboardType = "email-address"
                autoCompleteType = "email"
                onChangeText = {handleChange('email')}
                errorMsg= {errors.email}
                touched={touched.email}
                appendComponent={
                    <View
                        style={{
                            justifyContent:'center'
                        }}
                    >
                        <Image 
                            source={values.email==""||(values.email!=""&& typeof errors.email =="undefined")? icons.correct:icons.cross} 
                            style = {{
                                height:20,
                                width:20,
                                tintColor:  values.email==""?COLORS.gray : (values.email!=""&&typeof errors.email == "undefined")? COLORS.green: COLORS.red
                            }}
                            />
                    </View>
                }
            
            />
{/* 
            <FormInput
                label="Username"
                containerStyle={{
                    marginTop:SIZES.radius,
                }}
                onChange={handleChange('username')}
                errorMsg = {usernameError}
                appendComponent={
                    <View
                        style={{
                            justifyContent:'center'
                        }}
                    >
                        <Image 
                            source ={username== ""|| (username != "" && usernameError == "")?icons.correct:icons.cross}
                            style={{
                                height:20,
                                width:20,
                                tintColor:username==""?COLORS.gray:(username!= "" && usernameError == "")? COLORS.green : COLORS.red
                            }}
                        />

                    </View>
                }
            /> */}

                <FormInput 
                label="Password"
                secureTextEntry={!values.showPass}
                autoCompleteType="password"
                touched={touched.password}
                containerStyle={{
                    marginTop:SIZES.radius,
                }}
                onChangeText={handleChange('password')}
                errorMsg = {errors.password}
                appendComponent={
                   <TouchableOpacity
                        style={{
                            width:40,
                            alignItems:'flex-end',
                            justifyContent:'center',

                        }}
                        onPress={()=>setFieldValue("showPass",!values.showPass)}

                   >
                       <Image 
                            source = {values.showPass ? icons.eye_close:icons.eye}
                            style={{
                                height:20,
                                width:20,
                                tintColor:COLORS.gray
                            }}
                       />
                   </TouchableOpacity> 
                }
            />

            <FormInput 
                label="Confirm Password"
                secureTextEntry={!values.showPass}
                autoCompleteType="password"
                containerStyle={{
                    marginTop:SIZES.radius,
                }}
                onChangeText={handleChange('passwordConfirmation')}
                errorMsg = {errors.passwordConfirmation}
                appendComponent={
                   <TouchableOpacity
                        style={{
                            width:40,
                            alignItems:'flex-end',
                            justifyContent:'center',

                        }}
                        onPress={()=>setFieldValue("showPass",!values.showPass)}

                   >
                       <Image 
                            source = {values.showPass ? icons.eye_close:icons.eye}
                            style={{
                                height:20,
                                width:20,
                                tintColor:COLORS.gray
                            }}
                       />
                   </TouchableOpacity> 
                }
            />

                {/* Sign up & Sign In */}

                <AuthTextButton
                    label="Sign Up"
                    disabled ={isEnabledSignUp()?false:true}
                    buttonContainerStyle={{
                        height:55,
                        alignItems:'center',
                        marginTop:SIZES.padding,
                        borderRadius:SIZES.radius,
                        backgroundColor: isEnabledSignUp()? COLORS.primary:'rgba(227, 120, 75, 0.4)'
                    }}
                    onPress = {handleSubmit}
                />
                  <View
                style={{
                    flexDirection:'row',
                    marginTop:SIZES.radius,
                    justifyContent:'center'
                }}
            >
        
                    <Text 
                        style={{
                            color:COLORS.darkGray,
                            ...FONTS.body3
                        }}
                    >
                        Already have an account?
                    </Text>

                    <AuthTextButton 
                        label ="Sign In"
                        buttonContainerStyle={{
                            marginLeft:3,
                            backgroundColor:null,
                        }}
                        labelStyle={{
                            color:COLORS.primary,
                            ...FONTS.h3,
                        }}
                        onPress= {()=>navigation.goBack()}
                    />


            </View>

            </View>

        </AuthLayout>


    )
}
function mapStateToProps(state){
    return {
        userType:state.userReducer.userType
    }
}



export default connect(mapStateToProps)(SignUp)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center"
    },
    horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
    }
});
