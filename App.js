import React from 'react';
import Routes from './src/config/routes';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar, View } from 'react-native';
import FlashMessage from 'react-native-flash-message';
import { ThemeProvider } from 'styled-components';
import theme from './src/config/theme';
import { messageLisner } from './src/functions/messaging';

//On mets les routes dans un composant "Routes"
const App = () => {
  messageLisner();
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#FC912F" />
      <NavigationContainer>
        <ThemeProvider theme={theme}>
          <View style={{ flex: 1 }}>
            <Routes />
            <FlashMessage position="top" />
          </View>
        </ThemeProvider>
      </NavigationContainer>
    </>
  );
};

export default App;
