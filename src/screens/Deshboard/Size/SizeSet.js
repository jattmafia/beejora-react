import {
  Actionsheet,
  Box,
  Button,
  Center,
  Pressable,
  ScrollView,
  Text,
  useDisclose,
  useToast,
} from 'native-base';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Dimensions, View} from 'react-native';
import DarkHeader from '../../../component/header/DarkHeader';
// Icons
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useDispatch} from 'react-redux';
import {handleProductColorSelection} from '../../../Redux/Reducers/ProductSizeReducer';
import {GetRequest} from '../../../Utilities';
import {AppUrl} from '../../AppUrl';
const SizeSetCreate = ({navigation}) => {
  const toast = useToast();
  const [enableSizeSet, setEnableSizeSet] = React.useState(false);
  const [selectedColors, setSelectedColors] = React.useState([]);
  const [LoadingColorSet, setLoadingColorSet] = useState(true);

  const [colorPallet, setColorPallet] = React.useState([
    {
      colorName: 'Red',
      color: '#FF0000',
      selected: false,
      upload: [],
      articleCode: 7890,
    },
    {
      colorName: 'Blue',
      color: '#0012FF',
      selected: false,
      upload: [],
      articleCode: 7890,
    },
    {
      colorName: 'Green',
      color: '#09FF00',
      selected: false,
      upload: [],
      articleCode: 7890,
    },
    {
      colorName: 'Yellow',
      color: '#FFFF00',
      selected: false,
      upload: [],
      articleCode: 7890,
    },
    {
      colorName: 'Black',
      color: '#000000',
      selected: false,
      upload: [],
      articleCode: 7890,
    },
  ]);
  const handleIncrement = (_item, index) => {
    console.log('_item', _item);
    let tempList = [];
    colorPallet.map((item, index) => {
      if (item.colorName == _item.colorName) {
        var stk = item.stock;
        item.stock = stk + 1;

        console.log('stk', stk);
      }
      tempList.push(item);
    });
    setColorPallet(tempList);
    // var st = colorPallet[index].stock + 1;
    // colorPallet[index].stock = st;
  };
  const handleDecrement = (item, index) => {
    var st = colorPallet[index].stock - 1;
    if (st + 1 > 1) {
      colorPallet[index].stock = st;
    }
  };
  useEffect(() => {
    GetRequest(AppUrl.colorSet, {}, 'GET')
      .then(res => res.json())
      .then(res => {
        if (res?.results) {
          let tempList = [];

          res.results.map((item, index) => {
            let obj = {
              colorName: item.color_name,
              color: item.color_code,
              selected: false,
              upload: [],
              stock: 1,
              articleCode: Math.floor(Math.random() * 10000 + 1),
            };
            tempList.push(obj);
          });
          setColorPallet(tempList);
          setLoadingColorSet(false);
        }
        console.log('res color set', res);
      });
  }, []);
  const handleColorPallet = index => {
    let selectColor = [...colorPallet];
    selectColor[index].selected = !selectColor[index].selected;
    setColorPallet(selectColor);
  };
  const handleSelectedColors = () => {
    let selectColors = [];
    for (const key in colorPallet) {
      if (colorPallet[key].selected) {
        selectColors.push(colorPallet[key]);
      }
    }
    setSelectedColors(selectColors);
    onClose();
  };
  const removeSpecificSelectedColor = index => {
    let getSelectedColors = [...selectedColors];
    getSelectedColors.splice(index, 1);
    setSelectedColors(getSelectedColors);
  };

  const savingColors = () => {
    try {
      if (selectedColors.length !== 0) {
        navigation.navigate('ProductSizeVariant', {
          selectedColors,
        });
      } else {
        toast.show({
          placement: 'top',
          render: () => {
            return (
              <Box
                bg="#1492E6"
                px="2"
                py="1"
                rounded="sm"
                w={'150px'}
                shadow={2}>
                <Text color={'#fff'} fontSize={18} textAlign={'center'}>
                  Add Colors
                </Text>
              </Box>
            );
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const {isOpen, onOpen, onClose} = useDisclose();
  let {height} = Dimensions.get('window');

  return (
    <Box style={styles.main}>
      {/* Header */}
      <DarkHeader navigation={navigation} routeName={'Create Set'} />
      {selectedColors.length === 0 ? (
        <Box bg={'#fff'} p={5} flex={1}>
          {enableSizeSet ? (
            <Box>
              <Text fontSize={15} color={'#484848'}>
                Create color set for 3 units
              </Text>
              <Box
                borderWidth={1}
                borderColor={'#B6B6B6'}
                borderRadius={6}
                h={'122px'}
                mt={3}>
                <Box
                  flexDir={'row'}
                  alignItems={'center'}
                  justifyContent={'space-around'}
                  h={'51px'}
                  bg={'#F7F7F7'}
                  borderTopRadius={6}>
                  <Text fontSize={15} color={'#484848'}>
                    Color Set
                  </Text>
                  <Text fontSize={15} color={'#484848'}>
                    0 Colors
                  </Text>
                  <Text fontSize={15} color={'#484848'}>
                    0PCS
                  </Text>
                </Box>
                <Pressable style={styles.colorlist} onPress={() => onOpen()}>
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
                    Add Color
                  </Text>
                </Pressable>
              </Box>
            </Box>
          ) : (
            <Button
              style={styles.addColor}
              _text={{
                color: '#1492E6',
                fontSize: 15,
              }}
              onPress={() => setEnableSizeSet(true)}>
              Create Color Set
            </Button>
          )}
        </Box>
      ) : (
        <Box bg={'#F3F3F3'} p={5} h={height * 0.8}>
          <Box style={styles.createdColors}>
            <Text fontSize={15} color={'#484848'}>
              Create color set for {selectedColors.length} units
            </Text>
          </Box>
          <Box style={styles.colorSet}>
            <Text fontSize={15} color={'#484848'}>
              Color Set
            </Text>
            <Text fontSize={15} color={'#484848'}>
              {selectedColors.length} Colors
            </Text>
          </Box>
          <Box>
            {selectedColors.map((item, index) => {
              console.log('item selected', item);
              return (
                <Box
                  style={styles.colorlist1}
                  justifyContent={'space-between'}
                  key={index}>
                  <Box style={styles.color_title}>
                    <Box
                      bg={'#' + item.color}
                      w={'32px'}
                      h={'32px'}
                      mr={3}
                      borderRadius={30}></Box>
                    <Text fontSize={14} color={'#1A1A1A'}>
                      {item.colorName}
                    </Text>
                  </Box>
                  <View>
                    <Box
                      style={[styles.qty, {flexDirection: 'row'}]}
                      alignSelf={'flex-end'}>
                      <Pressable>
                        <Box style={styles.lotSizeBtns}>
                          <Text style={styles.lotSizeAS}>-</Text>
                        </Box>
                      </Pressable>
                      <Box style={styles.lotSizeBtns}>
                        <Text style={styles.lotSizeQuan}>{item.stock}</Text>
                      </Box>
                      <Pressable onPress={() => handleIncrement(item, index)}>
                        <Box style={styles.lotSizeBtns}>
                          <Text style={styles.lotSizeAS}>+</Text>
                        </Box>
                      </Pressable>
                    </Box>
                    <Text
                      fontSize={14}
                      color={'#DB0909'}
                      onPress={() => removeSpecificSelectedColor(index)}>
                      X Remove
                    </Text>
                  </View>
                </Box>
              );
            })}
            <Pressable style={styles.colorlist} onPress={() => onOpen()}>
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
                Add Color
              </Text>
            </Pressable>
          </Box>
        </Box>
      )}
      <Center flex={1} px="2">
        <Center>
          <Actionsheet isOpen={isOpen} onClose={onClose}>
            <Actionsheet.Content px={5}>
              <Box style={styles.selectHeader}>
                <Text style={styles.selectHeadingText}>Select Color</Text>
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
                {colorPallet.map((item, index) => {
                  return (
                    <Pressable
                      style={styles.color_bar}
                      key={index}
                      onPress={() => handleColorPallet(index)}>
                      <Box
                        bg={'#' + item.color}
                        w={'32px'}
                        h={'32px'}
                        borderRadius={30}></Box>
                      <Actionsheet.Item
                        onPress={() => {
                          handleColorPallet(index);
                        }}
                        style={styles.ItemText}
                        _pressed={{bg: '#fff'}}>
                        {item.colorName}
                      </Actionsheet.Item>
                      {item.selected === true && (
                        <MaterialIcons
                          style={styles.tickIcon}
                          name="done"
                          size={20}
                          color={'#000'}
                        />
                      )}
                    </Pressable>
                  );
                })}
                <Button
                  style={styles.save}
                  my={5}
                  _text={{
                    color: '#fff',
                    fontSize: 19,
                  }}
                  onPress={handleSelectedColors}>
                  Save
                </Button>
              </ScrollView>
            </Actionsheet.Content>
          </Actionsheet>
        </Center>
      </Center>
      <Button
        style={selectedColors.length !== 0 ? styles.save : styles.disableSave}
        position={'absolute'}
        bottom={10}
        w={'90%'}
        alignSelf={'center'}
        _text={{
          color: '#fff',
          fontSize: 19,
        }}
        onPress={savingColors}>
        Save
      </Button>
    </Box>
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
  },
  save: {
    backgroundColor: '#1492E6',
    borderWidth: 1,
    borderColor: '#1492E6',
    borderRadius: 6,
    height: 48,
  },
  disableSave: {
    backgroundColor: '#DFDFDF',
    borderWidth: 1,
    borderColor: '#DFDFDF',
    borderRadius: 6,
    height: 48,
  },
  selectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 60,
    width: '100%',
    paddingHorizontal: 15,
  },
  selectHeadingText: {
    color: '#1A1A1A',
    fontSize: 18,
    fontWeight: '500',
  },
  color_bar: {
    width: '100%',
    borderBottomWidth: 1,
    borderColor: '#DBDBDB',
    flexDirection: 'row',
    alignItems: 'center',
  },
  ItemText: {
    color: '#1A1A1A',
    opacity: 0.76,
  },
  tickIcon: {
    position: 'absolute',
    right: 10,
  },
  createdColors: {
    backgroundColor: '#fff',
    height: 54,
    width: '100%',
    paddingLeft: 20,
    justifyContent: 'center',
    borderRadius: 6,
  },
  colorSet: {
    height: 40,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  color_title: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  qty: {
    flex: 1,
    alignItems: 'flex-end',
  },
  colorlist1: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    height: 80,
    backgroundColor: '#fff',
    marginTop: 2,
    borderRadius: 6,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  colorlist: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    backgroundColor: '#fff',
    marginTop: 2,
    borderRadius: 6,
    paddingHorizontal: 20,
  },
  lotSizeBtns: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // width: '50%',
    backgroundColor: '#FFF3F3',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#B9B9B9',
    height: 41,
  },
  lotSizeQuan: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#B9B9B9',
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '500',
    color: '#3D3D3D',
    height: 41,
    width: 77,
    paddingTop: 10,
  },
  lotSizeAS: {
    flexGrow: 1,
    fontSize: 15,
    fontWeight: '500',
    color: '#3D3D3D',
    textAlign: 'center',
    width: 30,
  },
});

export default SizeSetCreate;
