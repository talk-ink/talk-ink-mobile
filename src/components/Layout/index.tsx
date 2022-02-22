import React, {useEffect} from 'react';

import {
  ScrollView,
  RefreshControl,
  AppState,
  StatusBar,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-async-storage/async-storage';

type TProps = {
  children: React.ReactNode;
  style?: ViewStyle;
  scrollable?: boolean;
  withRefreshControl?: boolean;
  refreshing?: boolean;
  onRefresh?: () => any;
};

const Layout = ({
  children,
  style,
  scrollable,
  withRefreshControl,
  refreshing,
  onRefresh,
}: TProps) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        ...style,
        backgroundColor: '#fff',
      }}>
      <StatusBar barStyle={'dark-content'} backgroundColor="#fff" translucent />
      {scrollable ? (
        withRefreshControl ? (
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="always">
            {children}
          </ScrollView>
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="always">
            {children}
          </ScrollView>
        )
      ) : (
        children
      )}
    </SafeAreaView>
  );
};

export default Layout;
