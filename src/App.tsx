import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';

import {TailwindProvider} from 'tailwind-rn';
import utilities from '../tailwind.json';
import {useTailwind} from 'tailwind-rn';
import codePush from 'react-native-code-push';
import {Provider} from 'react-redux';
import NavigationsRoot from '@/navigations/root';
import {store} from '@/store/index';

const Test = () => {
  const tailwind = useTailwind();

  return (
    <SafeAreaView style={tailwind('h-full bg-blue-100')}>
      <View style={tailwind('pt-12 items-center')}>
        <View style={tailwind('bg-blue-200 px-3 py-1 rounded-full')}>
          <Text style={tailwind('text-blue-800 font-semibold')}>
            Hello Tailwind
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

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
