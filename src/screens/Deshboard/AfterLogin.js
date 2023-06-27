import {
  Avatar,
  Box,
  Divider,
  Image,
  Pressable,
  ScrollView,
  Text,
} from 'native-base';
import React, { useState, useEffect } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { deleteSession, getSession } from '../../Utilities';

const Afterlogin = ({ navigation, route }) => {
  const [User, setUser] = useState([]);
  useEffect(() => {
    userData()
  }, [])

  const userData = () => {
    getSession((result) => {
      if (result) {
        // setUser(result.user)
        setUser(result.data.user)
      } else {
        // navigation.navigate("AppAuthScreens")
      }
    })
  }

  const Logout = () => {
    deleteSession((onComplete) => {
      if (onComplete) {
        navigation.navigate('Auth')
      } else {
        console.log('not')
      }
    }, (onFale) => {
      console.log(onFale)
    })
  }
  return (
    <Box flex={1}>
      <ScrollView flex={1}>
        <Box bg={'#1492E6'} h={75} justifyContent={'center'} px={140} >
          <Image
            source={require('../../assets/other/logobeejora.jpeg')}
            // source={require('../../assets/other/logo2.png')}
            alt="logo"
            resizeMode="contain"
          />
        </Box>
        <Box p={5} bg={'#F7F7F7'} flex={1}>
          <Box
            w={'100%'}
            bg={'#fff'}
            shadow={2}
            borderRadius={5}
            borderColor={'#F7F7F7'}
            borderWidth={1}>
            <Box flexDir={'row'} p={5} alignItems={'center'}>
              <Avatar
                bg={'#1492E6'}
                source={{
                  uri: 'https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png',
                }}
                mr={5}
              />
              <Box w={'80%'}>
                <Text
                  color={'#484848'}
                  fontSize={19}
                  lineHeight={25}
                  fontWeight={'500'}>
                  {User.company_name}
                </Text>
                <Text
                  color={'#7E7E7E'}
                  fontSize={13}
                  lineHeight={17}
                  fontWeight={'500'}>
                  {User.name}
                </Text>
                <Text
                  color={'#1492E6'}
                  fontSize={17}
                  lineHeight={22}
                  fontWeight={'500'}>
                  GST No. {User.gst_number}
                </Text>
              </Box>
            </Box>
            <Divider bg={'#E2E2E2'} thickness={2} />
            <Box p={5}>
              <Box flexDir={'row'} alignItems="center">
                <MaterialCommunityIcons
                  name="phone-in-talk"
                  size={19}
                  color={'#000'}
                />
                <Text
                  color={'#484848'}
                  fontSize={14}
                  lineHeight={19}
                  fontWeight={'500'}
                  ml={2}>
                  {' '}
                  {User.mobile}
                </Text>
              </Box>
              <Box flexDir={'row'} mt={2} alignItems="center">
                <EvilIcons name="envelope" size={19} color={'#000'} />
                <Text
                  color={'#484848'}
                  fontSize={14}
                  lineHeight={19}
                  fontWeight={'500'}
                  ml={2}>
                  {User.email}
                </Text>
              </Box>
            </Box>
          </Box>
          <Box
            w={'100%'}
            bg={'#fff'}
            shadow={2}
            borderRadius={5}
            borderColor={'#F7F7F7'}
            borderWidth={1}
            mt={5}>
            {/* Add Product Tab */}
            <Pressable
              flexDir={'row'}
              alignItems={'center'}
              p={5}
              onPress={() => navigation.navigate('AddProduct')}>
              <Feather
                name="box"
                size={19}
                color={'#000'}
                style={{
                  width: 45,
                  height: 45,
                  borderRadius: 30,
                  backgroundColor: '#E8F6FF',
                  paddingTop: 12,
                  paddingLeft: 12,
                }}
              />
              <Text
                color={'#484848'}
                fontSize={16}
                lineHeight={22}
                fontWeight={'500'}
                ml={2}>
                Add Product
              </Text>
              <Entypo
                name="chevron-thin-right"
                size={22}
                color={'#000'}
                style={{
                  position: 'absolute',
                  right: 10,
                }}
              />
            </Pressable>
            <Divider bg={'#E2E2E2'} thickness={2} />
            {/* Track Order Tab */}
            <Pressable
              flexDir={'row'}
              alignItems={'center'}
              p={5}
              onPress={() => navigation.navigate('TrackOrder')}>
              <MaterialCommunityIcons
                name="truck-check-outline"
                size={19}
                color={'#000'}
                style={{
                  width: 45,
                  height: 45,
                  borderRadius: 30,
                  backgroundColor: '#E8F6FF',
                  paddingTop: 12,
                  paddingLeft: 12,
                  transform: [{ rotateY: '180deg' }],
                }}
              />
              <Text
                color={'#484848'}
                fontSize={16}
                lineHeight={22}
                fontWeight={'500'}
                ml={2}>
                Track Order
              </Text>
              <Entypo
                name="chevron-thin-right"
                size={22}
                color={'#000'}
                style={{
                  position: 'absolute',
                  right: 10,
                }}
              />
            </Pressable>
            <Divider bg={'#E2E2E2'} thickness={2} />

            <Divider bg={'#E2E2E2'} thickness={2} />
            {/* ProductSubmission Tab */}
            <Pressable
              onPress={() => navigation.navigate('ProductSubmission')}
              flexDir={'row'}
              alignItems={'center'}
              p={5}>
              <Ionicons
                name="md-person-outline"
                size={19}
                color={'#000'}
                style={{
                  width: 45,
                  height: 45,
                  borderRadius: 30,
                  backgroundColor: '#E8F6FF',
                  paddingTop: 12,
                  paddingLeft: 12,
                }}
              />
              <Text
                color={'#484848'}
                fontSize={16}
                lineHeight={22}
                fontWeight={'500'}
                ml={2}>
                Products
              </Text>
              <Entypo
                name="chevron-thin-right"
                size={22}
                color={'#000'}
                style={{
                  position: 'absolute',
                  right: 10,
                }}
              />
            </Pressable>
          </Box>
        </Box>
        <Box p={5} bg={'#F7F7F7'} flex={1}>
          <Text
            color={'#484848'}
            fontSize={16}
            lineHeight={22}
            fontWeight={'500'}
            ml={2}>
            Settings
          </Text>
          <Pressable
            onPress={() => Logout()}
            flexDir={'row'}
            alignItems={'center'}
            p={5}
            w={'100%'}
            bg={'#fff'}
            shadow={2}
            borderRadius={5}
            borderColor={'#F7F7F7'}
            borderWidth={1}
            mt={5}>
            <AntDesign
              name="poweroff"
              size={19}
              color={'#000'}
              style={{
                width: 45,
                height: 45,
                borderRadius: 30,
                backgroundColor: '#E8F6FF',
                paddingTop: 12,
                paddingLeft: 12,
              }}
            />
            <Text
              color={'#484848'}
              fontSize={16}
              lineHeight={22}
              fontWeight={'500'}
              ml={2}>
              Logout
            </Text>
          </Pressable>
        </Box>
        <Box h={50} p={5} bg={'#F7F7F7'} flex={1}></Box>
      </ScrollView>
    </Box>
  );
};

export default Afterlogin;
