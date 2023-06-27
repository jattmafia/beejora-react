import {
  Box,
  Button,
  Checkbox,
  Icon,
  Input,
  Pressable,
  ScrollView,
  Text,
  useToast,
} from 'native-base';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';
import DarkHeader from '../../component/header/DarkHeader';
import {AttributesAndStylesList} from '../../Redux/DefaultData';

// Icon
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch} from 'react-redux';
import {handleAttriAndStyles} from '../../Redux/Reducers/ProductVarientReducer';
import {GetRequest} from '../../Utilities';
import {AppUrl} from '../AppUrl';
const AttributesAndStyles = ({navigation, route}) => {
  let {routeName, routeNameToSize} = route.params;
  const [LoadingAttributes, setLoadingAttributes] = useState(true);
  const [Attributes, setAttributes] = useState([]);
  const [selectedAttribute, setSelectedAttribute] = useState('');
  const toast = useToast();
  const [SelectedAttributeList, setSelectedAttributeList] = useState([]);
  const [SelectedAttributeVariationList, setSelectedAttributeVariationList] =
    useState([]);
  const dispatch = useDispatch();
  const [atriAndsty, setAtriAndsty] = React.useState(AttributesAndStylesList);
  const [styleIndex, setStyleIndex] = React.useState(0);
  const [AttributesSelectedKeyValues, setAttributesSelectedKeyValues] =
    useState([]);
  useEffect(() => {
    const headers = {
      Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTY1ODY3MTc4MywiaWF0IjoxNjU4MDY2OTgzLCJqdGkiOiJmZjkzZDEzNmE4Yzc0MTVjYjBiNTE0YzgwNDBlMTg4NCIsInVzZXJfaWQiOjV9.p5FziqgUqUMYWyt0Fn6yYA-9TOM91b2jJnAge6Islek`,
      'Content-Type': 'application/json',
    };
    GetRequest(AppUrl.attributes, headers, 'GET')
      .then(res => res.json())
      .then(res => {
        console.log('res get attributes', res);
        if (res?.results) {
          setAttributes(res.results);
          setSelectedAttribute(res?.results[0].attribute_name);
          // var newlist = res.results
          // newlist.map((item, index) => {
          //   newlist[index].attributes = [];
          // });
          // setAttributesSelectedKeyValues(newlist);
          setLoadingAttributes(false);
        }
      });
  }, []);

  const handleCheckBox = (index, _a, item) => {
    console.log('item checkbox', _a);
    setSelectedAttributeList(prev => [...prev, item.attribute_name]);
    setSelectedAttributeVariationList(prev => [...prev, _a]);
    var tempList = [];
    var flag = false;
    // if (AttributesSelectedKeyValues.length) {
    //   AttributesSelectedKeyValues.map((eItem, index) => {
    //     console.log('eItem');
    //     flag = true;
    //     eItem.map(nItem => {
    //       if (nItem.attribute_name == item.attribute_name) {
    //         var nlist = nItem.attributes;

    //         nlist.push(_a);
    //         // let obj={
    //         //   attribute_name:item.attribute_name,
    //         // }
    //         eItem[index].attributes = nlist;
    //       } else {
    //         console.log('this is caled');
    //         let obj = {
    //           attribute_name: item.attribute_name,
    //           attributes: [_a],
    //         };
    //         tempList.push(obj);
    //         if (AttributesSelectedKeyValues.includes([obj])) {
    //           alert('hello found');
    //         }
    //         setAttributesSelectedKeyValues(prev => [...prev, tempList]);
    //       }
    //     });
    //   });
    // } else {
    //   alert('list is zero');
    //   let obj = {
    //     attribute_name: item.attribute_name,
    //     attributes: [_a],
    //   };
    //   tempList.push(obj);
    //   setAttributesSelectedKeyValues(prev => [...prev, tempList]);
    // }
    let obj = {
      attribute_name: item.attribute_name,
      attributes: [_a],
    };
    tempList.push(obj);
    setAttributesSelectedKeyValues(prev => [...prev, tempList]);
    AttributesSelectedKeyValues.map(item => {
      console.log('item', item);
    });
    // console.log('first', AttributesSelectedKeyValues[0]?.attributes);
    // let _indicator = [...atriAndsty];
    // _indicator[index].selected = _attri;
    // setAtriAndsty(_indicator);
  };

  const handleSave = () => {
    let selectedAttri = [];

    // for (const key in atriAndsty) {
    //   if (atriAndsty[key].selected === '') {
    //     toast.show({
    //       description: 'Select More',
    //     });
    //     return false;
    //   } else {
    //     selectedAttri.push([atriAndsty[key]._style, atriAndsty[key].selected]);
    //   }
    // }
    dispatch(handleAttriAndStyles(AttributesSelectedKeyValues));
    if (routeNameToSize) {
      navigation.navigate(routeNameToSize);
    } else {
      navigation.navigate(routeName);
    }
  };

  return (
    <>
      {LoadingAttributes ? (
        <ActivityIndicator color={'blue'} size={'large'} />
      ) : (
        <Box flex={1} bg={'#F8F8F8'}>
          {/* Header */}
          <DarkHeader
            navigation={navigation}
            routeName={'Attributes & Styles'}
          />
          <Box flex={1} w={'100%'} flexDir={'row'}>
            <Box w={'40%'} bg={'#F8F8F8'}>
              <Box
                h={'60px'}
                borderBottomWidth={1}
                borderColor={'#D0D0D0'}></Box>
              {Attributes.map((item, index) => {
                return (
                  <Pressable
                    key={index}
                    h={'60px'}
                    flexDir={'row'}
                    alignItems={'center'}
                    borderBottomWidth={1}
                    borderColor={'#D0D0D0'}
                    onPress={() => {
                      setStyleIndex(index);
                    }}
                    bg={styleIndex === index ? '#fff' : 'transparent'}>
                    <Icon
                      as={MaterialIcons}
                      name="done"
                      size={'20px'}
                      color={
                        SelectedAttributeList.includes(item.attribute_name)
                          ? '#1492E6'
                          : 'transparent'
                      }
                      mx={1}
                    />
                    <Text fontSize={14} color={'#1F1F1F'}>
                      {item?.attribute_name}
                    </Text>
                    {!SelectedAttributeList.includes(item.attribute_name) && (
                      <Text color={'#E20000'} mx={1}>
                        *
                      </Text>
                    )}
                  </Pressable>
                );
              })}
            </Box>
            <Box w={'60%'} bg={'#fff'}>
              <Box h={'60px'} justifyContent={'center'}>
                <Input
                  placeholder="Search"
                  w={'80%'}
                  alignSelf={'center'}
                  p={2}
                  leftElement={
                    <Icon
                      as={Feather}
                      name="search"
                      size={'20px'}
                      color={'#D0D0D0'}
                      mx={2}
                    />
                  }
                />
              </Box>
              <ScrollView>
                {Attributes.map((item, index) => {
                  return (
                    <React.Fragment key={index}>
                      {styleIndex === index &&
                        item.attributes.map((_item, _index) => {
                          return (
                            <Box
                              key={_index}
                              h={'60px'}
                              flexDir={'row'}
                              alignItems={'center'}
                              justifyContent={'space-between'}
                              px={5}
                              mx={1}
                              borderBottomWidth={1}
                              borderColor={'#D0D0D0'}>
                              <Text>{_item}</Text>
                              <Checkbox
                                onChange={() =>
                                  handleCheckBox(index, _item, item)
                                }
                                isChecked={SelectedAttributeVariationList.includes(
                                  _item,
                                )}
                                value={_item}
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
                                }
                                accessibilityLabel="This is a checkbox"
                              />
                            </Box>
                          );
                        })}
                    </React.Fragment>
                  );
                })}
                <Box h={50}></Box>
              </ScrollView>
            </Box>
          </Box>
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
              onPress={handleSave}>
              Save
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
};

const styles = StyleSheet.create({});

export default AttributesAndStyles;
