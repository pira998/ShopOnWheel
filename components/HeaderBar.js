import React from 'react'
import { View, Text,TouchableOpacity,Image } from 'react-native'
import {COLORS,SIZES,FONTS,icons} from '../constants'


const HeaderBar = ({title,leftOnPressed,right,containerStyle}) => {
    return (
        <View
             style={{
                 flexDirection:'row',
                 paddingHorizontal:SIZES.padding,
                 ...containerStyle,
             }}
        >
            <Text></Text>
        </View>
    )
}

export default HeaderBar
