import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import BiographyCard from '../../../components/Swipe_Card/Biography';
import GifCard from '../../../components/Swipe_Card/Gif';
import InterestsCard from '../../../components/Swipe_Card/Interests';
import QuestionsCard from '../../../components/Swipe_Card/Questions';
import MovieCard from '../../../components/Swipe_Card/Movie';
import MusicCard from '../../../components/Swipe_Card/Music';
import {
  ViewCustom,
  Title,
  MainText,
  ModuleView,
  ModuleTitle,
  ModulePicker,
} from './styles';
import { GetUser, updateUser } from '../../../functions/api_request';

const EditProfile = () => {
  const { t } = useTranslation();
  const [user, setUser] = useState({});
  const [selectedModules, setSelectedModules] = useState([]);
  const [modules, setModules] = useState([]);
  const [modulesTop, setModulesTop] = useState([]);

  useEffect(() => {
    GetUser(user).then(user_data => {
      if (user_data) {
        console.log('user_data', user_data);
        setUser(user_data);
        // Pré-remplir les modules sélectionnés par l'utilisateur
        setSelectedModules([
          user_data.profileModules.mainElement,
          user_data.profileModules.secondaryElement,
          user_data.profileModules.tertiaryElement,
          user_data.profileModules.quaternaryElement,
        ]);
      }
    });
  }, []);

  useEffect(() => {
    modulesList();
  }, [selectedModules]);

  const modulesList = () => {
    let modules = [];
    availableModules.forEach(module => {
      if (!isModuleSelected(module.value)) {
        modules.push(module);
      }
    });
    setModules(modules);

    let modulesTop = [];
    availableModulesTop.forEach(module => {
      if (!isModuleSelected(module.value)) {
        modulesTop.push(module);
      }
    });
    setModulesTop(modulesTop);
  };

  // Tableau des modules disponibles dans l'API
  const availableModules = [
    { value: 'gif', label: t('profile.custom.gifs') },
    { value: 'biographie', label: t('profile.custom.biography') },
    { value: 'interests', label: t('profile.custom.interests') },
    { value: 'questions', label: t('profile.custom.questions') },
    { value: 'movie', label: t('profile.custom.movie') },
    { value: 'music', label: t('profile.custom.music') },
  ];

  const availableModulesTop = [
    { value: 'gif', label: t('profile.custom.gifs') },
    { value: 'movie', label: t('profile.custom.movie') },
    { value: 'music', label: t('profile.custom.music') }
  ];

  // Vérifier si un module est sélectionné
  const isModuleSelected = module => {
    return selectedModules.includes(module);
  };

  // Gérer la sélection d'un module
  const handleModuleSelection = (value, index) => {
    console.log('value', value);
    console.log('index', index);
    const updatedModules = [...selectedModules];
    const moduleToSelect = availableModules.find(
      module => module.value === value,
    );

    if (moduleToSelect && !isModuleSelected(moduleToSelect.value)) {
      updatedModules[index] = moduleToSelect.value;
      console.log('updatedModules', updatedModules);
      setSelectedModules(updatedModules);
    }

    //  update user
    const updatedUser = { ...user };
    updatedUser.profileModules = {
      mainElement: updatedModules[0],
      secondaryElement: updatedModules[1],
      tertiaryElement: updatedModules[2],
      quaternaryElement: updatedModules[3],
    };
    updateUser(updatedUser);
  };

  return (
    <ViewCustom>
      <Title>{t('profile.custom.title')}</Title>
      <MainText>{t('profile.custom.text')}</MainText>
      {selectedModules?.map((module, moduleIndex) => (
        <ModuleView key={module}>
          <ModulePicker
            selectedValue={module}
            onValueChange={itemValue =>
              handleModuleSelection(itemValue, moduleIndex)
            }>
            <ModulePicker.Item
              label={module}
              value=""
            />
            {/* si le module est le premier alors on affiche availableModulesTop sinon on envoie availableModules*/}
            {moduleIndex === 0 ? modulesTop.map((availableModule, index) => (
              <ModulePicker.Item
                key={availableModule.value}
                label={availableModule.label}
                value={availableModule.value}
              />
            )) : (
              modules.map((availableModule, index) => (
                <ModulePicker.Item
                  key={availableModule.value}
                  label={availableModule.label}
                  value={availableModule.value}
                />
              ))
            )}
          </ModulePicker>
          {/* Afficher les composants correspondant aux modules sélectionnés */}
          {module === 'biographie' && (
            <>
              <ModuleTitle>{t('profile.custom.biography')}</ModuleTitle>
              <BiographyCard Bio={user.biographie} />
            </>
          )}
          {module === 'interests' && (
            <>
              <ModuleTitle>{t('profile.custom.interests')}</ModuleTitle>
              <InterestsCard interests={user.interests} />
            </>
          )}
          {module === 'questions' && (
            <>
              <ModuleTitle>{t('profile.custom.questions')}</ModuleTitle>
              <QuestionsCard Questions={user?.questions} />
            </>
          )}
          {module === 'gif' && (
            <>
              <ModuleTitle>{t('profile.custom.gifs')}</ModuleTitle>
              <GifCard GifUrl={user?.gif?.image?.webp} />
            </>
          )}
          {module === 'movie' && (
            <>
              <ModuleTitle>{t('profile.custom.movie')}</ModuleTitle>
              <MovieCard
                MovieURL={user?.movie?.images?.backdrop_path}
                Movie={user?.movie?.title}
              />
            </>
          )}
          {module === 'music' && (
            <>
              <ModuleTitle>{t('profile.custom.music')}</ModuleTitle>
              <MusicCard
                MusicURL={user?.music?.image}
                MTitle={user?.music?.title}
                MArtist={user?.music?.artist?.name}
              />
            </>
          )}
        </ModuleView>
      ))}
    </ViewCustom>
  );
};

export default EditProfile;
