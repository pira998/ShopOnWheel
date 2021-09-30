import { useMutation,gql } from "@apollo/client";
import * as firebase from "firebase";
import "firebase/firestore";
import {Alert} from "react-native";




export async function customerRegistration(email, password) {
  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    const currentUser = firebase.auth().currentUser;
    // const [createUser,{_data}]= useMutation(gql`
    //   mutation createUser($email:String!,$id:ID!){
    //     createUser(email:$email,id:$id){
    //       id
    //       email
    //     }
    //   }
    // `)
    // createUser(email,currentUser.uid)
    const db = firebase.firestore();
    db.collection("users")
      .doc(currentUser.uid)
      .set({
        email: currentUser.email,

      });
  } catch (err) {
    Alert.alert("There is something wrong!!!!", err.message);
  }
}
export async function vendorRegistration(email, password) {
  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    const currentVendor = firebase.auth().currentVender;

    const db = firebase.firestore();
    db.collection("vendors")
      .doc(currentVendor.uid)
      .set({
        email: currentVendor.email,

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

export async function checkVendorExist(){
  let status = false 
  try{
    await firebase.firestore().collection('vendors').where('email','==',email).limit(1).get().then(snapshot=>{
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

