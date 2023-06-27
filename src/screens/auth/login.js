import { Box, Button, Image, Input, ScrollView, Text, } from 'native-base';
import { Linking } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { clearData } from '../../Redux/DefaultData';
import { PostRequest, storeToken, createSession, getSession } from '../../Utilities';
import {
  handleAttriAndStyles,
  handleCatelog,
  handleSize,
  handleStock,
  setProductVariant,
} from '../../Redux/Reducers/ProductVarientReducer';
import { AppUrl } from '../AppUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ navigation }) => {
  // let dispatch = useDispatch()
  // clearData(dispatch, setProductVariant)
  // clearData(dispatch, handleAttriAndStyles)
  // clearData(dispatch, handleCatelog)
  // clearData(dispatch, handleSize)
  // clearData(dispatch, handleStock)
  const [number, setNumber] = useState();
  const [password, setPassword] = useState();

  useEffect(() => {
    getSession((result) => {
      if (result.data.token) {
        navigation.navigate("AfterLogin")
      } else {
        // navigation.navigate("AppAuthScreens")
      }
    })
  }, [])


  const handleSellerLogin = () => {
    // navigation.navigate("AfterLogin")

    // if(number.length<=0 || password.length<=0){
    //     alert("Please fill all the fields");
    //     return;
    // }
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    // let requestBody= new FormData();
    // requestBody.append("mobile",number);
    // requestBody.append("password",password);
    let requestBody = JSON.stringify({
      mobile: number,
      password: password,
    });

    PostRequest(AppUrl.login, headers, 'POST', requestBody, 'login').then(
      res => {
        console.log('Login res from api', res);
        storeToken(res.token || 'xox');
        createSession(res, (onStored) => {
          if (onStored) {
            navigation.navigate('AfterLogin');
          } else {

          }
        })
      },
    );
  };
  return (
    <Box bg={'#F7FCFF'} flex={1}>
      <ScrollView
        py={10}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always"
        contentContainerStyle={{
          alignItems: 'center',
        }}>
        {/* <Image
          source={require('../../assets/other/logobeejora.jpeg')}
          alt="logo"
          resizeMode="center"
          w={150}
        /> */}
        <Image
          source={require('../../assets/other/logobeejora.jpeg')}
          alt="logo"
          resizeMode="contain"
          w={200}
          height={200}
          my={5}
        />

        <Box
          w={'90%'}
          bg={'#FFFFFF'}
          p={11}
          borderColor={'#D9D9D9'}
          borderWidth={1}
          borderRadius={11}
          shadow={4}
          py={10}
          px={5}>
          <Text
            color={'#484848'}
            fontSize={17}
            lineHeight={22}
            fontWeight={'500'}
            my={2}>
            Mobile Number
          </Text>
          <Input
            placeholder="Enter your mobile number"
            keyboardType='number-pad'
            placeholderTextColor={'#666666'}
            h={49}
            borderRadius={5}
            borderColor={'#B5B5B5'}
            borderWidth={1}
            fontSize={17}
            lineHeight={22}
            fontWeight={'400'}
            onChangeText={val => setNumber(val)}
          />
          <Text
            color={'#484848'}
            fontSize={17}
            lineHeight={22}
            fontWeight={'500'}
            mt={5}
            mb={2}>
            Password
          </Text>
          <Input
            placeholder="Enter your password"
            placeholderTextColor={'#666666'}
            h={49}
            borderRadius={5}
            borderColor={'#B5B5B5'}
            borderWidth={1}
            fontSize={17}
            lineHeight={22}
            fontWeight={'400'}
            onChangeText={val => setPassword(val)}
          />
          {/* <Text
            color={'#1492E6'}
            fontSize={13}
            lineHeight={17}
            fontWeight={'500'}
            alignSelf={'flex-end'}
            my={2}>
            Forgot Password?
          </Text> */}
          <Button
            bg={'#1492E6'}
            h={49}
            mt={5}
            borderRadius={5}
            borderColor={'#B5B5B5'}
            borderWidth={1}
            px={5}
            _text={{
              color: '#fff',
              fontSize: 17,
              fontWeight: '500',
              lineHeight: 22,
            }}
            _pressed={{ bg: '#1492E6' }}
            onPress={() => handleSellerLogin()}>
            LOGIN
          </Button>

          <Box marginTop={2} flexDirection='row' alignSelf={'center'} alignItems='center'>
            <Text>Don't have an account?</Text>
            <Text fontSize={16} fontWeight='bold' onPress={()=>{Linking.openURL('https://seller.beejora.com/signup')}}> Sign Up</Text>

          </Box>
        </Box>
        <Box h={100}></Box>
      </ScrollView>
    </Box>
  );
};

export default Login;
