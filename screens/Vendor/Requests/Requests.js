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


//
const Product = ({navigation,params}) => {
  
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

    console.log(menuList)
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
           

                     
                
                </View>
            }
            renderItem ={({item,index})=>{
                return (
                    <>
                  <HorizontalFoodCard 
                  containerStyle={{
                      height:125,
                      alignItems:'center',
                      marginHorizontal:SIZES.padding,
                      width:310,
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
                    <FAB
                    small
                    style={styles.fab}
                    icon="check"
                    onPress={() => navigation.navigate('Delivery')}
                    color ='white'
                   />
                    <FAB
                    small
                    style={styles.fab2}
                    icon="delete"
                    onPress={() => navigation.navigate('AddProduct')}
                    color ='white'
                   />
                  </>
                )
            }}

            //footer of the app
            ListFooterComponent={
                <View style={{height:200}}></View>
            }
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
    backgroundColor:'#27AE60'

  },
  fab2: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor:'#FF1717'

  },
})