import styled from 'styled-components/native';

export const Background = styled.TouchableOpacity `
    position: absolute;
    width: 100%;
    height: 100%;
`

export const Container = styled.TouchableOpacity `
    position: absolute;
    width: 100%;
    background-color: ${props => props.theme.primary};
    border-bottom-left-radius: 39px;
    border-bottom-right-radius: 39px;
`

export const Header =  styled.View`
    width: 100%;
    height: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const TitleText = styled.Text`
    font-size: 30px;
    color: ${props => props.theme.background};
`

export const FilterIcon = styled.TouchableOpacity `
    position: absolute;
    left: 7%;
    width: 45px;
    height: 45px;
    border-radius: 50px;
    background-color: rgba(255, 251, 236, 0.35);
    justify-content: center;
    align-items: center;
`
export const FilterIconImg = styled.Image `
    width: 30px;
    height: 30px;
`

export const FiltersView = styled.View `
    width: 75%;
    align-self: center;
`

export const Search = styled.Text `
    font-size: 22px;
    color: ${props => props.theme.background};
    margin: 12px;
`

export const ButtonView = styled.View `
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    height: 50px;
    margin-top: 25px;
    margin-bottom: 30px;
`