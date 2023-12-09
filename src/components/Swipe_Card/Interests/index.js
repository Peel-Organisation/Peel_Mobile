import React from 'react';
import { View } from 'react-native';
import {
  InteretBox,
  InteretView,
  InteretText
} from './styles';

const InterestsCard = ({ User }) => {
  return (
    <View>
      <InteretView>
        {User?.interests?.map(interet => {
          return (
            <InteretBox key={interet._id}>
              <InteretText>{interet.name}</InteretText>
            </InteretBox>
          );
        })}
      </InteretView>
    </View>
  );
};

export default InterestsCard;
