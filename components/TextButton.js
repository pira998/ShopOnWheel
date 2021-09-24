import React from "react";

import {Animated,ScrollView,StyleSheet,TouchableWithoutFeedback,Modal ,View,TouchableOpacity,Image,Text } from "react-native";

import { COLORS,FONTS,SIZES,icons,constants } from "../constants";

const TextButton =({label,labelStyle,buttonContainerStyle,onPress})=>{
return(
    <TouchableOpacity
    style={{
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:COLORS.primary,
        ...buttonContainerStyle
    }}
    onPress={onPress}
    >
        <Text
        style={{
            color:COLORS.white,...FONTS.h3,...labelStyle
        }}>
            {label}
        </Text>

    </TouchableOpacity>
)
}

export default TextButton