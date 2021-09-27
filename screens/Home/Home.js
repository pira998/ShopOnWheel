//components
import {HorizontalFoodCard,VerticalFoodCard} from '../../components'
import FilterModal from '../Home/FilterModal';

import React from 'react';
import {
    View,
    Text,TouchableOpacity,Image,TextInput,FlatList
} from 'react-native';

import { FONTS,SIZES,COLORS,icons,images } from '../../constants';
import dummyData from '../../constants/dummyData';


const affordable = 1
const fairPrice = 2
const expensive = 3


const restaurantData = [
        {
            id: 1,
            name: "Burger King",
            rating: 4.8,
            categories: [5, 7],
            priceRating: affordable,
            photo: require("../../assets/dummyData/hamburger.png"),
            duration: "30 - 45 min",
            location: {
                latitude: 1.5347282806345879,
                longitude: 110.35632207358996,
            },
            courier: {
                avatar: images.avatar_1,
                name: "Amy"
            },
            menu: [
                {
                    menuId: 1,
                    name: "Crispy Chicken Burger",
                    photo: images.crispy_chicken_burger,
                    description: "Burger with crispy chicken, cheese and lettuce",
                    calories: 200,
                    price: 10,
                    isAvailable:false,
                    count:7

                },
                {
                    menuId: 2,
                    name: "Crispy Chicken Burger with Honey Mustard",
                    photo: images.honey_mustard_chicken_burger,
                    description: "Crispy Chicken Burger with Honey Mustard Coleslaw",
                    calories: 250,
                    price: 15,
                    isAvailable:true,
                    count:7


                },
                {
                    menuId: 3,
                    name: "Crispy Baked French Fries",
                    photo: images.baked_fries,
                    description: "Crispy Baked French Fries",
                    calories: 194,
                    price: 8,
                    isAvailable:false,
                    count:7


                }
            ]
        },
        {
            id: 2,
            name: "Pizza Hut",
            rating: 4.8,
            categories: [2, 4, 6],
            priceRating: expensive,
            photo: require("../../assets/dummyData/hot_tacos.png"),
            duration: "15 - 20 min",
            location: {
                latitude: 1.556306570595712,
                longitude: 110.35504616746915,
            },
            courier: {
                avatar: images.avatar_2,
                name: "Jackson"
            },
            menu: [
                {
                    menuId: 4,
                    name: "Hawaiian Pizza",
                    photo: images.hawaiian_pizza,
                    description: "Canadian bacon, homemade pizza crust, pizza sauce",
                    calories: 250,
                    price: 15,
                    isAvailable:false,
                    count:7


                },
                {
                    menuId: 5,
                    name: "Tomato & Basil Pizza",
                    photo: images.pizza,
                    description: "Fresh tomatoes, aromatic basil pesto and melted bocconcini",
                    calories: 250,
                    price: 20,
                    isAvailable:true,
                    count:7


                },
                {
                    menuId: 6,
                    name: "Tomato Pasta",
                    photo: images.tomato_pasta,
                    description: "Pasta with fresh tomatoes",
                    calories: 100,
                    price: 10,
                    isAvailable:true,
                    count:7


                },
                {
                    menuId: 7,
                    name: "Mediterranean Chopped Salad ",
                    photo: images.salad,
                    description: "Finely chopped lettuce, tomatoes, cucumbers",
                    calories: 100,
                    price: 10,
                    isAvailable:false,
                    count:7


                }
            ]
        },
        {
            id: 3,
            name: "Hotdogs Bark",
            rating: 4.8,
            categories: [3],
            priceRating: expensive,
            photo: require("../../assets/dummyData/veg_biryani.png"),
            duration: "20 - 25 min",
            location: {
                latitude: 1.5238753474714375,
                longitude: 110.34261833833622,
            },
            courier: {
                avatar: images.avatar_3,
                name: "James"
            },
            menu: [
                {
                    menuId: 8,
                    name: "Chicago Style Hot Dog",
                    photo: images.chicago_hot_dog,
                    description: "Fresh tomatoes, all beef hot dogs",
                    calories: 100,
                    price: 20,
                    isAvailable:true,
                    count:7


                }
            ]
        },
        {
            id: 4,
            name: "Sushi Cheese",
            rating: 4.8,
            categories: [8],
            priceRating: expensive,
            photo:require("../../assets/dummyData/wrap_sandwich.png"),
            duration: "10 - 15 min",
            location: {
                latitude: 1.5578068150528928,
                longitude: 110.35482523764315,
            },
            courier: {
                avatar: images.avatar_4,
                name: "Ahmad"
            },
            menu: [
                {
                    menuId: 9,
                    name: "Sushi sets",
                    photo: images.sushi,
                    description: "Fresh salmon, sushi rice, fresh juicy avocado",
                    calories: 100,
                    price: 50,
                    isAvailable:true,
                    count:7


                }
            ]
        },
        {
            id: 5,
            name: "Cuisine Shop",
            rating: 4.8,
            categories: [1, 2],
            priceRating: affordable,
            photo: images.noodle_shop,
            duration: "15 - 20 min",
            location: {
                latitude: 1.558050496260768,
                longitude: 110.34743759630511,
            },
            courier: {
                avatar: images.avatar_4,
                name: "Muthu"
            },
            menu: [
                {
                    menuId: 10,
                    name: "Kolo Mee",
                    photo: images.kolo_mee,
                    description: "Noodles with char siu",
                    calories: 200,
                    price: 5,
                    isAvailable:true,
                    count:7


                },
                {
                    menuId: 11,
                    name: "Sarawak Laksa",
                    photo: images.sarawak_laksa,
                    description: "Vermicelli noodles, cooked prawns",
                    calories: 300,
                    price: 8,
                    isAvailable:false,
                    count:7


                },
                {
                    menuId: 12,
                    name: "Nasi Lemak",
                    photo: images.nasi_lemak,
                    description: "A traditional Malay rice dish",
                    calories: 300,
                    price: 8,
                    isAvailable:true,
                    count:7


                },
                {
                    menuId: 13,
                    name: "Nasi Briyani with Mutton",
                    photo: images.nasi_briyani_mutton,
                    description: "A traditional Indian rice dish with mutton",
                    calories: 300,
                    price: 8,
                    isAvailable:true,
                    count:7


                },

            ]
        },
        {

            id: 6,
            name: "Desserts Heaven",
            rating: 4.9,
            categories: [9, 10],
            priceRating: affordable,
            photo: images.kek_lapis_shop,
            duration: "35 - 40 min",
            location: {
                latitude: 1.5573478487252896,
                longitude: 110.35568783282145,
            },
            courier: {
                avatar: images.avatar_1,
                name: "Jessie"
            },
            menu: [
                {
                    menuId: 12,
                    name: "Teh C Peng",
                    photo: images.teh_c_peng,
                    description: "Three Layer Teh C Peng",
                    calories: 100,
                    price: 2,
                    isAvailable:false,
                    count:12

                },
                {
                    menuId: 13,
                    name: "ABC Ice Kacang",
                    photo: images.ice_kacang,
                    description: "Shaved Ice with red beans",
                    calories: 100,
                    price: 3,
                    isAvailable:true,
                    count:5


                },
                {
                    menuId: 14,
                    name: "Kek Lapis",
                    photo: images.kek_lapis,
                    description: "Layer cakes",
                    calories: 300,
                    price: 20,
                    isAvailable:true,
                    count:7


                }
            ]

        }


    ]



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
const Home = ({navigation,params}) => {

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

    function renderRecommendedSection(){
        return(
            <Section title="Recommended" 
            onPress={()=>console.log('show all recomended')}>

                <FlatList
                data={recommends}
                keyExtractor={(item)=>`${item.id}`}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({item,index})=>(
                    <HorizontalFoodCard 
                    containerStyle={{
                        height:180,
                        width:SIZES.width*0.85,
                        marginLeft:index ==0 ? SIZES.padding:18,
                        marginRight:index == recommends.length-1 ? SIZES.padding:0,
                        paddingRight:SIZES.radius,
                        alignItems:'center'
                        }}
                        imageStyle={{
                            marginTop:35,
                            marginLeft:20,
                            height:150,
                            width:150
                        }}
                        item={item}
                        onPress={()=>console.log('horizontalFood cart')}
                    />
                )
                }

                />

            </Section>
        )
    }
    function renderPopularSection(){
        return (
            <Section
            title="Popular Near you"
            onPress={()=>console.log('show all popular items')}
            >
                <FlatList
                data={restaurantData}
                keyExtractor={(item)=>`${item.id}`}
                horizontal
                showsHorizontalScrollIndicator ={false}
                renderItem={({item,index})=>(

                  <VerticalFoodCard
                    containerStyle={{
                        marginLeft:index==0 ?SIZES.padding :18,
                        marginRight:index=popular.length-1 ? SIZES.padding:0
                    }}
                    item={item}
                    onPress={(e)=> { e.preventDefault(); navigation.navigate('Restaurant',{
                        item,index
                    })}}
                  />
                )}

                />
            </Section>
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


    function renderDeliveryTo(){
        return(
            <View
            style={{
                marginTop:SIZES.padding,
                marginHorizontal:SIZES.padding
            }}>
                <Text style={{
                    color:COLORS.primary,...FONTS.body4
                }}>DELIVERT TO</Text>

                <TouchableOpacity style={{
                    flexDirection:'row',
                    marginTop:SIZES.base,
                    alignItems:'center'
                }}>
                    <Text style={{...FONTS.h3}}>{dummyData?.myProfile?.address}</Text>
                    <Image
                    source={icons.down_arrow}
                    style={{
                        marginLeft:SIZES.base,
                        height:20,
                        width:20
                    }}></Image>
                </TouchableOpacity>

            </View>
        )
    }
    /////////////////////
    return (
        <View
        style={{
            flex:1
        }}>

            {/*search */}
            {renderSearch()}

             {/*FilterModel */}
             {showFilterModal &&
             <FilterModal 
             isVisible={showFilterModal} 
             onClose ={()=>setShowFilterModal(false)}
             />}

            {/*List*/}
            <FlatList 
            data={menuList}
            keyExtractor={(item)=>`${item.id}`}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent ={
                <View>
                     {/*Delivery toegories */}
                     {renderDeliveryTo()}

                     
                    {/*Food Categories */}
                    {renderFoodCategories()}

                    {/*popular */}
                    {renderPopularSection(navigation)}


                    {/*Recomended */}
                    {renderRecommendedSection()}

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

        </View>
    )
}

export default Home;