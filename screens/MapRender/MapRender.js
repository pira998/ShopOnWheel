//components
import { Header,MapTextButton as TextButton,MapTextIconButton as TextIconButton } from '../../components';

import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Image,FlatList,
    ImageBackground,
    Platform,
    Animated as ReAnimated
    
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

import { MapStyle } from '../../assets/styles'       

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

const MapRender = ({drawerAnimationStyle,navigation,selectedTab,setSelectedTab}) => {
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

  
const [selectedPlace,setSelectedPlace] = React.useState(null)
const [selectedHotel,setSelectedHotel] = React.useState(null)
const [allowDragging,setAllowDragging]= React.useState(true)

const _draggedValue= React.useRef(new ReAnimated.Value(0)).current

let _panel =React.useRef(null);

React.useEffect(()=>{
    // let {selectedPlace}= route.params;
    setSelectedPlace({
                id: 1,
                name: "Kuching",
                description: "Kuching, officially the City of Kuching, is the capital and the most populous city in the state of Sarawak in Malaysia. It is also the capital of Kuching Division.",
                image: require("../../assets/images/burger-restaurant.jpg"),
                rate: "4.89",
                mapInitialRegion: {
                    latitude: 1.557177,
                    longitude: 110.351902,
                    latitudeDelta: 0.0053,
                    longitudeDelta: 0.0044
                },
                hotels: [
                    {
                        id: "1",
                        name: "Riverside Majestic Hotel",
                        image: require("../../assets/images/burger-restaurant.jpg"),
                        rate: 5,
                        price: 199,
                        latlng: {
                            latitude: 1.557907,
                            longitude: 110.352079,
                        },
                    },
                    {
                        id: "2",
                        name: "Grand Margherita Hotel",
                        image: require("../../assets/images/burger-restaurant.jpg"),
                        rate: 5,
                        price: 199,
                        latlng: {
                            latitude: 1.558163,
                            longitude: 110.352813,
                        },
                    },
                    {
                        id: "3",
                        name: "Hilton Kuching",
                        image: require("../../assets/images/burger-restaurant.jpg"),
                        rate: 5,
                        price: 199,
                        latlng: {
                            latitude: 1.557144,
                            longitude: 110.350496,
                        },
                    },
                ]
            })

    //listner that will disable panel dragging whenever the ,mapview is shown

    _draggedValue.addListener((valueObj)=>{
        if (valueObj.value>SIZES.height){
            setAllowDragging(false)
        }
    })

    return ()=> {
        _draggedValue.removeAllListeners()
    }
},[])

function renderMap(){
    return(<>
           <MapView 
                    style={{
                        width:'100%',
                        height:'100%'

                    }}
                    customMapStyle={MapStyle}
                    provider={PROVIDER_GOOGLE}
                    initialRegion={selectedPlace?.mapInitialRegion}
                
                >
                    {selectedPlace?.hotels.map((hotel,index)=>(
                        <Marker
                        key={index}
                        coordinate={hotel.latlng}
                        identifier={hotel.id}
                        onPress={()=>setSelectedHotel(hotel)}

                    >
                        <Image
                        source={selectedHotel?.id==hotel.id ? icons.bed_on : icons.bed_off}
                        resizeMode='contain'
                        style={{
                            width:50,
                            height:50
                        }}
                        
                        />
                        </Marker>

                    ))}
                    

                </MapView>
                 {/*Header*/}
                {/* <HeaderBar
                    title={selectedPlace?.name}
                    leftOnPressed={()=> _panel.hide()}
                    right={true}
                    containerStyle={{
                        position:'absolute',
                        top: SIZES.padding*2
                    }}
                
                /> */}

                 {/*Hotel details*/}
                    {selectedHotel &&
                    <View 
                    style={{
                        position:'absolute',
                        bottom:30,
                        left: 0,
                        right:0,
                        padding:SIZES.radius

                    }}>
                    
                    <Text style={{
                        color: COLORS.white,
                        ...FONTS.h1
                    }}>
                      Vedors {selectedPlace?.name}  
                    </Text>
                    
                

                 <View
                     style={{
                         flexDirection:'row',
                         marginTop:SIZES.radius,
                         padding:SIZES.radius,
                         borderRadius:15,
                         backgroundColor: COLORS.transparentBlack1
                     }}
                    >
                        <Image
                        source={selectedHotel?.image}
                        resizeMode='cover'
                        style={{
                            width:90,
                            height:120,
                            borderRadius: 15 
                        }}
                        
                        />


                        <View
                            style={{
                                flex:1,
                                marginLeft:SIZES.radius,
                                justifyContent:'center'
                            }}
                        
                        >
                            <Text
                                style={{
                                    color:COLORS.white,...FONTS.h3
                                }}>
                            {selectedHotel?.name}
                            </Text>

                            {/* <Rating
                            containerStyle={{
                                marginTop:SIZES.base
                            }}
                            rate={selectedHotel?.rate}
                            
                            /> */}

                            <View
                                style={{
                                    flexDirection:'row',
                                    marginTop:SIZES.base
                                }}
                            >
                            
                            <TextButton 
                                label='Details'
                                customContainerStyle={{
                                    marginTop:SIZES.base,
                                    height:45,
                                    width:100
                                }}
                                customLabelStyle={{
                                    ...FONTS.h3
                                }}
                                onPress={()=>navigation.navigate('Restaurant')}/>

                            <View

                                style={{
                                    flex: 1,
                                    alignItems:'flex-end',
                                    justifyContent:'center'
                                }}
                                
                                >
                                    <Text style={{
                                        color:COLORS.lightGray,
                                        ...FONTS.body5,
                                        fontSize:Platform.OS==='ios' ?SIZES.body4: SIZES.body5
                                    }}>
                                     
                                    </Text>

                </View>
                </View>
                </View>
                </View>
                </View>
                }

                   </>     

    )

}



// function renderPlace(){
//     return(
//         <ImageBackground
//         source={selectedPlace?.image}
//         style={{
//             width:'100%',
//             height:'100%'
//         }}
//         >
        
//         {/* <HeaderBar
//                 title=""
//                 leftOnPressed={()=> navigation.goBack()}
//                 right={false}
//                 containerStyle={{
//                     marginTop:SIZES.padding*2
//                 }}
//             /> */}

//         <View
//                 style={{
//                     flex: 1,
//                     paddingHorizontal: SIZES.padding,
//                     justifyContent: 'flex-end',
//                     marginBottom:100
//                 }}
            
//             >
//                 {/*Name & Rating*/}
//                 <View
//                     style={{
//                         flexDirection: 'row',
//                         alignItems: 'center',
//                         justifyContent: 'space-between'
//                     }} 
                
//                 >
//                     <Text style= {{color: COLORS.white, ...FONTS.largeTitle}} >{selectedPlace?.name}</Text>
                
//                 <View
//                     style={{
//                         flexDirection:'row',
//                         alignItems:'center'
//                     }}
                
//                 >
//                     <Text style={{marginRight:5, color:COLORS.white,...FONTS.h3}}>{selectedPlace?.rate}</Text>
                    
//                     <Image    //star icon
//                         source={icons.star}
//                         style={{
//                             width: 20,
//                             height: 20
//                         }}
                    
//                     />
//                 </View>
//                 </View>
//                 {/*Description*/}
//                 <Text style={{marginTop:SIZES.base,color:COLORS.white,...FONTS.body3}}>{selectedPlace?.description}</Text>

//                 {/*Text Icon Button*/}
//                 <TextIconButton
//                 label='Book a flight'
//                 icon={icons.aeroplane}
//                 customContainerStyle={{
//                     marginTop:SIZES.padding
//                 }}

//                 onPress={()=> console.log('Book a flight')}
//                 />
//             </View>

//         </ImageBackground>
//     )
// }





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
            {renderMap()}

                

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

export default connect(mapStateToProps,mapDispatchToProps)(MapRender)