import React, { useEffect, useState } from 'react';
import Loading from '../../../components/Loading';

import { updateUser, getInterestList } from '../../../functions/api_request';
import { getStorage } from '../../../functions/storage';

import {
  InterestView,
  InterestButton,
  InterestButtonText,
  InterestButtonSelected,
  InterestButtonDisabled,
} from './styles';

const InterestEdit = () => {
  const [InterestList, setInterestList] = useState([{}]);
  const [user, setUser] = useState({ interests: [] });
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    getStorage('user').then(fetchedUser => {
      if (fetchedUser.interests == undefined) {
        fetchedUser.interests = [];
      }
      for (let i = 0; i < fetchedUser.interests.length; i++) {
        if (typeof fetchedUser.interests[i] == 'string') {
          fetchedUser.interests[i] = fetchedUser.interests[i];
        }
      }
      setUser(fetchedUser);
    });

    getInterestList().then(data => {
      for (let i = 0; i < data.length; i++) {
        if (typeof data[i] == 'string') {
          data[i] = JSON.parse(data[i]);
        }
      }
      setInterestList(data);
      setLoading(false);
    });
  }, []);

  const addInterest = interest => {
    if (user.interests?.length < 5) {
      console.log('interest = ', interest);
      let newUser = { ...user };
      newUser.interests.push(interest);
      setUser(newUser);
    }
  };

  const removeInterest = interest => {
    let newUser = { ...user };
    if (typeof interest == 'string') {
      interest = JSON.parse(interest);
    }
    console.log('interest = ', interest._id);
    newUser.interests = newUser.interests?.filter(
      item => item._id !== interest._id,
    );
    setUser(newUser);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <InterestView>
      {InterestList.map(interest => {
        if (containsObject(interest, user.interests)) {
          return (
            <InterestButtonSelected
              key={interest._id}
              onPress={() => {
                removeInterest(interest);
                updateUser(user);
              }}>
              <InterestButtonText>{interest.name}</InterestButtonText>
            </InterestButtonSelected>
          );
        } else if (user.interests?.length < 5) {
          return (
            <InterestButton
              key={interest._id}
              onPress={() => {
                addInterest(interest);
                updateUser(user);
              }}>
              <InterestButtonText>{interest.name}</InterestButtonText>
            </InterestButton>
          );
        } else {
          return (
            <InterestButtonDisabled
              key={interest._id}
              onPress={() => {
                addInterest(interest);
                updateUser(user);
              }}
              disabled>
              <InterestButtonText>{interest.name}</InterestButtonText>
            </InterestButtonDisabled>
          );
        }
      })}
    </InterestView>
  );
};

const containsObject = (obj, list) => {
  var i;
  if (list == undefined) {
    return false;
  }
  for (i = 0; i < list.length; i++) {
    // console.log(list[i]._id, obj._id)
    if (list[i]._id === obj._id) {
      return true;
    }
  }
  return false;
};

export default InterestEdit;
