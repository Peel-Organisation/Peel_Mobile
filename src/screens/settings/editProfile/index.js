import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import Biography from '../../../components/Profile/Biography';
import Gif from '../../../components/Profile/Gifs';
import Interest from '../../../components/Profile/Interest';
import Question from '../../../components/Profile/Question';
import {
  ViewCustom,
  Title,
  MainText,
  ModuleView,
  ModuleTitle,
  ModulePicker,
} from './styles';
import {GetUser, updateUser} from '../../../functions/api_request';
import { use } from 'i18next';

const EditProfile = () => {
  const {t} = useTranslation();
  const [user, setUser] = useState({});
  const [selectedModules, setSelectedModules] = useState([]);
  const [modules, setModules] = useState([]);

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
    availableModules.forEach((module) => {
      if (!isModuleSelected(module.value)) {
        modules.push(module);
      }
    });
    console.log('modules', modules);
    setModules(modules);
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
      console.log('updatedModules', updatedModules);
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
    <ViewCustom>
      <Title>{t('profile.custom.title')}</Title>
      <MainText>{t('profile.custom.text')}</MainText>
      {selectedModules && selectedModules.map((module, index) => (
        <ModuleView key={index}>
          <ModulePicker
            selectedValue={module}
            onValueChange={itemValue =>
              handleModuleSelection(itemValue, index)
            }>
            <ModulePicker.Item
              label={module}
              value=""
              // enabled={false}
            />
            {modules.map((availableModule, index) => (
              <ModulePicker.Item
                key={availableModule.value}
                label={availableModule.label}
                value={availableModule.value}
              />
            ))}
          </ModulePicker>
          {/* Afficher les composants correspondant aux modules sélectionnés */}
          {module === 'biographie' && (
            <>
              <ModuleTitle>{t('profile.custom.biography')}</ModuleTitle>
              <Biography user={user} setUser={setUser} />
            </>
          )}
          {module === 'interests' && (
            <>
              <ModuleTitle>{t('profile.custom.interests')}</ModuleTitle>
              <Interest user={user} setUser={setUser} />
            </>
          )}
          {module === 'questions' && (
            <>
              {/* <ModuleTitle>{t('profile.custom.questions')}</ModuleTitle>
              <Question user={user} setUser={setUser} /> */}
            </>
          )}
          {module === 'gif' && (
            <>
              <ModuleTitle>{t('profile.custom.gifs')}</ModuleTitle>
              <Gif user={user} setUser={setUser} />
            </>
          )}
          {module === 'movie' && (
            <>
              <ModuleTitle>{t('profile.custom.movie')}</ModuleTitle>
            </>
          )}
          {module === 'music' && (
            <>
              <ModuleTitle>{t('profile.custom.music')}</ModuleTitle>
            </>
          )}
        </ModuleView>
      ))}
    </ViewCustom>
  );
};

export default EditProfile;
