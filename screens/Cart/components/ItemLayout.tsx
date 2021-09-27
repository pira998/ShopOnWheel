import React from "react";
import { StyleSheet, Text, View } from "react-native";
import "intl";
import { Platform } from "react-native";
import "intl/locale-data/jsonp/en";
import { gql, useQuery } from '@apollo/client';
import { isCompositeType } from "graphql";

const GET_ALL_PRODUCTS = gql`
  {
  products{
    menuId
    description
    name
    price
	
}

}

`
const currency = new Intl.NumberFormat("en-LK", {
  style: "currency",
  currency: "LKR",
});

export const HEIGHT = 64;
const styles = StyleSheet.create({
  content: {
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 8,
    height: HEIGHT,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#e2e3e4",
  },
  info: {
    flexDirection: "row",
    alignItems: "center",
    
  },
  quantity: {
    backgroundColor: "#e2e3e4",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
    fontFamily: "UberMoveMedium",
    fontSize: 16,
    width: 30,
    height: 30,
  },
  title: {
    fontFamily: "UberMoveMedium",
    fontSize: 16,
    // flex:1,
    flexWrap:'wrap'
  },
  price: {
    fontFamily: "UberMoveRegular",
    fontSize: 16,
    marginRight: 8,
  },
  item:{
    flexGrow: 0,
    width:"70%",
  }
});



const ItemLayout = ({ item} ) => {
  // const [products, setProducts] = React.useState({})
  // const { loading, error, data } = useQuery(GET_ALL_PRODUCTS, {
  //   onCompleted: (data) => {
  //     setProducts(data)
  //     console.log(data)
      
  //   }
  // })
  // const product = data.products.filter(product => product.menuId == item.menuId)
  
  
  return (
    <View style={styles.content}>
      <View style={styles.info}>
        <View style={styles.quantity}>
          <Text>{item.qty}</Text>
        </View>
        <View style={styles.item} >
          {/* <Text style={styles.title}>{product[0].name}</Text> */}
        </View>

      </View>
      <Text style={styles.price}>{currency.format(item.price)}</Text>
    </View>

  );
};

export default ItemLayout;
