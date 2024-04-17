import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import BiographyCard from '../../../components/SwipeCard/Biography';
import GifCard from '../../../components/SwipeCard/Gif';
import InterestsCard from '../../../components/SwipeCard/Interests';
import QuestionsCard from '../../../components/SwipeCard/Questions';
import MovieCard from '../../../components/SwipeCard/Movie';
import MusicCard from '../../../components/SwipeCard/Music';
import {
  HeaderView,
  HeaderText,
  HeaderTextView,
  BarStyle,
  GoBackArrow,
  GoBackArrowImage,
  CustomView,
  LittleSpacer,
  PageTitle,

  MainText,
  ModuleView,
  ModuleTitle,
  ModulePicker,
  ModuleContainer
} from './styles';
import settings from '../../../../assets/images/icons/settings-white.png';
import { Spacer } from '../../login/styles';
import {GetUser, updateUser} from '../../../functions/api_request';

const EditProfile = ({navigation}) => {
  const {t} = useTranslation();
  const [user, setUser] = useState({});
  const [selectedModules, setSelectedModules] = useState([]);
  const [modules, setModules] = useState([]);
  const [modulesTop, setModulesTop] = useState([]);

  useEffect(() => {
    GetUser(user).then(user_data => {
      if (user_data) {
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
    {value: 'gif', label: t('profile.custom.gifs')},
    {value: 'biographie', label: t('profile.custom.biography')},
    {value: 'interests', label: t('profile.custom.interests')},
    {value: 'questions', label: t('profile.custom.questions')},
    {value: 'movie', label: t('profile.custom.movie')},
    {value: 'music', label: t('profile.custom.music')},
  ];

  const availableModulesTop = [
    {value: 'gif', label: t('profile.custom.gifs')},
    {value: 'movie', label: t('profile.custom.movie')},
    {value: 'music', label: t('profile.custom.music')},
  ];

  const translateModuleLabel = (module, availableModules) => {
    const moduleFound = availableModules.find(
      availableModule => availableModule.value === module,
    );
    return moduleFound ? moduleFound.label : '';
  };

  // Vérifier si un module est sélectionné
  const isModuleSelected = module => {
    return selectedModules.includes(module);
  };

  // Gérer la sélection d'un module
  const handleModuleSelection = (value, index) => {
    const updatedModules = [...selectedModules];
    const moduleToSelect = availableModules.find(
      module => module.value === value,
    );

    if (moduleToSelect && !isModuleSelected(moduleToSelect.value)) {
      updatedModules[index] = moduleToSelect.value;
      setSelectedModules(updatedModules);
    }

    //  update user
    const updatedUser = {...user};
    updatedUser.profileModules = {
      mainElement: updatedModules[0],
      secondaryElement: updatedModules[1],
      tertiaryElement: updatedModules[2],
      quaternaryElement: updatedModules[3],
    };
    updateUser(updatedUser);
  };

  return (
    <CustomView>
      <HeaderView>
        <GoBackArrow onPress={() => navigation.navigate('Settings')}>
          <GoBackArrowImage source={settings} />
        </GoBackArrow>
        <HeaderTextView> 
          <HeaderText>{t('profile.custom.title')}</HeaderText>
          <BarStyle />
        </HeaderTextView>
      </HeaderView>
      <LittleSpacer />
      <PageTitle>{t('profile.custom.blocs')}</PageTitle>
      <LittleSpacer />
      <MainText>{t('profile.custom.text')}</MainText>
      {selectedModules?.map((module, moduleIndex) => (
        <ModuleView key={module}>        
          <ModulePicker
            selectedValue={module}
            onValueChange={itemValue =>
              handleModuleSelection(itemValue, moduleIndex)
            }
          >
            <ModulePicker.Item 
              label={translateModuleLabel(module, availableModules)}
              value=""
              color= '#FC912F'
            />
            {/* si le module est le premier alors on affiche availableModulesTop sinon on envoie availableModules*/}
            {moduleIndex === 0
              ? modulesTop.map((availableModule, index) => (
                  <ModulePicker.Item
                    key={availableModule.value}
                    label={availableModule.label}
                    value={availableModule.value}
                  />
                ))
              : modules.map((availableModule, index) => (
                  <ModulePicker.Item
                    key={availableModule.value}
                    label={availableModule.label}
                    value={availableModule.value}
                  />
                ))}
          </ModulePicker>
          {/* Afficher les composants correspondant aux modules sélectionnés */}
          {module === 'biographie' && (
            <ModuleContainer>
              <BiographyCard Bio={user.biographie} />
            </ModuleContainer>
          )}
          {module === 'interests' && (
            <ModuleContainer>
              <InterestsCard interests={user.interests} />
            </ModuleContainer>
          )}
          {module === 'questions' && (
           <ModuleContainer>
              <QuestionsCard Questions={user?.questions} />
            </ModuleContainer>
          )}
          {module === 'gif' && (
            <ModuleContainer>
              <GifCard GifUrl={user?.gif?.image?.webp} />
            </ModuleContainer>
          )}
          {module === 'movie' && (
            <ModuleContainer>
              <MovieCard
                MovieURL={user?.movie?.images?.backdrop_path}
                Movie={user?.movie?.title}
              />
            </ModuleContainer>
          )}
          {module === 'music' && (
            <ModuleContainer>
              <MusicCard
                MusicURL={user?.music?.image}
                MTitle={user?.music?.title}
                MArtist={user?.music?.artist?.name}
              />
              <Spacer />
            </ModuleContainer>
          )}
        </ModuleView>
      ))}
    </CustomView>
  );
};

export default EditProfile;
