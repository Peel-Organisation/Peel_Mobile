import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTranslation } from "react-i18next";
import crashlytics from '@react-native-firebase/crashlytics';



import Login from '../screens/login';
import Register from '../screens/register';
import Auth from '../screens/auth';
const Stack = createNativeStackNavigator();
import Loading from '../components/loading';

import { TestAuth, IsProfileCompleted } from '../functions/api_request';

const PublicStack = ({ navigation }) => {
  const { t } = useTranslation();
  const [loading, setLoading] = React.useState(true);


  useEffect(() => {
    (async () => {
      let auth_bool = await TestAuth()
      let profile_bool = await IsProfileCompleted()
      console.log("profile_bool : ", profile_bool)
      crashlytics().log("auth_bool : ", auth_bool)
      if (auth_bool) {
        if (profile_bool) {
          setLoading(false);
          crashlytics().log("navigate to auth");
          navigation.navigate('Auth');
        } else {
          setLoading(false);
          crashlytics().log("navigate to profile");
          navigation.navigate('Profile');
        }
      } else {
        setLoading(false);
        crashlytics().log("navigate to public")
        navigation.navigate('Public');
      }
    })();

    return () => {
      crashlytics().log("unmounting public stack")
    };
  }, []);

  if (loading) {
    return (
      <Loading />
    );
  }




  return (
    <Stack.Navigator initialRouteName="AuthHome" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AuthHome" component={Auth} options={{ title: 'Details' }} />
      <Stack.Screen name="Login" component={Login} options={{ title: 'Login' }} />
      <Stack.Screen name="Register" component={Register} options={{ title: 'Register' }} />
    </Stack.Navigator>
  );
};




export default PublicStack;