import { Dimensions } from "react-native";
import styled from 'styled-components/native';



const DIMENSION_WIDTH = Dimensions.get("window").width;
const DIMENSION_HEIGHT = Dimensions.get("window").height;

export const ViewCustom = styled.SafeAreaView`
    flex: 1;
    align-items: center;
    justify-content: center;
    width: ${DIMENSION_WIDTH}px;
    height: ${DIMENSION_HEIGHT}px;
`

export const CustomRetryButton = styled.TouchableOpacity`
    background-color: ${props => props.theme.primary};
    border-radius: 5px;
    padding: 10px;
    margin: 5px;
    width: 80%;
    align-items: center;
    justify-content: center;
`

