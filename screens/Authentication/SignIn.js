import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
    ActivityIndicator
} from 'react-native';
import  AuthLayout  from './AuthLayout';
import {COLORS,SIZES,FONTS,icons} from '../../constants'

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FormInput,CustomSwitch,AuthTextButton ,AuthTextIconButton } from '../../components';
import {utils} from '../../utils'
import {ApolloProvider,useQuery,gql} from '@apollo/client'
import {signIn,checkVendorExist} from '../../firebase/api.js'
import * as firebase from 'firebase'

import { connect } from 'react-redux';
import { setUserType } from '../../stores/user/userActions';


const SignIn = ({navigation,userType}) => {
    
    // const [email,setEmail] = React.useState("")
    // const [password,setPassword] = React.useState("")
    // const [emailError,setEmailError] = React.useState("")

    // const [showPass,setShowPass] = React.useState(false)
    // const [saveMe,setSaveMe] = React.useState(false)
    
  
    // const {loading,error,data} = useQuery(gql`
    //     {
    //         users{
    //             id
    //             email
    //         }
    //     }
    // `)
    // if(!error){
    //     data.users.map(({email})=>{
    //         setEmail(email)
    //     })
    // }
    const LoginSchema = Yup.object().shape({
    password: Yup.string()
    .min(6, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),

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
        if(userType=="vendor"){
            if (await checkVendorExist(values.email)){
                signIn(values.email,values.password)
                console.log(checkVendorExist(values.email))
                
        }else{
            
        }
        }else if(userType="customer"){
           await signIn(values.email,values.password)
           console.log(2)
      
        }

       
    }
  });





  function isEnabledSignIn(){
        return values.email != "" && values.password != "" && typeof errors.email == 'undefined'
    }

    const [user, setUser] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [initializing, setInitializing] = React.useState(true);
  // Handle user state changes
    function onAuthStateChanged(user) {
        setUser(user);
        if(user != null){
            navigation.navigate('Home')
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
        title={userType=="customer"?"Let's Sign Customer in":"Let's Sign Vendor in"}
        subtitle= "Welcome back, you've been missed"
       >
           <View 
                style={{
                    flex:1,
                    marginTop:SIZES.padding
                }}
           >
            {/* Form inputs */}
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

            <FormInput 
                label="Password"
                secureTextEntry={!values.showPass}
                autoCompleteType="password"
                containerStyle={{
                    marginTop:SIZES.radius,
                }}
                onChangeText={handleChange("password")}
                errorMsg={errors.password}
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
                            source = {!values.showPass ? icons.eye_close:icons.eye}
                            style={{
                                height:20,
                                width:20,
                                tintColor:COLORS.gray
                            }}
                       />
                   </TouchableOpacity> 
                }
            />

            {/* Save me and Forget password */}

            <View
                style ={{
                    flexDirection:'row',
                    marginTop:SIZES.radius,
                    justifyContent:"space-between"
                }}
            >
                <CustomSwitch 
                    value = {values.remember}
                    onChange = {(value)=>setFieldValue('remember',!values.remember)}
                />

                <AuthTextButton 
                    label="Forget Password?"
                    buttonContainerStyle={{
                        backgroundColor:null,

                    }}
                    labelStyle={{
                        color:COLORS.gray,
                        ...FONTS.body4,
                    }}
                    onPress={()=>navigation.navigate("ForgotPassword")}
                
                />

            </View>

            {/* Sign in */}

            <AuthTextButton
                label="Sign In"
                disabled ={isEnabledSignIn()?false:true}
                buttonContainerStyle={{
                    height:55,
                    alignItems:"center",
                    marginTop:SIZES.padding,
                    borderRadius:SIZES.radius,
                    backgroundColor: isEnabledSignIn()? COLORS.primary:'rgba(227, 120, 75, 0.4)'
                }}
                onPress={handleSubmit}

            >

            </AuthTextButton>

            {/* Sign up */}

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
                        Don't have an account?
                    </Text>

                    <AuthTextButton 
                        label ="Sign Up"
                        buttonContainerStyle={{
                            marginLeft:3,
                            backgroundColor:null,
                        }}
                        labelStyle={{
                            color:COLORS.primary,
                            ...FONTS.h3,
                        }}
                        onPress= {()=>navigation.navigate("SignUp")}
                    />


            </View>
       


           </View>
            {/* Footer */}
            <View>
                {/* Facebook */}
                {/* <TextIconButton 
                    containerStyle = {{
                        height:50,
                        alignItems:'center',
                        borderRadius:SIZES.radius,
                        backgroundColor:COLORS.blue,
                    }}
                    icon = {icons.fb}
                    iconPosition = "LEFT"
                    iconStyle = {{
                        tintColor: COLORS.white
                    }}
                    label = 'Continue With Facebook'
                    labelStyle = {{
                        marginLeft : SIZES.radius,
                        color:COLORS.white,
                    }}
                    onPress={()=>console.log("FB")}

                /> */}
                {/* Google */}

                {/* <TextIconButton 
                    containerStyle = {{
                        height:50,
                        alignItems:'center',
                        marginTop:SIZES.radius,
                        borderRadius:SIZES.radius,
                        backgroundColor:COLORS.lightGray2
                    }}
                    icon={icons.google}
                    iconPosition="LEFT"
                    iconStyle={{
                        tintColor:null,
                    }}
                    label= "Continue with Google"
                    labelStyle={{
                        marginLeft:SIZES.radius
                    }}
                    onPress={()=>console.log("GOOGLE")}
                /> */}

            </View>


       </AuthLayout>
    )
}
function mapStateToProps(state){
    return {
        userType:state.userReducer.userType
    }
}


export default connect(mapStateToProps)(SignIn)


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
