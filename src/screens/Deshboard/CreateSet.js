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
import React, {useState, useEffect} from 'react';
import {StyleSheet, Dimensions, ActivityIndicator} from 'react-native';
import DarkHeader from '../../component/header/DarkHeader';
// Icons
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useDispatch} from 'react-redux';
import {handleProductColorSelection} from '../../Redux/Reducers/ProductSizeReducer';
import {GetRequest} from '../../Utilities';
import {AppUrl} from '../AppUrl';
const CreateSet = ({navigation}) => {
  const toast = useToast();
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
  useEffect(() => {
    const headers = {
      Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTY1ODY3MTc4MywiaWF0IjoxNjU4MDY2OTgzLCJqdGkiOiJmZjkzZDEzNmE4Yzc0MTVjYjBiNTE0YzgwNDBlMTg4NCIsInVzZXJfaWQiOjV9.p5FziqgUqUMYWyt0Fn6yYA-9TOM91b2jJnAge6Islek`,
      'Content-Type': 'application/json',
    };
    GetRequest(AppUrl.colorSet, headers, 'GET')
      .then(res => res.json())
      .then(res => {
        if (res?.results) {
          setLoadingColorSet(false);
          setColorPallet(res.results);
        }
        console.log('res color set', res);
      });
  }, []);
  const handleColorPallet = item => {
    var found = selectedColors.find(e => e.color_name == item.color_name);
    var mutate = item;
    mutate['artical_code'] = Math.floor(Math.random() * 10000) + 1;
    if (found == undefined) {
      setSelectedColors(prev => [...prev, item]);
    } else {
      setSelectedColors(selectedColors.filter(item => item != item));
    }
    console.log('selectedColors', selectedColors);
    // setColorPallet(selectedColors);
    // selectColor[index].selected = !selectColor[index].selected;
    // setColorPallet(selectColor);
  };
  const handleSelectedColors = () => {
    // let selectColors = [];
    // for (const key in colorPallet) {
    //   if (colorPallet[key].selected) {
    //     selectColors.push(colorPallet[key]);
    //   }
    // }
    // setSelectedColors(selectColors);
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
        navigation.navigate('ProductVariants', {
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
    } catch (error) {}
  };
  const {isOpen, onOpen, onClose} = useDisclose();
  let {height} = Dimensions.get('window');

  return (
    <>
      {LoadingColorSet ? (
        <ActivityIndicator color={'blue'} size={'large'} />
      ) : (
        <Box style={styles.main}>
          {/* Header */}
          <DarkHeader navigation={navigation} routeName={'Create Set'} />
          {selectedColors.length === 0 ? (
            <Box bg={'#fff'} p={5} flex={1}>
              <Text styles={styles.title}>Color Included</Text>
              <Button
                style={styles.addColor}
                _text={{
                  color: '#1492E6',
                  fontSize: 15,
                }}
                onPress={onOpen}>
                + Add Color
              </Button>
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
                  return (
                    <Box style={styles.colorlist} key={index}>
                      <Box
                        bg={'#' + item.color_code}
                        w={'32px'}
                        h={'32px'}
                        mr={3}
                        borderRadius={30}></Box>
                      <Text fontSize={14} color={'#1A1A1A'}>
                        {item.color_name}
                      </Text>
                      <Text
                        fontSize={14}
                        color={'#DB0909'}
                        position={'absolute'}
                        right={5}
                        onPress={() => removeSpecificSelectedColor(index)}>
                        X Remove
                      </Text>
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
                          onPress={() => handleColorPallet(item)}>
                          <Box
                            bg={'#' + item.color_code}
                            w={'32px'}
                            h={'32px'}
                            borderRadius={30}></Box>
                          <Actionsheet.Item
                            onPress={() => {
                              handleColorPallet(item);
                            }}
                            style={styles.ItemText}
                            _pressed={{bg: '#fff'}}>
                            {item.color_name}
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
            style={styles.save}
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
      )}
    </>
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
    backgroundColor: '#1492E6',
    borderWidth: 1,
    borderColor: '#1492E6',
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
  colorlist: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    backgroundColor: '#fff',
    marginTop: 2,
    borderRadius: 6,
    paddingHorizontal: 20,
  },
});

export default CreateSet;
