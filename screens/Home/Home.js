//components
import {HorizontalFoodCard,VerticalFoodCard} from '../../components'
import FilterModal from '../Home/FilterModal';
import { connect } from 'react-redux';
import React from 'react';
import {
    View,
    Text,TouchableOpacity,Image,TextInput,FlatList
} from 'react-native';
import * as firebase from 'firebase'
import { FONTS,SIZES,COLORS,icons,images } from '../../constants';
import dummyData from '../../constants/dummyData';
import { gql, useQuery,useMutation } from '@apollo/client';
import { setAddress } from '../../stores/customer/customerActions';




const GET_CUSTOMER_DETAILS_BY_ID = gql`
 query getUserById($id: ID!) {
    user(id: $id) {
      id
      address{
          city
          country
          houseNo
          street
          zip
      } 
      createAt
      email
      language
      lastname
      location{
          Latitude
          Longitude
      }
      mobile
      paymentMethod
      username
    }
  }

`

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
const Home = ({navigation,params,setAddress}) => {

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
     const currentUser = firebase.auth().currentUser;
    const id = currentUser.uid
    const {loading,error,data} = useQuery(GET_CUSTOMER_DETAILS_BY_ID,{
      variables:{
          id
      } 
    }) 
    let address = {
        street:'senior lane',
        zip:'40000',
        houseNo:'14',
        city:'jaffna',
        country:'sri lanka'
    }
    //handler
    if (data){
       address = data.user.address
    }

    setAddress(address)

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
                data={dummyData.restaurantData}
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
                    onPress={(e)=> {navigation.navigate('Restaurant',{
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
                    <Text style={{...FONTS.h3}}>No { address.houseNo} , {address.street}, {address.city}, {address.country} , {address.zip}  </Text>
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


function mapDispatchToProps(dispatch){
    return{
        setAddress:(address)=>{return dispatch
            (setAddress(address))

        }
    }
}

export default connect(null,mapDispatchToProps)(Home)
// export default Home