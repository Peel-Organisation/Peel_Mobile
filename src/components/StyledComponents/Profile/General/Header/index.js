import styled from 'styled-components/native';

export const HeaderView = styled.View`
  background-color: ${props => props.theme.primary};
  color: ${props => props.theme.white};
  height: 15%;
  width: 100%;
`;

export const HeaderText = styled.Text`
  font-size: 30px;
  color: ${props => props.theme.white};
  text-align: center;
  padding-top: 10px;
  margin: 10px;
  letter-spacing: 1px;
`;
