import styled from 'styled-components/native';

export const ContentView = styled.SafeAreaView`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  background-color: ${props => props.theme.background};
`;
