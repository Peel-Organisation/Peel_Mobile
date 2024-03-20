import styled from 'styled-components/native';
// import Svg, { Circle, Path } from 'react-native-svg';
import { Dimensions } from "react-native";

const DIMENSION_WIDTH = Dimensions.get("window").width;
const DIMENSION_HEIGHT = Dimensions.get("window").height;


export const BackButton = styled.Image`
  width: ${DIMENSION_WIDTH * 0.4}px;
  height: ${DIMENSION_HEIGHT * 0.4}px;
`;

export const Avatar = styled.Image`
  width: ${DIMENSION_WIDTH * 0.4}px;
  height: ${DIMENSION_HEIGHT * 0.4}px;
`;

export const AvatarName = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${props => props.theme.background};
`;

export const AvatarContainer = styled.View`
  flex-direction: column;
  align-items: center;
`;

export const ProgressBarContainer = styled.View`
  width: ${DIMENSION_WIDTH * 0.195}px;
  height: ${DIMENSION_HEIGHT * 0.0125}px;
  background-color: ${props => props.theme.progressBarBackground};
  border-radius: 10px;
  border: 2px solid ${props => props.theme.progressBarBackground};
  z-index: 1;
`;

export const ProgressBar = styled.View`
  height: 100%;
  background-color: ${props => props.theme.progressBar};
  width: ${props => props.progress*6}%;
  max-width: 100%;
  z-index: 2;
`;

export const BadgeContainer = styled.TouchableOpacity`
  position: absolute;
  right: 70px;
  z-index: 3;
`;

export const Badge = styled.Image`
  width: ${DIMENSION_WIDTH * 0.08}px;
  height: ${DIMENSION_HEIGHT * 0.04}px;
  /* left: 10px; */
  z-index: 3;
`;

// Container qui va contenir le Square et la ProgressBar
export const CustomProgressBarContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

export const Tooltip = styled.View`
  position: absolute;
  background-color: ${props => props.theme.grey};
  padding: 10px;
  border-radius: 10px;
  top: ${DIMENSION_HEIGHT * 0.014}px;
  right: ${DIMENSION_WIDTH * 0.06}px;
  max-width: ${DIMENSION_WIDTH * 0.3}px;
  height: ${DIMENSION_HEIGHT * 0.08}px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: row;
`;

export const TooltipText = styled.Text`
  color: ${props => props.theme.background};
  font-size: 12px;
`;