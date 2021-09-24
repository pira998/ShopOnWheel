import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    KeyboardAvoidingView,
    Image
} from 'react-native';
import AuthLayout from './AuthLayout';
import {COLORS,SIZES,FONTS,icons} from '../../constants'


import { FormInput,CustomSwitch,TextButton,TextIconButton } from '../../components';
import {utils} from '../../utils'
import { gql, useQuery } from '@apollo/client';
// import gql from 'graphql-tag'
// import {ApolloProvider,Query} from 'react-apollo'
// import axios from 'axios'

// import axios from 'axios'
// import query from './query'

// export async function getUsers() {
//   const gitHubCall = await axios.post(
//     `https://api.github.com/graphql`,
//     {
//       // query using ES6+ shorthand
//       // query can be like query: query,
//       query,
//       variables: {
//         username: 'spences10',
//       },
//     },

//     {
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: 'token ' + process.env.GITHUB_TOKEN,
//       },
//     }
//   )
//   return gitHubCall.data.data
// }

const GET_USERS = gql`
    {
        users {
            id
            email
        }
    }

`

const ForgotPassword = ({navigation}) => {
    const [email,setEmail] = React.useState("")

    const [emailError,setEmailError] = React.useState("")

    function isEnableSendEmail(){
        return email!=""&& emailError== ""
    }

    const {loading,error,data} = useQuery(GET_USERS,{
        onCompleted:(data) =>{
            console.log(data)
         
        }
    })

    // data.users.map(({email})=>{
    //     setEmail(email)
    // })
    // console.log(loading)
    // console.log(1+error)
    return (
        <KeyboardAvoidingView style={{flex:1,justifyContent:"center"}} >
       <AuthLayout
        title="Password Recovery"
        subtitle="Please enter your email address to server"
        titleContainerStyle={{
            marginTop:SIZES.padding*2
        }}
       >
            {/* Form Input  */}
            {/* <Query 
                query = {GET_USERS}
            >
                {({data})=>{
                    if(typeof data.users=== undefined) return null
                    {console.log(data)}
}}

            </Query> */}
            <View
                style={{
                     flex:1,
                     marginTop:SIZES.padding*2
                }}
            >
              <FormInput 
                label="Email"
                keyboardType = "email-address"
                autoCompleteType = "email"
                onChange = {(value)=>{
                    utils.validateEmail(value,setEmailError)
                    setEmail(value)
                }}
                errorMsg= {emailError}
             
                appendComponent={
                    <View
                        style={{
                            justifyContent:'center'
                        }}
                    >
                        <Image 
                            source={email==""||(email!=""&& emailError =="")? icons.correct:icons.cross} 
                            style = {{
                                height:20,
                                width:20,
                                tintColor:email==""?COLORS.gray : (email!=""&&emailError == "")? COLORS.green: COLORS.red
                            }}
                            />
                    </View>
                }
            
            />   
            
             
            </View>


            {/* Button  */}
            <TextButton 
                label="Send Email"
                disabled={isEnableSendEmail()?false:true}
                buttonContainerStyle={{
                    height:55,
                    alignItems:'center',
                    marginTop:SIZES.padding,
                    borderRadius: SIZES.radius,
                    backgroundColor: isEnableSendEmail()? COLORS.primary:'rgba(227, 120, 75, 0.4)',

                }}
                onPress={()=>navigation.goBack()}
            />


       
       </AuthLayout>
       </KeyboardAvoidingView>
    )
}

export default ForgotPassword;