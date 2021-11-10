//components
import {HorizontalFoodCard,VerticalFoodCard} from '../../../components'
import { FAB } from 'react-native-paper';

import React from 'react';
import {
    View,
    Text,TouchableOpacity,Image,TextInput,FlatList,
    StyleSheet,Alert
} from 'react-native';

import { FONTS,SIZES,COLORS,icons,images } from '../../../constants';
import dummyData from '../../../constants/dummyData';


const affordable = 1
const fairPrice = 2
const expensive = 3

//for recomended, popular section
const Section =({title,onPress,children}) =>{
    return(
        <View>
            {/*header */}
            <View
            style={{
                flexDirection:'row',
                marginHorizontal:SIZES.padding,
                marginTop:30,
                marginBottom:20,
            }}
            >
                <Text style={{flex:1,...FONTS.h3}}>{title}</Text>
                <TouchableOpacity onPress={onPress}>
                    <Text style={{color:COLORS.primary,...FONTS.h3}}>show all</Text>
                </TouchableOpacity>

            </View>

            {/*content */}
            {children}
        </View>
    )
}

//
const Product = ({navigation,params}) => {
    const SampleFunction=()=>{
 
      Alert.alert("Floating Button Clicked");
 
    }
    // for select items to display
    const [selectedCategoryId,setSelectedCategoryId] = React.useState(1);
    const [selectedMenuType,setSelectedMenuType] = React.useState(1);
    const [menuList,setMenuList] = React.useState([]); //previously 1
    //for recomended section
    const [recommends,setRecommends]= React.useState([])
    //for popular items list
    const [popular,setPopular] =React.useState([])

    //for FilterModel
    const [showFilterModal,setShowFilterModal]=React.useState(false);

    React.useEffect(()=>{
        handleChangeCategory(selectedCategoryId,selectedMenuType)
    },[])

    //handler

    function handleChangeCategory(categoryId,menutypeId){
        // Retrive the recommend menu
        let selectedRecommend= dummyData.menu.find(a=>a.name=="Recommended");

        //Retrive popularmenu
        let selectedPopular = dummyData.menu.find(a=>a.name=="Popular")

        //find the menu based on menuTypeId
        let selectedMenu =dummyData.menu.find(a =>a.id ==menutypeId)

        //set the popular menu based on category id
        setPopular(selectedPopular?.list.filter(a=>a.categories.includes(categoryId)))

        //set the recommended menu based on the category id
        setRecommends(selectedRecommend?.list.filter(a=>a.categories.includes(categoryId)))

        //set the menu based on categoryId
        setMenuList(selectedMenu?.list.filter(a=>a.categories.includes(categoryId)))
    }

    //render functions

    function renderSearch (){
        return (
            <View
            style={{
                flexDirection:'row',height:40,alignItems:'center',marginHorizontal:SIZES.padding,
                marginVertical:SIZES.base,paddingHorizontal:SIZES.radius,
                borderRadius:SIZES.radius,backgroundColor:COLORS.lightGray2
            }}>
    
                    {/* icon */}
                    <Image 
                    source={icons.search}
                    style={{
                        height:20,
                        width:20,
                        tintColor:COLORS.black
                    }}/>

                    {/* Text input */}
                    <TextInput 
                    style={{
                        flex:1,
                        marginLeft:SIZES.radius,
                        ...FONTS.h3
                    }}
                    placeholder="Search Food"/>

                    {/* Filter button */}

                    <TouchableOpacity
                        onPress={()=>setShowFilterModal(true)}
                    >
                        <Image 
                        source={icons.filter}
                        style={{
                            height:20,
                            width:20,
                            tintColor:COLORS.black
                        }}/>
                    </TouchableOpacity>
            </View>
        )
    }

function renderMenuTypes(){
        return(
            <FlatList 
                   data={dummyData.menu}
                   contentContainerStyle={{
                    marginTop:0,
                    marginBottom:20
                     }}
                   horizontal
                   keyExtractor={(item)=>`${item.id}`}
                   showsHorizontalScrollIndicator={false}
                   renderItem={({item,index})=>{
                       return(
                           <TouchableOpacity
                           style={{
                            marginLeft:SIZES.padding,
                            marginRight:index == dummyData.menu.length-1 ? SIZES.padding :0,
                            marginTop:30
                            }}
                            onPress={()=>{
                                setSelectedMenuType(item.id);
                                handleChangeCategory(selectedCategoryId,item.id)
                            }}>

                           

                            <Text  style={{color:selectedMenuType==item.id ?COLORS.primary: COLORS.black,...FONTS.h3}}>{item.name}</Text>

                           </TouchableOpacity>
                          
                       )
                   }}
                   />
        )
    }

    function renderFoodCategories(){ // On top
        return(
            <FlatList
            data={dummyData.categories}
            keyExtractor={(item)=>`${item.id}`}
            horizontal
            showsHorizontalScrollIndicator ={false}
            renderItem={({item,index})=>(
                <TouchableOpacity
                style={{
                    flexDirection:'row',
                    height:55,
                    marginTop:SIZES.padding,
                    marginLeft:index==0 ?SIZES.padding:SIZES.radius,
                    marginRight:index== dummyData.categories.length-1 ? SIZES.padding:0,
                    paddingHorizontal:8,
                    borderRadius:SIZES.radius,
                    backgroundColor:selectedCategoryId== item.id? COLORS.primary :COLORS.lightGray2
                }}
                
                onPress={()=>{
                    setSelectedCategoryId(item.id);
                    handleChangeCategory(item.id,selectedMenuType)
                }}
                >

                    <Image
                    source={item.icon}
                    style={{
                        marginTop:5,
                        height:50,
                        width:50
                    }}/>

                    <Text
                    style={{
                        alignSelf:'center',
                        marginRight:SIZES.base,
                        color:selectedCategoryId==item.id?COLORS.white:COLORS.darkGray,
                        ...FONTS.h3
                    }}>
                        {item.name}
                    </Text>
                </TouchableOpacity>
            )}
            />
        )
    }


    /////////////////////
    return (
        <View
        style={{
            flex:1
        }}>
   

            {/*List*/}
            <FlatList 
            data={menuList}
            keyExtractor={(item)=>`${item.id}`}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent ={
                <View>
           

                     
                    {/*Food Categories */}
                    {renderFoodCategories()}

                    {/*Menu Type */}
                    {renderMenuTypes()}
                </View>
            }
            renderItem ={({item,index})=>{
                return (
                  <HorizontalFoodCard 
                  containerStyle={{
                      height:125,
                      alignItems:'center',
                      marginHorizontal:SIZES.padding,
                      marginBottom:SIZES.radius
                  }}

                  imageStyle={{
                      marginTop:20,
                      height:110,
                      width:110
                  }}

                  item={item}
                  onPress ={()=>console.log('horizontalcard')}
                  />
                )
            }}

            //footer of the app
            ListFooterComponent={
                <View style={{height:200}}></View>
            }
            />
              <FAB
                    style={styles.fab}
                    icon="plus"
                    onPress={() => navigation.navigate('AddProduct')}
                    color ='white'
                />

        </View>
    )
}

export default Product;

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 50,
    backgroundColor:'#FF6C44'

  },
})