import { Picker } from '@react-native-picker/picker';
import { Dimensions } from "react-native";
import styled from 'styled-components/native';

const DIMENSION_WIDTH = Dimensions.get("window").width;
const DIMENSION_HEIGHT = Dimensions.get("window").height;

export const HeaderView = styled.SafeAreaView`
  width: ${DIMENSION_WIDTH}px;
  height: 100px;
  background-color: ${props => props.theme.primary};
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

export const HeaderTextView = styled.View`
  align-items: center;
  justify-content: center;
  display: flex;
  width: 100%;
  
`;

export const HeaderText = styled.Text`
  font-size: 25px;
  letter-spacing: 4px;
  color: ${props => props.theme.background};
`;

export const BarStyle = styled.View`
  width: ${DIMENSION_WIDTH-250}px;
  background-color: ${props => props.theme.background};
  border: 1px solid ${props => props.theme.background};
  height: 1px;
  margin-top: 10px;
`
export const GoBackArrow = styled.TouchableOpacity`
  background-color: ${props => props.theme.primary};
  margin-left: 35px;
  z-index: 1;
`
export const GoBackArrowImage = styled.Image`
  width: 30px;
  height: 30px;  
  transform: rotate(-90deg);
`

export const CustomView = styled.ScrollView`
  flex: 1;
  background-color: ${props => props.theme.background};
`;

export const LittleSpacer = styled.View`
  height: 15px;
`;

export const PageTitle = styled.Text`
  font-size: 16px;
  line-height: 30px;
  padding: 1%;
  text-align: center;
  color: ${props => props.theme.text};
  letter-spacing: 4px;
`;

export const MainText = styled.Text`
  font-size: 14px;
  padding: 5%;
  font-style: italic;
  text-align: justify;
  color: ${props => props.theme.text};
  letter-spacing: 2px;
  line-height: 22px;
`;

export const ModuleTitle = styled.Text`
  font-size: 18px;
  color: ${props => props.theme.text};
  text-align: center;
`;

export const ModuleView = styled.SafeAreaView`
  width: 90%;
  background-color: ${props => props.theme.white};
  border: 1px solid ${props => props.theme.grey};
  border-radius: 10px;
  flex: 1;
  margin: 5%;
  overflow: hidden;
`;

export const ModulePicker = styled(Picker)`
  width: 70%;
  height: 30%;
  color: ${props => props.theme.text};
  align-self: center;
  margin: 3%;
`;

export const ModuleContainer = styled.View`
  padding: 10%;
  height: 100%;
  overflow: hidden;
`;  

