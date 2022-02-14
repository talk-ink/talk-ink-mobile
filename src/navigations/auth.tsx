import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import AuthTab from './tab/auth';
import RegisterSelect from '@screens/register/select';
import Start from '@screens/start';
import Login from '@screens/login';
import Register from '@screens/register';

import {useAuthContext} from '@utils/context/auth';
import ClassDetail from '@screens/class/detail';

const Stack = createStackNavigator();

const AuthNavigator = () => {
  const [state, _] = useAuthContext();

  return (
    <Stack.Navigator>
      {state.isFirst ? (
        <Stack.Screen
          name="Start"
          component={Start}
          options={{headerShown: false}}
        />
      ) : (
        <>
          <Stack.Screen
            name="MainTab"
            component={AuthTab}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="RegisterSelect"
            component={RegisterSelect}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ClassDetail"
            component={ClassDetail}
            options={{headerShown: false}}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default AuthNavigator;
