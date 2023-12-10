import React from 'react';
import { View } from 'react-native';
import {
  MusicImage,
} from './styles';

const MusicCard = ({ User }) => {
  return (
    <View>
      <MusicImage
        source={{
          uri: `${User?.music?.image}`,
        }}
      />
    </View>
  );
};

export default MusicCard;
