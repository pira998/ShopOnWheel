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
import { FormInput,CustomSwitch,AuthTextButton ,AuthTextIconButton,Rating } from '../../components';
import { connect } from 'react-redux';
import {COLORS,SIZES,FONTS,icons} from '../../constants'


import { useFormik } from 'formik';
import * as Yup from 'yup';
import Layout from './Layout'

const ProfileUpdateSuccess = ({userType,navigation}) => {
    

    return (
       <Layout>
             <View 
                style={{
                    flex:1,
                    marginTop:SIZES.padding/2,
             
                }}
                >
    
                <View style={{ justifyContent:'center', alignItems:'center',marginBottom: 100}} >
                    <Image
                       
                        source = {require('../../assets/images/Successs.png')}
                    />
                    <Text style={styles.congrats} >
                        Successfully
                    </Text>
                    <Text style={styles.bold} >
                        Reset Email Sent 
                    </Text>
           
                </View>


            <AuthTextButton
                label="Try Sign in again"
              
                buttonContainerStyle={{
                    height:55,
                    alignItems:"center",
                    marginTop:SIZES.padding,
                    borderRadius:SIZES.radius,
                    backgroundColor: COLORS.primary
                }}
               onPress={()=>navigation.navigate('SignIn')}

            >

            </AuthTextButton>

       


           </View>



       </Layout>
    )
}

export default ProfileUpdateSuccess

const styles = StyleSheet.create({
    congrats:{
        fontFamily:'Poppins-Bold',
        fontSize:30,
        color:"#53e88b",

    },
    bold:{
        fontFamily:'Poppins-Bold',
        fontSize:19,
    }


})