import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/native';

import HomeImage from '../../assets/images/logo/peel_logo3-shadow.png';
import HomeSelectedImage from '../../assets/images/logo/peel_logo3.png';
import ChatImage from '../../assets/images/icons/chat.png';
import ChatSelectedImage from '../../assets/images/icons/chatSelected.png';
import SettingsImage from '../../assets/images/icons/settings.png';
import SettingsSelectedImage from '../../assets/images/icons/settingsSelected.png';
import HomeScreen from '../screens/home';
import ContactScreen from '../screens/Contact';
import SettingsScreen from '../screens/settings';
import Chat from '../screens/chat';
import EditProfile from '../screens/settings/editProfile';

const TabStack = createBottomTabNavigator();

const TabStackScreen = () => {
  const {t} = useTranslation();
  return (
    <TabStack.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) =>
          Icon({route, focused, color, size}),
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        tabBarShowLabel: false,
        tabBarLabel: () => null, 
        tabBarStyle: {
          height: 80,
          borderTopWidth: 1,
          elevation: 1,
          shadowOpacity: 0,
        },
      })}>
      <TabStack.Screen
        name="Home"
        component={HomeScreen}
        options={{title: t('navbar.home'), headerShown: false}}
      />
      <TabStack.Screen
        name="Contact"
        component={ContactScreen}
        options={{title: t('navbar.contact'), headerShown: false}}
      />
      <TabStack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{title: t('navbar.settings'), headerShown: false}}
      />
    </TabStack.Navigator>
  );
};

const Stack = createNativeStackNavigator();

const AuthStack = ({navigation}) => {
  const { t } = useTranslation();
  return (
    <Stack.Navigator initialRouteName="HomeStack">
      <Stack.Screen
        name="HomeStack"
        component={TabStackScreen}
        options={{title: 'Home', headerShown: false}}
      />
      <Stack.Screen name="Chat" component={Chat} />
      <Stack.Screen 
        name="EditProfile" 
        component={EditProfile} 
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;

const Icon = ({route, focused, color, size}) => {
  let iconName = '';  
  if (color != 'gray') {
    if (route.name === 'Home') {
      iconName = <ImageLogo source={HomeSelectedImage} />;
    } else if (route.name === 'Contact') {
      iconName = <ImagePicto source={ChatSelectedImage} />;
    } else if (route.name === 'Settings') {
      iconName = <ImagePicto source={SettingsSelectedImage} />;
    }
  } else {
    if (route.name === 'Home') {
      iconName = <ImageLogo source={HomeImage} />;
    } else if (route.name === 'Contact') {
      iconName = <ImagePicto source={ChatImage} />;
    } else if (route.name === 'Settings') {
      iconName = <ImagePicto source={SettingsImage} />;
    }
  }

  if (iconName != '') {
    return iconName;
  }
};

const ImageLogo = styled.Image`
  width: 55px;
  height: 55px;
`;

const ImagePicto = styled.Image`
  width: 30px;
  height: 30px;
`;
