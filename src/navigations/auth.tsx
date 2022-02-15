import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import RegisterSelect from '@/screens/register/select';
import Start from '@/screens/start';
import Login from '@/screens/login';
import Register from '@/screens/register';

const state = {
  isFirst: false,
};

const Stack = createStackNavigator();

const AuthNavigator = () => {
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
        </>
      )}
    </Stack.Navigator>
  );
};

export default AuthNavigator;
