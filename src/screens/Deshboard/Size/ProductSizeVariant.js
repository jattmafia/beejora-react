import {
  Avatar,
  Box,
  Button,
  Divider,
  Icon,
  Image,
  Modal,
  Pressable,
  Text,
} from "native-base";
import React, { useState } from "react";
import { Alert, Linking, Platform, StyleSheet } from "react-native";
import DarkHeader from "../../../component/header/DarkHeader";

// Icons
import AntDesign from "react-native-vector-icons/AntDesign";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import { useDispatch } from "react-redux";
import { checkAppPermissions, requestPermission } from "../../../Utilities";
// import {PERMISSIONS} from 'react-native-permissions';
import { setSizeProductVariant } from "../../../Redux/Reducers/ProductSizeReducer";
import * as ImagePicker from "expo-image-picker";
const ProductSizeVariant = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = React.useState(false);
  const [uploadedImg, setUploadedImg] = React.useState([]);
  const [colors, setColors] = React.useState([]);
  const { selectedColors } = route.params;
  console.log("selectedColors", selectedColors);
  const [ImagesList, setImagesList] = useState([]);
  const [EditIndex, setEditIndex] = useState(10);
  const [ArticalCode, setArticalCode] = React.useState(
    Math.floor(Math.random() * 1000 + 1)
  );
  const handleSave = () => {
    let _upload = [...selectedColors];

    let obj = {
      articalCode: ArticalCode,
      uploads: uploadedImg,
    };
    try {
      if (ImagesList.length !== 0) {
        _upload.forEach((element) => {
          element.upload = ImagesList;
        });
        _upload.push(obj);
        dispatch(setSizeProductVariant(_upload));
        navigation.navigate("AddSizeSet");
      } else {
        Alert.alert("Alert!!", "upload an image", [{ text: "ok" }]);
      }
    } catch (error) {
      console.log("locate at productSizeVariant", error.message);
    }
  };

  const allColors = () => {
    let _colors = [];
    for (const key in selectedColors) {
      let _colorCode = selectedColors[key].color;
      let _colorName = selectedColors[key].colorName;
      _colors.push([_colorCode, _colorName]);
    }
    setColors(_colors);
  };

  React.useEffect(() => {
    allColors();
  }, []);

  return (
    <Box style={styles.main}>
      {/* Header */}
      <DarkHeader navigation={navigation} routeName={"Product Variants"} />
      <Box flex={1}>
        <Box style={styles.conatiner}>
          <Box style={styles.variantCont} px={5}>
            <Pressable
              style={styles.toupload}
              onPress={() => setShowModal(true)}
            >
              {ImagesList.length === 0 ? (
                <AntDesign name={"clouduploado"} size={40} color={"#CA6B6B"} />
              ) : (
                <Image
                  source={{ uri: ImagesList[0] }}
                  resizeMode={"cover"}
                  borderRadius={6}
                  h={"120px"}
                  w={"100%"}
                  alt={"upload"}
                />
              )}
            </Pressable>
            <Box>
              <Text style={styles.articalTxt}>Article Code</Text>
              <Text style={styles.articalNo}>{ArticalCode}</Text>
              <Text style={styles.articalTxt}>
                Color Set: {selectedColors.length + " "} Pcs
              </Text>
            </Box>
          </Box>
          <Box
            px={5}
            flexDir={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Box style={styles.colorBox}>
              <Box
                style={styles.color}
                zIndex={1}
                bg={"#" + selectedColors[0]?.color}
              ></Box>
              {selectedColors.map((item, index) => {
                if (index == 0) {
                  return null;
                }
                return (
                  <Box
                    style={styles.color}
                    bg={"#" + item?.color}
                    position={"relative"}
                    right={2}
                    zIndex={2}
                  ></Box>
                );
              })}
            </Box>
            <Box style={styles.colortitleCont}>
              <Text style={styles.colorTitle}>Color: </Text>
              <Text style={styles.colorTitle}>
                {selectedColors[0]?.colorName}
              </Text>
              <Divider
                orientation={"vertical"}
                h={4}
                thickness={2}
                bg={"#484848"}
              />
              <Text style={styles.colorTitle}>
                {selectedColors[1]?.colorName}
              </Text>
              <Divider
                orientation={"vertical"}
                h={4}
                thickness={2}
                bg={"#484848"}
              />
              <Text style={styles.colorTitle}>
                {selectedColors[2]?.colorName}
              </Text>
            </Box>
          </Box>
          <Button
            w={"90%"}
            bg={"#fff"}
            borderWidth={1}
            borderColor={"#1492E6"}
            alignSelf={"center"}
            rightIcon={
              <Icon
                as={EvilIcons}
                name="pencil"
                size={"30px"}
                color={"#1492E6"}
              />
            }
            _text={{
              color: "#1492E6",
              fontSize: 20,
            }}
            _pressed={{
              bg: "#fff",
            }}
            onPress={() => navigation.goBack()}
          >
            Edit
          </Button>
        </Box>
      </Box>
      <Box h={"100px"} bg={"#fff"} p={5}>
        <Button
          bg={ImagesList.length === 0 ? "#DCDCDC" : "#1492E6"}
          w={"100%"}
          h={"56px"}
          _text={{
            color: "#fff",
            fontSize: 19,
          }}
          _pressed={{
            bg: ImagesList.length === 0 ? "#DCDCDC" : "#1492E6",
          }}
          onPress={handleSave}
        >
          Save
        </Button>
      </Box>
      <UploadImages
        ImagesList={ImagesList}
        setImagesList={setImagesList}
        UploadImage={setUploadedImg}
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </Box>
  );
};

const UploadImages = ({
  ImagesList,
  setImagesList,
  UploadImage,
  showModal,
  setShowModal,
}) => {
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
    if (data?.cancelled) {
      return;
    }
    if (data) {
      var newState = [];
      const tempURI = `data:image/jpg;base64,${data.base64}` ?? null;
      setImagesList([tempURI]);
      // console.log("data", data);
      setShowModal(false);
    }
  };
  const handleSave = () => {
    UploadImage(uploads);
    setShowModal(false);
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
            onPress={() => pickImage()}
            _text={{
              fontSize: 17,
              color: "#fff",
            }}
            _pressed={{
              bg: "#1492E6",
            }}
          >
            Browse files
          </Button>
        </Box>
        <Box mb={10}>
          {ImagesList.map((item, index) => {
            return (
              <Box flexDir={"row"} alignItems={"center"} my={1}>
                <Avatar
                  bg="green.500"
                  source={{
                    uri: item,
                  }}
                />
                <Text fontSize={21} color={"#686868"} mx={3}>
                  {"Image " + (index + 1)}
                </Text>
                {/* <Pressable onPress={() => handleRemoveImage()}>
                  <Icon
                    as={AntDesign}
                    name="close"
                    size={'25px'}
                    color={'#000'}
                    position={'absolute'}
                    right={0}
                  />
                </Pressable> */}
              </Box>
            );
          })}

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
  conatiner: {
    backgroundColor: "#FFFFFF",
    width: "90%",
    alignSelf: "center",
    justifyContent: "space-around",
    height: 340,
    borderRadius: 6,
    marginVertical: 20,
    paddingVertical: 20,
  },
  variantCont: {
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  toupload: {
    width: 124,
    height: 123,
    borderWidth: 1,
    borderColor: "#CA6B6B",
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  articalTxt: {
    color: "#484848",
    fontSize: 20,
  },
  articalNo: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ACACAC",
    borderRadius: 6,
    paddingTop: 12,
    paddingLeft: 20,
    color: "#484848",
    fontSize: 20,
    marginVertical: 10,
  },
  colorBox: {
    width: 110,
    height: 41,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 6,
    borderColor: "#ACACAC",
    paddingLeft: 20,
  },
  color: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: "transparent",
    borderRadius: 30,
  },
  colortitleCont: {
    flex: 1,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  colorlist: {
    flexDirection: "row",
    alignItems: "center",
    height: 60,
    marginTop: 2,
    borderRadius: 6,
  },
});

export default ProductSizeVariant;
