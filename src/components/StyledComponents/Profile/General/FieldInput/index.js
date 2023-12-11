import styled from 'styled-components/native';

export const FieldInput = styled.TextInput`
  width: 80%;
  min-width: 80%;
  height: 40px;
  margin: 10px 0px;
  border-radius: 10px;
  padding: 10px;
  border: 2px solid ${props => props.theme.primary};
  color: ${props => props.theme.grey};
  letter-spacing: 1px;
`;
