//components
import { Header } from '../../components';

import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Image,FlatList,StyleSheet
} from 'react-native';

import Animated ,{useSharedValue,useAnimatedStyle,withTiming}from "react-native-reanimated";

import { connect } from 'react-redux';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import {COLORS,icons,constants,SIZES,FONTS,images} from '../../constants'
import dummyData from '../../constants/dummyData';

import { FormInput,AuthTextButton } from '../../components';

import { useFormik } from 'formik';
import * as Yup from 'yup';

const Profile = ({drawerAnimationStyle,navigation,selectedTab,setSelectedTab}) => {
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

    const LoginSchema = Yup.object().shape({
    password: Yup.string()
    .min(6, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),

    passwordConfirmation: Yup.string()
    .equals([Yup.ref("password")],"Passwords don't match")
    .required('Required'),
     lastname: Yup.string()
    .min(6, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
    mobile: Yup.string()
    .matches(phoneRegExp, 'Phone number is not valid'),
    username: Yup.string().min(6,'Too Short!').max(50,'Too Long!').required('Required'),
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
    initialValues: { 
        email: 'va@gmail.com', 
        password: '123456', 
        remember: false ,
        showPass:false, 
        username: 'praveen', 
        mobile: '0769618638', 
        lastname: "sivakumar",
        address:'',
        passwordConfirmation:'123456'
        
    
    
    },
    onSubmit: async (values) => {

       
    }
  });





  function isEnabledSignUp(){
        return values.email != "" && values.password != "" && typeof errors.email == 'undefined'
    }

    return (
        <Animated.View
            style={{
                flex: 1,
             //  alignItems: 'center',
             //  justifyContent: 'center',
                backgroundColor:COLORS.white,
                ...drawerAnimationStyle
            }}
        >
            {/*Header*/}
            <Header
            containerStyle={
                {
                    height:50,
                    paddingHorizontal:SIZES.padding,
                    marginTop:40,
                    alignItems:'center'
                }
            }
            title="Profile"
            leftComponent={
                <TouchableOpacity
                style={{
                    width:40,
                    height:40,
                    alignItems:'center',
                    justifyContent:'center',
                                    }}
                onPress={()=>navigation.openDrawer()}>
                <Image 
                    source={icons.back}
                />

                </TouchableOpacity>
            }

            rightComponent={
                <TouchableOpacity
                style={{
                    borderRadius:SIZES.radius,
                    alignItems:'center',
                    justifyContent:'center'
                }}>
                   <View style={{backgroundColor:'white'}} >
                       <Text style={{color:'white'}} >
                                Some
                       </Text>
                   </View>

                </TouchableOpacity>
            }
            />

            {/*Content*/}
          <View style={styles.container}>
            <KeyboardAwareScrollView
                // keyboardDismissMode="on-drag"
                contentContainerStyle={{paddingHorizontal:SIZES.padding}}>
                {/* App Icon */}
                <View style={styles.profileContainer} >
                       <View style={styles.profileImage} >
                                 <Image
                                    source={dummyData.myProfile.profile_image}
                                    style={{
                                        width:100,
                                        height:100,
                                        borderRadius:SIZES.radius
                                    }}
                                    >
                                    </Image>
                                   
                        </View>
                                     <TouchableOpacity>
                                      <Text style={styles.editProfile} >
                                       Edit Profile
                                      </Text>
                                    </TouchableOpacity>
                                    <Text style={styles.username} >
                                        Hi there Praveen
                                     </Text>
                                     
                </View>
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

                {/* Sign up & Sign In */}

                <AuthTextButton
                    label="Save"
                    // disabled ={isEnabledSignUp()?false:true}
                    buttonContainerStyle={{
                        height:55,
                        alignItems:'center',
                        marginTop:SIZES.padding,
                        borderRadius:SIZES.radius,
                        backgroundColor:  COLORS.primary
                    }}
                    onPress = {handleSubmit}
                />
                  <View
                style={{
                    flexDirection:'row',
                    marginTop:SIZES.radius,
                    justifyContent:'center'
                }}
            ></View>
           

            </KeyboardAwareScrollView>
        

        </View>




        </Animated.View>
    )
}


function mapStateToProps(state){
    return {
        selectedTab:state.tabReducer.selectedTab
    }
}

function mapDispatchToProps(dispatch){
    return{
        setSelectedTab:(selectedTab)=>{return dispatch
            (setSelectedTab(selectedTab))

        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Profile)

const styles= StyleSheet.create({
    container:{
        flex:1,
        paddingVertical:SIZES.padding,
        backgroundColor:COLORS.white,
        
        // alignItems:'center',
        // backgroundColor:"red"
    },
    profileContainer:{
  
        justifyContent:'center',
  
        padding:10,
        alignItems:'center',

    },
    profileImage:{
 
  
        borderRadius:50,
        alignItems:'center',

    },
    editProfile:{
        color:COLORS.primary,
        marginTop:12,
    },
    username:{
        fontSize:15,
        fontFamily:'Poppins-SemiBold'
    }



})