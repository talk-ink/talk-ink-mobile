import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';

import {TailwindProvider} from 'tailwind-rn';
import utilities from '../tailwind.json';
import {useTailwind} from 'tailwind-rn';
import codePush from 'react-native-code-push';
import {Provider} from 'react-redux';
import NavigationsRoot from '@/navigations/root';
import {store} from '@/store/index';

const App = () => {
  return (
    <TailwindProvider utilities={utilities}>
      <Provider store={store}>
        <NavigationsRoot />
      </Provider>
    </TailwindProvider>
  );
};

export default codePush(App);
