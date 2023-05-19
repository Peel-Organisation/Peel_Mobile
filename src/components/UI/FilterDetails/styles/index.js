import styled from 'styled-components/native';

export const Container = styled.View `
    flex: 1;
    height: 204px;
    border-radius: 8px;
    background-color: ${props => (props.theme.white)};
    margin-bottom: 6px;
    padding-top: 8px;
    padding-left: 15px;
    padding-right: 15px;
`
export const TopContainer = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`
export const FilterText = styled.Text `
    font-size: 16px;
    color: black;
`
export const CloseButton = styled.TouchableOpacity `
    height: 22px;
    width: 22px;
`
export const FilterInput = styled.TextInput `
    margin-top: 12px;
    border: 1px solid black;
    border-radius: 8px;
    padding-top: 1px;
    padding-bottom: 1px;
    padding-left: 15px;
    padding-right: 15px;
`