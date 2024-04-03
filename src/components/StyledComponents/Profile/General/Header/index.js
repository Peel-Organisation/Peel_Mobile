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
  margin-left: 30px;
`
export const GoBackArrowImage = styled.Image`
  width: 30px;
  height: 30px;  
  transform: rotate(-90deg);
`
