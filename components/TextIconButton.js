import React from "react";

import {Animated,ScrollView,StyleSheet,TouchableWithoutFeedback,Modal ,View,TouchableOpacity,Image,Text } from "react-native";

import { COLORS,FONTS,SIZES,icons,constants } from "../constants";

const TextIconButton=({containerStyle,label,labelStyle,icon,iconStyle,onPress})=>{
    return(
        <TouchableOpacity
        style={{
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'center',
            ...containerStyle
        }}
        onPress={onPress}>

            <Text style={{
                ...FONTS.body4,
                ...labelStyle
            }}>
                {label}
            </Text>

            <Image
            source={icon}
            style={{marginLeft:5,width:20,height:20,tintColor:COLORS.black,...iconStyle}}></Image>

        </TouchableOpacity>
    )
}

export default TextIconButton