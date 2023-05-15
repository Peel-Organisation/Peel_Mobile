import { Dimensions } from "react-native";
import styled from 'styled-components/native';
import SwitchSelector from "react-native-switch-selector";
import DatePicker from 'react-native-date-picker'
import ModalSelector from 'react-native-modal-selector'

const DIMENSION_WIDTH = Dimensions.get("window").width;
const DIMENSION_HEIGHT = Dimensions.get("window").height;

export const ViewCustom =  styled.ScrollView`
    flex: 1;
    background-color: ${props => props.theme.background};
`

export const ConditionText = styled.Text`
    font-size: 16px;
    color: ${props => props.theme.text};
    text-align: center;
    margin-top: 10px;
`

export const Title = styled.Text`
    font-size: 20px;
    margin-top: 30px;
    text-align: center;
    color: ${props => props.theme.primary};
`

export const MainText = styled.Text`
    font-size: 16px;
    color: ${props => props.theme.text};
`

export const ModuleView = styled.View`
    background-color: ${props => props.theme.white};
    padding: 5px;
    margin: 5%;
    border-radius: 4px;
    flex: 1;
`

export const ModuleTitle = styled.Text`
    font-size: 18px;
    color: ${props => props.theme.text};
    margin: 10px;
    text-align: center;
`

