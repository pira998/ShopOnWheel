import React, { useState, useEffect } from 'react';

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';
import {View,ActivityIndicator,StyleSheet} from 'react-native'

import CustomDrawer from './navigation/customdrawer';
import { LogBox } from 'react-native';
import { createStore,applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import rootReducer from "./stores/rootReducer";
import { ApolloClient,ApolloProvider,InMemoryCache,createHttpLink } from "@apollo/client";

import { useFonts } from 'expo-font';
import * as firebase from 'firebase'
import useCachedResources from './hooks/useCachedResources';
import fetch from 'cross-fetch';
import {
    OnBoarding,
    SignIn,
    SignUp,
    ForgotPassword,
    Otp,
    Welcome,
    CustomerUserBio,
    CustomerLanguage,
    CustomerSetLocation,
    CustomerSignUpSuccess,
    CustomerPaymentOption
} from './screens/index'

const link = createHttpLink({
  uri:"https://shop-on-wheel-server.veensiva10.workers.dev/",
  useGETForQueries:true,
  credentials: 'same-origin',
  fetch

});
const client = new ApolloClient({
    link,
    cache:new InMemoryCache()
}
)
const Stack = createStackNavigator();
const firebaseConfig = {
  apiKey: "AIzaSyBJQaGPESpG-vlcnpajwa3IY0J6MNUIdYg",
  authDomain: "shoponwheel-7028e.firebaseapp.com",
  projectId: "shoponwheel-7028e",
  storageBucket: "shoponwheel-7028e.appspot.com",
  messagingSenderId: "19733146857",
  appId: "1:19733146857:web:c6c2922a42542629f95478",
  measurementId: "G-Z1SC657WQG"
};

if (!firebase.apps.length) {
   firebase.initializeApp(firebaseConfig);
}else {
   firebase.app(); // if already initialized, use that one
}

const store= createStore(
    rootReducer,
    applyMiddleware(thunk)
)
LogBox.ignoreAllLogs();
const App = () => {
    const isLoadingComplete = useCachedResources();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [initializing, setInitializing] = useState(true);
  // Handle user state changes
    function onAuthStateChanged(user) {
        setUser(user);
       
        if (initializing) setInitializing(false);
            setLoading(false);
        } 
    useEffect(() => {
        const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    if (loading || !isLoadingComplete) {
        return (
        
        <View style={[styles.container, styles.horizontal]} > 
        <ActivityIndicator size="large" color="#FF6C44" />
        </View>);
    }




    return (
        <ApolloProvider client={client} >

       
        <Provider store={store}>
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}
                initialRouteName={'Onboarding'}
            >
            
                <Stack.Screen
                    name="Home"
                    component={user ? CustomDrawer : Welcome}
                />
                <Stack.Screen
                    name="Welcome"
                    component={Welcome}
                />
            
                 
                 <Stack.Screen
                    name="OnBoarding"
                    component={OnBoarding}
                />

                <Stack.Screen
                    name="SignIn"
                    component={SignIn}
                />

                <Stack.Screen
                    name="SignUp"
                    component={SignUp}
                />

                <Stack.Screen
                    name="ForgotPassword"
                    component={ForgotPassword}
                />

                <Stack.Screen
                    name="Otp"
                    component={Otp}
                />
                <Stack.Screen
                    name="CustomerLanguage"
                    component={CustomerLanguage}
                />
                <Stack.Screen
                    name="CustomerPaymentOption"
                    component={CustomerPaymentOption}
                />
                <Stack.Screen
                    name="CustomerSetLocation"
                    component={CustomerSetLocation}
                />
                <Stack.Screen
                    name="CustomerUserBio"
                    component={CustomerUserBio}
                />
                <Stack.Screen
                    name="CustomerSignUpSuccess"
                    component={CustomerSignUpSuccess}
                />
                
                
                



            </Stack.Navigator>
        </NavigationContainer>
        </Provider>
         </ApolloProvider>
    )
}

export default App
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center"
    },
    horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
    }
});
