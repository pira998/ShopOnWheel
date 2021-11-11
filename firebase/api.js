import { useMutation,gql } from "@apollo/client";
import * as firebase from "firebase";
import "firebase/firestore";
import {Alert} from "react-native";




export async function customerRegistration(email, password) {
  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    const currentUser = firebase.auth().currentUser;
    const db = firebase.firestore();
    db.collection("users")
      .doc(currentUser.uid)
      .set({
        email: currentUser.email,
        address:{
          city:'',
          country:'',
          houseNo:'',
          street:'',
          zip:''
        },
        cards:[],
        createAt:firebase.firestore.FieldValue.serverTimestamp(),
        language:'',
        lastname:'',
        location:{
          Latitude:0.0,
          Longitude:0.0
        },
        mobile:"",
        paymentMethod:'',
        username:""

      });
  } catch (err) {
    Alert.alert("There is something wrong!!!!", err.message);
  }
}
export async function vendorRegistration(email, password) {
  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
   const currentUser = firebase.auth().currentUser;
       const db = firebase.firestore();

    await db.collection("vendors")
      .doc(currentUser.uid)
      .set({
        email: currentUser.email,
        accountNumber:'',
        address:{
          city:'',
          street:''
        },
        available:true,
        courier:{
          avatar:'',
          name:''
        },
        createAt:'',
        duration:'',
        joinedDate:'',
        location:{
          latitude:0,
          Longitude:0,
        },
        name:'',
        photo:'',
        priceRating:'',
        rating:0,
        registrationNumber:0


      });
  } catch (err) {
    Alert.alert("There is something wrong!!!!", err.message);
  }
}

export async function signIn(email, password) {
  try {
   await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
  } catch (err) {
    Alert.alert("There is something wrong!", err.message);
  }
}

export async function loggingOut() {
  try {
    await firebase.auth().signOut();
  } catch (err) {
    Alert.alert('There is something wrong!', err.message);
  }
}

export async function checkVendorExist(email){
  let status = false 
  try{
    await firebase.firestore().collection('vendors').where('email','==',email).limit(1).get().then(snapshot=>{
      console.log(snapshot)
      if(!snapshot.empty){
        status = true
        return status
      }
      else{
        status = false
        return status
      }
    })
  }catch(err){
    Alert.alert("You don't have an account in vendor!",err.message)
  }
  return status
}

export async function forgotPassword(email) {
  try {
   await firebase
      .auth()
      .sendPasswordResetEmail(email);
  } catch (err) {
    Alert.alert("There is something wrong!", err.message);
  }
}