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
import {useAppSelector} from '@/hooks/useAppSelector';
import {useAppDispatch} from '@/hooks/useAppDispatch';
import {setAuthLoading} from '@/store/features/auth';

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Webview: {token: string};
  Splash: undefined;
  Update: undefined;
  Maintenance: undefined;
  Auth: undefined;
  Term: undefined;
  Privacy: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const codePushOptions = {checkFrequency: codePush.CheckFrequency.MANUAL};

const RootNavigator = () => {
  const [loading, setLoading] = useState(true);
  const [updateAvail, setUpdateAvail] = useState(false);

  const auth = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    codePush.notifyAppReady();
    checkForUpdates();
    checkUser();
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

  const checkUser = async () => {
    try {
    } catch (error) {
      console.log('err', error);
    } finally {
      dispatch(setAuthLoading(false));
    }
  };

  useEffect(() => {
    setTimeout(() => setLoading(auth.loading), 2000);
  }, [auth.loading]);

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
