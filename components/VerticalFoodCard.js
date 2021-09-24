import React from "react";

import { View,TouchableOpacity,Image,Text } from "react-native";

import { COLORS,FONTS,SIZES,icons,images } from "../constants";



const VerticalFoodCard =({containerStyle,item,onPress,navigation})=>{
    return(
        <TouchableOpacity
        style={{
            width:200,
            padding:SIZES.radius,
            alignItems:'center',
            borderRadius:SIZES.radius,
            backgroundColor:COLORS.lightGray2,
            ...containerStyle
        }}
        onPress={onPress}
        >

            {/* calories and Favourits*/}
            <View style={{flexDirection:'row'}}>
                {/* calories  */}
                <View style={{flex:1,flexDirection:'row'}}>
                    <Image
                    source={icons.calories}
                    style={{
                        width:30,
                        height:30
                    }}
                    />
                    <Text style={{color:COLORS.darkGray}}>{item.calories} calories</Text>
                </View>
                {/* favouritss  */}
                <Image
                source={icons.love}
                style={{width:20,height:20,tintColor:item.rating>4.5?COLORS.primary :COLORS.gray}}/>

            </View>

            {/* image  */}

            <View style={{
                height:150,
                width:150,
                alignItems:'center',
                justifyContent:'center',
                borderRadius:75,
                overflow:'hidden',
              
                marginBottom:19
            }}>
                <Image
                source={item.photo}
                style={{height:'100%',width:'100%'}}
                />
            </View>

            {/* info */}
            <View
            style={{
                alignItems:'center',
                marginTop:-20
            }}>

                <Text style={{...FONTS.h3}}>{item.name}</Text>
                {/* <Text style={{color:COLORS.darkGray2,textAlign:'center',...FONTS.body4}}>{item.description}</Text> */}
                <Text style={{marginTop:SIZES.radius,...FONTS.h3}}>{item.duration}</Text>
            </View>


            
        </TouchableOpacity>
    )
}

export default VerticalFoodCard;