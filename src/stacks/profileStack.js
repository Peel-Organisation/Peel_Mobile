import React, { useState, useEffect } from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import crashlytics from '@react-native-firebase/crashlytics';
import Profile1 from "../screens/profile/profile_1"
import Profile2 from "../screens/profile/profile_2"
import Profile3 from "../screens/profile/profile_3"
import Biographie from "../screens/profile/profile_biographie"
import ProfileInterest from "../screens/profile/profile_interest"
import Question from "../screens/profile/profile_question"
import Film from "../screens/profile/profile_film"
import Gif from "../screens/profile/profile_gif"
import Music from "../screens/profile/profile_music";
import DateType from "../screens/profile/profile_date_type";

import { GetUser } from "../functions/api_request"
import Loading from "../components/loading";
const Stack = createNativeStackNavigator();
const UserContext = React.createContext("token");

const PublicStack = () => {
  const [loading, setLoading] = React.useState(true);
  const [user, setUser] = useState({ "birthday": new Date, "interet": [], "longitude": 0, "latitude": 0, "searchRange": 0, "question_id": [1, 2, 0], "response": ["reponse 1", "reponse 2", "reponse 3"] });


  useEffect(() => {
    GetUser(user).then(user_data => {
      if (user_data) {
        setUser(user_data);
        setLoading(false);
      }
    }).catch((error) => {
      crashlytics().recordError(error)
    });
  }, []);

  if (loading) {
    return (
      <Loading />
    );
  }

  return (
    <UserContext.Provider value={"user"}>
      <Stack.Navigator initialRouteName="Profile1" screenOptions={{ headerShown: false }} >
        <Stack.Screen name="Profile1" component={Profile1} />
        <Stack.Screen name="Profile2" component={Profile2} />
        <Stack.Screen name="Profile3" component={Biographie} />
        <Stack.Screen name="Profile4" component={DateType} />
        <Stack.Screen name="Profile5" component={Gif} />
        <Stack.Screen name="Profile6" component={Film} />
        <Stack.Screen name="Profile7" component={Music} />
        <Stack.Screen name="Profile8" component={ProfileInterest} />
        <Stack.Screen name="Profile9" component={Question} />
        {/* <Stack.Screen name="Profile8" component={Location} />  */}
        {/* <Stack.Screen name="Profile3" component={Profile3} /> */}
      </Stack.Navigator>
    </UserContext.Provider>
  );
};


export default PublicStack;


