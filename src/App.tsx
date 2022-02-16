import React, {useEffect} from 'react';

import {TailwindProvider} from 'tailwind-rn';
import utilities from '../tailwind.json';
import codePush from 'react-native-code-push';
import {Provider} from 'react-redux';
import NavigationsRoot from '@/navigations/root';
import {store} from '@/store/index';

const App = () => {
  useEffect(() => {
    // oneSignalId.setAppId(ONESIGNAL_APP_ID);
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
