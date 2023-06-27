import {
  Actionsheet,
  Alert,
  Box,
  Button,
  Center,
  Checkbox,
  Divider,
  Icon,
  Input,
  Modal,
  Pressable,
  ScrollView,
  Text,
  useDisclose,
} from 'native-base';
import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import DarkHeader from '../../component/header/DarkHeader';
import {handleSize} from '../../Redux/Reducers/ProductVarientReducer';
// Icon
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';

import {GetRequest} from '../../Utilities';
import {AppUrl} from '../AppUrl';
const Addsize = ({navigation}) => {
  const _state = useSelector(state => state);
  const {SizeSet} = _state.Product;
  console.log('SizeSet', SizeSet);
  const dispatch = useDispatch();
  const [createSizeSet, setcreateSizeSet] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);
  const [openModal2, setOpenModal2] = React.useState(false);
  const [addedSize, setAddedSize] = React.useState(SizeSet || 0);
  const [SizeSelected, setSizeSelected] = useState(
    SizeSet ? SizeSet.split('/')[0] : 'Select',
  );
  const [size, setSize] = React.useState('');
  const [quantity, setQuantity] = React.useState(
    SizeSet ? SizeSet.split('/')[1] : '',
  );
  let [service, setService] = React.useState(
    SizeSet ? SizeSet.split('/')[2] : 'choose origin',
  );
  const [LoadingSizeOrigin, setLoadingSizeOrigin] = useState(true);
  const [LoadingSizes, setLoadingSizes] = useState(true);
  const [SizesSet, setSizes] = useState([]);
  const [SizeOrigin, setSizeOrigin] = useState([]);

  const getSizeOrigin = () => {
    const headers = {
      Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTY1ODY3MTc4MywiaWF0IjoxNjU4MDY2OTgzLCJqdGkiOiJmZjkzZDEzNmE4Yzc0MTVjYjBiNTE0YzgwNDBlMTg4NCIsInVzZXJfaWQiOjV9.p5FziqgUqUMYWyt0Fn6yYA-9TOM91b2jJnAge6Islek`,
      'Content-Type': 'application/json',
    };
    GetRequest(AppUrl.sizeOrigin, headers, 'GET')
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
    const headers = {
      Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTY1ODY3MTc4MywiaWF0IjoxNjU4MDY2OTgzLCJqdGkiOiJmZjkzZDEzNmE4Yzc0MTVjYjBiNTE0YzgwNDBlMTg4NCIsInVzZXJfaWQiOjV9.p5FziqgUqUMYWyt0Fn6yYA-9TOM91b2jJnAge6Islek`,
      'Content-Type': 'application/json',
    };
    GetRequest(AppUrl.sizes, headers, 'GET')
      .then(res => res.json())
      .then(resp => {
        console.log('resp', resp);
        if (resp?.results.length) {
          setSizes(resp.results);
          setLoadingSizes(false);
        }
      });
  };

  useEffect(() => {
    getSizeOrigin();
    getSizes();
  }, []);

  const handleSaveSize = () => {
    if (addedSize !== 0) {
      dispatch(handleSize(addedSize));
      navigation.navigate('Stock');
    }
  };

  const handleCreateSize = () => {
    if (SizeSelected && SizeSelected != 'Select' && quantity) {
      setcreateSizeSet(true);
    } else {
      alert('Select size and quantity');
    }
  };

  const handleRemove = _item => {
    var newList = [];
    addedSize.splice(item => {
      if (_item != item) {
        newList.push(item);
      }
    });
    setAddedSize(newList);
  };

  const removeSpecificSelectedSize = item => {
    let SizeSelected = [SizeSelected];
    SizeSelected.splice(item, 1);
    setSizeSelected(SizeSelected);
   
  };

  const {isOpen, onOpen, onClose} = useDisclose();
  const {isOpen2, onOpen2, onClose2} = useDisclose();

  return (
    <Box style={styles.main}>
      {/* Header */}
      <DarkHeader navigation={navigation} routeName={'Add Size'} />
      {(SizeSet === '' || SizeSet == null) && addedSize === 0 && (
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
      {(addedSize !== 0 || SizeSet !== null) && (
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
            h={'120px'}
            py={5}
            justifyContent={'space-around'}
            my={5}>
            <Text
              borderBottomWidth={1}
              borderColor={'#D5D5D5'}
              fontSize={18}
              color={'#9B9B9B'}
              pl={5}
              pb={2}>
              Sizes
            </Text>
            <Text fontSize={18} color={'#494949'} pl={5}>
              {addedSize}
            </Text>
          </Box>
        </Box>
      )}
      <Center flex={1} px="2">
        <Center>
          <Actionsheet isOpen={isOpen} onClose={onClose}>
            <Actionsheet.Content
              h={'600px'}
              position={'absolute'}
              bottom={0}
              px={5}
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
              {!createSizeSet ? (
                <>
                  <ScrollView
                    h={230}
                    bg={'#fff'}
                    w={'100%'}
                    showsVerticalScrollIndicator={false}
                    _pressed={{bg: '#fff'}}>
                    <Text style={styles.subTitle}>
                      Create size set for Men Shoes - 3 lot Size
                    </Text>
                    <Box
                      flexDir={'row'}
                      justifyContent={'space-between'}
                      my={5}>
                      <Box w={'40%'}>
                        <Text mb={2}>Size</Text>
                        <Pressable
                          onPress={() => setOpenModal2(true)}
                          borderWidth={1}
                          borderColor={'#E2E2E2'}
                          borderRadius={5}
                          w={'148px'}
                          h={'51px'}
                          flexDir={'row'}
                          alignItems={'center'}
                          justifyContent={'space-around'}>
                          <Text>{SizeSelected}</Text>
                          <Entypo
                            name={'chevron-down'}
                            size={20}
                            color={'#000'}
                          />
                        </Pressable>
                        {openModal2 && (
                          <SizeType
                            setService={setSizeSelected}
                            openModal={openModal2}
                            setOpenModal={setOpenModal2}
                            data={SizesSet}
                          />
                        )}
                        {/* <Center flex={1} px="2">
                          <Center>
                            <Actionsheet isOpen={isOpen2} onClose={onClose2}>
                              <Actionsheet.Content p={5}>
                                <Box style={styles.selectHeader}>
                                  <Text style={styles.selectHeadingText}>
                                    hgjgj
                                  </Text>
                                  <AntDesign
                                    name="closecircle"
                                    size={30}
                                    color={'#95AEC5'}
                                    onPress={onClose}
                                  />
                                </Box>
                                <ScrollView
                                  h={230}
                                  w={'100%'}
                                  showsVerticalScrollIndicator={false}>
                                  {SizesSet.map((item, index) => {
                                    return (
                                      <Actionsheet.Item
                                        style={styles.ItemText}
                                        key={index}
                                        onPress={() =>
                                          handlePickerSelection(item)
                                        }>
                                        {item.size_name}
                                      </Actionsheet.Item>
                                    );
                                  })}
                                </ScrollView>
                              </Actionsheet.Content>
                            </Actionsheet>
                          </Center>
                        </Center> */}
                        {/* <Input
                          placeholder="size"
                          keyboardType="number-pad"
                          _text={{
                            fontSize: 20,
                            color: '#4E4E4E',
                          }}
                          style={styles.sqInput}
                          _focus={{
                            borderColor: '#C0C0C0',
                            bg: '#fff',
                          }}
                          maxLength={2}
                          value={size}
                          onChangeText={setSize}
                        /> */}
                      </Box>
             
            
              
                   <Box w={'40%'}>
                      <Text mb={2} textAlign={'right'}>
                          Quantity
                        </Text>
                    <Box>
                        <Input
                          placeholder="size"
                          keyboardType="number-pad"
                          max={5}
                          _text={{
                            fontSize: 20,
                            color: '#4E4E4E',
                          }}
                          _focus={{
                            borderColor: '#C0C0C0',
                            bg: '#fff',
                          }}
                          maxLength={3}
                          value={addedSize ? addedSize.split('/')[1] : quantity}
                          onChangeText={setQuantity}
                          style={styles.sqInput}
                        />
                        <Text position={'absolute'} top={15} right={3}>
                          units
                        </Text>
                       
                        <Text textAlign={'right'} color={'#DB0909'} mt={2}  
                          onPress={() => removeSpecificSelectedSize()}
                          // onPress={ () => alert('remove Clicked')} 
                          > X Remove </Text>
                         
                        </Box>
                      </Box>
                  
           

                    {/* <Box w={'40%'}>
                      <Text mb={2} textAlign={'right'}>
                          Quantity
                        </Text>
                        <Input
                          placeholder="size"
                          keyboardType="number-pad"
                          max={5}
                          _text={{
                            fontSize: 20,
                            color: '#4E4E4E',
                          }}
                          _focus={{
                            borderColor: '#C0C0C0',
                            bg: '#fff',
                          }}
                          maxLength={3}
                          value={addedSize ? addedSize.split('/')[1] : quantity}
                          onChangeText={setQuantity}
                          style={styles.sqInput}
                        />
                        <Text position={'absolute'} top={10} right={3}>
                          units
                        </Text>
                        <Text textAlign={'right'} color={'#DB0909'} mt={2}  
                          onPress={() => removeSpecificSelectedSize(index)}
                          // onPress={ () => alert('remove Clicked')}
                        >
                          X Remove
                        </Text>
                      </Box> */}
                    </Box>
                    <Pressable
                      style={styles.colorlist}
                      // onPress={() => onClose()}
                      // onPress={ () => alert('Size Added Clicked')}
                        onPress={() => handleCreateSize}
                        
                      >
                      <Box
                        bg={'#E1E1E1'}
                        w={'32px'}
                        h={'32px'}
                        mr={3}
                        borderRadius={30}
                        alignItems={'center'}>
                        <Text fontSize={20} color={'#467DF2'}>
                          +
                        </Text>
                      </Box>
                      <Text fontSize={14} color={'#467DF2'}>
                        Add More Size
                      </Text>
                    </Pressable>
                 
                  </ScrollView>
                  
                  <Button
                    style={styles.save}
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
                    }}
                    onPress={handleCreateSize}>
                    Create Size Set
                  </Button>
                </>
              ) : (
                <Box w={'100%'} my={5} flex={1}>
                  <Box
                    flexDir={'row'}
                    alignItems={'center'}
                    justifyContent={'space-between'}
                    w={'100%'}>
                    <Text>Select Size Set</Text>
                    <Pressable
                      onPress={() => setOpenModal(true)}
                      borderWidth={1}
                      borderColor={'#E2E2E2'}
                      borderRadius={5}
                      w={'148px'}
                      h={'51px'}
                      flexDir={'row'}
                      alignItems={'center'}
                      justifyContent={'space-around'}>
                      <Text>{service}</Text>
                      <Entypo name={'chevron-down'} size={20} color={'#000'} />
                    </Pressable>
                    {openModal && (
                      <SizeType
                        setService={setService}
                        openModal={openModal}
                        setOpenModal={setOpenModal}
                        data={SizeOrigin}
                      />
                    )}
                  </Box>
                  <Text>Sizes</Text>
                  <Checkbox
                    onChange={() =>
                      service && service != 'choose origin'
                        ? setAddedSize(`${SizeSelected}/${quantity}/${service}`)
                        : alert('Please Select Size Origin')
                    }
                    value="one"
                    borderColor={'#A9A9A9'}
                    borderRadius={10}
                    _icon={{
                      width: '10px',
                      height: '10px',
                    }}
                    _checked={{
                      borderWidth: 1,
                      borderColor: '#1492E6',
                      backgroundColor: '#1492E6',
                    }}
                    icon={
                      <Icon
                        as={
                          <MaterialCommunityIcons
                            name="circle"
                            color={'#1492E6'}
                            style={{
                              backgroundColor: '#fff',
                              borderRadius: 30,
                              borderWidth: 0,
                            }}
                          />
                        }
                      />
                    }>
                    {`${SizeSelected}/${quantity}`}
                  </Checkbox>
                  <Divider color={'#C9C9C9'} my={2} />
                  <Box
                    flexDir={'row'}
                    alignItems={'center'}
                    justifyContent={'space-between'}
                    position={'absolute'}
                    bottom={0}
                    w={'100%'}>
                    <Button
                    onPress={() => navigation.navigate('AddSizeSet')}
                      borderWidth={1}
                      borderColor={'#1492E6'}
                      bg={'#fff'}
                      _text={{
                        fontSize: 17,
                        color: '#1492E6',
                      }}>
                      + Add another Size
                    </Button>
                    <Button
                      borderWidth={1}
                      borderColor={'#fff'}
                      bg={'#1492E6'}
                      _text={{
                        fontSize: 17,
                        color: '#fff',
                      }}
                      onPress={() => {
                        onClose();
                        setAddedSize(`${SizeSelected}/${quantity}/${service}`);
                      }}>
                      Choose Size Set
                    </Button>
                  </Box>
                </Box>
              )}
            </Actionsheet.Content>
          </Actionsheet>
        </Center>
      </Center>
      <Button
        style={styles.save}
        bg={addedSize === 0 ? '#E2E2E2' : '#1492E6'}
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

const SizeType = ({setService, openModal, setOpenModal, data}) => {
  const handleSelection = type => {
    setService(type);
    setOpenModal(false);
  };
  return (
    <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
      <Modal.Content maxWidth="300px">
        <Box p={5}>
          {data.map(item => {
            return (
              <>
                <Text
                  style={styles.pickerItems}
                  onPress={() =>
                    handleSelection(
                      item.origin_name
                        ? item.origin_name
                        : item.size_name || 'UK',
                    )
                  }>
                  {item.origin_name
                    ? item.origin_name
                    : item.size_name + ' Size'}
                </Text>
                <Divider color={'#C9C9C9'} my={2} />
              </>
            );
          })}

          {/* <Text style={styles.pickerItems} onPress={() => handleSelection('UK Size')}>UK Size</Text>
                    <Divider color={'#C9C9C9'} my={2} />
                    <Text style={styles.pickerItems} onPress={() => handleSelection('Europe Size')}>Europe Size</Text> */}
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
    height: 60,
    width: '100%',
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

export default Addsize;
