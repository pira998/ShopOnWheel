//components
import { Header } from '../../components';

import React,{useState,useEffect} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Image,FlatList,StyleSheet,Switch, Platform,
  SafeAreaView,KeyboardAvoidingView,Alert
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
import { FormProvider, useForm } from 'react-hook-form'

import LottieView from 'lottie-react-native'
import CreditCardForm, { Button, FormModel } from 'rn-credit-card'
import { PaymentsStripe as Stripe } from 'expo-payments-stripe';
import { gql, useQuery,useMutation } from '@apollo/client';
import * as firebase from 'firebase'

const CREATE_ORDER = gql`
mutation createOrder($input:OrderInput!) {
  createOrder(input:$input)
}
`;

const GET_ALL_PRODUCTS = gql`
{
  products
    {
     menuId
     price
     description
     name
     id
     vendorId
     calories
     photo
  }
}

`



const Checkout = ({drawerAnimationStyle,navigation,selectedTab,setSelectedTab,route,paymentMethod}) => {
    Stripe.setOptionsAsync({
      publishableKey: 'pk_test_51JdT8ABTMX0TxwgtXlHJAxwxmtoFJUpTiaVzzZrv4rr2nqYiDfQCU3U0gvboYh1y9afya3YWpDkEcdbSiqBHN83l00b5x14DHi', // Your key
      androidPayMode: 'test', // [optional] used to set wallet environment (AndroidPay)
    //  merchantId: 'your_merchant_id', // [optional] used for payments with ApplePay
    });
    const currentUser = firebase.auth().currentUser;
    const [completePaymentWithStripe,{_data}] = useMutation(gql`
        mutation completePayment($amount:Int!,$currency:String!,$token:String! ){
           	completePaymentWithStripe(amount:$amount,currency:$currency,token:$token)
        }
    `)

    const {data,loading,error} = useQuery(GET_ALL_PRODUCTS)
    const items = route.params.items
    const [products, setProducts] = useState([])
    const [order, setOrder] = useState([])
    const [vendorId, setVendorId] = useState('')
    const [createOrder, { ___data }] = useMutation(CREATE_ORDER);

    useEffect(() => {
        if (data){
        setProducts(data.products)
        }       
         items.forEach(item=>{
    //    item.menuId 
    // console.log(products)
         products.forEach(product=>{
            //  console.log(product.menuId)
            if (product.menuId == item.menuId){
                // console.log(product)
                setOrder([{ product:product.id,count:item.qty},...order])
                setVendorId(product.vendorId)
            }
         })
         })
          
        //   console.log(order)
    }, [])
  
    



    // const totalPrice = route.params.totalPrice
    const address = route.params.address
    const amount = route.params.totalPrice
   
    const [tokenId,setTokenId] = React.useState('')
    const [params, setParams ] = React.useState({
        number: '4242424242424242',
        expMonth: 11,
        expYear: 22,
        cvc: '223',
        // optional
        name: 'Test User',
        currency: 'usd',
        addressLine1:address.street,
        addressLine2: 'Apt. 5',
        addressCity: address.city,
        addressState: 'Test State',
        addressCountry: address.country,
        addressZip: address.zipCode,
    })
    const formMethods = useForm({
    // to trigger the validation on the blur event
    mode: 'onBlur',
    defaultValues: {
      holderName: '',
      cardNumber: '',
      expiration: '',
      cvv: '',
    },
    })
    const { handleSubmit, formState } = formMethods
    function onSubmit(model) {
       
        // Alert.alert('Success: ' + JSON.stringify(model))
        // setCard(model)
        setParams({
            number:model.cardNumber,
            expMonth:Number(model.expiration.slice(0,2)) ,
            expYear: Number(model.expiration.slice(3,5)),
            cvc:model.cvv,
        // optional
            name: model.holderName,
            currency: 'usd',
            addressLine1:address.street,
            addressLine2: 'Apt. 5',
            addressCity: address.city,
            addressState: 'Test State',
            addressCountry: address.country,
            addressZip: address.zipCode,
        })
        const order = {
            customerId: '',
            deliveryCharge:'',
            discount:'',
            items:[],
            paymentMethod:'visa',
        
            subTotal:0,
            totalCount:4,
            totalPrice:2331,
           
            vendorId:''
        }
        createOrder({
            variables:{
               input:{
                "customerId":currentUser.uid,
                "deliveryCharge":0.0,
                "discount":0.0,
                "items":[],
                "paymentMethod":paymentMethod,
                
                "subTotal":amount.toFixed(2),
                "totalCount":4,
                "totalPrice":amount.toFixed(2),
              
                "vendorId":vendorId

               }
            }
        })
       
        completePaymentWithStripe({ variables: {amount:amount*100,currency: "usd", token:tokenId } })
        // createOrder({
        //     variables:{
        //        input:{
        //         "customerId":currentUser.uid,
        //         "deliveryCharge":0,
        //         "discount":0,
        //         "items":order,
        //         "paymentMethod":paymentMethod,
        //         "status":'pending',
        //         "subTotal":amount,
        //         "totalCount":4,
        //         "totalPrice":amount,
        //         "transactionId":232,
        //         "vendorId":vendorId

        //        }
        //     }
        // })
        navigation.navigate("OrderSuccess")

    } 

    Stripe.createTokenWithCardAsync(params).then(response=> setTokenId(response.tokenId) )  
        // console.log(tokenId)



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
            title="Checkout"
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
      <KeyboardAwareScrollView
          style={styles.avoider}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <View style={styles.container} >

              <FormProvider {...formMethods}>
     
       
          <CreditCardForm
            LottieView={LottieView}
            horizontalStart
            overrides={{
              labelText: {
                marginTop: 16,
              },
            }}
          />



    </FormProvider>
       
  {true && (
         <AuthTextButton
                label="Finish Order"
              
                buttonContainerStyle={{
                    height:55,
                    alignItems:"center",
                    marginTop:SIZES.padding,
                    borderRadius:SIZES.radius,
                    backgroundColor: COLORS.primary
                }}
               onPress={handleSubmit(onSubmit)}

            >

            </AuthTextButton>

        )}



            </View>
       

        </KeyboardAwareScrollView>

      


        </Animated.View>
    )
}


function mapStateToProps(state){
    return {
        paymentMethod:state.tabReducer.paymentMethod
    }
}

function mapDispatchToProps(dispatch){
    return{
        setSelectedTab:(selectedTab)=>{return dispatch
            (setSelectedTab(selectedTab))

        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Checkout)

const styles= StyleSheet.create({
    container:{
        flex:1,
        // padding:SIZES.padding,
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
    },
    avoider: {
    flex: 1,
    padding: 24,
  },
  button: {
    margin: 36,
    marginTop: 0,
  },




})