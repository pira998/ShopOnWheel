import React from "react";
import {
    View,Text,Image,TouchableOpacity
}from 'react-native';

import {
    createDrawerNavigator,
    DrawerContentScrollView
}from '@react-navigation/drawer';


import MainLayout from '../screens/MainLayout';
import MapRender from '../screens/MapRender/MapRender'
import {  AddressConfirm, Checkout, OrderDelivery, OrderSuccess, Restaurant } from "../screens";

import {
    COLORS,FONTS,SIZES,constants,icons
}from "../constants";

import dummyData from "../constants/dummyData";
import Animated from "react-native-reanimated";
import { connect } from "react-redux";
import { setSelectedTab } from "../stores/tab/tabActions";
import {loggingOut} from '../firebase/api'
import { gql, useQuery } from '@apollo/client';
import Profile from "../screens/CustomerProfile/Profile";
import * as firebase from 'firebase'
import Cart from "../screens/Cart";



const GET_USERS = gql`
    {
        users {
            id
            email
        }
    }

`
const GET_ALL_VENDORS = gql`
    {
        vendors{
            id
            name
        }
    }
`


const Drawer = createDrawerNavigator();

const CustomDrawerItem =({lable,icon,isFocused,onPress}) =>{


    return (
        <TouchableOpacity
        style={{
            flexDirection:'row',
            height:40,
            marginBottom:SIZES.base,
            alignItems:'center',
            paddingLeft:SIZES.radius,
            borderRadius:SIZES.base,
            backgroundColor:isFocused ? COLORS.transparentBlack1:null
        }}
        //onPress
        onPress={onPress}
        >
            <Image 
            source={icon}
            style={{
                width:20,
                height:20,
                tintColor:COLORS.white
            }}
            />

            <Text
            style={{
                marginLeft:15,
                color:COLORS.white,
                ...FONTS.h3
            }}>
                {lable}
            </Text>

        </TouchableOpacity>
    )
}

const CustomDrawerContent = ({navigation,selectedTab,setSelectedTab}) =>{
    const {loading,error,data} = useQuery(GET_ALL_VENDORS,{
        onCompleted:(data) =>{
            // console.log(data)
         
        }
    })
    return(
        <DrawerContentScrollView 
        scrollEnabled={true}
        contentContainerStyle ={{flex:1}}
        >
        <View 
            style={{
                flex:1,
                paddingHorizontal:SIZES.radius
            }}>

                {/* close button*/}
                <View
                    style={{
                        alignItems:'flex-start',
                        justifyContent:'center'
                    }}>
                    
                    <TouchableOpacity
                        style={{
                            alignItems:'center',
                            justifyContent:'center'
                        }}
                        onPress={()=>navigation.closeDrawer()}
                    >   
                        <Image
                            source={icons.cross}
                            style={{
                                height:35,
                                width:35,
                                tintColor:COLORS.white
                            }}
                        ></Image>
                    </TouchableOpacity>

                </View>
                {/* profiel*/}
                <TouchableOpacity
                    style={{
                        flexDirection:'row',
                        marginTop:SIZES.radius,
                        alignItems:'center'
                    }}
                    onPress={()=>navigation.navigate('Profile')}
                    >
                    
                    <Image
                    source={dummyData.myProfile.profile_image}
                    style={{
                        width:50,
                        height:50,
                        borderRadius:SIZES.radius
                    }}
                    >
                    </Image>

                    <View style={{
                        marginLeft:SIZES.radius
                    }}>
                        <Text style={{color:COLORS.white, ...FONTS.h3}}>{console.log(data)}</Text>
                        <Text style={{color:COLORS.white, ...FONTS.body4}}>View Profile</Text>
                    </View>

                </TouchableOpacity>

                {/* Drawer items*/}

                <View style={{
                    flex:1,
                    marginTop:SIZES.padding
                }}>

                    <CustomDrawerItem
                        lable={constants.screens.map}
                        icon={icons.home}
                        isFocused={selectedTab== constants.screens.map}
                        onPress={()=>{
                            setSelectedTab(constants.screens.map)
                            navigation.navigate("MapRender")
                        }}
                        
                    />
                    <CustomDrawerItem
                        lable={constants.screens.home}
                        icon={icons.home}
                        isFocused={selectedTab== constants.screens.home}
                        onPress={()=>{
                            setSelectedTab(constants.screens.home)
                            navigation.navigate("MainLayout")
                        }}
                        
                    />

                    <CustomDrawerItem
                        lable={constants.screens.my_wallet}
                        icon={icons.wallet}
                        isFocused={selectedTab== constants.screens.my_wallet}
                        onPress={()=>{
                            setSelectedTab(constants.screens.my_wallet)
                            navigation.navigate("MainLayout")
                        }}
                    />

                    
                    <CustomDrawerItem
                        lable={constants.screens.notification}
                        icon={icons.notification}
                        isFocused={selectedTab== constants.screens.notification}
                        onPress={()=>{
                            setSelectedTab(constants.screens.notification)
                            navigation.navigate("MainLayout")
                        }}
                    />
               
                    {/* Line Divider*/}
                    <View
                    style={
                        {
                            height:1,
                            marginVertical:SIZES.radius,
                            marginLeft:SIZES.radius,
                            backgroundColor:COLORS.lightGray1
                        }
                    }>

                    </View>
                    <CustomDrawerItem
                        lable="Track Your Order Item"
                        icon={icons.location}
                         onPress={()=>{
                           
                            navigation.navigate("OrderDelivery")
                        }}
                    />
                     <CustomDrawerItem
                        lable="Cupons"
                        icon={icons.coupon}
                    />
                     <CustomDrawerItem
                        lable="Setting"
                        icon={icons.setting}
                    />

                </View>

                {/*Log Out*/ }
                <View style={{
                    marginBottom:SIZES.padding
                }}>
                      <CustomDrawerItem
                        lable="LogOut"
                        icon={icons.logout}
                        onPress={()=>loggingOut()}
                    />

                </View>
            
        </View>
        </DrawerContentScrollView>
    )
}

const CustomDrawer=({selectedTab,setSelectedTab})=>{
    const [progress,setProgress] = React.useState(new Animated.Value(0));
    const [user, setUser] = React.useState(null);
     function onAuthStateChanged(user) {
        setUser(user);
       
        } 
    React.useEffect(() => {
        const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    const scale =Animated.interpolateNode(progress,{
        inputRange :[0,1],
        outputRange:[1,0.8]
    })

    const borderRadius =Animated.interpolateNode(progress,{
        inputRange :[0,1],
        outputRange:[0,26]
    })
    
    const animatedStyle ={borderRadius,transform :[{scale}]}

    return (
        <View
        style={
            {
                flex:1,
                backgroundColor:COLORS.primary
            }
        }>

            <Drawer.Navigator
             drawerType="slide"
             overlayColor="transparent"
             drawerStyle={{
                 flex:1,
                 width:'65%',
                 paddingRight:20,
                 backgroundColor:'transparent'

             }}

             sceneContainerStyle={{
                 backgroundColor:'transparent'
             }}

             initialRouteName="OrderDelivery"
             drawerContent={props =>{
                 setTimeout(()=>{
                    setProgress(props.progress)

                 },0)
                 return (
                     <CustomDrawerContent 
                        navigation={props.navigation}
                        selectedTab ={selectedTab}
                        setSelectedTab ={setSelectedTab}
                     />
                 )
             }}

            >
                <Drawer.Screen name="MainLayout">
                    {props=><MainLayout {...props}
                    drawerAnimationStyle={animatedStyle}
                    />}
                </Drawer.Screen>
                <Drawer.Screen name="MapRender">
                    {props=><MapRender {...props}
                    drawerAnimationStyle={animatedStyle}
                    />}
                </Drawer.Screen>

                <Drawer.Screen name="Profile">
                    {props=><Profile {...props}
                    drawerAnimationStyle={animatedStyle}
                    />}
                </Drawer.Screen>
                <Drawer.Screen name="Restaurant">
                    {props=><Restaurant {...props}
                    drawerAnimationStyle={animatedStyle}
                    />}
                </Drawer.Screen>
                 <Drawer.Screen name="CartDetails">
                    {props=><Cart {...props}
                    drawerAnimationStyle={animatedStyle}
                    />}
                </Drawer.Screen>
                  <Drawer.Screen name="Checkout">
                    {props=><Checkout {...props}
                    drawerAnimationStyle={animatedStyle}
                    />}
                </Drawer.Screen>
                <Drawer.Screen name="AddressConfirm">
                    {props=><AddressConfirm {...props}
                    drawerAnimationStyle={animatedStyle}
                    />}
                </Drawer.Screen>
                     <Drawer.Screen name="OrderSuccess">
                    {props=><OrderSuccess {...props}
                    drawerAnimationStyle={animatedStyle}
                    />}
                </Drawer.Screen>
                 <Drawer.Screen name="OrderDelivery">
                    {props=><OrderDelivery {...props}
                    drawerAnimationStyle={animatedStyle}
                    />}
                </Drawer.Screen>



            </Drawer.Navigator>

        </View>
    )
}

// export default CustomDrawer;

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

export default connect(mapStateToProps,mapDispatchToProps)(CustomDrawer)

