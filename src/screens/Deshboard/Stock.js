import {Box, Button, Checkbox, Divider, Flex, Image, Text} from 'native-base';
import React from 'react';
import {StyleSheet, TextInput} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import DarkHeader from '../../component/header/DarkHeader';
import {SortImportantData} from '../../Redux/Actions';
import {handleStock, handleStockNull} from '../../Redux/Reducers/ProductVarientReducer';

const Stock = ({navigation}) => {
  const dispatch = useDispatch();
  const [stockQty, setstockQty] = React.useState('');
  const [StockInput, setStockInput] = React.useState('');
  const _stock = useSelector(state => state);
  console.log('_stock', _stock);
  const {ProductVariantInfo} = _stock.Product;
  const getSortedProductVariant = SortImportantData(ProductVariantInfo);

  const handleSaveSize = () => {
    if (stockQty === null) {
      dispatch(handleStockNull(StockInput));
      navigation.navigate('Summary');
    }
    else (stockQty); {
      dispatch(handleStock(StockInput));
      navigation.navigate('Summary');
    }
  };

  return (
    <Box style={styles.main}>
      <DarkHeader navigation={navigation} routeName={'Stock'} />
      <Box w={'90%'} p={3} alignSelf={'center'} bg={'#fff'} my={5}>
        {/* <Product_Variant items={getSortedProductVariant} /> */}
        <Box
          borderWidth={1}
          borderColor={'#CECECE'}
          borderRadius={3}
          flexDir={'row'}
          alignItems={'center'}>
          <Box flex={1}>
            <Box
              h={'56px'}
              pl={3}
              bg={'#FFF6EF'}
              justifyContent={'center'}
              borderBottomWidth={1}
              borderColor={'#CECECE'}
              borderRightWidth={1}>
              <Text fontSize={18} color={'#434343'}>
                Size Set
              </Text>
            </Box>
            <Box
              h={'56px'}
              pl={3}
              bg={'#fff'}
              justifyContent={'center'}
              borderRightWidth={1}
              borderColor={'#CECECE'}>
              <Text fontSize={18} color={'#434343'}>
                {_stock?.Product.SizeSet
                  ? _stock.Product.SizeSet
                  : _stock.Product.ProductSize.SizeSet}
              </Text>
            </Box>
          </Box>
          <Box flex={1}>
            <Box
              h={'56px'}
              pl={3}
              bg={'#FFF6EF'}
              justifyContent={'center'}
              borderBottomWidth={1}
              borderColor={'#CECECE'}
              borderRightWidth={1}>
              <Text fontSize={18} color={'#434343'}>
                Set Stock
              </Text>
            </Box>
            <Box
              h={'56px'}
              bg={'#fff'}
              justifyContent={'center'}
              borderRightWidth={1}
              borderColor={'#CECECE'}>
              <Checkbox
                onChange={() => setstockQty(!stockQty)}
                borderWidth={1}
                borderColor={'#1492E6'}
                alignSelf={'center'}
                colorScheme="blue"
                accessibilityLabel="This is a dummy checkbox"
              />
            </Box>
          </Box>
          <Box flex={1}>
            <Box
              h={'56px'}
              pl={3}
              bg={'#FFF6EF'}
              justifyContent={'center'}
              borderBottomWidth={1}
              borderColor={'#CECECE'}>
              <Text fontSize={18} color={'#434343'}>
                Stock Qty
              </Text>
            </Box>
            <Box h={'56px'} pl={3} bg={'#fff'} justifyContent={'center'}>
              {stockQty ? (
                <TextInput
                  onChangeText={val => setStockInput(val)}
                  keyboardType="numeric"
                  value={StockInput}
                  placeholder={StockInput + 'Add Stock'}
                  placeholderTextColor={'grey'}
                />
              ) : (
                <Text
                  fontSize={18}
                  color={
                    stockQty ? '#1492E6' : '#434343'
                  }>{`${'Unlimited'}`}</Text>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
      <Button
        style={styles.save}
        bg={'#1492E6'}
        borderColor={'#E2E2E2'}
        position={'absolute'}
        bottom={10}
        w={'90%'}
        alignSelf={'center'}
        _text={{
          color: '#fff',
          fontSize: 19,
        }}
        onPress={handleSaveSize}>
        Save
      </Button>
    </Box>
  );
};

const Product_Variant = ({items}) => {
  return (
    <Flex p={3} bg={'#fff'} direction="row">
      <Box
        w={'100px'}
        h={'100px'}
        mr={5}
        p={2}
        borderWidth={1}
        borderColor={'#CECECE'}
        borderRadius={3}>
        <Image
          w={'100%'}
          h={'85px'}
          resizeMode={'cover'}
          borderRadius={3}
          source={{uri: items?.uri[0]?.uri}}
          alt={'product-img'}
        />
      </Box>
      <Box>
        <Text color={'#000'} fontSize={14}>
          Article Code: {items?.articleCode}
        </Text>
        <Flex direction="row" alignItems={'center'} h="20px">
          <Text color={'#0C65A1'} fontSize={14}>
            Color:{' '}
          </Text>
          {items?.colorsSelected.map((item, index) => {
            return (
              <Flex direction="row" alignItems={'center'} h="20px" key={index}>
                <Text color={'#0C65A1'} fontSize={14}>
                  {item}
                </Text>
                {items?.colorsSelected.length - 1 !== index && (
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
          {/* </Text> */}
        </Flex>
      </Box>
    </Flex>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
});

export default Stock;
