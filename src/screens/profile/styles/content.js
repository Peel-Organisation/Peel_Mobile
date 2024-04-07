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

export const LittleSpacer = styled.View`
  height: 15px;
`;

export const PageTitle = styled.Text`
  font-size: 16px;
  text-align: center;
  color: ${props => props.theme.text};
    letter-spacing: 4px;
`;

//Profile 1
export const LabelInput = styled.Text`
  font-size: 14px;
  color: ${props => props.theme.text};
  letter-spacing: 4px;
`;

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
`;
//end Profile 1

//Profile 2
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
//end Profile 2

//Profile Biographie
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
//end Biographie

// Profile Gif
export const FlatListCustom = styled.FlatList`
  background-color: ${props => props.theme.background};
  margin-top: 5px;
`;

export const ListItem = styled.TouchableOpacity`
  background-color: ${props => props.theme.background};
  padding: 5px; 
`;
//end Gif

// Profile Film
export const FilmImage = styled.Image`
  width: 150px;
  height: 250px;
  margin: 1px;
  object-fit: cover;
`;

export const GifImage = styled.Image`
  width: 150px;
  height: 150px;
  margin: 1px;
  object-fit: cover;
`;
//end Film

// Profile Music
export const ListMusic = styled.TouchableOpacity`
  width: 90%;
  display: flex;
  flex-direction: row;
  align-items: center;
  border: 1px solid ${props => props.theme.primary};
  background-color: ${props => props.theme.background};
  padding: 2%;

`;

export const MusicImage = styled.Image`
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 15px;
`;

export const MusicText = styled.Text`
  width: 35%;
  font-size: 13px;
  text-align: center;
  color: ${props => props.theme.text};
  letter-spacing: 4px;
  line-height: 22px;
  margin-left: 10px;
`;
//end Music

// Profile Interest
export const ScrollContainer = styled.ScrollView`
  background-color: ${props => props.theme.background};
  width: 90%;
  flex-grow: 1;
  align-self: center;
`;

export const InterestView = styled.SafeAreaView`
  background-color: ${props => props.theme.background};
  flex-direction: row;
  flex-wrap: wrap;
  padding: 10px;
  justify-content: center;
  
`;

export const InterestButton = styled.TouchableOpacity`
  width: 40%;
  margin: 10px;
  border-radius: 10px;
  background-color: ${props => props.theme.background_button};
  color: ${props => props.theme.text};
`;

export const InterestButtonSelected = styled.TouchableOpacity`
  width: 40%;
  margin: 10px;
  border-radius: 10px;
  background-color: red;
  color: ${props => props.theme.background};
`;

export const InterestButtonDisabled = styled.TouchableOpacity`
  width: 40%;
  margin: 10px;
  border-radius: 10px;
  background-color: ${props => props.theme.grey};
  color: ${props => props.theme.background};
`;

export const InterestButtonText = styled.Text`
  font-size: 13px;
  letter-spacing: 2px;
  line-height: 22px;
  text-align: center;
  margin: 2%;
  padding: 3%;
  color: ${props => props.theme.text};
`;
//end Interest

// Profile Question
export const ModalSelectorQuestion = styled(ModalSelector)`
  width: 90%;
  border-radius: 10px;
`;

export const QuestionFieldInput = styled.TextInput`
  width: 80%;
  margin-top: 10px;
  margin-bottom: 10px;
  padding : 10px;
  font-size: 13px;
  border: 1px solid  ${props => props.theme.grey};
  border-radius: 10px;
  background-color: ${props => props.theme.background};
  color: ${props => props.theme.text};
  letter-spacing: 4px;
`
//end Question