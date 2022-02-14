import React from 'react';

import Layout from '@components/layouts';
import Select from '@components/organisms/register/select';

import images from '@assets/images';

const RegisterSelect = ({navigation}) => {
  const classes = [
    {
      id: 1,
      name: 'Fullstack Developer',
      coverImage: images.fullstackIcons,
      onPress: () =>
        navigation.navigate('feedWebview', {
          appRoute: 'fullstack',
        }),
    },
    {
      id: 2,
      name: 'DevOps Engineer',
      coverImage: images.devopsIcons,
    },
  ];

  return (
    <Layout scrollable>
      <Select navigation={navigation} classes={classes} />
    </Layout>
  );
};

export default RegisterSelect;
