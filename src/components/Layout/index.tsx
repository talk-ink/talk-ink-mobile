import {View, Text, StatusBar} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTailwind} from 'tailwind-rn/dist';
import {ScrollView} from 'react-native-gesture-handler';

type Props = {
  children?: React.ReactNode;
};

const Layout = ({children}: Props) => {
  const tailwind = useTailwind();
  return (
    <SafeAreaView style={tailwind('bg-white ')}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always">
        {children}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Layout;
