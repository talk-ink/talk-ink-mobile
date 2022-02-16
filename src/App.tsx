import React, {useEffect} from 'react';

import {TailwindProvider} from 'tailwind-rn';
import OneSignal from 'react-native-onesignal';

import utilities from '../tailwind.json';
import codePush from 'react-native-code-push';
import {Provider} from 'react-redux';
import NavigationsRoot from '@/navigations/root';
import {store} from '@/store/index';
import {ONE_SIGNAL_ID} from 'react-native-dotenv';

const App = () => {
  useEffect(() => {
    OneSignal.setAppId(ONE_SIGNAL_ID);
  }, []);
  return (
    <TailwindProvider utilities={utilities}>
      <Provider store={store}>
        <NavigationsRoot />
      </Provider>
    </TailwindProvider>
  );
};

export default codePush(App);
