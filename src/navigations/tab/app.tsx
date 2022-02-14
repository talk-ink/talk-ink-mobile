import React from 'react';

import {Image} from 'react-native';
import {useTheme, Text} from 'react-native-paper';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Dashboard from '@screens/dashboard';
import Feed from '@screens/feed';
import Profile from '@screens/profile';

import * as colors from '@utils/themes/colors';
import icons from '@assets/icons';
import {useAuthContext} from '@utils/context/auth';
import StudyPage from '@screens/dashboard/study';

const Tab = createBottomTabNavigator();

const MainTab = () => {
  const theme = useTheme();
  const [state, _] = useAuthContext();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      backBehavior="initialRoute"
      screenOptions={({route}) => ({
        tabBarLabel: ({color}) => {
          let title;

          switch (route.name) {
            case 'Dashboard':
              title = 'Bootcamp';
              break;
            case 'Feed':
              title = 'Feed';
              break;
            case 'Profile':
              title = 'Profile';
              break;
            default:
              title = '';
              break;
          }
          return (
            <Text
              style={{
                ...theme.fonts.medium,
                fontSize: 10,
                color:
                  color === 'rgb(0, 122, 255)' ? colors.PRIMARY : '#8E8E8F',
              }}>
              {title}
            </Text>
          );
        },
        tabBarIcon: ({focused}) => {
          let iconName, style;

          switch (route.name) {
            case 'Dashboard':
              iconName = focused ? icons.dashboard : icons.dashboardGray;
              style = {width: 20, height: 15};
              break;
            case 'Feed':
              iconName = focused ? icons.feed : icons.feedGray;
              style = {width: 20, height: 15};
              break;
            default:
              iconName = focused ? icons.user : icons.userGray;
              style = {width: 20, height: 15};
              break;
          }

          return <Image source={iconName} style={style} resizeMode="contain" />;
        },
      })}>
      {state?.user?.currentStep >= 8 ? (
        <Tab.Screen
          name="Dashboard"
          component={StudyPage}
          options={{headerShown: false}}
        />
      ) : (
        <Tab.Screen
          name="Dashboard"
          component={Dashboard}
          options={{headerShown: false}}
        />
      )}

      <Tab.Screen name="Feed" component={Feed} options={{headerShown: false}} />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};

export default MainTab;
