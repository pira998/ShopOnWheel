//components
import { Header } from '../../components';

import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Image,FlatList,StyleSheet,Alert
} from 'react-native';

import { gql, useQuery,useMutation } from '@apollo/client';


import { connect } from 'react-redux';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { isIphoneX } from 'react-native-iphone-x-helper'
import Animated ,{useSharedValue,useAnimatedStyle,withTiming}from "react-native-reanimated";
import { icons, COLORS, SIZES, FONTS } from '../../constants'

const CREATE_REQUEST = gql`
mutation createReq($input:RequestInput!){
  createRequest(input:$input){
    id
    vendorId
    productId
  }  
}

`;


const Restaurant = ({route,drawerAnimationStyle,navigation,selectedTab,setSelectedTab}) => {
    const scrollX = new Animated.Value(0);
    const [restaurant, setRestaurant] = React.useState(null);
    const [currentLocation, setCurrentLocation] = React.useState(null);
    const [orderItems, setOrderItems] = React.useState([]);
    const [createRequest, { data, loading, error }] = useMutation(CREATE_REQUEST);
    // const dotPosition = Animated.divide(scrollX, SIZES.width)
    const [progress,setProgress] = React.useState(new Animated.Value(0));
    const [orderItem,setOrderItem] = React.useState([])
    const handleSubmit=()=>{
        navigation.navigate('RequestSentSuccess')
        createRequest({variables:{input:{ 
            "customerId": "AXfH2oTUaqMXUvC0SS2cLO6GbMo1",
            "vendorId": "2GpwoZn9enRd3VWti9LR",
            "productId": "8HSv1HvVcreCJSFdyIDL"
        }}})
    }
    React.useEffect(() => {
        let { item } = route.params;

        setRestaurant(item)
        setCurrentLocation("jaffna")
        
    })


    function editOrder(action, menuId, price) {
        let orderList = orderItems.slice()
        let item = orderList.filter(a => a.menuId == menuId)
       
        if (action == "+") {
            if (item.length > 0) {
                let newQty = item[0].qty + 1
                item[0].qty = newQty
                item[0].total = item[0].qty * price
            } else {
                const newItem = {
                    menuId: menuId,
                    qty: 1,
                    price: price,
                    total: price
                }
                orderList.push(newItem)
            }

            setOrderItems(orderList)
        } else {
            if (item.length > 0) {
                if (item[0]?.qty > 0) {
                    let newQty = item[0].qty - 1
                    item[0].qty = newQty
                    item[0].total = newQty * price
                }
            }

            setOrderItems(orderList)
            console.log(orderItems)

        }
    

    }

    function getOrderQty(menuId) {
        let orderItem = orderItems.filter(a => a.menuId == menuId)

        if (orderItem.length > 0) {
            return orderItem[0].qty
        }

        return 0
    }

    function getBasketItemCount() {
        let itemCount = orderItems.reduce((a, b) => a + (b.qty || 0), 0)

        return itemCount
    }

    function sumOrder() {
        let total = orderItems.reduce((a, b) => a + (b.total || 0), 0)

        return total.toFixed(2)
    }





    return (
        <Animated.View
            style={{
                flex: 1,
             //  alignItems: 'center',
             //  justifyContent: 'center',
                backgroundColor:COLORS.lightGray2,
                ...drawerAnimationStyle,
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
            title={restaurant?.name}
            leftComponent={
                <TouchableOpacity
                style={{
                    width:40,
                    height:40,
                    alignItems:'center',
                    justifyContent:'center',
                                    }}
                onPress={()=> Alert.alert(
                                    "Warning",
                                    "Do you want to Leave this page? It will remove your cart items",
                                    [
                                 
                                    {
                                        text: "Yes",
                                        onPress: () => {navigation.goBack();setOrderItems([])},
                                        style: "default",
                                    }, 
                                      {
                                        text: "No",
                                        onPress: () => {},
                                        style: "cancel",
                                    }, 
                                    ],
                                    {
                                    cancelable: true,
                                    }
                                        
                                    
                                    
                                )}>
                <Image 
                    source={icons.back}
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
                   <View style={{backgroundColor:'white'}} >
                       <Text style={{color:'white'}} >
                                Some
                       </Text>
                   </View>

                </TouchableOpacity>
            }
            />

            {/* Footer info */}

             <Animated.ScrollView
                horizontal
                pagingEnabled
                scrollEventThrottle={16}
                snapToAlignment="center"
                showsHorizontalScrollIndicator={false}
                onScroll={Animated.event([
                    { nativeEvent: { contentOffset: { x: scrollX } } }
                ], { useNativeDriver: false })}
            >
                {
                    restaurant?.menu.map((item, index) => (
                        <View
                            key={`menu-${index}`}
                            style={{ alignItems: 'center', }}
                        >
                           {/* { setOrderItem(orderItems.filter(a =>a.menuId == item.menuId))} */}
                            <View style={{ height: SIZES.height * 0.25 }}>
                                {/* Food Image */}
                                {item.isAvailable && item.count - getOrderQty(item.menuId) > 0 &&
                                <View style={[styles.available]} >
                                    <Text style={[styles.availableText]}> {item.count - getOrderQty(item.menuId)} Available</Text>
                                </View>}
                                {(!item.isAvailable || item.count - getOrderQty(item.menuId) ==0)&& 
                                 <View style={[styles.unavailable]} >
                                    <Text style={[styles.unavailableText]} >Not Available</Text>
                                </View>
                                }
                                <Image
                                    source={item.photo}
                                    resizeMode="cover"
                                    style={{
                                        width: SIZES.width,
                                        height: "100%"
                                    }}
                                />

                                {/* Quantity */}
                                <View
                                    style={{
                                        position: 'absolute',
                                        bottom: - 20,
                                        width: SIZES.width,
                                        height: 50,
                                        justifyContent: 'center',
                                        flexDirection: 'row'
                                    }}
                                >
                                  {item.isAvailable &&   
                                  <>
                                  <TouchableOpacity
                                        style={{
                                            width: 50,
                                            backgroundColor: COLORS.white,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            borderTopLeftRadius: 25,
                                            borderBottomLeftRadius: 25,
                                            elevation:12

                                            
                                        }}
                                        onPress={() => {editOrder("-", item.menuId, item.price);}}
                                    >
                                        <Text style={{ ...FONTS.body1 }}>-</Text>
                                    </TouchableOpacity>

                                    <View
                                        style={{
                                            width: 50,
                                            backgroundColor: COLORS.white,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            
                                        }}
                                    >
                                        <Text style={{ ...FONTS.h2 }}>{getOrderQty(item.menuId)}</Text>
                                    </View>

                                    <TouchableOpacity
                                        style={{
                                            width: 50,
                                            backgroundColor: COLORS.white,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            borderTopRightRadius: 25,
                                            borderBottomRightRadius: 25,
                                            elevation:12

                                        }}
                                        onPress={() => editOrder("+", item.menuId, item.price)}
                                    >
                                        <Text style={{ ...FONTS.body1 }}>+</Text>
                                    </TouchableOpacity>
                                    </>
                                    }
                                    {!item.isAvailable && 
                                    <TouchableOpacity   
                                        style={{
                                            width: 150,
                                            backgroundColor: COLORS.white,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            borderRadius: 25,
                                            elevation:12
                                        }}
                                        onPress={() => 
                                             Alert.alert(
                                                "Confirmation",
                                                "Are you sure do you want to request this item?",
                                                [
                                            
                                                {
                                                    text: "Yes",
                                                    onPress: () => {handleSubmit();setOrderItems([])},
                                                    style: "default",
                                                }, 
                                                {
                                                    text: "No",
                                                    onPress: () => {},
                                                    style: "cancel",
                                                }, 
                                                ],
                                                {
                                                cancelable: true,
                                                })
                                                        
                                           } >
                                        <Text>Request</Text>
                                    </TouchableOpacity>
                                    }
                                </View>
                            </View>

                            {/* Name & Description */}
                            <View
                                style={{
                                    width: SIZES.width,
                                    alignItems: 'center',
                                    marginTop: 15,
                                    paddingHorizontal: SIZES.padding * 2
                                }}
                            >
                                <Text style={{ marginVertical: 10, textAlign: 'center', ...FONTS.h4 }}>{item.name} - ${item.price.toFixed(2)}</Text>
                                <Text style={{ ...FONTS.h5 }}>{item.description}</Text>
                            </View>

                            {/* Calories */}
                            <View
                                style={{
                                    flexDirection: 'row',
                                    marginTop: 10
                                }}
                            >
                                <Image
                                    source={icons.fire}
                                    style={{
                                        width: 20,
                                        height: 20,
                                        marginRight: 10
                                    }}
                                />

                                <Text style={{
                                    ...FONTS.body3, color: COLORS.darygray
                                }}>{item.calories.toFixed(2)} cal</Text>
                            </View>
                        </View>
                    ))
                }
            </Animated.ScrollView>
            
              <View>
                {/* {
                    renderDots()
                } */}
                <View
                    style={{
                        backgroundColor: COLORS.white,
                        borderTopLeftRadius: 40,
                        borderTopRightRadius: 40
                    }}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingVertical: SIZES.padding,
                            paddingHorizontal: SIZES.padding,
                            borderBottomColor: COLORS.lightGray2,
                            borderBottomWidth: 1
                        }}
                    >
                        <Text style={{ ...FONTS.h3 }}>{getBasketItemCount()} items in Cart</Text>
                        <Text style={{ ...FONTS.h3 }}>${sumOrder()}</Text>
                    </View>

               
                    {/* Order Button */}
                    <View
                        style={{
                            padding: SIZES.padding ,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                width: SIZES.width * 0.9,
                                padding: SIZES.padding,
                                backgroundColor: COLORS.primary,
                                alignItems: 'center',
                                borderRadius: SIZES.radius
                            }}
                            onPress={() => {navigation.navigate("CartDetails", {
                                // restaurant: restaurant,
                                orderItems:orderItems,
                                currentLocation: currentLocation
                            });
                            setOrderItems([])
                        }}
                        >
                            <Text style={{ color: COLORS.white, ...FONTS.h2 }}>Order</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {isIphoneX() &&
                    <View
                        style={{
                            position: 'absolute',
                            bottom: -34,
                            left: 0,
                            right: 0,
                            height: 34,
                            backgroundColor: COLORS.white
                        }}
                    >
                    </View>
                }
            </View>
       

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

export default connect(mapStateToProps,mapDispatchToProps)(Restaurant)

const styles= StyleSheet.create({
    container:{
        flex:1,
        paddingVertical:SIZES.padding,
        backgroundColor:COLORS.white,
        
        // alignItems:'center',
        // backgroundColor:"red"
    },
    available:{
        backgroundColor:'#5CFF5C',
        position:'absolute',
        zIndex:2323232,
        left:24,
        top:24,       
        elevation:23,
        borderRadius:40,
        height:35,
        // width:70,   
        padding:5,     

        justifyContent:'center',
        alignItems:'center',                
    },
    availableText:{
        fontFamily:"Poppins-Regular",

    },
    unavailable:{
        backgroundColor:'#FF0000',
        position:'absolute',
        zIndex:2323232,
        left:24,
        top:24,       
        elevation:23,
        borderRadius:40,
        height:35,
        // width:70,
        padding:5,     
        justifyContent:'center',
        alignItems:'center',                
    },
    unavailableText:{
        fontFamily:"Poppins-Regular",
        color:'white'
    

    }

})