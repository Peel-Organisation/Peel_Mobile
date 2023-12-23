import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTranslation } from "react-i18next";
import crashlytics from '@react-native-firebase/crashlytics';
import RetryButton from '../components/Retry';


import Login from '../screens/login';
import Register from '../screens/register';
import Auth from '../screens/auth';
const Stack = createNativeStackNavigator();
import Loading from '../components/loading';

import { TestAuth, IsProfileCompleted } from '../functions/api_request';

const PublicStack = ({ navigation }) => {
  const { t } = useTranslation();
  const [loading, setLoading] = React.useState(true);
  const [retry, setRetry] = React.useState(false);
  const [error, setError] = React.useState("");

  useEffect(() => {
    crashlytics().log("mounting public stack")
    testProfile();
  }, []);

  const testProfile = async () => {
    try {
      console.log("testProfile")
      let auth_bool = await TestAuth()
      crashlytics().log("auth_bool : ", auth_bool)
      if (auth_bool) {
        let profile_bool = await IsProfileCompleted()
        crashlytics().log("profile_bool : ", profile_bool)
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
    } catch (error) {
      crashlytics().recordError(error);
      setRetry(true);
      setLoading(false);
      setError(error.message);
    }
  }



  if (loading) {
    return (
      <Loading />
    );
  }
  if (retry) {
    return (
      <RetryButton error={error} retryFunc={() => testProfile()} />
    )
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