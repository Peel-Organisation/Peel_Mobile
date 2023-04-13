import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import {  GIFY_SDK_KEY } from '@env';

import { getStorage } from "../../../functions/storage"; 

import {ScrollView } from "react-native"
import styled from 'styled-components/native';


import { BioInput, ViewCustom, Title, MainText, FieldInput } from "../styles";
import axios from "axios";

 
const Gif = ({ route, navigation }) => {
    const { t } = useTranslation();
    const [user, setUser] = useState({});
    const [searchText, setSearchText] = useState("")
    const [navButton, setNavButton] = useState(null);  

    const [gifs, setGifs] = useState([]);

 
    useEffect(() => {
        getStorage('user').then(fetchedUser => {
            if (fetchedUser.biographie == undefined) {
                fetchedUser.biographie = "";     
            }
            setUser(fetchedUser);
        });
    }, []);

    useEffect(async () =>  {
       const requestOptions = {  
            params: { api_key: GIFY_SDK_KEY, limit:20  },
            headers: { 'Content-Type': 'application/json' },
        };
        console.log("requestOptions : ", requestOptions)
        const link = "https://api.giphy.com/v1/gifs/trending?api_key=dWUao2LMG0bqBu1qHB1g2Dn1MS6Prwev&limit=5";
        const response = await fetch(link)
        console.log("response : ", response)
        const jsonData = await response.json();
        console.log(jsonData);
        if (jsonData != null && jsonData.data != null && jsonData.meta.status == 200) {
            setGifs(jsonData.data)
        }
        console.log("gifs : ", gifs)
    } , [])

    useEffect(() => {
        if (searchText.length > 2) {
            const requestOptions = {
                headers: {"api_key": GIFY_SDK_KEY, limit:20  },
            };
            const link = "api.giphy.com/v1/gifs/search";
            axios.get(link ,requestOptions).then(res => {
                console.log("data api : ", res);
                setGifs(res.data)
            }).catch(error => {
                console.log("error whith api : ", error)
            });
        }
    } , [searchText])

    const ImageLogo = styled.Image`
        width: 200px;
        height: 200px;
    `;

   

    return (
      <ViewCustom>        
            <Title>Choix du gif</Title>
            {gifs != null && gifs != undefined && gifs != "" && gifs.map((gif, index) => {
                return (
                    <>
                        <MainText key={index}>{gif.title}</MainText>
                        <MainText key={index}>{gif.url}</MainText>
                        <ImageLogo source={{uri : gif.url}}/>
                    </>
                )
            })}
            <FieldInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                value={searchText}
                onChangeText={(text) => setSearchText(text)}
            />
                <ScrollView
                style={{
                    maxHeight: 400,
                    padding: 24,
                    width: '100%',
                }}
                >
                    <MainText>test</MainText>
                </ScrollView>
      </ViewCustom>
    );
  }


export default Gif;