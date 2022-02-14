import React, {useEffect} from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import AppTab from './tab/app';

import EditProfilePage from '@screens/profile/edit';

const Stack = createStackNavigator();

const AppNav = () => {
  return (
    <Stack.Navigator>
      <>
        <Stack.Screen
          name="MainTab"
          component={AppTab}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProfilePage}
          options={{headerShown: false}}
        />
      </>
    </Stack.Navigator>
  );
};

export default AppNav;
