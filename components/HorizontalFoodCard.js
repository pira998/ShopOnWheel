import React from "react";

import {
    TouchableOpacity,View,Text,Image
}from 'react-native';

import { COLORS,FONTS,SIZES,icons } from "../constants";


const HorizontalFoodCard =({containerStyle,imageStyle,item,onPress})=>{
    return(
        <TouchableOpacity
        style={{
            flexDirection:'row',
            borderRadius:SIZES.radius,
            backgroundColor:COLORS.lightGray2,
            ...containerStyle
        }}>

            {/*image */}
            <Image 
            source={item.image}
            style={imageStyle}
            />

            {/* info */}
            <View
            style={
                {
                    flex:1
                }
            }>
                    {/* Name*/}
                    <Text
                    style={
                        {
                            ...FONTS.h3,fontSize:17
                        }
                    }>{item.name}</Text>


                    {/* Discription */}
                    <Text
                    style={
                        {
                            ...FONTS.h3,fontSize:14,color:COLORS.darkGray
                        }
                    }>{item.description}</Text>


                    {/* price */}
                    <Text
                    style={
                        {
                            ...FONTS.h3,fontSize:17,marginTop:SIZES.base
                        }
                    }>${item.price}</Text>

            </View>


        </TouchableOpacity>

    )
}

export default HorizontalFoodCard;