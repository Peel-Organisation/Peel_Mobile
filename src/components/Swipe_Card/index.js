import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import {
  HomeCard,
  Name,
  Biography,
  BiographyText,
  InteretTitle,
  InteretBox,
  InteretView,
  InteretText,
  QuestionView,
  QuestionText,
  ResponseText,
  Locate,
  UserCont,
  MovieImage,
  MusicImage,
} from './styles';
import BiographyCard from './Biography/index';
import Gif_Card from './Gif/index';
import MovieCard from './Movie/index';
import SwipeCardSection from '../UI/SwipeCardSection';

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

  // const moduleComponentsTopSection = [
  //   {
  //     key: 'gif',
  //     component: (
  //       <GifImage source={{uri: `${User?.gif?.image?.webp}`}} resizeMode="cover" />
  //     ),
  //   },
  //   {
  //     key: 'movie',
  //     component: (
  //       <View>
  //         <MovieImage source={{uri: `${User?.movie?.images?.poster_path}`}}/>
  //       </View>
  //     ),
  //   },
  //   {
  //     key: 'music',
  //     component: (
  //       <View>
  //         <MusicImage source={{uri: `${User?.music?.image}`}}/>
  //       </View>
  //     ),
  //   },
  // ];





  const moduleComponents = [
    {
      key: 'gif',
      component: (
        <Gif_Card User={User?.gif?.image?.webp} />
      ),
    },
    {
      key: 'biographie',
      component: (
        <SwipeCardSection>
          <BiographyText>{User.biographie}</BiographyText>
        </SwipeCardSection>
      ),
    },
    {
      key: 'interests',
      component: (
        <InteretView>
          <View>
            <InteretTitle>{t('Card.interest')}</InteretTitle>
          </View>
           
          {User.interests?.map(interet => {
            return (
              <InteretBox key={interet._id}>
                <InteretText>{interet.name}</InteretText>
              </InteretBox>
            );
          })}
        </InteretView>
      ),
    },
    {
      key: 'questions',
      component: (
        <View>
          <QuestionView>
            {User.questions?.map(question => {
              return (
                <View key={question._id}>
                  <View>
                    <QuestionText>{question.question?.question}</QuestionText>
                  </View>
                  <View>
                    <ResponseText>{question.answer}</ResponseText>
                  </View>
                </View>
              );
            })}
          </QuestionView>
        </View>
      ),
    },
    {
      key: 'movie',
      component: (
        <View>
          <MovieCard MovieURL={User?.movie?.images?.backdrop_path} MovieGenre={User?.movie?.genre_ids?.name} MovieName={User?.movie?.title}/>
        </View>
      ),
    },
    {
      key: 'music',
      component: (
        <View>
          <MusicImage
            source={{
              uri: `${User?.music?.image}`,
            }}
          />
        </View>
      ),
    },
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


         
          
        {/* In the API, the user's profileModules is an object with 4 keys: mainElement, secondaryElement, tertiaryElement, quaternaryElement */}
        {/* The value of each key is the name of the module */}
        {/* So we can use the value of each key to display the corresponding component */}
        {User.profileModules && Object.keys(User.profileModules).map(key => {
          if (User.profileModules[key] != undefined) {
            return moduleComponents.map(module => {
              if (module.key == User.profileModules[key]) {
                return module.component;
              }
            });
          }
        })}
      </UserCont>
    </HomeCard>
  );
};

export default Swipe_Card;
