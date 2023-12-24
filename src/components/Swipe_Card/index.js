import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import {
  HomeCard,
  Name,
  QuestionView,
  QuestionText,
  ResponseText,
  Locate,
  UserCont,
} from './styles';
import BiographyCard from './Biography/index';
import InterestsCard from './Interests/index';
import Gif_Card from './Gif/index';
import MovieCard from './Movie/index';
import MusicCard from './Music';

/*
  This component is used to display the card of the user that is currently being swiped.
  It is composed of the following components:
    - BiographyCard
    - InterestsCard
    - Gif_Card
    - MovieCard
    - MusicCard
    - QuestionCard
  In the API, the user's profileModules is an object with 4 keys: mainElement, secondaryElement, tertiaryElement, quaternaryElement 
  The value of each key is the name of the module that should be displayed in the corresponding section of the card.
*/
const Swipe_Card = props => {
  const { t } = useTranslation();

  const [User, setUser] = useState(props.User);

  const getAge = birthday => {
    birthday = new Date(birthday);
    let now = new Date();
    let month_diff = now.getTime() - birthday.getTime();
    //convert the calculated difference in date format
    let age_dt = new Date(month_diff);
    //extract year from date
    let year = age_dt.getUTCFullYear();
    //now calculate the age of the user
    let user_age = Math.abs(year - 1970);

    return user_age;
  };

  const moduleComponentsTopSection = [
    {
      key: 'gif',
      component: (
        <Gif_Card User={User?.gif?.image?.webp} />
      ),
    },
    {
      key: 'movie',
      component: ( 
        <MovieCard MovieURL={User?.movie?.images?.backdrop_path} Movie={User?.movie?.title}/>
      ),
    },
    {
      key: 'music',
      component: (
        <MusicCard MusicURL={User?.music?.image} MTitle={User?.music?.title} MArtist={User?.music?.artist?.name}/>
      ),
    },
  ];

  const moduleComponents = [
    {
      key: 'biographie',
      component: (
        <BiographyCard Bio={User?.biographie}/>
      ),
    },
    {
      key: 'interests',
      component: (
       <InterestsCard User={User}/>     
      ),
    },
    // {
    //   key: 'questions',
    //   component: (
    //     <View>
    //       <QuestionView>
    //         {User.questions?.map(question => {
    //           return (
    //             <View key={question._id}>
    //               <View>
    //                 <QuestionText>{question.question?.question}</QuestionText>
    //               </View>
    //               <View>
    //                 <ResponseText>{question.answer}</ResponseText>
    //               </View>
    //             </View>
    //           );
    //         })}
    //       </QuestionView>
    //     </View>
    //   ),
    // },
  ];

  return (
    <HomeCard>
      <UserCont>
        <Name>
          {User.firstName} {getAge(User.birthday)}
        </Name>
        <Locate>{User?.preferences?.searchFriend && (
          <>Recherche l'amitié</>
        )}
          {User?.preferences?.searchLove && (
            <>Recherche l'amour</>
          )}
        </Locate>

          {User.profileModules && Object.keys(User.profileModules).map(key => {
            if ((key === 'mainElement') && User.profileModules[key]) {
              const moduleType = User.profileModules[key];
              console.log('Profile module type: ', moduleType);
              const matchingModule = moduleComponentsTopSection.find(module => module.key === moduleType);
              if (matchingModule) {
                console.log('Matching module: ', matchingModule);
                return matchingModule.component;
              } 
            } else if ((key === 'secondaryElement') && User.profileModules[key]) {
              const moduleType = User.profileModules[key];
              console.log('Profile module type: ', moduleType);
              const matchingModule = moduleComponents.find(module => module.key === moduleType);
              if (matchingModule) {
                console.log('Matching module: ', matchingModule);
                return matchingModule.component;
              } 
            } else if ((key === 'tertiaryElement') || (key === 'quaternaryElement') && User.profileModules[key]) {
              const moduleType = User.profileModules[key];
              console.log('Profile module type: ', moduleType);
              const matchingModule = moduleComponents.find(module => module.key === moduleType);
              if (matchingModule) {
                console.log('Matching module: ', matchingModule);
                return matchingModule.component;
              } 
            }
          })}
      </UserCont>
    </HomeCard>
  );
};

export default Swipe_Card;