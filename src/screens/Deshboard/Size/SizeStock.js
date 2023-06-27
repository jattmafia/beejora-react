import {Box, Button, Checkbox, Divider, Flex, Image, Text} from 'native-base';
import React, {useState} from 'react';
import {StyleSheet, TextInput} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import DarkHeader from '../../../component/header/DarkHeader';
import {SortImportantData} from '../../../Redux/Actions';
import {handleStock} from '../../../Redux/Reducers/ProductVarientReducer';

const SizeStock = ({navigation}) => {
  const dispatch = useDispatch();
  const [stockQty, setstockQty] = React.useState(false);
  const _stock = useSelector(state => state);
  const {ProductVariantInfo, SizeSet} = _stock.ProductSize;
  const getSortedSizeProductVariant = SortImportantData(ProductVariantInfo);
  const [StockInput, setStockInput] = useState(10);

  const handleSaveSize = () => {
    if (stockQty === null) {
      dispatch(handleStockNull(StockInput));
      navigation.navigate('SizeSummary');
    }
    else (stockQty); {
      dispatch(handleStock(StockInput));
      navigation.navigate('SizeSummary');
    }
  };

  return (
    <Box style={styles.main}>
      <DarkHeader navigation={navigation} routeName={'Stock'} />
      <Box w={'90%'} p={3} alignSelf={'center'} bg={'#fff'} my={5}>
        {/* <Product_Variant items={getSortedSizeProductVariant} /> */}
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
                {SizeSet || '0'}
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
                placeholder={'Add'}
                keyboardType="numeric"
                  onChangeText={val => setStockInput(val)}
                  value={StockInput}
                  // placeholder={StockInput}
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
  const {articleCode, colorsSelected} = items;

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
          source={{uri: items.uri?.uri}}
          alt={'product-img'}
        />
      </Box>
      <Box>
        <Text color={'#000'} fontSize={14}>
          Article Code: {articleCode}
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

export default SizeStock;
