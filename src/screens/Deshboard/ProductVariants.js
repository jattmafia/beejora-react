import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Icon,
  Modal,
  Pressable,
  ScrollView,
  useDisclose,
  Text,
  useToast,
} from "native-base";
import React, { useState, useEffect } from "react";
import { Platform, StyleSheet, Linking, Image, Dimensions } from "react-native";
import DarkHeader from "../../component/header/DarkHeader";
import * as ImagePicker from "expo-image-picker";
// Icon
import AntDesign from "react-native-vector-icons/AntDesign";
import { useDispatch } from "react-redux";
import { setProductVariant } from "../../Redux/Reducers/ProductVarientReducer";
import { checkAppPermissions, requestPermission } from "../../Utilities";
// import {PERMISSIONS} from 'react-native-permissions';

const ProductVariants = ({ navigation, route }) => {
  const toast = useToast();
  const [showModal, setShowModal] = React.useState(false);
  const [productVariants, setProductVariants] = React.useState(
    route.params.selectedColors
  );
  console.log("route.params1", route.params);
  const [ColorIndex, setColorIndex] = React.useState(0);
  let dispatch = useDispatch();
  const UploadImage = (index, uploads) => {
    console.log({ index, uploads, productVariants });
    setProductVariants((prev) => {
      // return prev[index].upload = [...prev[index].upload, ...uploads];
      return prev.map((item, i) => {
        if (i === index) {
          return {
            ...item,
            upload: item?.upload ? [...item?.upload, ...uploads] : [...uploads],
          };
        }
        return item;
      });
    });
  };
  console.log({ productVariants });
  const saveProductVariants = () => {
    try {
      for (const key in productVariants) {
        if (productVariants[key].upload.length === 0) {
          toast.show({
            placement: "top",
            render: () => {
              return (
                <Box
                  bg="#1492E6"
                  px="2"
                  py="1"
                  rounded="sm"
                  w={"150px"}
                  shadow={2}
                >
                  <Text color={"#fff"} fontSize={18} textAlign={"center"}>
                    Add Colors
                  </Text>
                </Box>
              );
            },
          });
        } else {
          dispatch(setProductVariant(productVariants));
          navigation.navigate("Summary");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleUploadImage = async () => {
    setShowModal(true);
  };
  const [EditIndex, setEditIndex] = useState(10);
  const pickImage = async (index) => {
    let options = {
      // title: "Select Avatar",
      // customButtons: [{ name: "fb", title: "Choose Photo from Gallery" }],
      // storageOptions: {
      //   skipBackup: true,
      //   path: "images",
      // },
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      base64: false,
      allowEditing: true,
    };
    const data = await ImagePicker.launchImageLibraryAsync(options);
    console.log("dataImageqqqqq", data);
    if (data?.cancelled) {
      return;
    }
    if (data) {
      // console.log('data', productVariants[EditIndex].upload);
      var newState = [];
      productVariants.map((item, index) => {
        console.log("item new state", item);
        console.log("EditIndex", EditIndex);
        if (index == EditIndex) {
          if (item.upload != undefined) {
            item.upload[0].push(data.assets[0].uri);
            newState.push(item);
          }
        } else {
          newState.push(item);
        }
      });
      dispatch(setProductVariant(newState));
    }
  };

  const handleRemove = (_item) => {
    var newList = [];
    productVariants.map((item) => {
      if (_item != item) {
        newList.push(item);
      }
    });
    setProductVariants(newList);
  };

  const { isOpen, onOpen, onClose } = useDisclose();
  let { height } = Dimensions.get("window");

  return (
    <Box style={styles.main}>
      {/* Header */}
      <DarkHeader navigation={navigation} routeName={"Product Variants"} />
      <ScrollView>
        {productVariants.map((item, index) => {
          console.log("item index", item);
          return (
            <Box style={styles.variantCont} key={index}>
              <Box
                alignItems={"center"}
                justifyContent={"space-around"}
                py={2}
                w={"90%"}
                flex={1}
              >
                <Text fontSize={20} color={"#484848"}>
                  Article Code
                </Text>
                <Box
                  borderWidth={1}
                  borderColor={"#ACACAC"}
                  borderRadius={5}
                  h={"48px"}
                  w={"100%"}
                  justifyContent={"center"}
                >
                  <Text fontSize={20} color={"#484848"} textAlign={"center"}>
                    {item.artical_code}
                  </Text>
                </Box>
                <Flex
                  direction="row"
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  <Box
                    bg={"#" + item.color_code}
                    w={"32px"}
                    h={"32px"}
                    borderRadius={30}
                  ></Box>
                  <Text fontSize={18} color={"#484848"} m={2}>
                    {item.color_name}
                  </Text>
                </Flex>
                {item?.upload == undefined ? (
                  <Button
                    w={"100%"}
                    h={"47px"}
                    bg={"#1492E6"}
                    borderRadius={6}
                    mt={3}
                    _text={{
                      fontSize: 20,
                    }}
                    onPress={() => {
                      handleUploadImage();
                      setColorIndex(index);
                    }}
                    _pressed={{ bg: "#1492E6" }}
                  >
                    Upload Image
                  </Button>
                ) : (
                  <Box flexDir={"row"} alignItems={"center"}>
                    {item?.upload?.map((item, index) => {
                      return (
                        <Image
                          style={{ width: 70, height: 70, borderRadius: 35 }}
                          source={{
                            uri: item || null,
                          }}
                        />
                      );
                    })}
                    <Pressable
                      onPress={() => {
                        handleUploadImage();
                        setEditIndex(index);
                      }}
                    >
                      <Box
                        bg={"#E1E1E1"}
                        w={"50px"}
                        h={"50px"}
                        mr={3}
                        borderRadius={30}
                        alignItems={"center"}
                        justifyContent={"center"}
                      >
                        <Text fontSize={20} color={"#467DF2"}>
                          +
                        </Text>
                      </Box>
                    </Pressable>
                  </Box>
                )}
              </Box>
              <Flex
                direction="row"
                justifyContent={"center"}
                w={"100%"}
                h="58"
                bg={"#E3E3E3"}
                p="3"
                c
              >
                <Pressable
                  style={{
                    width: "48%",

                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onPress={() => handleRemove(item)}
                >
                  <Text
                    fontSize={20}
                    w={"70%"}
                    textAlign={"center"}
                    color={"#E61414"}
                  >
                    Remove
                  </Text>
                </Pressable>
                <Divider
                  bg="#707070"
                  thickness="2"
                  mx="2"
                  orientation="vertical"
                />
                <Pressable
                  style={{
                    width: "50%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onPress={() => navigation.navigate("CreateSet")}
                >
                  <Text
                    fontSize={20}
                    w={"40%"}
                    textAlign={"center"}
                    color={"#1492E6"}
                  >
                    Edit
                  </Text>
                </Pressable>
              </Flex>
            </Box>
          );
        })}
        <Button
          h={"48px"}
          bg={"#fff"}
          borderWidth={1}
          borderColor={"#1492E6"}
          w={"90%"}
          alignSelf={"center"}
          _text={{
            fontSize: 20,
            color: "#1492E6",
          }}
          onPress={() => navigation.navigate("CreateSet")}
        >
          + Add Colors
        </Button>
        <Box h={50}></Box>
      </ScrollView>
      <Box h={"100px"} bg={"#fff"} pt={5}>
        <Button
          h={"48px"}
          bg={"#1492E6"}
          borderWidth={1}
          borderColor={"#1492E6"}
          w={"90%"}
          alignSelf={"center"}
          _text={{
            fontSize: 20,
            color: "#fff",
          }}
          _pressed={{ bg: "#1492E6" }}
          onPress={saveProductVariants}
        >
          Save
        </Button>
      </Box>
      {showModal && (
        <UploadImages
          index={ColorIndex}
          UploadImage={UploadImage}
          showModal={showModal}
          setShowModal={setShowModal}
          pv={productVariants}
        />
      )}
    </Box>
  );
};

const UploadImages = ({ UploadImage, index, showModal, setShowModal, pv }) => {
  const [uploads, setUploads] = React.useState([
    // {
    //   uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    // },
    // {
    //   uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    // },
  ]);
  const [ImagesList, setImagesList] = useState([]);
  const handleSave = () => {
    UploadImage(index, uploads);
    setShowModal(false);
  };
  const pickImage = async (index) => {
    let options = {
      title: "Select Avatar",
      customButtons: [{ name: "fb", title: "Choose Photo from Gallery" }],
      storageOptions: {
        skipBackup: true,
        path: "images",
      },
    };
    const data = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      base64: true,
    });
    // console.log("dataImage", data.base64);
    if (data?.cancelled) {
      return;
    }
    if (data) {
      // console.log("data::::::", data.uri);
      const tempURI = `data:image/jpg;base64,${data.base64}` ?? null;
      setImagesList((prev) => [...prev, tempURI]);
      setUploads((prev) => [...prev, tempURI]);
      pv[index]["upload"] = ImagesList;
    }
    // console.log("ImagesList", ImagesList);
    // console.log("pv", pv);
  };
  return (
    <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
      <Box bg={"#fff"} borderRadius={10} width="90%" h={"600px"} p={5}>
        <Box flexDir={"row"} justifyContent={"space-between"}>
          <Icon
            as={AntDesign}
            name={"close"}
            size={"33px"}
            color={"#000"}
            shadow={2}
            bg={"#fff"}
            onPress={() => setShowModal(false)}
          />
          <Button
            bg={"#fff"}
            borderWidth={1}
            borderRadius={5}
            borderColor={"#1492E6"}
            w={"125px"}
            h={"48px"}
            alignSelf={"flex-end"}
            _text={{
              fontSize: 17,
              color: "#1492E6",
            }}
            _pressed={{
              bg: "#fff",
            }}
            onPress={handleSave}
          >
            Save
          </Button>
        </Box>
        <Box
          borderWidth={1}
          borderColor={"#BFBFBF"}
          borderRadius={5}
          h={"256px"}
          my={5}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Icon
            as={AntDesign}
            name={"download"}
            size={"52px"}
            color={"#1492E6"}
            mb={2}
          />
          <Text fontSize={21} color={"#575757"}>
            Drag and drop files here
          </Text>
          <Text fontSize={21} color={"#575757"}>
            or
          </Text>
          <Button
            bg={"#1492E6"}
            borderWidth={1}
            borderRadius={5}
            borderColor={"#fff"}
            w={"161px"}
            h={"52px"}
            mt={2}
            _text={{
              fontSize: 17,
              color: "#fff",
            }}
            _pressed={{
              bg: "#1492E6",
            }}
            onPress={() => pickImage()}
          >
            Browse files
          </Button>
        </Box>
        <Box mb={10}>
          {ImagesList.length
            ? ImagesList.map((item, index) => {
                console.log("itemff", item);
                return (
                  <Box key={item} flexDir={"row"} alignItems={"center"} my={1}>
                    <Avatar
                      bg="green.500"
                      source={{
                        uri: item,
                      }}
                    />
                    <Text
                      numberOfLines={1}
                      ellipsizeMode={"tail"}
                      fontSize={21}
                      color={"#686868"}
                      mx={3}
                    >
                      {"Image " + (index + 1)}
                    </Text>
                    <Icon
                      as={AntDesign}
                      name="close"
                      size={"25px"}
                      color={"#000"}
                      position={"absolute"}
                      right={0}
                    />
                  </Box>
                );
              })
            : null}

          {/* <Pressable style={styles.colorlist}>
            <Box
              bg={'#E1E1E1'}
              w={'50px'}
              h={'50px'}
              mr={3}
              borderRadius={30}
              alignItems={'center'}
              justifyContent={'center'}>
              <Text fontSize={20} color={'#467DF2'}>
                +
              </Text>
            </Box>
            <Text fontSize={20} color={'#467DF2'}>
              Upload
            </Text>
          </Pressable> */}
        </Box>
      </Box>
    </Modal>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "#F3F3F3",
  },
  variantCont: {
    width: "90%",
    height: 310,
    backgroundColor: "#fff",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 6,
    marginVertical: 10,
  },
  colorlist: {
    flexDirection: "row",
    alignItems: "center",
    height: 60,
    marginTop: 2,
    borderRadius: 6,
  },
});

export default ProductVariants;
