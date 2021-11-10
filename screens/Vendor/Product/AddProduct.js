//components
import { Header } from '../../../components';

import React,{useState,useRef} from 'react';
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

import {COLORS,icons,constants,SIZES,FONTS,images} from '../../../constants'
import dummyData from '../../../constants/dummyData';

import { FormInput,AuthTextButton } from '../../../components';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import { gql, useQuery,useMutation } from '@apollo/client';
import MultiSelect from 'react-native-multiple-select';


const UPDATE_PROFILE = gql`
mutation updateProfile($input:ProfileInput!) {
      updateUserProfile (input:$input) 
  }

`;
const items = [{
    id: '1',
    name: 'Featured'
  }, {
    id: '2',
    name: 'Popular'
  }, {
    id: '3',
    name: 'Newest'
  }, {
    id: '4',
    name: 'Trending'
  },
   {
    id: '5',
    name: 'Recommended'
  },

];


const AddProduct = ({drawerAnimationStyle,navigation,selectedTab,setSelectedTab}) => {
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    const [updateProfile, { data, loading, error }] = useMutation(UPDATE_PROFILE);
    const [categories, setCategories] = useState([])
    const ref = useRef();
    const LoginSchema = Yup.object().shape({

    productName: Yup.string()
    .min(6, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
    price: Yup.string(),
    calories: Yup.string(),
    description: Yup.string().min(6,'Too Short!').max(50,'Too Long!').required('Required'),
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
        productName:'',
        description:'',
        calories:'',
        price:0,
        
    },
    onSubmit: async (values) => {
        navigation.navigate('MainLayout')
        
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
            title="Add Product"
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
                     
                                    
                                     
                </View>
                       <FormInput 
                label="Product Name"
                keyboardType = "default"
                autoCompleteType = "username"
                onChangeText = {handleChange("productName")}
                errorMsg= {errors.productName}
                appendComponent={
                    <View
                        style={{
                            justifyContent:'center'
                        }}
                    >
                        <Image 
                            source={values.productName==""||(values.productName!=""&& typeof errors.productName == 'undefined')? icons.correct:icons.cross} 
                            style = {{
                                height:20,
                                width:20,
                                tintColor:values.productName==""?COLORS.gray : (values.productName!=""&& typeof errors.productName == 'undefined')? COLORS.green: COLORS.red
                            }}
                            />
                    </View>
                }
            
            />
            <FormInput 
                label="Description"
                keyboardType = "default"
                autoCompleteType = "username"
                onChangeText = {handleChange("description")}
                errorMsg= {errors.description}

                appendComponent={
                    <View
                        style={{
                            justifyContent:'center'
                        }}
                    >
                        <Image 
                            source={values.description==""||(values.description!=""&& typeof errors.description == 'undefined')? icons.correct:icons.cross} 
                            style = {{
                                height:20,
                                width:20,
                                tintColor:values.description==""?COLORS.gray : (values.description!=""&& typeof errors.description == 'undefined')? COLORS.green: COLORS.red
                            }}
                            />
                    </View>
                }
            
            />
              <FormInput 
                label="Price"
                keyboardType = "numeric"
                autoCompleteType = "username"
                onChangeText = {handleChange("price")}
                errorMsg= {errors.price}

                appendComponent={
                    <View
                        style={{
                            justifyContent:'center'
                        }}
                    >
                        <Image 
                            source={values.price==""||(values.price!=""&& typeof errors.price == 'undefined')? icons.correct:icons.cross} 
                            style = {{
                                height:20,
                                width:20,
                                tintColor:values.price==""?COLORS.gray : (values.price!=""&& typeof errors.price == 'undefined')? COLORS.green: COLORS.red
                            }}
                            />
                    </View>
                }
            
            />
         
           
            <FormInput 
                label="Calories"
                keyboardType = "email-address"
                autoCompleteType = "email"
                onChangeText = {handleChange('calories')}
                errorMsg= {errors.calories}
                touched={touched.calories}

                appendComponent={
                    <View
                        style={{
                            justifyContent:'center'
                        }}
                    >
                        <Image 
                            source={values.calories==""||(values.calories!=""&& typeof errors.calories =="undefined")? icons.correct:icons.cross} 
                            style = {{
                                height:20,
                                width:20,
                                tintColor:  values.calories==""?COLORS.gray : (values.calories!=""&&typeof errors.calories == "undefined")? COLORS.green: COLORS.red
                            }}
                            />
                    </View>
                }
            
            />

            <View style={{
                  marginTop:20
                }} >
                <MultiSelect
                    items={items}
                    ref={ref}
                    uniqueKey="id"
                    onSelectedItemsChange={setCategories}
                    selectedItems={categories}
                    selectText="Select Categories"
                    searchInputPlaceholderText="Search Items..."
                    onChangeInput={ (text)=> console.log(text)}
                    altFontFamily="sans-serif"
                    tagRemoveIconColor="#dedede"
                    tagBorderColor="#dedede"
                    tagTextColor="#dedede"
                    selectedItemTextColor="#CCC"
                    selectedItemIconColor="#CCC"
                    itemTextColor="#000"
                    displayKey="name"
                    searchInputStyle={{ color: '#CCC' }}
                    submitButtonColor="#CCC"
                    submitButtonText="Submit"
                />
                {console.log(ref.current)}     
                
            </View>

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


                {/* Sign up & Sign In */}

                <AuthTextButton
                    label="Add"
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

export default connect(mapStateToProps,mapDispatchToProps)(AddProduct)

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