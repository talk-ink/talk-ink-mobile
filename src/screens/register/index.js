import React from 'react';

import Layout from '@components/layouts';
import RegisterForm from '@components/organisms/register';

const Register = ({navigation, route}) => {
  const {type} = route.params || {};

  return (
    <Layout scrollable>
      <RegisterForm type={type} navigation={navigation} />
    </Layout>
  );
};

export default Register;
