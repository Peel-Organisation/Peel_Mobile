import { Platform } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.SafeAreaView `
    position: absolute;
    width: 100%;
    top: ${Platform.OS === 'android' ? '0%' : '3%'};
    height: 64%;
    background-color: ${props => props.theme.primary};
    border-bottom-left-radius: 39px;
    border-bottom-right-radius: 39px;
`

export const Header = styled.SafeAreaView`
    width: 100%;
    height: 24%;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const TitleText = styled.Text`
    font-size: 30px;
    color: ${props => props.theme.background};
`

export const FiltersView = styled.SafeAreaView `
    width: 80%;
    align-self: center;
`

export const ButtonView = styled.SafeAreaView `
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    height: 15%;
    
`