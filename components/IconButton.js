import React from "react";

import {Animated,ScrollView,TouchableWithoutFeedback,Modal ,View,TouchableOpacity,Image,Text } from "react-native";

import { COLORS,FONTS,SIZES,icons,constants } from "../constants";


const IconButton =({containerStyle,icon,iconStyle,onPress})=>{
    return(
        <TouchableOpacity
        style={{...containerStyle}}
        onPress={onPress}>
            <Image
            source={icon}
            style={{
                width:30,
                height:30,
                tintColor:COLORS.white,
                ...iconStyle
            }}/>

        </TouchableOpacity>
    )
}

export default IconButton;