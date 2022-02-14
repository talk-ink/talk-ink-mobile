import React from 'react';

import {Text, TouchableOpacity, View} from 'react-native';

import Layout from '@components/layouts';
import Navbar from '@components/molecules/navbar';

import fonts from '@utils/fonts';
import LinkToWebsite from '@components/atoms/link';

const Privacy = ({navigation}) => {
  return (
    <Layout scrollable>
      <Navbar navigation={navigation} title="Privacy Policy" />
      <View
        style={{
          paddingTop: 0,
          padding: 20,
        }}>
        <Text
          style={{
            fontFamily: fonts.bold700,
            fontSize: 14,
          }}>
          Privacy Policy
        </Text>
        <Text
          style={{
            fontFamily: fonts.regular400,
            fontSize: 14,
          }}>
          PT DumbWays Indonesia Teknologi built the DumbWays app as a Freemium
          app. This SERVICE is provided by PT DumbWays Indonesia Teknologi at no
          cost and is intended for use as is.
        </Text>
        <Text
          style={{
            fontFamily: fonts.regular400,
            fontSize: 14,
          }}>
          This page is used to inform visitors regarding our policies with the
          collection, use, and disclosure of Personal Information if anyone
          decided to use our Service. If you choose to use our Service, then you
          agree to the collection and use of information in relation to this
          policy. The Personal Information that we collect is used for providing
          and improving the Service. We will not use or share your information
          with anyone except as described in this Privacy Policy.
        </Text>
        <Text
          style={{
            fontFamily: fonts.regular400,
            fontSize: 14,
            marginBottom: 10,
          }}>
          The terms used in this Privacy Policy have the same meanings as in our
          Terms and Conditions, which is accessible at DumbWays unless otherwise
          defined in this Privacy Policy.
        </Text>

        <Text
          style={{
            fontFamily: fonts.bold700,
            fontSize: 14,
          }}>
          Information Collection and Use
        </Text>
        <Text
          style={{
            fontFamily: fonts.regular400,
            fontSize: 14,
            marginBottom: 10,
          }}>
          For a better experience, while using our Service, we may require you
          to provide us with certain personally identifiable information,
          including but not limited to user data account & user personal data
          such as address, gender, birthdate, ID Card, photo, etc. The
          information that we request will be retained by us and used as
          described in this privacy policy.
        </Text>
        <Text
          style={{
            fontFamily: fonts.regular400,
            fontSize: 14,
            marginBottom: 10,
          }}>
          The app does use third party services that may collect information
          used to identify you.
        </Text>
        <Text
          style={{
            fontFamily: fonts.regular400,
            fontSize: 14,
            marginBottom: 10,
          }}>
          Link to privacy policy of third party service providers used by the
          app
        </Text>
        <LinkToWebsite
          title="Google Play Services"
          style={{
            marginBottom: 10,
            marginLeft: 14,
          }}
          link="https://policies.google.com/privacy"
        />

        <LinkToWebsite
          title="Google Analytics for Firebase"
          style={{
            marginBottom: 10,
            marginLeft: 14,
          }}
          link="https://firebase.google.com/policies/analytics"
        />

        <LinkToWebsite
          title="One Signal"
          style={{
            marginBottom: 10,
            marginLeft: 14,
          }}
          link="https://onesignal.com/privacy_policy"
        />

        <Text
          style={{
            fontFamily: fonts.bold700,
            fontSize: 14,
          }}>
          Information Collection and Use
        </Text>
        <Text
          style={{
            fontFamily: fonts.regular400,
            fontSize: 14,
            marginBottom: 10,
          }}>
          We want to inform you that whenever you use our Service, in a case of
          an error in the app we collect data and information (through third
          party products) on your phone called Log Data. This Log Data may
          include information such as your device Internet Protocol (“IP”)
          address, device name, operating system version, the configuration of
          the app when utilizing our Service, the time and date of your use of
          the Service, and other statistics.
        </Text>
        <Text
          style={{
            fontFamily: fonts.bold700,
            fontSize: 14,
          }}>
          Cookies
        </Text>
        <Text
          style={{
            fontFamily: fonts.regular400,
            fontSize: 14,
          }}>
          Cookies are files with a small amount of data that are commonly used
          as anonymous unique identifiers. These are sent to your browser from
          the websites that you visit and are stored on your device's internal
          memory.
        </Text>
        <Text
          style={{
            fontFamily: fonts.regular400,
            fontSize: 14,
            marginBottom: 10,
          }}>
          This Service does not use these “cookies” explicitly. However, the app
          may use third party code and libraries that use “cookies” to collect
          information and improve their services. You have the option to either
          accept or refuse these cookies and know when a cookie is being sent to
          your device. If you choose to refuse our cookies, you may not be able
          to use some portions of this Service.
        </Text>

        <Text
          style={{
            fontFamily: fonts.bold700,
            fontSize: 14,
          }}>
          Service Providers
        </Text>
        <Text
          style={{
            fontFamily: fonts.regular400,
            fontSize: 14,
          }}>
          We may employ third-party companies and individuals due to the
          following reasons:
        </Text>
        <Text
          style={{
            fontFamily: fonts.regular400,
            fontSize: 14,
            marginLeft: 14,
          }}>
          {`\u2022`} To facilitate our Service;
        </Text>
        <Text
          style={{
            fontFamily: fonts.regular400,
            fontSize: 14,
            marginLeft: 14,
          }}>
          {`\u2022`} To provide the Service on our behalf;
        </Text>
        <Text
          style={{
            fontFamily: fonts.regular400,
            fontSize: 14,
            marginLeft: 14,
          }}>
          {`\u2022`} To perform Service-related services; or
        </Text>
        <Text
          style={{
            fontFamily: fonts.regular400,
            fontSize: 14,
            marginLeft: 14,
          }}>
          {`\u2022`} To assist us in analyzing how our Service is used.
        </Text>
        <Text
          style={{
            fontFamily: fonts.regular400,
            fontSize: 14,
          }}>
          We want to inform users of this Service that these third parties have
          access to your Personal Information. The reason is to perform the
          tasks assigned to them on our behalf. However, they are obligated not
          to disclose or use the information for any other purpose.
        </Text>

        <Text
          style={{
            fontFamily: fonts.bold700,
            fontSize: 14,
          }}>
          Security
        </Text>
        <Text
          style={{
            fontFamily: fonts.regular400,
            fontSize: 14,
            marginBottom: 10,
          }}>
          We value your trust in providing us your Personal Information, thus we
          are striving to use commercially acceptable means of protecting it.
          But remember that no method of transmission over the internet, or
          method of electronic storage is 100% secure and reliable, and we
          cannot guarantee its absolute security.
        </Text>

        <Text
          style={{
            fontFamily: fonts.bold700,
            fontSize: 14,
          }}>
          Links to Other Sites
        </Text>
        <Text
          style={{
            fontFamily: fonts.regular400,
            fontSize: 14,
            marginBottom: 10,
          }}>
          This Service may contain links to other sites. If you click on a
          third-party link, you will be directed to that site. Note that these
          external sites are not operated by us. Therefore, we strongly advise
          you to review the Privacy Policy of these websites. We have no control
          over and assume no responsibility for the content, privacy policies,
          or practices of any third-party sites or services.
        </Text>

        <Text
          style={{
            fontFamily: fonts.bold700,
            fontSize: 14,
          }}>
          Children’s Privacy
        </Text>
        <Text
          style={{
            fontFamily: fonts.regular400,
            fontSize: 14,
            marginBottom: 10,
          }}>
          These Services do not address anyone under the age of 13. We do not
          knowingly collect personally identifiable information from children
          under 13 years of age. In the case we discover that a child under 13
          has provided us with personal information, we immediately delete this
          from our servers. If you are a parent or guardian and you are aware
          that your child has provided us with personal information, please
          contact us so that we will be able to do necessary actions.
        </Text>

        <Text
          style={{
            fontFamily: fonts.bold700,
            fontSize: 14,
          }}>
          Changes to This Privacy Policy
        </Text>
        <Text
          style={{
            fontFamily: fonts.regular400,
            fontSize: 14,
            marginBottom: 10,
          }}>
          We may update our Privacy Policy from time to time. Thus, you are
          advised to review this page periodically for any changes. We will
          notify you of any changes by posting the new Privacy Policy on this
          page. This policy is effective as of 2021-10-11
        </Text>

        <Text
          style={{
            fontFamily: fonts.bold700,
            fontSize: 14,
          }}>
          Contact Us
        </Text>
        <Text
          style={{
            fontFamily: fonts.regular400,
            fontSize: 14,
          }}>
          If you have any questions or suggestions about our Privacy Policy, do
          not hesitate to contact us at dumbways.dev@gmail.com.
        </Text>

        <Text
          style={{
            fontFamily: fonts.regular400,
            fontSize: 14,
            marginBottom: 10,
          }}>
          This privacy policy page was created at{' '}
          <LinkToWebsite
            title="privacypolicytemplate.net"
            link="https://www.privacypolicytemplate.net/"
            style={{
              marginBottom: 0,
              marginLeft: 10,
            }}
          />{' '}
          and modified/generated by{' '}
          <LinkToWebsite
            title="App Privacy Policy Generator"
            link="https://app-privacy-policy-generator.nisrulz.com/"
            style={{
              marginBottom: 0,
              marginLeft: 10,
            }}
          />
        </Text>
      </View>
    </Layout>
  );
};

export default Privacy;
