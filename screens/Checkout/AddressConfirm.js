//components
import { Header } from '../../components';

import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Image,FlatList,StyleSheet,Switch
} from 'react-native';

import Animated ,{useSharedValue,useAnimatedStyle,withTiming}from "react-native-reanimated";
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { connect } from 'react-redux';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import {COLORS,icons,constants,SIZES,FONTS,images} from '../../constants'
import dummyData from '../../constants/dummyData';

import { FormInput,AuthTextButton,SwipeButton } from '../../components';

import { useFormik } from 'formik';
import * as Yup from 'yup';

const AddressConfirm = ({drawerAnimationStyle,navigation,selectedTab,setSelectedTab,route}) => {
    const totalPrice = route.params.totalPrice
     const LoginSchema = Yup.object().shape({
   
    useDefaultAddress: Yup.boolean(),
    cashOnDelivery: Yup.boolean(),
    

    });
    const [address,setAddress] = React.useState({street:"Thatta Theru K.K.Road",houseNo:"",zipCode:"40000",city:"Jaffna",country:'Sri Lanka'})

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
    initialValues: { useDefaultAddress:true,street:"",houseNo:"",zipCode:"",city:"",country:'',cashOnDelivery:true, },
    onSubmit: async (values) => {
        setAddress({
            street:values.street,
            houseNo:values.houseNo,
            zipCode:values.zipCode,
            city:values.city,
            country:values.country
        })
         values.cashOnDelivery? navigation.navigate('OrderSuccess'):navigation.navigate('Checkout',{address,totalPrice}) 
    }})
    function isuseDefaultAddressSelected(){
        
        return values.useDefaultAddress != "" 
    }
  




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
            title="Confirmation"
            leftComponent={
                <TouchableOpacity
                style={{
                    width:40,
                    height:40,
                    alignItems:'center',
                    justifyContent:'center',
                                    }}
                onPress={()=>navigation.goBack()}>
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
            <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>

            <View style={styles.container} >


            
            <View style={styles.addressCard} >
                <Text style={styles.deliverTo} >
                    Delivery to
                </Text>
                <View style={styles.address} >
                    <Image 
                        source={icons.pinlocation}
                        
                    />
                    <Text style={styles.addressText} >{ address.street } {address.city} {address.country} {address.zipCode} </Text>
                </View>
            </View>
            <View style={{marginVertical:23,alignItems:'center',flexDirection:"row",justifyContent:'space-between'}}>
                <Text style={styles.default} >
                    Use Default Address
                </Text>
             {/* <SwipeButton onToggle={()=>setFieldValue('useDefaultAddress',!values.useDefaultAddress)} /> */}
                 <Switch
                    trackColor={{ false: "#767577", true: COLORS.primary }}
                    thumbColor={values.useDefaultAddress ? COLORS.lightOrange3 : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={()=>setFieldValue('useDefaultAddress',!values.useDefaultAddress)}
                    value={values.useDefaultAddress}
                     />
            </View>
             <View style={{marginVertical:23,alignItems:'center',flexDirection:"row",justifyContent:'space-between'}}>
                <Text style={styles.default} >
                    Cash On Delivery
                </Text>
             {/* <SwipeButton onToggle={()=>setFieldValue('useDefaultAddress',!values.useDefaultAddress)} /> */}
                 <Switch
                    trackColor={{ false: "#767577", true: COLORS.primary }}
                    thumbColor={values.cashOnDelivery ? COLORS.lightOrange3 : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={()=>setFieldValue('cashOnDelivery',!values.cashOnDelivery)}
                    value={values.cashOnDelivery}
                     />
            </View>
            {!values.useDefaultAddress && 
                  <><FormInput
                            label="Street"
                            keyboardType="default"

                            onChangeText={handleChange("street")}
                            errorMsg={errors.street}
                            appendComponent={<View
                                style={{
                                    justifyContent: 'center'
                                }}
                            >
                                <Image
                                    source={values.street == "" || (values.street != "" && typeof errors.street == 'undefined') ? icons.correct : icons.cross}
                                    style={{
                                        height: 20,
                                        width: 20,
                                        tintColor: values.street == "" ? COLORS.gray : (values.street != "" && typeof errors.street == 'undefined') ? COLORS.green : COLORS.red
                                    }} />
                            </View>} /><FormInput
                                label="House Number"
                                keyboardType="default"
                                onChangeText={handleChange("houseNo")}
                                errorMsg={errors.houseNo}
                                appendComponent={<View
                                    style={{
                                        justifyContent: 'center'
                                    }}
                                >
                                    <Image
                                        source={values.houseNo == "" || (values.houseNo != "" && typeof errors.houseNo == 'undefined') ? icons.correct : icons.cross}
                                        style={{
                                            height: 20,
                                            width: 20,
                                            tintColor: values.houseNo == "" ? COLORS.gray : (values.houseNo != "" && typeof errors.houseNo == 'undefined') ? COLORS.green : COLORS.red
                                        }} />
                                </View>} /><FormInput
                                label="City"
                                keyboardType="default"

                                onChangeText={handleChange("city")}
                                errorMsg={errors.city}
                                appendComponent={<View
                                    style={{
                                        justifyContent: 'center'
                                    }}
                                >
                                    <Image
                                        source={values.city == "" || (values.city != "" && typeof errors.city == 'undefined') ? icons.correct : icons.cross}
                                        style={{
                                            height: 20,
                                            width: 20,
                                            tintColor: values.city == "" ? COLORS.gray : (values.city != "" && typeof errors.city == 'undefined') ? COLORS.green : COLORS.red
                                        }} />
                                </View>} /><FormInput
                                label="Postal Code"
                                keyboardType="default"

                                onChangeText={handleChange("zipCode")}
                                errorMsg={errors.zipCode}
                                appendComponent={<View
                                    style={{
                                        justifyContent: 'center'
                                    }}
                                >
                                    <Image
                                        source={values.zipCode == "" || (values.zipCode != "" && typeof errors.zipCode == 'undefined') ? icons.correct : icons.cross}
                                        style={{
                                            height: 20,
                                            width: 20,
                                            tintColor: values.zipCode == "" ? COLORS.gray : (values.zipCode != "" && typeof errors.zipCode == 'undefined') ? COLORS.green : COLORS.red
                                        }} />
                                </View>} /><FormInput
                                label="Country"
                                keyboardType="default"

                                onChangeText={handleChange("country")}
                                errorMsg={errors.country}
                                appendComponent={<View
                                    style={{
                                        justifyContent: 'center'
                                    }}
                                >
                                    <Image
                                        source={values.country == "" || (values.country != "" && typeof errors.country == 'undefined') ? icons.correct : icons.cross}
                                        style={{
                                            height: 20,
                                            width: 20,
                                            tintColor: values.country == "" ? COLORS.gray : (values.country != "" && typeof errors.country == 'undefined') ? COLORS.green : COLORS.red
                                        }} />
                                </View>} /></>
       
            }
               <AuthTextButton
                label="Checkout"
                // disabled ={!errorMsg?false:true}
                buttonContainerStyle={{
                    height:55,
                    alignItems:"center",
                    marginTop:SIZES.padding,
                    borderRadius:SIZES.radius,
                    backgroundColor: COLORS.primary
                }}
                onPress={handleSubmit}

            >

            </AuthTextButton>




            </View>
       

           
            </KeyboardAwareScrollView>   


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

export default connect(mapStateToProps,mapDispatchToProps)(AddressConfirm)

const styles= StyleSheet.create({
    container:{
        flex:1,
        padding:SIZES.padding,
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
    },
    addressCard:{
        height:108,
        // width:335,
        borderRadius:22,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'white',
        elevation:14,
        // left:24


    },
    address:{
        flexDirection:'row',
        alignItems:'center',
        paddingHorizontal:30,
        paddingVertical:10

    },
    addressText:{
        fontSize:16,
        lineHeight:19.65,
        fontWeight:"400",
        fontFamily:"Poppins-SemiBold",
        marginLeft:14
    },
    deliverTo:{
        color:'#3b3b3b',
        fontSize:14,
        alignSelf:'flex-start',
        marginHorizontal:25,
    },
    default:{
        left:12,
        fontFamily:"Poppins-SemiBold"
    }




})