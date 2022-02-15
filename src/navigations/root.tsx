import React, {useEffect, useState, useRef} from 'react';

import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import codePush from 'react-native-code-push';

import SplashScreen from '@/screens/splash';
import MaintenanceScreen from '@/screens/maintenance';
import Update from '@/screens/update';
import Privacy from '@/screens/privacyPolicy/privacy';
import Term from '@/screens/privacyPolicy/term';

import AuthNavigator from './auth';

const Stack = createStackNavigator();

const codePushOptions = {checkFrequency: codePush.CheckFrequency.MANUAL};

const RootNavigator = () => {
  const [loading, setLoading] = useState(true);
  const [updateAvail, setUpdateAvail] = useState(false);

  useEffect(() => {
    codePush.notifyAppReady();
    checkForUpdates();
  }, []);

  const checkForUpdates = async () => {
    try {
      const update = await codePush.checkForUpdate();

      if (!update || update.failedInstall) {
        return;
      }

      setUpdateAvail(true);
    } catch (error) {
      console.log(error);
    }
  };

  const myTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      text: '#080522',
      background: '#fff',
    },
  };

  const state = {
    maintenance: false,
    token: false,
  };

  return (
    <NavigationContainer theme={myTheme}>
      <Stack.Navigator>
        {loading ? (
          <Stack.Screen
            name="Splash"
            component={SplashScreen}
            options={{headerShown: false}}
          />
        ) : updateAvail ? (
          <Stack.Screen
            name="Update"
            component={Update}
            options={{headerShown: false}}
          />
        ) : state.maintenance ? (
          <Stack.Screen
            name="Maintenance"
            component={MaintenanceScreen}
            options={{headerShown: false}}
          />
        ) : (
          <>
            <Stack.Screen
              name="Auth"
              component={AuthNavigator}
              options={{headerShown: false}}
            />
          </>
        )}

        <Stack.Screen
          name="Privacy"
          component={Privacy}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Term"
          component={Term}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default codePush(codePushOptions)(RootNavigator);
