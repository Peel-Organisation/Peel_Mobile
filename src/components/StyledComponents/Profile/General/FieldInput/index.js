import styled from 'styled-components/native';

export const FieldInput = styled.TextInput`
  width: 80%;
  height: 50px;
  margin: 10px 0px;
  border-radius: 10px;
  background-color: ${props => props.theme.white};
  border: 1px solid ${props => props.theme.grey};
  color: ${props => props.theme.text};
`;
