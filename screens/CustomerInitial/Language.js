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
import { FormInput,CustomSwitch,AuthTextButton ,AuthTextIconButton } from '../../components';
import { connect } from 'react-redux';
import {COLORS,SIZES,FONTS,icons} from '../../constants'

import { useFormik } from 'formik';
import * as Yup from 'yup';
import Layout from './Layout'

const CustomerLanguage = ({userType,navigation}) => {
   
    const LoginSchema = Yup.object().shape({
   
    language: Yup.string()
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
    initialValues: { language:"" },
    onSubmit: async (values) => {
        navigation.navigate('CustomerPaymentOption')
    }})
    function isLanguageSelected(){
        return values.language != "" 
    }


    return (
       <Layout
            // title={userType=="customer"?"Let's Sign Customer in":"Let's Sign Vendor in"}
            title="Set your preferred language"
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
                onPress={()=>setFieldValue('language','ta')}  
                style={({ pressed }) => ({
                    opacity: pressed ? 0.5 : 1,
                })}>
                <View style={styles.language} >
               <Text style={{ fontSize:23 }} >தமிழ்</Text>
            </View>

            </Pressable>
            
            <Pressable  
                onPress={()=>setFieldValue('language','en')}  

                style={({ pressed }) => ({
                    opacity: pressed ? 0.5 : 1,
                })}>
                <View style={styles.language} >
                <Text style={{ fontSize:23 }}>English</Text>
            </View>

            </Pressable>
            
            <Pressable  
                onPress={()=>setFieldValue('language','si')}  

                style={({ pressed }) => ({
                    opacity: pressed ? 0.5 : 1,
                })}>
                <View style={styles.language} >
                <Text style={{ fontSize:23 }}>සිංහල</Text>
            </View>

            </Pressable>
            
       <AuthTextButton
                label="Next"
                disabled ={isLanguageSelected()?false:true}
                buttonContainerStyle={{
                    height:55,
                    alignItems:"center",
                    marginTop:SIZES.padding,
                    borderRadius:SIZES.radius,
                    backgroundColor: isLanguageSelected()? COLORS.primary:'rgba(227, 120, 75, 0.4)'
                }}
                onPress={handleSubmit}

            >

            </AuthTextButton>

       


           </View>



       </Layout>
    )
}

export default CustomerLanguage

const styles = StyleSheet.create({
   language:{
       height:73,
       backgroundColor:'white',
       elevation:4,
       borderRadius:8,
       justifyContent:"center",
       alignItems:"center",
       marginBottom:16

   }
});
