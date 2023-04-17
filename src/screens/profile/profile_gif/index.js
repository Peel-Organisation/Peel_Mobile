import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {Update_Button, nextAction} from "../../../components/Update_User";
import {  GIPHY_API_KEY, GIPHY_PATH } from '@env';

import { getStorage } from "../../../functions/storage"; 

import {FlatList, TouchableOpacity, Image } from "react-native"


import { BioInput, ViewCustom, Title, MainText, FieldInput } from "../styles";

 
const Gif = ({ route, navigation }) => {
    const { t } = useTranslation();
    const [user, setUser] = useState({});
    const [searchText, setSearchText] = useState("")
    const [page, setPage] = React.useState(0);


    const [gifs, setGifs] = useState([]);

 
    useEffect(() => {
        getPopularGifs()
        getStorage('user').then(fetchedUser => {
            if (fetchedUser.biographie == undefined) {
                fetchedUser.biographie = "";     
            }
            setUser(fetchedUser);
        });
    }, []);


    useEffect( () =>  {
        getPopularGifs()
    } , [page])

    useEffect( () =>  {
        setPage(0)
        if (searchText.length > 0) {
            searchGif()
        } else {
            getPopularGifs()
        }
    } , [searchText])

    const getPopularGifs = async () => {
        const limit = 20;
        let link = ""
        if (searchText.length > 0) {
            link = `${GIPHY_PATH}/search?api_key=${GIPHY_API_KEY}&limit=${limit}&q=${searchText}&offset=${page*limit}`;
        } else {
            link = `${GIPHY_PATH}/trending?api_key=${GIPHY_API_KEY}&limit=${limit}&offset=${page*limit}`;
        }
        console.log("link : ", link)
        const response = await fetch(link)
        if (response.status == 200) {
            const jsonData = await response.json();
            if (jsonData != null && !jsonData?.data != null && jsonData.meta.status == 200 && jsonData.data.length > 0 ) {
                console.log("jsonData : ", jsonData)
                let newGifs = []
                if (page > 0) {
                    newGifs = [...gifs, ...jsonData.data]
                } else {
                    newGifs = jsonData.data
                }
                setGifs(newGifs)
            }
        }
    }

    const searchGif = async () => {
        const limit = 20;
        const link = `${GIPHY_PATH}/search?api_key=${GIPHY_API_KEY}&limit=${limit}&q=${searchText}`;
        console.log("link : ", link)
        const response = await fetch(link)
        if (response.status == 200) {
            const jsonData = await response.json();
            if (jsonData != null && jsonData.data != null && jsonData.meta.status == 200 && jsonData.data.length > 0 ) {
                setGifs(jsonData.data)
            }
        } 
    }   


    const updateGif = (gif) => {
        let newUser = user;
        newUser.gif = {id : gif.id, title : gif.title, url : gif.url, image: gif.images.original}
        console.log("newUser : ", newUser)
        setUser(newUser);
        nextAction("Profile6", navigation, user);
    }



    const renderItem = ({item}) => {
        return (
        <TouchableOpacity onPress={() => updateGif(item)}>
            <Image
            style={{
                width: 200,
                height: 200,
            }}
            source={{
                uri: `${item?.images?.original?.webp}`,
            }}
            />
        </TouchableOpacity>
        );
    };

   
 
    return (
      <ViewCustom>        
            <Update_Button user={user} prevPage="Profile4" nextPage=""  navigation={navigation} />
            <Title>Choix du gif</Title>
            <FieldInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                value={searchText}
                onChangeText={(text) => setSearchText(text)}
            />
            <FlatList
                data={gifs}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                onEndReached={() => {
                setPage(page + 1);
                }}
                onEndReachedThreshold={0.4}
            />
      </ViewCustom>
    );
  }


export default Gif;