import {
  Box,
  Text,
  useDisclose,
  ScrollView,
  Center,
  Actionsheet,
  Button,
  Pressable,
  Switch,
  Checkbox,
  Icon,
  Input,
} from 'native-base';
import React, { useState, useEffect } from 'react';
import { StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
// Icons
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { AppUrl } from '../AppUrl';
import { PostRequest, GetRequest } from '../../Utilities';
import { useDispatch } from 'react-redux';
import { handleAddProduct } from '../../Redux/Reducers/ProductVarientReducer';

const Addproduct = ({ navigation }) => {
  const [checkTheSubCtg, setcheckTheSubCtg] = React.useState('size');
  const [selectedItems, setSelectedItems] = React.useState([]);
  const [enableSwitch, setEnableSwitch] = React.useState(false);
  const [BrandSelected, setBrandSelected] = useState('');
  const [CategorySelected, setCategorySelected] = useState('');
  const [SubCategorySelected, setSubCategorySelected] = useState('');
  const [LoadingCategories, setLoadingCategories] = useState([]);
  const [AllCategories, setAllCategories] = useState([]);
  const [AllSubCategories, setAllSubCategories] = useState([]);
  const [Categories, setCategories] = useState([]);
  const [SubCategories, setSubCategories] = useState([]);
  const [SubCategories2, setSubCategories2] = useState([]);
  const [LoadingBrands, setLoadingBrands] = useState(true);
  const [AllBrands, setAllBrands] = useState([]);
  const [BrandNames, setBrandNames] = useState([]);
  const [SelectedSubCategory, setSelectedSubCategory] = useState('');
  const [SelectedSubCategory2, setSelectedSubCategory2] = useState('');
  const [ProductName, setProductName] = useState('');
  const [Counter, setCounter] = useState(3);
  const handleProductComboSwitching = () => setEnableSwitch(!enableSwitch);
  let BRANDNAME = ['KIDS BERRY', 'KIDS BERRY', 'KIDS BERRY'];
  let MAINCATEGORY = [
    'Men Wear',
    'Women Wear',
    'Assesories',
    'Head Wear',
    'Kids',
  ];
  let SUBCATEGORY = ['Boots', 'Formal Shoes', 'Loafers', 'Driving', 'Sports'];

  const dispatch = useDispatch()
  // PostRequest()
  useEffect(() => {
    handleApiCalls();
  }, []);

  const handleApiCalls = () => {
    const headers = {
      Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTY1ODY3MTc4MywiaWF0IjoxNjU4MDY2OTgzLCJqdGkiOiJmZjkzZDEzNmE4Yzc0MTVjYjBiNTE0YzgwNDBlMTg4NCIsInVzZXJfaWQiOjV9.p5FziqgUqUMYWyt0Fn6yYA-9TOM91b2jJnAge6Islek`,
      'Content-Type': 'application/json',
    };
    GetRequest(AppUrl.categories, headers, 'GET')
      .then(res => res.json())
      .then(response => {
        console.log('response', response);
        var cat = [];
        setAllCategories(response?.results || []);
        response?.results?.map(item => {
          cat?.push(item?.name);
        });
        setCategories(cat || []);
        setLoadingCategories(false);
      });
    GetRequest(AppUrl.brands, headers, 'GET')
      .then(res => res.json())
      .then(res => {
        console.log('response', res);
        if (res?.results) {
          setAllBrands(res.results || []);
          var b = [];
          res?.results.map(item => {
            b.push(item.brand_name);
          });
          setBrandNames(b);
          setLoadingBrands(false);
        }
      });
  };

  const handleSave = () => {
    console.log('selectedItems', BrandSelected);
    let Data = {
      Brand: ProductName,
      Category: SelectedSubCategory,
      SubCategory: SelectedSubCategory2,
      Lot: Counter,
      Type: checkTheSubCtg,
    };
    dispatch(handleAddProduct(Data));
    if (checkTheSubCtg === 'size') {
      navigation.navigate('Summary', { data: Data });
    }
    
    if (checkTheSubCtg === 'color') {
      navigation.navigate('SizeSummary', { data: Data });
    }
  };
  const handleCategorySelection = val => {
    setSelectedSubCategory(val);
    let filterCategory = AllCategories.filter(item => item.name == val);
    if (filterCategory.length) {
      setAllSubCategories(filterCategory[0]?.subcategories);
      let cates = [];
      filterCategory[0].subcategories.map(item => {
        cates.push(item.name);
      });
      setSubCategories(cates);
    }
  };
  const handleNestedSubCategory = val => {
    setSelectedSubCategory2(val);
    let filterCategory = AllSubCategories.filter(item => item.name == val);
    if (filterCategory.length) {
      let cates = [];
      filterCategory[0].subcategories.map(item => {
        cates.push(item.name);
      });
      setSubCategories2(cates);
    }
  };
  const handleIncrease = () => {
    setCounter(count => count + 1);
  };
  const handleDescrease = () => {
    if (Counter != 3) setCounter(count => count - 1);
  };
  return (
    <Box style={styles.main}>
      {/* Header */}
      <Box style={styles.header}>
        <AntDesign name="arrowleft" size={30} color={'#000'} onPress={() => navigation.goBack()} />
        <Text style={styles.headerTitle}>Add Product</Text>
      </Box>
      {/* Content */}
      {LoadingCategories && LoadingBrands ? (
        <ActivityIndicator size={24} color={'red'} />
      ) : (
        <ScrollView>
          {/* Super Category */}
          <Box p={5}>
            {/* <Box style={styles.super_category}>
              <Text style={styles.label}>
                Super Category<Text style={styles.required}>*</Text>
              </Text> */}
            {/* Selection Bar */}
            {/* <Box style={styles.super_category_input}>
                <Checkbox
                  value="one"
                  my={2}
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
                  Footwear
                </Checkbox>
              </Box> */}
            {/* </Box> */}
            {/* Super Category */}

            <Text fontSize={14} color={'#4E4E4E'} mb={2}>
              Product Name
            </Text>
            <Box
              borderWidth={1}
              borderRadius={4}
              borderColor={'#AEAEAE'}
              h={'47px'}
              alignItems={'center'}
              justifyContent={'center'}
            // style={styles.super_category_input}
            >
              <Input
                onChangeText={val => setProductName(val)}
                fontSize={20}
                // color={'#4E4E4E'}
                placeholder={'product name'}
              />
            </Box>
            {/* <ProductInfoPickers
              saveOptionSelected={setBrandSelected}
              selectedItems={selectedItems}
              setSelectedItems={setSelectedItems}
              categoryType={'Brand'}
              brandName={'Brand Name'}
              placeholder={'Choose Brand Name'}
              pickerItem={BrandNames}
            /> */}
            <ProductInfoPickers
              saveOptionSelected={handleCategorySelection}
              selectedItems={selectedItems}
              setSelectedItems={setSelectedItems}
              categoryType={'Category'}
              brandName={'Main Category'}
              placeholder={'Choose Main Category'}
              pickerItem={Categories}
            />
            <ProductInfoPickers
              saveOptionSelected={handleNestedSubCategory}
              selectedItems={selectedItems}
              setSelectedItems={setSelectedItems}
              categoryType={'Sub-Category'}
              brandName={'Sub Category'}
              placeholder={'Choose Sub Category'}
              pickerItem={SubCategories}
            />
            {/* <ProductInfoPickers
              saveOptionSelected={setSubCategorySelected}
              selectedItems={selectedItems}
              setSelectedItems={setSelectedItems}
              categoryType={'Sub-Category'}
              brandName={'Sub Category2'}
              placeholder={'Choose Sub Category'}
              pickerItem={SubCategories2}
            /> */}
            {selectedItems.length === 2 && (
              <SizeOrColor
                checkTheSubCtg={checkTheSubCtg}
                setcheckTheSubCtg={setcheckTheSubCtg}
              />
            )}
            <Box style={styles.lotSize}>
              <Text style={styles.lotSizeLabel}>Choose Lot Size:</Text>
              <Box style={styles.lotSizeBtns}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    handleDescrease();
                  }}>
                  <Text style={styles.lotSizeAS}>-</Text>
                </TouchableOpacity>
                <Text style={styles.lotSizeQuan}>{Counter}</Text>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    handleIncrease();
                  }}>
                  <Text style={styles.lotSizeAS1}>+</Text>
                </TouchableOpacity>
              </Box>
            </Box>
            {/* <Box style={styles.productCombo}>
              <Box>
                <Text style={styles.lotSizeLabel}>Product Combo</Text>
                <AntDesign
                  name="infocirlceo"
                  size={16}
                  color={'#3D3D3D'}
                  style={{
                    position: 'absolute',
                    right: -30,
                    top: 10,
                  }}
                />
              </Box>
              <Box style={styles.SwitchBox}>
                <Switch
                  size="lg"
                  _
                  offTrackColor={'transparent'}
                  onTrackColor={'transparent'}
                  onThumbColor={'#fff'}
                  zIndex={2}
                  onChange={handleProductComboSwitching}
                />
                {enableSwitch ? (
                  <Text
                    fontSize={13}
                    fontWeight={'400'}
                    color={'#B44747'}
                    position={'absolute'}
                    left={2}
                    top={2}
                    zIndex={1}>
                    On
                  </Text>
                ) : (
                  <Text
                    fontSize={12}
                    fontWeight={'400'}
                    color={'#B44747'}
                    position={'absolute'}
                    right={2}
                    top={2}
                    zIndex={1}>
                    OFF
                  </Text>
                )}
              </Box> 
            </Box>
            */}
          </Box>
          <Box
            h={50}
            my={5}
            borderBottomWidth={1}
            borderColor={'#DADADA'}></Box>
          <Button
            bg={'#1492E6'}
            mx={5}
            _text={{
              color: '#fff',
              fontSize: 17,
            }}
            _pressed={{ bg: '#1492E6' }}
            onPress={() => handleSave()}>
            Save
          </Button>
          <Box h={50}></Box>
        </ScrollView>
      )}
    </Box>
  );
};

const ProductInfoPickers = ({
  saveOptionSelected,
  selectedItems,
  setSelectedItems,
  categoryType,
  brandName,
  placeholder,
  pickerItem,
}) => {
  const [selectPickerValue, setSelectPickerValue] = React.useState('');
  const { isOpen, onOpen, onClose } = useDisclose();

  const handlePickerSelection = item => {
    saveOptionSelected(item);
    let selected = [selectPickerValue, ...selectedItems];
    setSelectedItems(selected);
    setSelectPickerValue(item);
    onClose();
  };
  return (
    <Box style={styles.product_info} pt={2}>
      {/* Lable */}
      <Text style={styles.label}>
        {brandName} <Text style={styles.required}>*</Text>
      </Text>
      {/* Selection Bar */}
      <Pressable onPress={onOpen} style={styles.picker}>
        {selectPickerValue ? (
          <Text style={styles.pickerValue}>{selectPickerValue}</Text>
        ) : (
          <Text style={styles.placeholder}>{placeholder}</Text>
        )}
        <Feather
          name={isOpen ? 'chevron-up' : 'chevron-down'}
          size={30}
          color={'#1492E6'}
        />
      </Pressable>
      <Center flex={1} px="2">
        <Center>
          <Actionsheet isOpen={isOpen} onClose={onClose}>
            <Actionsheet.Content p={5}>
              <Box style={styles.selectHeader}>
                <Text style={styles.selectHeadingText}>{categoryType}</Text>
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
                {pickerItem.map((item, index) => {
                  return (
                    <Actionsheet.Item
                      style={styles.ItemText}
                      key={index}
                      onPress={() => handlePickerSelection(item)}>
                      {item}
                    </Actionsheet.Item>
                  );
                })}
              </ScrollView>
            </Actionsheet.Content>
          </Actionsheet>
        </Center>
      </Center>
    </Box>
  );
};

const SizeOrColor = ({ checkTheSubCtg, setcheckTheSubCtg }) => {
  const handleCheckbox = ctg => setcheckTheSubCtg(ctg);
  return (
    <Box>
      <Text style={styles.label}>
        Choose lot set<Text style={styles.required}>*</Text>
      </Text>
      <Box
        flexDir={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}>
        <Box w={'45%'} style={styles.super_category_input}>
          <Checkbox
            value="one"
            my={2}
            isChecked={checkTheSubCtg === 'size' && true}
            borderColor={'#A9A9A9'}
            borderRadius={10}
            onChange={() => handleCheckbox('size')}
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
            Size Set
          </Checkbox>
        </Box>
        <Box w={'45%'} style={styles.super_category_input}>
          <Checkbox
            value="color"
            my={2}
            name={'sub-category'}
            isChecked={checkTheSubCtg === 'color' && true}
            borderColor={'#A9A9A9'}
            borderRadius={10}
            onChange={() => handleCheckbox('color')}
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
            Color Set
          </Checkbox>
        </Box>
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: 60,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#DADADA',
    paddingHorizontal: 15,
  },
  headerTitle: {
    textAlign: 'center',
    width: '90%',
    fontSize: 19,
    fontWeight: '500',
    color: '#000000',
  },
  product_info: {
    width: '100%',
  },
  super_category: {
    width: '50%',
  },
  super_category_input: {
    borderWidth: 1,
    borderColor: '#AEAEAE',
    borderRadius: 4,
    height: 50,
    paddingLeft: 17,
    justifyContent: 'center',
  },
  label: {
    color: '#5C5C5C',
    fontSize: 16,
    fontWeight: '400',
    marginVertical: 8,
  },
  required: {
    color: '#FF3636',
    fontSize: 16,
    position: 'absolute',
    top: 0,
    right: 0,
  },
  ellipse: {
    borderWidth: 1,
    borderColor: '#1492E6',
    borderRadius: 8,
    width: 19,
    height: 19,
    padding: 2,
    alignItems: 'center',
    position: 'absolute',
    bottom: 15,
    left: 10,
  },
  picker: {
    borderWidth: 1,
    borderColor: '#AEAEAE',
    borderRadius: 4,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  pickerValue: {
    color: '#1A1A1A',
    fontSize: 14,
    fontWeight: '400',
  },
  placeholder: {
    color: '#A7A7A7',
    fontSize: 14,
    fontWeight: '400',
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
  ItemText: {
    borderBottomWidth: 1,
    borderColor: '#DBDBDB',
    color: '#1A1A1A',
    opacity: 0.76,
  },
  lotSize: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
  },
  lotSizeLabel: {
    color: '#3D3D3D',
    fontSize: 16,
    fontWeight: '400',
    marginVertical: 8,
  },
  button: {
    width: '30%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 25,
    height: 41,
  },
  lotSizeBtns: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '50%',
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
    width: 72,
    paddingTop: 10,
  },
  lotSizeAS: {
    fontSize: 26,
    fontWeight: '500',
    color: '#3D3D3D',
    bottom: 10
  },
  lotSizeAS1: {
    fontSize: 26,
    fontWeight: '500',
    color: '#3D3D3D',
    bottom: 10,
    right: 3
  },
  productCombo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
  },
  SwitchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF3F3',
    borderRadius: 21,
    height: 37,
    width: 65,
    padding: 5,
  },
});

export default Addproduct;
