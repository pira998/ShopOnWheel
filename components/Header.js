import { FONTS } from "../constants";
import React from "react";
import {View,Text} from 'react-native';

const Header =({containerStyle,title,leftComponent,rightComponent})=>{
    return (
        <View
        style={{
            flexDirection:'row',
            alignItems:'space-between',
            ...containerStyle
        }}>
        
        {/* left */}
        {leftComponent}

         {/* Title */}
            <View
            style={{
                flex:1,
                alignItems:'center',
                justifyContent:'center'
            }}>
                <Text style={{...FONTS.h3}}>{title}</Text>

            </View>

          {/* Right */}
          {rightComponent}


        </View>
    )
}

export default Header;