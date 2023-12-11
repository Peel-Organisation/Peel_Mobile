import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import SwitchSelector from 'react-native-switch-selector';
import DatePicker from 'react-native-date-picker';
import ModalSelector from 'react-native-modal-selector';

const DIMENSION_WIDTH = Dimensions.get('window').width;
const DIMENSION_HEIGHT = Dimensions.get('window').height;

export const ButtonOrange = styled.TouchableOpacity`
  width: 70%;
  height: 50px;
  margin: 10px;
  border-radius: 10px;
  background-color: ${props => props.theme.primary};
  color: ${props => props.theme.background};
`;

export const ButtonOrangeText = styled.Text`
  font-size: 20px;
  color: ${props => props.theme.background};
  align-self: center;
  padding-top: 10px;
`;

export const InterestButton = styled.TouchableOpacity`
  /* width: 70%; */
  height: 50px;
  margin: 10px;
  border-radius: 10px;
  background-color: ${props => props.theme.primary};
  color: ${props => props.theme.background};
`;

export const InterestView = styled.SafeAreaView`
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-evenly;
`;

export const InterestButtonSelected = styled.TouchableOpacity`
  /* width: 70%; */
  height: 50px;
  margin: 10px;
  border-radius: 10px;
  background-color: red;
  color: ${props => props.theme.background};
`;

export const InterestButtonDisabled = styled.TouchableOpacity`
  /* width: 70%; */
  height: 50px;
  margin: 10px;
  border-radius: 10px;
  background-color: ${props => props.theme.grey};
  color: ${props => props.theme.background};
`;

export const InterestButtonText = styled.Text`
  font-size: 20px;
  color: ${props => props.theme.background};
  align-self: center;
  /* padding-top: 10px; */
  margin: 10px;
`;

export const Spacer = styled.SafeAreaView`
  height: 100px;
`;

export const Header = styled.SafeAreaView`
  width: ${DIMENSION_WIDTH}px;
  height: 100px;
  background-color: ${props => props.theme.primary};
  align-items: center;
  justify-content: center;
`;

export const HeaderText = styled.Text`
  font-size: 30px;
  color: ${props => props.theme.background};
`;

export const BioInput = styled.TextInput`
  /* width: 80%; */
  height: 50%;
  margin: 20px;
  border-radius: 10px;
  background-color: white;
  color: ${props => props.theme.text};
`;

export const SwitchSelectorCustom = styled(SwitchSelector)`
  width: 80%;
  align-items: center;
  height: 50px;
  buttoncolor: ${props => props.theme.primary};
`;

export const DatePickerCustom = styled(DatePicker)`
  background-color: ${props => props.theme.background};
  color: ${props => props.theme.text};
  fadetocolor: ${props => props.theme.background};
`;

export const SliderCustom = styled.SafeAreaView`
  width: 80%;
  height: 50px;
  background-color: ${props => props.theme.background};
  color: ${props => props.theme.text};
`;

export const ModalSelectorCustom = styled(ModalSelector)`
  width: 80%;
  border-radius: 10px;
`;
