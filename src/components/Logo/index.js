import React from "react";
import { SafeAreaView } from "react-native";
import styled from 'styled-components/native';
import marvelLogo from "../../img/peel_logo.png";





const Logo = () => {

    const ImageLogo = styled.Image`
        width: 200px;
        height: 200px;
        `;



    return (
        <SafeAreaView>
            {/* <ImageLogo source={marvelLogo}/> */}
            <ImageLogo source={marvelLogo} />
        </SafeAreaView >
    );
}


export default Logo; 