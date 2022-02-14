import React, {useState} from 'react';

import Layout from '@components/layouts';
import {View, Text} from 'react-native';
import codePush from 'react-native-code-push';
import {Snackbar} from 'react-native-paper';
import {useQuery} from '@apollo/client';

import Button from '@components/atoms/button';
import Illustration from '@components/molecules/dashboard/beforeBootcamp/illustration';

import {GET_CHANGELOG} from '@utils/apollo/constant/others';

import fonts from '@utils/fonts';
import * as colors from '@utils/themes/colors';

const Dashboard = ({navigation}) => {
  const [syncStatus, setSyncStatus] = useState(0);
  const [progress, setProgress] = useState(0);
  const [snackbarActive, setSnackbarActive] = useState(false);

  const {data} = useQuery(GET_CHANGELOG);

  const codePushStatusDidChange = pushStatus => {
    switch (pushStatus) {
      case codePush.SyncStatus.CHECKING_FOR_UPDATE:
      case codePush.SyncStatus.DOWNLOADING_PACKAGE:
        setSyncStatus(1);
        break;
      case codePush.SyncStatus.INSTALLING_UPDATE:
        setSyncStatus(2);
        break;
      case codePush.SyncStatus.UP_TO_DATE:
      case codePush.SyncStatus.UNKNOWN_ERROR:
        setSyncStatus(0);
        setSnackbarActive(true);
        break;
    }
  };

  const codePushDownloadDidProgress = ({receivedBytes, totalBytes}) =>
    setProgress(Math.round((receivedBytes / totalBytes) * 100));

  const handleUpdatePress = () =>
    codePush.sync(
      {installMode: codePush.InstallMode.IMMEDIATE},
      codePushStatusDidChange,
      codePushDownloadDidProgress,
    );

  return (
    <Layout>
      <View
        style={{
          padding: 10,
          flex: 1,
          justifyContent: 'space-between',
        }}>
        <View>
          <Illustration name="update" />
          <Text
            style={{
              fontSize: 16,
              color: colors.GRAY_DARK,
              fontFamily: fonts.medium500,
              marginBottom: 10,
            }}>
            <Text>
              Update sekarang untuk mendapatkan pengalaman yang lebih baik dan
              fitur terbaru dari{' '}
            </Text>
            <Text
              style={{
                fontFamily: fonts.bold700,
              }}>
              DumbWays ID
            </Text>
          </Text>

          {data?.changeLogs?.length > 0 && (
            <Text
              style={{
                marginVertical: 10,
                fontSize: 16,
                color: colors.GRAY_DARK,
                fontFamily: fonts.bold700,
              }}>
              Apa yang baru?
            </Text>
          )}

          {data?.changeLogs?.map(item => (
            <View style={{flexDirection: 'row'}} key={item.id}>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: fonts.regular400,
                }}>
                {'\u2022'}
              </Text>
              <Text
                style={{
                  flex: 1,
                  paddingLeft: 5,
                  fontFamily: fonts.regular400,
                  fontSize: 16,
                  color: colors.GRAY_DARK,
                }}>
                {item.description}
              </Text>
            </View>
          ))}
        </View>
        <Button
          onPress={handleUpdatePress}
          loading={syncStatus > 0}
          disabled={syncStatus > 0}>
          {!syncStatus
            ? 'Update Sekarang'
            : syncStatus === 1
            ? 'Updating'
            : 'Installing'}{' '}
          {syncStatus === 1 && progress ? `${progress}%` : ''}
        </Button>
      </View>
      <Snackbar
        visible={snackbarActive}
        onDismiss={() => setSnackbarActive(false)}>
        Update Error
      </Snackbar>
    </Layout>
  );
};

export default Dashboard;
