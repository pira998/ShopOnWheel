import React from "react";

import {Animated,ScrollView,TouchableWithoutFeedback,Modal ,View,TouchableOpacity,Image,Text } from "react-native";

import { COLORS,FONTS,SIZES,icons,constants } from "../../constants";

import { IconButton,TextButton,TextIconButton} from "../../components";

const Section =({containerStyle,title,children})=>{
    return(
        <View style={{marginTop:SIZES.padding,...containerStyle}}>
            <Text style={{...FONTS.h3}}>{title}</Text>
            {children}
        </View>
    )
}

const FilterModal =({isVisible,onClose})=>{
    const modalAnimatedValue =React.useRef(new Animated.Value(0)).current

    const [showFilterModal,setShowFilterModal]= React.useState(isVisible);

    //delivery Time state,rating
    const[deliveryTime,setDeliveryTime]= React.useState('');
    const[ratings,setRatings]= React.useState('');
    const[tags,setTags]= React.useState('');


    React.useEffect(()=>{
        if(showFilterModal){
           Animated.timing(modalAnimatedValue,{
               toValue:1,
               duration:500,
               useNativeDriver:false
           }).start();
        }else{
            Animated.timing(modalAnimatedValue,{
                toValue:0,
                duration:500,
                useNativeDriver:false
            }).start(()=>onClose());
        }
    },[showFilterModal])


    //
    const modalY =modalAnimatedValue.interpolate({
        inputRange:[0,1],
        outputRange:[SIZES.height,SIZES.height-680]
    })

    function renderDistance(){
        return(
            <Section
            title="Distance">
                <View style={{alignItems:'center'}}>
                    {/* <TwoPointSlider
                    values={[3,10]}
                    min={1}
                    max={20}
                    postfix='km'
                    onValuesChange={(values)=>console.log(values)}>

                    </TwoPointSlider> */}
                </View>
            </Section>
        )
    }

    function renderDeliveryTime(){
        return(
            <Section
            title="Delivery Time"
            containerStyle={{
                marginTop:40
            }}
            >

                <View
                style={{
                    flexDirection:'row',
                    flexWrap:'wrap',
                    marginTop:SIZES.radius
                }}>
                    {constants.delivery_time.map((item,index)=>{
                        return(
                            <TextButton 
                            key={`delivery_time-${index}`}
                            label={item.label}
                            labelStyle={{
                                color:item.id== deliveryTime?COLORS.white:COLORS.gray,...FONTS.body4

                            }}
                            buttonContainerStyle={{
                                width:"30%",
                                height:50,
                                margin:5,
                                alignItems:'center',
                                borderRadius:SIZES.base,
                                backgroundColor:item.id==deliveryTime?COLORS.primary:COLORS.lightGray2
                            }}
                            onPress={()=>setDeliveryTime(item.id)}
                            />
                        )
                    })}
                    
                </View>

            </Section>
        )
    }

    function renderPricingRange(){
        return(
            <Section
            title="Pricing Range">
                <View
                style={{
                    alignItems:'center'
                }}>
                    {/* <TwoPointSlider 
                    values={[10,50]}
                    min={1}
                    max={100}
                    prefix="$"
                    postfix=""
                    onValuesChange={(values)=>console.log(values)}
                    /> */}

                </View>
            </Section>
        )
    }

    function renderRating(){
        return(
            <Section
            title="Ratings"
            containerStyle={{
                marginTop:40
            }}>
                <View
                style={{
                    flexDirection:'row',
                    justifyContent:'center'
                }}>
                    {constants.ratings.map((item,index)=>{
                        return(
                            < TextIconButton
                            key={`Ratings-${index}`}
                            containerStyle={{
                                flex:1,
                                height:50,
                                margin:5,
                                alignItems:'center',
                                borderRadius:SIZES.base,
                                backgroundColor:item.id== ratings? COLORS.primary:COLORS.lightGray2
                            }}
                            label={item.label}
                            labelStyle={{
                                color:item.id==ratings?COLORS.white:COLORS.gray
                            }}
                            icon={icons.star}
                            iconStyle={{
                                tintColor:item.id== ratings?COLORS.white:COLORS.gray
                            }}
                            onPress={()=>setRatings(item.id)}
                            />
                        )
                    })}

                </View>

            </Section>
        )
    }

    function renderTags(){
        return(
            <Section title="Tags">
                <View style={{
                    flexDirection:'row',
                    flexWrap:'wrap'
                }}>
                    {constants.tags.map((item,index)=>{
                        return(
                            <TextButton 
                            key={`Tags-${index}`}
                            label={item.label}
                            labelStyle={{
                                color:item.id==tags?COLORS.white:COLORS.gray,
                                ...FONTS.body4
                            }}
                            buttonContainerStyle={{
                                height:50,
                                margin:5,
                                paddingHorizontal:SIZES.padding,
                                alignItems:'center',
                                borderRadius:SIZES.base,
                                backgroundColor:item.id==tags?COLORS.primary:COLORS.lightGray2
                            }}
                            onPress={()=>setTags(item.id)}
                            />
                        )
                    })}

                </View>
            </Section>
        )
    }
    ///////////////////////////////////////
    return(
        <Modal
        animationType='fade'
        transparent={true}
        visible={isVisible}>

            <View
            style={{
                flex:1,
                backgroundColor:COLORS.transparentBlack7
                
            }}>

                {/*Transparent BackGround */}
                <TouchableWithoutFeedback
                onPress={()=>setShowFilterModal(false)}>
                    <View style={{position:'absolute',top:-500,left:0,right:0,bottom:0}}></View>
                </TouchableWithoutFeedback>

                {/*Model Content */}
                <Animated.View
                style={{
                    position:'absolute',
                    left:0,
                    bottom: modalY,
                    width:"100%",
                    height:"100%",
                    padding:SIZES.padding,
                    borderRadius:SIZES.padding,
                 //   borderTopLeftRadius:SIZES.padding,
                    backgroundColor:COLORS.white
                }}>

                     {/*Header of the modal */}
                    <View style={{flexDirection:'row',alignItems:'center'}}>

                        <Text style={{flex:1,...FONTS.h3,fontSize:18}}>Filter Your Search</Text>

                        <IconButton
                        containerStyle={{borderWidth:2,borderRadius:10,borderColor:COLORS.gray2}}
                        icon={icons.cross}
                        iconStyle={{tintColor:COLORS.gray2}}
                        onPress={()=>setShowFilterModal(false)}
                    
                        />
                    </View>

                      {/*Scroll view that contail all filter details */}
                      <ScrollView
                      showsVerticalScrollIndicator={false}
                      contentContainerStyle={{paddingBottom:250}}>

                            {/* Distance */}
                            {renderDistance()}

                            {/*Scroll view that contail all filter details */}

                            {/* Delivery Time Section */}
                            {renderDeliveryTime()}

                            
                            {/* Pricing Range Section */}
                            {renderPricingRange()}

                             {/* Rating Section */}
                             {renderRating()}

                             
                             {/* Tag Section */}
                             {renderTags()}

                      </ScrollView>

                         {/* Apply Button */}
                         <View
                         style={{
                             position:'absolute',
                             bottom:50,
                             left:0,
                             right:0,
                             height:110,
                             paddingHorizontal:SIZES.padding,
                             paddingVertical:SIZES.radius,
                             backgroundColor:COLORS.white
                         }}>
                             <TextButton 
                             label="Apply Filter"
                             buttonContainerStyle={{
                                 height:50,
                                 borderRadius:SIZES.base,
                                 backgroundColor:COLORS.primary
                             }}
                             onPress={()=>console.log('apply Filter')}
                             />

                         </View>

                </Animated.View>
            </View>
            
        </Modal>
    )
}

export default FilterModal;