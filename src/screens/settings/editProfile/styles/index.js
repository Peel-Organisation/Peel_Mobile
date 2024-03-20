import styled from 'styled-components/native';
import { Picker } from '@react-native-picker/picker';


export const ViewCustom = styled.ScrollView`
  flex: 1;
  background-color: ${props => props.theme.background};
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

