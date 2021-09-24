//components
import { Header } from '../../components';

import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Image,FlatList
} from 'react-native';

import Animated ,{useSharedValue,useAnimatedStyle,withTiming}from "react-native-reanimated";
import LinearGradient from "react-native-linear-gradient"; // expo is diffrent im not include shadow on bottom

import { connect } from 'react-redux';
import { setSelectedTab } from '../../stores/tab/tabActions';
import { Home,Search,CartTab ,Favourite,Notification} from '../../screens';

import {COLORS,icons,constants,SIZES,FONTS} from '../../constants'
import dummyData from '../../constants/dummyData';

import MapView, {PROVIDER_GOOGLE,Marker} from 'react-native-maps'
import * as Location from 'expo-location';


const TabButton =({label,icon,isFocused,onPress,outerContainerStyle,innerContainerStyle})=>{
    return(
        <TouchableWithoutFeedback
        onPress={onPress}
        >

            <Animated.View
            style={[{
                flex:1,
                alignItems:'center',
                justifyContent:'center'
            },outerContainerStyle]}
            >
                <Animated.View
                style={[{
                    flexDirection:'row',
                   width:'80%',
                   height:'50%',
                   alignItems:'center',
                   borderRadius:25,
                    justifyContent:'center'
                },innerContainerStyle]}
                >
                    <Image
                    source={icon}
                    style={{
                        width:20,
                        height:20,
                        tintColor:isFocused ? COLORS.white : COLORS.gray
                    }}
                    />

                    {isFocused &&
                         <Text
                         numberOfLines={1}
                         style={{
                             marginLeft:SIZES.base,
                             color:COLORS.white,
                             ...FONTS.h3
                         }}
                         >
                             {label}
                        </Text>}

                </Animated.View>
            </Animated.View>
        </TouchableWithoutFeedback>
    )
}

const MainLayout = ({drawerAnimationStyle,navigation,selectedTab,setSelectedTab}) => {
  const [location, setLocation] = React.useState(null);
  const [errorMsg, setErrorMsg] = React.useState(null);
   const [region, setRegion] = React.useState(null)
 const mapView = React.useRef()
  React.useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync({ });
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      location = await Location.getCurrentPositionAsync({ accuracy: 6,});
      setLocation(location);    let mapRegion = {
            latitude: (location.coords.latitude + location.coords.latitude+10000) / 2,
            longitude: (location.coords.longitude + location.coords.longitude+10000) / 2,
            latitudeDelta: Math.abs(location.coords.latitude - location.coords.latitude-10000) * 2,
            longitudeDelta: Math.abs(location.coords.longitude - location.coords.longitude-10000) * 2
        }
      console.log(location)
      setRegion(mapRegion)
     
    })();



  }, []);


    return (
        <Animated.View
            style={{
                flex: 1,
             //  alignItems: 'center',
             //  justifyContent: 'center',
                backgroundColor:'white',
                // position:'absolute',
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
                    alignItems:'center',
                    // backgroundColor:'transparent',
                    // position:'absolute' ,

                    // backgroundColor:'transparent'
                    // position:'absolute'
                }
            }
            title=""
            leftComponent={
                <TouchableOpacity
                style={{
                    width:40,
                    height:40,
                    alignItems:'center',
                    justifyContent:'center',
                    borderWidth:1,
                    borderColor:COLORS.gray2,
                    borderRadius:SIZES.radius
                }}
                onPress={()=>navigation.openDrawer()}>
                <Image 
                source={icons.menu}
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
                    <Image 
                    source={dummyData.myProfile.profile_image}
                    style={{
                        width:40,
                        height:40,
                        borderRadius:SIZES.radius
                    }}
                    />

                </TouchableOpacity>
            }
            />


            <MapView
                    ref={mapView}
                    provider={PROVIDER_GOOGLE}
                    initialRegion={region}
                    style={{ flex: 1,}}
                />
                

                

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

export default connect(mapStateToProps,mapDispatchToProps)(MainLayout)