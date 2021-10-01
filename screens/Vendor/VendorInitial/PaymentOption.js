import React from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
    ActivityIndicator,
    Pressable
} from 'react-native';
import * as firebase from 'firebase'
import { FormInput,CustomSwitch,AuthTextButton ,AuthTextIconButton } from '../../../components';
import { connect } from 'react-redux';
import {COLORS,SIZES,FONTS,icons} from '../../../constants'

import { useFormik } from 'formik';
import * as Yup from 'yup';
import Layout from './Layout'

const CustomerPaymentOption = ({userType,navigation}) => {
   
    const LoginSchema = Yup.object().shape({
   
    paymentMethod: Yup.string()
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
    initialValues: { paymentMethod:"" },
    onSubmit: async (values) => {
        navigation.navigate('CustomerSetLocation')
    }})
    function isPaymentMethodSelected(){
        return values.paymentMethod != "" 
    }


    return (
       <Layout
            // title={userType=="customer"?"Let's Sign Customer in":"Let's Sign Vendor in"}
            title="Payment Method"
            subtitle= "This data will be displayed in your account profile for security"
        >
             <View 
                style={{
                    flex:1,
                    marginTop:SIZES.padding
                }}
           >
            {/* Form inputs */}
         
            {/* Save me and Forget lastname */}

          

            {/* Sign in */}

            <Pressable
                onPress={()=>setFieldValue('paymentMethod','paypal')}  
                style={({ pressed }) => ({
                    opacity: pressed ? 0.5 : 1,
                })}>
                <View style={styles.paymentMethod} >
                <Image source = {require('../../assets/images/paypal.png')} />
            </View>

            </Pressable>
            
            <Pressable  
                onPress={()=>setFieldValue('paymentMethod','visa')}  

                style={({ pressed }) => ({
                    opacity: pressed ? 0.5 : 1,
                })}>
                <View style={styles.paymentMethod} >
                <Image source = {require('../../assets/images/visa.png')} />
            </View>

            </Pressable>
            
            <Pressable  
                onPress={()=>setFieldValue('paymentMethod','payoneer')}  

                style={({ pressed }) => ({
                    opacity: pressed ? 0.5 : 1,
                })}>
                <View style={styles.paymentMethod} >
                <Image source = {require('../../assets/images/Payoneer.png')} />
            </View>

            </Pressable>
            
       <AuthTextButton
                label="Next"
                disabled ={isPaymentMethodSelected()?false:true}
                buttonContainerStyle={{
                    height:55,
                    alignItems:"center",
                    marginTop:SIZES.padding,
                    borderRadius:SIZES.radius,
                    backgroundColor: isPaymentMethodSelected()? COLORS.primary:'rgba(227, 120, 75, 0.4)'
                }}
                onPress={handleSubmit}

            >

            </AuthTextButton>

       


           </View>



       </Layout>
    )
}

export default CustomerPaymentOption

const styles = StyleSheet.create({
   paymentMethod:{
       height:73,
       backgroundColor:'white',
       elevation:4,
       borderRadius:8,
       justifyContent:"center",
       alignItems:"center",
       marginBottom:16

   }
});
