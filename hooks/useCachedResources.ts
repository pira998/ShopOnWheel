import { FontAwesome,MaterialCommunityIcons,MaterialIcons,Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';

import * as React from 'react';

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
     

        // Load fonts
        await Font.loadAsync({
          ...FontAwesome.font,
          ...MaterialCommunityIcons.font,
          ...MaterialIcons.font,
          ...Ionicons.font,
            "Poppins-Black": require('../assets/fonts/Poppins-Black.ttf'),
        "Poppins-Bold": require('../assets/fonts/Poppins-Bold.ttf'),
        "Poppins-BlackItalic": require('../assets/fonts/Poppins-BlackItalic.ttf'),
        "Poppins-SemiBold": require('../assets/fonts/Poppins-SemiBold.ttf'),
        "Poppins-Regular": require('../assets/fonts/Poppins-Regular.ttf'),
        "UberMoveRegular" : require('../assets/fonts/UberMoveRegular.ttf'),
        "UberMoveMedium" : require('../assets/fonts/UberMoveMedium.ttf'),
   
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
     
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
