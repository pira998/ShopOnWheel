//components
import { Header } from '../components';

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
import { setSelectedTab } from '../stores/tab/tabActions';
import { Home,Search,CartTab ,Favourite,Notification,} from '../screens/index';
import MapRender from './MapRender/MapRender';

import {COLORS,icons,constants,SIZES,FONTS} from '../constants'
import dummyData from '../constants/dummyData';


const TabButton =({label,icon,isFocused,onPress,outerContainerStyle,innerContainerStyle,badge,isBadgeTrue})=>{
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
            
            {!isFocused && isBadgeTrue &&
                <View style={{position:'absolute',zIndex:999999,top:20,right:0,backgroundColor:'red',height:20,width:20,borderRadius:10,justifyContent:'center',alignItems:'center'}} >
                    <Text>{badge}</Text>
                </View>
            }
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

    //Flat list ref for Content Section
    const flatListRef =React.useRef();
     //For footer animations
    //Re animated shared value
    const homeTabFlex = useSharedValue(1);
    const homeTabColor = useSharedValue(COLORS.white);
    const searchTabFlex = useSharedValue(1);
    const searchTabColor = useSharedValue(COLORS.white);
    const cartTabFlex = useSharedValue(1);
    const cartTabColor = useSharedValue(COLORS.white);
    const notificationTabFlex = useSharedValue(1);
    const notificationTabColor = useSharedValue(COLORS.white);
    //re animated animated styles for footer
        //home
    const homeFlexStyle = useAnimatedStyle(()=>{
        return {
            flex:homeTabFlex.value
        }
    })
    const homeColorStyle = useAnimatedStyle(()=>{
        return{
            backgroundColor:homeTabColor.value
        }
    })
        //search
    const searchFlexStyle = useAnimatedStyle(()=>{
        return {
            flex:searchTabFlex.value
        }
    })
    const searchColorStyle = useAnimatedStyle(()=>{
        return{
            backgroundColor:searchTabColor.value
        }
    })
        //cart
    const cartFlexStyle = useAnimatedStyle(()=>{
        return {
            flex:cartTabFlex.value
        }
    })
    
    const cartColorStyle = useAnimatedStyle(()=>{
        return{
            backgroundColor:cartTabColor.value
        }
    })
          //notification
     const notificationFlexStyle = useAnimatedStyle(()=>{
            return {
                flex:notificationTabFlex.value
            }
    })
    const notificationColorStyle = useAnimatedStyle(()=>{
            return{
                backgroundColor:notificationTabColor.value
            }
    })


    //setdefault value for selected Tab
    React.useEffect(()=>{
        setSelectedTab(constants.screens.home)
    },[])

    //hook for footer animations
    React.useEffect(()=>{
        if(selectedTab==constants.screens.home){
            flatListRef?.current?.scrollToIndex({
                index:0,
                animated:false
            })
            homeTabFlex.value= withTiming(4,{duration:500});
            homeTabColor.value = withTiming(COLORS.primary,{duration:500})
        }else{
            homeTabFlex.value= withTiming(1,{duration:500});
            homeTabColor.value = withTiming(COLORS.white,{duration:500})
        } // search
        if(selectedTab==constants.screens.search){
            flatListRef?.current?.scrollToIndex({
                index:1,
                animated:false
            })
            searchTabFlex.value= withTiming(4,{duration:500});
            searchTabColor.value = withTiming(COLORS.primary,{duration:500})
        }else{
            searchTabFlex.value= withTiming(1,{duration:500});
            searchTabColor.value = withTiming(COLORS.white,{duration:500})
        } // cart
        if(selectedTab==constants.screens.cart){
            flatListRef?.current?.scrollToIndex({
                index:2,
                animated:false
            })
            cartTabFlex.value= withTiming(4,{duration:500});
            cartTabColor.value = withTiming(COLORS.primary,{duration:500})
        }else{
            cartTabFlex.value= withTiming(1,{duration:500});
            cartTabColor.value = withTiming(COLORS.white,{duration:500})
        } // notification
        if(selectedTab==constants.screens.notification){
            flatListRef?.current?.scrollToIndex({
                index:3,
                animated:false
            })
            notificationTabFlex.value= withTiming(4,{duration:500});
            notificationTabColor.value = withTiming(COLORS.primary,{duration:500})
        }else{
            notificationTabFlex.value= withTiming(1,{duration:500});
            notificationTabColor.value = withTiming(COLORS.white,{duration:500})
        }
    },[selectedTab])



    return (
        <Animated.View
            style={{
                flex: 1,
             //  alignItems: 'center',
             //  justifyContent: 'center',
                backgroundColor:COLORS.white,
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
                    alignItems:'center'
                }
            }
            title={selectedTab.toUpperCase()}
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

            {/*Content*/}

            <View
            style={{flex:1,}}>
                <FlatList 
                 ref={flatListRef}
                 horizontal
                 scrollEnabled={false}
                 pagingEnabled
                 snapToAlignment="center"
                 snapToInterval={SIZES.width}
                 showsHorizontalScrollIndicator={false}
                 data={constants.bottom_tabs}
                 keyExtractor={item => `${item.id}`}
                 renderItem ={({item,index})=>{
                     return (
                         <View
                         style={{
                             height:SIZES.height,width:SIZES.width
                         }}
                         >
                             
                             {selectedTab == constants.screens.home && <Home navigation={navigation}/>}
                             {selectedTab == constants.screens.search && <Search />}
                             {selectedTab== constants.screens.cart && <CartTab />}
                             {selectedTab == constants.screens.favourite  && <Notification />}
                             {selectedTab == constants.screens.map  && <MapRender />}

                         </View>
                     )
                 }}
                />
            </View>

          

            {/*Footer*/}
{/* 
            <View
            style={{
                height:100,
                justifyContent:'flex-end'
            }}> */}
               {/*shadow
               <LinearGradient 
                    start ={{x:0,y:0}}
                    end={{x:0,y:4}}
                    colors={[
                        COLORS.transparent,
                        COLORS.lightGray1
                    ]}
                    style={{
                        position:'absolute',
                        top:-20,
                        left:0,
                        right:0,
                        height:100,
                        borderTopLeftRadius:15,
                        borderTopRightRadius:15
                    }}
               />
                */}
               {/*tabs*/}
{/* 
               <View
               style={{
                   flex:1,
                   flexDirection:'row',
                   paddingHorizontal:SIZES.radius,
                   paddingBottom:10,
                   borderTopLeftRadius:20,
                   borderTopRightRadius:20,
               
                   backgroundColor:COLORS.lightGray1
               }}>

                    <TabButton 
                    label={constants.screens.home}
                    icon={icons.home}
                    isFocused={selectedTab==constants.screens.home}
                    outerContainerStyle={homeFlexStyle}
                    innerContainerStyle={homeColorStyle}
                    onPress ={()=>setSelectedTab(constants.screens.home)}
                    />
                    <TabButton 
                    label={constants.screens.search}
                    icon={icons.search}
                    isFocused={selectedTab==constants.screens.search}
                    outerContainerStyle={searchFlexStyle}
                    innerContainerStyle={searchColorStyle}
                    onPress ={()=>setSelectedTab(constants.screens.search)}
                    />
                      <TabButton 
                    label={constants.screens.cart}
                    icon={icons.cart}
                    isFocused={selectedTab==constants.screens.cart}
                    outerContainerStyle={cartFlexStyle}
                    innerContainerStyle={cartColorStyle}
                    onPress ={()=>setSelectedTab(constants.screens.cart)}
                    isBadgeTrue={true}
                    badge={2}
                    />

                    <TabButton 
                    label={constants.screens.notification}
                    icon={icons.notification}
                    isFocused={selectedTab==constants.screens.notification}
                    outerContainerStyle={notificationFlexStyle}
                    innerContainerStyle={notificationColorStyle}
                    onPress ={()=>setSelectedTab(constants.screens.notification)}
                    />

               </View>


            </View> */}

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