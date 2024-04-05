import { Dimensions } from "react-native";
import styled from 'styled-components/native';
import SwitchSelector from 'react-native-switch-selector';
import DatePicker from 'react-native-date-picker';
import ModalSelector from 'react-native-modal-selector';

const DIMENSION_WIDTH = Dimensions.get("window").width;
const DIMENSION_HEIGHT = Dimensions.get("window").height;

export const CustomView = styled.SafeAreaView`
  flex: 1;
  background-color: ${props => props.theme.background};
`;

export const ContentView = styled.SafeAreaView`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  background-color: ${props => props.theme.background};
`;

export const PageTitle = styled.Text`
  font-size: 16px;
  text-align: center;
  color: ${props => props.theme.text};
    letter-spacing: 4px;
`;

export const LabelInput = styled.Text`
    font-size: 14px;
    color: ${props => props.theme.text};
    letter-spacing: 4px;
`

export const FieldInput = styled.TextInput`
    width: ${DIMENSION_WIDTH-70}px;
    margin-top: 20px;
    padding : 10px;
    font-size: 13px;
    border: 1px solid  ${props => props.theme.grey};
    border-radius: 10px;
    background-color: ${props => props.theme.background};
    color: ${props => props.theme.text};
    letter-spacing: 4px;
`
export const BioInput = styled.TextInput`
  width: ${DIMENSION_WIDTH-70}px;
  height: 50%;
  margin: 20px;
  font-size: 13px;
  border-radius: 10px;
  letter-spacing: 4px;
  line-height: 25px;
  border: 1px solid  ${props => props.theme.grey};
  background-color: ${props => props.theme.background};
  color: ${props => props.theme.text};
  padding: 10px;
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
  fadetocolor: ${props => props.theme.primary};
  height: 150px;
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

export const FlatListCustom = styled.FlatList`
  width: 100%;
  margin-top: 10px;
  margin-left: 10px;
  background-color: ${props => props.theme.background};
`;

export const ListItem = styled.TouchableOpacity`
  background-color: ${props => props.theme.background};
  flex-direction: row; 
  flex-wrap: wrap; 
  align-items: center; 
  padding: 5px; 
  margin-left: 5%;
`;

export const FilmImage = styled.Image`
  width: 150px;
  height: 250px;
  margin: 1px;
  object-fit: cover;
`;

export const GifImage = styled.Image`
  width: 150px;
  height: 250px;
  margin: 1px;
  object-fit: cover;
`;
export const LittleSpacer = styled.View`
  height: 15px;
`;