import React from 'react'
import { View, Text } from 'react-native'
import AuthLayout  from '../Authentication/AuthLayout';
import{ COLORS,SIZES,FONTS,icons} from '../../constants'

import  {FormInput,CustomSwitch,TextButton,TextIconButton} from '../../components';
import { connect } from 'react-redux';
import { setUserType } from '../../stores/user/userActions';




const Welcome = ({navigation,setUserType,userType}) => {
    return (
     
        <AuthLayout
             title="Welcome to Eatme"
            subtitle="A simple common paltform for mobile vendors and customers"
            titleContainerStyle={{
                marginTop:SIZES.padding
            }}
        >
        <View>
            <View>


            </View>


              <TextButton
                label="I want to buy"
                
                buttonContainerStyle={{
                    height:100,
                    alignItems:"center",
                    marginTop:SIZES.padding,
                    borderRadius:SIZES.radius,
                    backgroundColor:  COLORS.primary
                }}
                // onPress={handleSubmit}
                 onPress={()=>{
                     setUserType('customer');
                      console.log(userType)
                     navigation.navigate("SignIn");
                    }}

            >
            


            </TextButton>
              <TextButton
                label="I want to sell"
             
                buttonContainerStyle={{
                    height:100,
                    alignItems:"center",
                    marginTop:SIZES.padding,
                    borderRadius:SIZES.radius,
                    backgroundColor: COLORS.primary
                }}
                // onPress={handleSubmit}
                onPress={()=>{
                    setUserType("vendor");
                    console.log(userType)
                     navigation.navigate("SignIn");

                    // navigation.replace("SignIn");
                }}
                
            >
            


            </TextButton>
      

        </View>
        </AuthLayout>
     
    )
}



function mapStateToProps(state){
    return {
        userType:state.userReducer.userType
    }
}

function mapDispatchToProps(dispatch){
    return{
        setUserType:(userType)=>{return dispatch(setUserType(userType))

        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Welcome)

