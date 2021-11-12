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
import { FormInput,CustomSwitch,AuthTextButton ,AuthTextIconButton } from '../../components';
import { connect } from 'react-redux';
import {COLORS,SIZES,FONTS,icons} from '../../constants'

import { useFormik } from 'formik';
import * as Yup from 'yup';
import Layout from './Layout'

import "firebase/firestore";
import { gql, useQuery,useMutation } from '@apollo/client';


const UPDATE_PROFILE = gql`
mutation updateProfile($input:ProfileInput!) {
      updateUserProfile (input:$input) 
  }

`;



const SignUpSuccess = ({navigation,username,lastname,mapCoords,paymentMethod,language,mobile,address}) => {

    const currentUser = firebase.auth().currentUser;
    const [updateProfile, { data, loading, error }] = useMutation(UPDATE_PROFILE);
    // console.log({
    //     currentUser
    // })
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
                        Congrats
                    </Text>
                    <Text style={styles.bold} >
                        Your Profile is Ready To Use
                    </Text>
                </View>


            <AuthTextButton
                label="Try order"
              
                buttonContainerStyle={{
                    height:55,
                    alignItems:"center",
                    marginTop:SIZES.padding,
                    borderRadius:SIZES.radius,
                    backgroundColor: COLORS.primary
                }}
               onPress={()=>{
                    updateProfile({variables:{ input: {
                                "mobile": mobile,
                                "address":{
                                    "zip": address.zip,
                                    "city": address.city,
                                    "country": address.country,
                                    "street": address.street,
                                    "houseNo": address.houseNo
                                },
                                "language": language,
                                "lastname": lastname,
                                "username": username,
                                "cards": [],
                                "location":{
                                    "Latitude": mapCoords.latitude,
                                    "Longitude": mapCoords.longitude
                                },
                                "paymentMethod":paymentMethod,
                                "id":currentUser.uid
                                
                    }}})   
                navigation.navigate('MainLayout')}}

            >

            </AuthTextButton>

       


           </View>



       </Layout>
    )
}

function mapStateToProps(state){
    return {
        username:state.customerReducer.username,
        lastname:state.customerReducer.lastname,
        mobile:state.customerReducer.mobile,
        language:state.customerReducer.language,
        mapCoords:state.customerReducer.mapCoords,
        paymentMethod:state.customerReducer.paymentMethod,
        address:state.customerReducer.address

    }
}


export default connect(mapStateToProps)(SignUpSuccess)
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