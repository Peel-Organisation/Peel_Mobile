import React, { useEffect, useState } from "react";
import { Card } from 'react-native-card-stack-swiper';
import Swipe_Card from "../Swipe_Card";
import {sendSwipe} from "../../functions/api_request"
import {Text, Image} from "react-native";
import {ButtonStack, CardStackView, Button, Icon} from "./styles";

// import SVG from "./styles/cross.svg"


const Swipe = (props) => { 

    const [userList, setUserList] = useState(props.userList);

    useEffect(() => {
        setUserList(props.userList)
    },[props.userList])

    if (userList !== undefined) { 
        return (
            <>
                <CardStackView
                    loop={true}
                    verticalSwipe={false}
                    renderNoMoreCards={() => null}
                    ref={swiper => (this.swiper = swiper)}                    
                >
                    {userList.map((user) => (
                        <Card 
                            onSwipedLeft={() => {sendSwipe(user, "dislike")}}
                            onSwipedRight={() => {sendSwipe(user, "like")}}
                            key={user._id} 
                            user={user}
                        >
                            <Swipe_Card 
                                User={user} 
                            />
                        </Card>
                    ))}
                </CardStackView>
                <ButtonStack>
                    <Button onPress={() => {
                        this.swiper.swipeLeft();
                    }}> 
                        <Icon
                            source={require('./styles/cross.png')}
                        />
                    </Button>
                    <Button onPress={() => {
                        this.swiper.swipeRight();
                    }}> 
                        <Icon
                            source={require('./styles/heart.png')}
                        />
                    </Button >
                </ButtonStack>
            </>
            );
    }
}

 

export default Swipe; 