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
  text-align: center;
  color: ${props => props.theme.text};
    letter-spacing: 4px;
`;


export const ConditionText = styled.Text`
  font-size: 16px;
  color: ${props => props.theme.text};
  text-align: center;
  margin-top: 10px;
`;

export const Title = styled.Text`
  font-size: 20px;
  margin-top: 30px;
  text-align: center;
  color: ${props => props.theme.primary};
`;

export const MainText = styled.Text`
  font-size: 16px;
  color: ${props => props.theme.text};
`;

export const ModuleView = styled.SafeAreaView`
  background-color: ${props => props.theme.white};
  padding: 5px;
  margin: 10%;
  border-radius: 10px;
  flex: 1;
`;

export const ModuleTitle = styled.Text`
  font-size: 18px;
  color: ${props => props.theme.text};
  margin: 10px;
  text-align: center;
`;

export const ModulePicker = styled(Picker)`
  width: 50%;
  margin: 10px;
  background-color: ${props => props.theme.grey};
  color: ${props => props.theme.text};
  align-self: center;
`;

