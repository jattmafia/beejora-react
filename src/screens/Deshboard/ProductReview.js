import {Box, Button, Divider, Flex, Image, ScrollView, Text} from 'native-base';
import React from 'react';
import {StyleSheet} from 'react-native';
import DarkHeader from '../../component/header/DarkHeader';

const ProductReview = ({navigation, route}) => {
  console.log('route.params////////////////', route.params);
  return (
    <>
      <Text>Product is submit for review</Text>
    </>
  );
  const {variantsOfProduct} = route.params;
  return (
    <Box flex={1}>
      {/* Header */}
      <DarkHeader
        navigation={navigation}
        routeName={'Products in Review'}
        searchbar={true}
      />
      <ScrollView p={5}>
        <Text>Showing: 1 Products</Text>
        <Box mt={2}>
          <Box p={5} h={'133px'} bg={'#FFF6EF'} w={'100%'} alignSelf={'center'}>
            <Text fontSize={18} color={'#484848'}>
              RAHUL FOOTWEAR
            </Text>
            <Text
              fontSize={16}
              color={'#484848'}>{`Men Footwear > Formal`}</Text>
            <Text fontSize={18} color={'#1492E6'} mt={2}>
              ₹599
            </Text>
            <Text fontSize={18} color={'#434343'} style={styles.mrp}>
              MRP: ₹899
            </Text>
            <Text
              fontSize={18}
              color={'#1E1E1E'}
              mt={2}
              alignSelf={'flex-end'}
              position={'relative'}
              bottom={'30px'}>
              MOQ: 12 Pairs
            </Text>
          </Box>
        </Box>
        <Box bg={'#fff'} p={3}>
          <Product_Variant items={variantsOfProduct} />
        </Box>
      </ScrollView>
      <Box
        h={'100px'}
        bg={'#fff'}
        borderTopWidth={1}
        borderColor={'#D0D0D0'}
        justifyContent={'center'}>
        <Button
          h={'56px'}
          w={'90%'}
          alignSelf={'center'}
          bg={'#1492E6'}
          _text={{
            fontSize: 18,
            color: '#fff',
          }}
          _pressed={{
            bg: '#1492E6',
          }}
          onPress={() => navigation.navigate('AfterLogin')}>
          Done
        </Button>
      </Box>
    </Box>
  );
};

const Product_Variant = ({items}) => {
  const {articleCode, colorsSelected} = items;
  return (
    <Flex
      p={3}
      bg={'#fff'}
      direction="row"
      borderWidth={1}
      borderRadius={6}
      borderColor={'#B1B1B1'}>
      <Box w={'100px'} h={'100px'} mr={5} p={2}>
        <Image
          w={'100%'}
          h={'85px'}
          resizeMode={'cover'}
          borderRadius={3}
          source={{uri: items.uri?.uri}}
          alt={'product-img'}
        />
      </Box>
      <Box>
        <Text color={'#000'} fontSize={14}>
          Article Code: {articleCode}
        </Text>
        <Text color={'#000'} fontSize={14} mt={2}>
          SetType: set Combo
        </Text>
        <Flex direction="row" alignItems={'center'} h="20px">
          <Text color={'#0C65A1'} fontSize={14}>
            Color:{' '}
          </Text>
          {colorsSelected.map((item, index) => {
            return (
              <Flex direction="row" alignItems={'center'} h="20px" key={index}>
                <Text color={'#0C65A1'} fontSize={14}>
                  {item}
                </Text>
                {colorsSelected.length - 1 !== index && (
                  <Divider
                    bg="#0C65A1"
                    thickness="1"
                    mx="1"
                    orientation="vertical"
                  />
                )}
              </Flex>
            );
          })}
        </Flex>
        <Text color={'#000'} fontSize={14}>
          Stock: 10 Lots
        </Text>
      </Box>
    </Flex>
  );
};

const styles = StyleSheet.create({
  mrp: {
    backgroundColor: '#F1F1F1',
    height: 30,
    width: 109,
    paddingHorizontal: 10,
    textAlign: 'center',
    position: 'absolute',
    bottom: 24,
    left: 70,
  },
});

export default ProductReview;
