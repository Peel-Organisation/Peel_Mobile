import React, {useEffect} from 'react';
import Routes from './src/config/routes';
import {NavigationContainer} from '@react-navigation/native';
import {View, StatusBar, Platform} from 'react-native';
import FlashMessage from 'react-native-flash-message';
import {ThemeProvider} from 'styled-components';
import theme from './src/config/theme';
import {messageLisner} from './src/functions/messaging';
import SplashScreen from 'react-native-splash-screen';

//On mets les routes dans un composant "Routes"
const App = () => {
  
  useEffect(() => {
    if (Platform.OS === 'android') {
      SplashScreen.hide();
    }
  }, []);

  messageLisner();
  return (
    <>
      <NavigationContainer>
        <ThemeProvider theme={theme}>
          <View style={{flex: 1}}>
            <Routes />
            <FlashMessage position="top" />
          </View>
        </ThemeProvider>
      </NavigationContainer>
      <StatusBar />
    </>
  );
};

export default App;
