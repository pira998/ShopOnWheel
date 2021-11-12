import React, { useState, useEffect } from 'react';
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
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import Layout from './Layout'
import { setMapCoords } from '../../stores/customer/customerActions';


const SetLocation = ({userType,navigation,setMapCoords}) => {

    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [mapRegion,setMapRegion] = useState({
        latitude:0,
        longitude:0,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,

    })
    const mapView = React.useRef()

    async function setCoordinate(){
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setLocation(location.coords);
        setMapRegion({latitude:location.coords.latitude,longitude:location.coords.longitude,latitudeDelta:location.coords.latitude/2,longitudeDelta: location.coords.longitude/2})
        mapView.current.animateToRegion({latitude:location.coords.latitude,longitude:location.coords.longitude,latitudeDelta:0.015,longitudeDelta: 0.015},2000)
    }
    useEffect(()=>{
        setMapCoords(mapRegion)
        console.log(mapRegion)

    },[mapRegion])


    let text = 'Waiting..';
    if (errorMsg) {
    text = errorMsg;
    } else if (location) {
        text = JSON.stringify(location);
    }

    return (
       <Layout
            // title={userType=="customer"?"Let's Sign Customer in":"Let's Sign Vendor in"}
            title="Set Your Location"
            subtitle= "This data will be displayed in your account profile for security"
        >
             <View 
                style={{
                    flex:1,
                    marginTop:SIZES.padding
                }}
           >
          
                <View style={styles.locationContainer} >
                    <MapView.Animated
                        style={{ alignSelf: 'stretch', height: 220, borderRadius:15 }}
                        Region={mapRegion}
                        ref={mapView}
                        

                   
                    >
                        <Marker coordinate={mapRegion} title='You' />
                    </MapView.Animated>
           
                    <TouchableOpacity
                        onPress={setCoordinate}                    >
                            <View style={styles.button} >
                                <Text>Set Location</Text>
                            </View>
                    </TouchableOpacity>
                </View>

          

            {/* Sign in */}

            <AuthTextButton
                label="Sign In"
                // disabled ={!errorMsg?false:true}
                buttonContainerStyle={{
                    height:55,
                    alignItems:"center",
                    marginTop:SIZES.padding,
                    borderRadius:SIZES.radius,
                    backgroundColor: !errorMsg? COLORS.primary:'rgba(227, 120, 75, 0.4)'
                }}
                onPress={()=> navigation.navigate('CustomerSignUpSuccess') }

            >

            </AuthTextButton>

       


           </View>



       </Layout>
    )
}

function mapStateToProps(state){
    return {
        mapCoords:state.customerReducer.mapRegion,
      
   
    }
}

function mapDispatchToProps(dispatch){
    return{
        setMapCoords:(mapCoords)=>{return dispatch
            (setMapCoords(mapCoords))

        },
     
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(SetLocation)
const styles = StyleSheet.create({
   locationContainer:{
       elevation:3,
       height:300,
       backgroundColor:'white',
       borderRadius:16,
       padding:8,
       justifyContent:'space-between'

   },
   button:{
       backgroundColor:'#f6f6f6',
       height:57,
    //    bottom:0,
       borderRadius:16,
       justifyContent:'center',
       alignItems:'center',

   }
});
