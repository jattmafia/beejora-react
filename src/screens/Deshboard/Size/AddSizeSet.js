import {
  Actionsheet,
  Box,
  Button,
  Center,
  Checkbox,
  Divider,
  FlatList,
  Icon,
  Input,
  Modal,
  Pressable,
  Text,
  useDisclose,
} from 'native-base';
import React, {useState} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import DarkHeader from '../../../component/header/DarkHeader';
import {handleSize} from '../../../Redux/Reducers/ProductVarientReducer';
// Icon
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import {useDispatch, useSelector} from 'react-redux';
import {handleSizeSet} from '../../../Redux/Reducers/ProductSizeReducer';
import {AppUrl} from '../../AppUrl';
import {GetRequest} from '../../../Utilities';
const AddSizeSet = ({navigation}) => {
  const _state = useSelector(state => state);
  const {SizeSet} = _state.Product;
  const dispatch = useDispatch();
  const [sizeAndPriceList, setSizeAndPriceList] = React.useState([]);
  const [openModal, setOpenModal] = React.useState(false);
  const [addedSize, setAddedSize] = React.useState(0);
  let [service, setService] = React.useState('UK Sizes');
  const [LoadingSizeOrigin, setLoadingSizeOrigin] = useState(true);
  const [sizeandprice, setSizeandprice] = useState([]);
  const [SizeOrigin, setSizeOrigin] = useState([]);
  const [LoadingSizes, setLoadingSizes] = useState(true);

  const handleSaveSize = () => {
    let _size = sizeAndPriceList[0][0];
    console.log('_size', _size);
    // return;
    try {
      dispatch(handleSizeSet(_size));
      navigation.navigate('SizeStock', {routeNameToSize: 'SizeSummary'});
    } catch (error) {
      console.log('Locate AddSizeSet', error);
    }
  };
  const getSizeOrigin = () => {
    GetRequest(AppUrl.sizeOrigin, {}, 'GET')
      .then(res => res.json())
      .then(resp => {
        console.log('resp origin', resp);
        if (resp?.results.length) {
          setSizeOrigin(resp.results);
          setLoadingSizeOrigin(false);
        }
      });
  };
  const getSizes = () => {
    GetRequest(AppUrl.sizes, {}, 'GET')
      .then(res => res.json())
      .then(resp => {
        console.log('resp', resp);
        if (resp?.results.length) {
          setSizeandprice(resp.results);
          setLoadingSizes(false);
        }
      });
  };
  const {isOpen, onOpen, onClose} = useDisclose();
  React.useEffect(() => {
    getSizeOrigin();
    getSizes();
  }, []);

  // const sizeandprice = [
  //   {size: 5, price: 499},
  //   {size: 6, price: 499},
  //   {size: 7, price: 499},
  //   {size: 8, price: 499},
  //   {size: 9, price: 499},
  //   {size: 10, price: 499},
  // ];

  const handleSizeAndPrice = (size, price) => {
    let _sizeandprice = [...sizeAndPriceList, [size, price]];
    setSizeAndPriceList(_sizeandprice);
  };

  return (
    <Box style={styles.main}>
      {/* Header */}
      <DarkHeader navigation={navigation} routeName={'Add Size'} />
      {sizeAndPriceList.length === 0 && (
        <Box bg={'#fff'} p={5} flex={1}>
          <Text styles={styles.title}>Size Included</Text>
          <Button
            style={styles.addColor}
            _text={{
              color: '#1492E6',
              fontSize: 15,
            }}
            onPress={() => onOpen(!isOpen)}>
            + Add Size
          </Button>
        </Box>
      )}
      {sizeAndPriceList.length !== 0 && (
        <Box p={5}>
          <Box
            flexDir={'row'}
            alignItems={'center'}
            justifyContent={'space-between'}>
            <Text fontSize={18} color={'#484848'}>
              Size Included
            </Text>
            <Button
              w={'148px'}
              h={'43px'}
              bg={'#fff'}
              borderWidth={1}
              borderColor={'#1492E6'}
              borderRadius={6}
              _text={{
                fontSize: 18,
                color: '#1492E6',
              }}
              _pressed={{bg: '#fff'}}
              onPress={onOpen}>
              Edit Size Chart
            </Button>
          </Box>

          <Box
            borderWidth={1}
            borderColor={'#D5D5D5'}
            borderRadius={6}
            justifyContent={'space-around'}
            my={5}>
            <Box
              h={'60px'}
              flexDir={'row'}
              alignItems={'center'}
              justifyContent={'space-between'}
              w={'100%'}
              bg={'#F7F7F7'}
              borderTopRadius={6}
              borderBottomWidth={1}
              borderColor={'#D5D5D5'}
              px={5}>
              <Text fontSize={18} color={'#9B9B9B'}>
                Sizes
              </Text>
              <Text fontSize={18} color={'#9B9B9B'}>
                Extra Price
              </Text>
            </Box>
            {sizeAndPriceList.map((item, index) => {
              console.log(item[0]);
              return (
                <Box
                  key={index}
                  h={'50px'}
                  flexDir={'row'}
                  alignItems={'center'}
                  justifyContent={'space-between'}
                  px={5}
                  borderBottomWidth={
                    sizeAndPriceList.length - 1 !== index ? 1 : 0
                  }
                  borderColor={'#C0C0C0'}>
                  <Text fontSize={18} color={'#494949'}>
                    {item[0]}
                  </Text>
                  <Text fontSize={18} color={'#494949'}>
                    ₹{0}
                  </Text>
                </Box>
              );
            })}
          </Box>
        </Box>
      )}
      <Center>
        <Center>
          <Actionsheet isOpen={isOpen} onClose={onClose}>
            <Actionsheet.Content
              h={'600px'}
              w={'100%'}
              p={0}
              position={'absolute'}
              bottom={0}
              bg={'#fff'}>
              <Box style={styles.selectHeader}>
                <Text style={styles.selectHeadingText}>Custom Size Set</Text>
                <AntDesign
                  name="closecircle"
                  size={30}
                  color={'#95AEC5'}
                  onPress={onClose}
                />
              </Box>
              <Box w={'100%'}>
                <Box
                  px={4}
                  flexDir={'row'}
                  alignItems={'center'}
                  justifyContent={'space-between'}
                  w={'100%'}>
                  <Text color={'#4E4E4E'} fontSize={17}>
                    Select Size Set
                  </Text>
                  <Pressable
                    onPress={() => setOpenModal(true)}
                    borderWidth={1}
                    borderColor={'#E2E2E2'}
                    borderRadius={5}
                    w={'130px'}
                    h={'51px'}
                    flexDir={'row'}
                    alignItems={'center'}
                    justifyContent={'space-around'}>
                    <Text>{service}</Text>
                    <Entypo name={'chevron-down'} size={25} color={'#000'} />
                  </Pressable>
                  {openModal && (
                    <SizeType
                      SOrigin={SizeOrigin}
                      setService={setService}
                      openModal={openModal}
                      setOpenModal={setOpenModal}
                    />
                  )}
                </Box>
              </Box>
              <Box
                w={'100%'}
                mt={2}
                flexDir={'row'}
                alignItems={'center'}
                justifyContent={'space-between'}
                px={4}>
                <Text color={'#4E4E4E'} fontSize={'17px'}>
                  Sizes
                </Text>
                <Text color={'#4E4E4E'} fontSize={'17px'}>
                  Extra Price
                </Text>
              </Box>
              <Box h={'320px'} w={'100%'}>
                <ScrollView>
                  {sizeandprice.map((item, index) => {
                    return (
                      <Box key={index} h={50} mt={1}>
                        <Box
                          flexDir={'row'}
                          alignItems={'center'}
                          justifyContent={'space-between'}
                          mx={4}
                          my={1}>
                          <Checkbox
                            onChange={() =>
                              handleSizeAndPrice(
                                item.size_code,
                                item.size_stock,
                              )
                            }
                            value="one"
                            borderColor={'#A9A9A9'}
                            _checked={{
                              borderWidth: 1,
                              borderColor: '#1492E6',
                              backgroundColor: '#1492E6',
                            }}>
                            {item.size_code}
                          </Checkbox>
                          <Text
                            h={'35px'}
                            w={'93px'}
                            borderWidth={1}
                            borderColor={'#C0C0C0'}
                            borderRadius={2}
                            textAlign={'center'}
                            fontSize={17}
                            pt={1}>
                            ₹{0}
                          </Text>
                        </Box>
                        <Divider color={'#C9C9C9'} my={2} />
                      </Box>
                    );
                  })}
                </ScrollView>
              </Box>
              <Box w={'100%'} h={50} px={5}>
                <Button
                  style={styles.save}
                  onPress={onClose}
                  w={'100%'}
                  bg={'#1582C9'}
                  borderColor={'#1582C9'}
                  my={5}
                  _text={{
                    color: '#fff',
                    fontSize: 19,
                  }}
                  _pressed={{
                    bg: '#1582C9',
                  }}>
                  Create Size Set
                </Button>
              </Box>
            </Actionsheet.Content>
          </Actionsheet>
        </Center>
      </Center>
      <Button
        style={styles.save}
        bg={sizeAndPriceList.length === 0 ? '#E2E2E2' : '#1492E6'}
        borderColor={'#E2E2E2'}
        position={'absolute'}
        bottom={10}
        w={'90%'}
        alignSelf={'center'}
        _text={{
          color: '#fff',
          fontSize: 19,
        }}
        _pressed={{bg: addedSize === 0 ? '#E2E2E2' : '#1492E6'}}
        onPress={handleSaveSize}>
        Save
      </Button>
    </Box>
  );
};

const SizeType = ({SOrigin, setService, openModal, setOpenModal}) => {
  const handleSelection = type => {
    setService(type);
    setOpenModal(false);
  };
  return (
    <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
      <Modal.Content maxWidth="300px">
        <Box p={5}>
          {SOrigin.map(item => {
            return (
              <>
                <Text
                  style={styles.pickerItems}
                  onPress={() => handleSelection(item.origin_name)}>
                  {item.origin_name}
                </Text>
                <Divider color={'#C9C9C9'} my={2} />
              </>
            );
          })}
          {/* <Text
            style={styles.pickerItems}
            onPress={() => handleSelection('UK Size')}>
            UK Size
          </Text>
          <Divider color={'#C9C9C9'} my={2} />
          <Text
            style={styles.pickerItems}
            onPress={() => handleSelection('Europe Size')}>
            Europe Size
          </Text> */}
        </Box>
      </Modal.Content>
    </Modal>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
    color: '#484848',
  },
  addColor: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#1492E6',
    borderRadius: 6,
    height: 48,
    width: '100%',
    marginTop: 30,
  },
  save: {
    borderWidth: 1,
    borderRadius: 6,
    height: 48,
  },
  selectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    width: '100%',
    paddingHorizontal: 15,
  },
  selectHeadingText: {
    color: '#1A1A1A',
    fontSize: 18,
    fontWeight: '500',
  },
  subTitle: {
    color: '#4E4E4E',
    fontSize: 17,
  },
  colorlist: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 6,
  },
  pickerItems: {
    fontSize: 20,
    color: '#272727',
    paddingVertical: 4,
  },
});

export default AddSizeSet;

{
  /* {!createSizeSet ?
                                <>
                                    <ScrollView h={230} bg={'#fff'} w={'100%'} showsVerticalScrollIndicator={false}
                                        _pressed={{ bg: '#fff' }}>
                                        <Text style={styles.subTitle}>Create size set for Men Shoes - 3 lot Size</Text>
                                        <Box flexDir={'row'} justifyContent={'space-between'} my={5}>
                                            <Box w={'40%'} >
                                                <Text mb={2}>Size</Text>
                                                <Input placeholder='size' keyboardType='number-pad'
                                                    _text={{
                                                        fontSize: 20,
                                                        color: '#4E4E4E'
                                                    }} style={styles.sqInput}
                                                    _focus={{
                                                        borderColor: '#C0C0C0',
                                                        bg: '#fff'
                                                    }}
                                                />
                                            </Box>
                                            <Box w={'40%'}>
                                                <Text mb={2} textAlign={'right'}>Quantity</Text>
                                                <Input placeholder='size' keyboardType='number-pad' max={5}
                                                    _text={{
                                                        fontSize: 20,
                                                        color: '#4E4E4E'
                                                    }}
                                                    _focus={{
                                                        borderColor: '#C0C0C0',
                                                        bg: '#fff'
                                                    }}
                                                    style={styles.sqInput} />
                                                <Text position={'absolute'} top={10} right={3}>units</Text>
                                                <Text textAlign={'right'} color={'#DB0909'} mt={2}>X Remove</Text>
                                            </Box>
                                        </Box>
                                        <Pressable style={styles.colorlist} onPress={() => onOpen()}>
                                            <Box bg={'#E1E1E1'} w={'32px'} h={'32px'} mr={3} borderRadius={30}
                                                alignItems={'center'}
                                            >
                                                <Text fontSize={20} color={'#467DF2'} >+</Text>
                                            </Box>
                                            <Text fontSize={14} color={'#467DF2'} >Add More Size</Text>
                                        </Pressable>
                                    </ScrollView>
                                    <Button
                                        style={styles.save}
                                        w={'100%'}
                                        bg={'#1582C9'} borderColor={'#1582C9'}
                                        my={5}
                                        _text={{
                                            color: '#fff',
                                            fontSize: 19,
                                        }}
                                        _pressed={{
                                            bg: '#1582C9'
                                        }}
                                        onPress={() => setcreateSizeSet(true)}
                                    >Create Size Set</Button>
                                </>
                                :
                            } */
}
