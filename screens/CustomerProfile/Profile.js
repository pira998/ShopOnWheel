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

import { gql, useQuery,useMutation } from '@apollo/client';
import { setUsername,setLastname,setMobile,setAddress } from '../../stores/customer/customerActions';


const UPDATE_PROFILE = gql`
mutation updateProfile($input:ProfileInput!) {
      updateUserProfile (input:$input) 
  }

`;



const Profile = ({drawerAnimationStyle,navigation,setUsername,setLastname,setMobile,setAddress}) => {
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
     const [updateProfile, { data, loading, error }] = useMutation(UPDATE_PROFILE);
    
    
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
        username: 'user', 
        mobile: '0769618638', 
        lastname: "sivakumar",
        houseNo:12,
        street:'',
        city:'',
        country:'',
        zip:'',
        passwordConfirmation:'123456'
        
    
    
    },
    onSubmit: (values) => {
        setUsername(values.username)
        setLastname(values.lastname)
        setMobile(values.mobile)
        setAddress({
            houseNo:values.houseNo,
            street:values.street,
            city:values.city,
            country:values.country,
            zip:values.zip
        })
        navigation.navigate('CustomerLanguage')

       
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
                                        Hi there {values.username}
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
                label="House No"
                keyboardType = "default"
                autoCompleteType = "username"
                onChangeText = {handleChange("houseNo")}
                errorMsg= {errors.houseNo}
                appendComponent={
                    <View
                        style={{
                            justifyContent:'center'
                        }}
                    >
                        <Image 
                            source={values.houseNo==""||(values.houseNo!=""&& typeof errors.houseNo == 'undefined')? icons.correct:icons.cross} 
                            style = {{
                                height:20,
                                width:20,
                                tintColor:values.houseNo==""?COLORS.gray : (values.houseNo!=""&& typeof errors.houseNo == 'undefined')? COLORS.green: COLORS.red
                            }}
                            />
                    </View>
                }
            
            />

               <FormInput 
                label="Street"
                keyboardType = "default"
                autoCompleteType = "username"
                onChangeText = {handleChange("street")}
                errorMsg= {errors.street}
                appendComponent={
                    <View
                        style={{
                            justifyContent:'center'
                        }}
                    >
                        <Image 
                            source={values.street==""||(values.street!=""&& typeof errors.street == 'undefined')? icons.correct:icons.cross} 
                            style = {{
                                height:20,
                                width:20,
                                tintColor:values.street==""?COLORS.gray : (values.street!=""&& typeof errors.street == 'undefined')? COLORS.green: COLORS.red
                            }}
                            />
                    </View>
                }
            
            />
               <FormInput 
                label="City"
                keyboardType = "default"
                autoCompleteType = "username"
                onChangeText = {handleChange("city")}
                errorMsg= {errors.city}
                appendComponent={
                    <View
                        style={{
                            justifyContent:'center'
                        }}
                    >
                        <Image 
                            source={values.city==""||(values.city!=""&& typeof errors.city == 'undefined')? icons.correct:icons.cross} 
                            style = {{
                                height:20,
                                width:20,
                                tintColor:values.city==""?COLORS.gray : (values.city!=""&& typeof errors.city == 'undefined')? COLORS.green: COLORS.red
                            }}
                            />
                    </View>
                }
            
            />
               <FormInput 
                label="Country"
                keyboardType = "default"
                autoCompleteType = "username"
                onChangeText = {handleChange("country")}
                errorMsg= {errors.country}
                appendComponent={
                    <View
                        style={{
                            justifyContent:'center'
                        }}
                    >
                        <Image 
                            source={values.country==""||(values.country!=""&& typeof errors.country == 'undefined')? icons.correct:icons.cross} 
                            style = {{
                                height:20,
                                width:20,
                                tintColor:values.country==""?COLORS.gray : (values.country!=""&& typeof errors.country == 'undefined')? COLORS.green: COLORS.red
                            }}
                            />
                    </View>
                }
            
            />
               <FormInput 
                label="Zip"
                keyboardType = "default"
                autoCompleteType = "username"
                onChangeText = {handleChange("zip")}
                errorMsg= {errors.zip}
                appendComponent={
                    <View
                        style={{
                            justifyContent:'center'
                        }}
                    >
                        <Image 
                            source={values.zip==""||(values.zip!=""&& typeof errors.zip == 'undefined')? icons.correct:icons.cross} 
                            style = {{
                                height:20,
                                width:20,
                                tintColor:values.zip==""?COLORS.gray : (values.zip!=""&& typeof errors.zip == 'undefined')? COLORS.green: COLORS.red
                            }}
                            />
                    </View>
                }
            
            />
        

                {/* Sign up & Sign In */}

                <AuthTextButton
                    label="Next"
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
        selectedTab:state.tabReducer.selectedTab,
        username:state.customerReducer.username,
        lastname:state.customerReducer.lastname,
        mobile:state.customerReducer.mobile,
        address:state.customerReducer.address
    }
}

function mapDispatchToProps(dispatch){
    return{
        setSelectedTab:(selectedTab)=>{return dispatch
            (setSelectedTab(selectedTab))

        },
        setUsername:(username)=>{return dispatch
            (setUsername(username))

        },
        setLastname:(lastname)=>{return dispatch
            (setLastname(lastname))

        },
        setMobile:(mobile)=>{return dispatch
            (setMobile(mobile))

        },
        setAddress:(address)=>{return dispatch
            (setAddress(address))

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