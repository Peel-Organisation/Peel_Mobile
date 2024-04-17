import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  HomeCard,
  Name,
  Locate,
  Block
} from './styles';
import BiographyCard from './Biography/index';
import InterestsCard from './Interests/index';
import GifCard from './Gif/index';
import MovieCard from './Movie/index';
import MusicCard from './Music';
import QuestionsCard from './Questions';

const SwipeCard = ({ User }) => {
  const { t } = useTranslation();

  // Memoize the user's age calculation
  // TODO: Fix the userAge 
  const userAge = useMemo(() => {
    const birthday = new Date(User.birthday);
    const now = new Date();
    const ageInMs = now - birthday;
    const ageInYears = ageInMs / (1000 * 60 * 60 * 24 * 365);
    return Math.floor(ageInYears);
  }, [User.birthday]);

  const renderComponent = (moduleType) => {
    switch (moduleType) {
      case 'gif':
        return <GifCard GifUrl={User?.gif?.image?.webp} />;
      case 'movie':
        return <MovieCard MovieURL={User?.movie?.images?.backdrop_path} Movie={User?.movie?.title} />;
      case 'music':
        return <MusicCard MusicURL={User?.music?.image} MTitle={User?.music?.title} MArtist={User?.music?.artist?.name} />;
      case 'biographie':
        return <BiographyCard Bio={User?.biographie} />;
      case 'interests':
        return <InterestsCard interests={User.interests} />;
      case 'questions':
        return <QuestionsCard Questions={User?.questions} />;
      default:
        return null;
    }
  };

  return (
    <HomeCard
      data={Object.entries(User.profileModules || {})}
      keyExtractor={(item) => item[0]}
      height={500}
      renderItem={({ item }) => {
        const moduleType = item[1];
        const component = renderComponent(moduleType);
        return component ? <Block>{component}</Block> : null;
      }}
      ListHeaderComponent={() => (
        <>
          <Name>
            {User.firstName} {userAge.toString()}
          </Name>
          <Locate>
            {User?.preferences?.searchFriend && <>{t('profile.search_friend')}</>}
            {User?.preferences?.searchLove && <>{t('profile.search_love')}</>}
          </Locate>
        </>
      )}
    />
  );
};

export default SwipeCard;
