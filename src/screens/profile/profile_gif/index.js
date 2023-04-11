import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import {  GIFY_SDK_KEY } from '@env';

import { getStorage } from "../../../functions/storage"; 

import {ScrollView } from "react-native"

import { BioInput, ViewCustom, Title, MainText, FieldInput } from "../styles";
import axios from "axios";

 
const Gif = ({ route, navigation }) => {
    const { t } = useTranslation();
    const [user, setUser] = useState({});
    const [searchText, setSearchText] = useState("")
    const [navButton, setNavButton] = useState(null);  

    const [gifs, setGifs] = useState();

 
    useEffect(() => {
        getStorage('user').then(fetchedUser => {
            if (fetchedUser.biographie == undefined) {
                fetchedUser.biographie = "";     
            }
            setUser(fetchedUser);
        });
    }, []);

    useEffect(() => {
       const requestOptions = {  
            params: { "api_key": GIFY_SDK_KEY, limit:20  },
        };
        const link = "api.giphy.com/v1/gifs/trending";
        axios.get(link ,requestOptions).then(res => {
            console.log("data api : ", res);
            setGifs(res.data)
        }).catch(error => {
            console.log("error whith api : ", error)
        });
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



   

    return (
      <ViewCustom>        
            <Title>Choix du gif</Title>
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