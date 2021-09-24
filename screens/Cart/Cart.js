//components
import { Header } from '../../components';
import React, { useState } from "react";
import { Image, StatusBar, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, ScrollView } from "react-native-gesture-handler";

import Row from "./components/Row";
import Option from "./components/Option";
import Item from "./components/Item";

import {

    TouchableOpacity,
    
} from 'react-native';

import Animated ,{useSharedValue,useAnimatedStyle,withTiming}from "react-native-reanimated";

import { connect } from 'react-redux';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import {COLORS,icons,constants,SIZES,FONTS,images} from '../../constants'
import dummyData from '../../constants/dummyData';

import { FormInput,AuthTextButton } from '../../components';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { gql, useQuery } from '@apollo/client'; 

const GET_ALL_PRODUCTS = gql`
  {
  products{
    menuId
    description
    name
    price
	
}

}

`

const Cart = ({drawerAnimationStyle,navigation,route}) => {
  //  const [products,setProducts]= React.useState({})
  //  const {loading,error,data} = useQuery(GET_ALL_PRODUCTS,{
  //       onCompleted:(data) =>{
  //           setProducts(data)
         
  //       }
  //   })
 
//   const [items, setItems] = useState( [
//   {      
//     "menuId":"2",
//     "price": 15,
//     "qty": 3,   
//     "total": 45,
//   },
//     {      
//     "menuId": "3",
//     "price": 15,
//     "qty": 3,   
//     "total": 45,
//   },
//     {      
//     "menuId": '4',
//     "price": 15,
//     "qty": 3,   
//     "total": 45,
//   },
//     {      
//     "menuId": "5",
//     "price": 15,
//     "qty": 3,   
//     "total": 45,
//   },
//     {      
//     "menuId": "6",
//     "price": 15,
//     "qty": 3,   
//     "total": 45,
//   },
    
// ]);
const [items,setItems] = React.useState(route.params.orderItems)

  function isEnabledSignUp(){
        return values.email != "" && values.password != "" && typeof errors.email == 'undefined'
    }

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
            title="Cart"
            leftComponent={
                <TouchableOpacity
                style={{
                    width:40,
                    height:40,
                    alignItems:'center',
                    justifyContent:'center',
                                    }}
                onPress={()=>navigation.openDrawer()}>
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
            <View style={{paddingHorizontal:16,}} >
              <View style={styles.header} >
                  <Text style={styles.headerText} >
                      No
                  </Text>
                   <Text style={styles.headerText} >
                      Item Name
                  </Text>
                   <Text style={styles.headerText} >
                      Price                      
                  </Text>
              </View>
               <View style={styles.flatList} >
                <FlatList
                  showsVerticalScrollIndicator={false}
                  data={items}
                  keyExtractor={item=>item.menuId}
                  renderItem={({ item}) => (
                    <Item
                      onSwipe={() => {
                        const newItems = [...items];
                        newItems.splice(newItems.indexOf(item), 1);
                        setItems(newItems);
                      }}
                      {...{ item}}
                    />
                  )}
                />
              </View>
              <View style={{borderBottomColor:'gray',borderWidth:1}} />



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

export default connect(mapStateToProps,mapDispatchToProps)(Cart)

const styles= StyleSheet.create({
    container:{
        flex:1,
        paddingVertical:SIZES.padding,
        backgroundColor:COLORS.white,
        
        // alignItems:'center',
        // backgroundColor:"red"
    },
    header:{
      paddingHorizontal:16,
      flexDirection:"row",
      justifyContent:"space-between"
    },
    headerText:{
      fontSize:20,
      fontFamily:'Poppins-SemiBold'
    },
    flatList: {
  height: 250,

  flexGrow: 0
}
    



})