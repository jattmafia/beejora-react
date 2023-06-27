import {
  Actionsheet,
  Box,
  Button,
  Center,
  Flex,
  Input,
  Pressable,
  ScrollView,
  Text,
  TextArea,
  useDisclose,
} from "native-base";
import React from "react";
import { Dimensions, StyleSheet } from "react-native";
import DarkHeader from "../../component/header/DarkHeader";

// Icon
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Feather from "react-native-vector-icons/Feather";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useDispatch } from "react-redux";
import { handleCatelog } from "../../Redux/Reducers/ProductVarientReducer";
import { _Catelog } from "../../Redux/DefaultData";

const Catelog = ({ navigation, route }) => {
  let { routeName, routeNameToSize } = route.params;
  const dispatch = useDispatch();
  let COUNTRYLIST = ["Pakistan", "India", "Australia"];
  const [selectedItems, setSelectedItems] = React.useState([]);
  const [newCatelog, setNewCatelog] = React.useState([]);
  const [ProductDescription, setProductDescription] = React.useState("");
  const [ProductHsn, setProductHsn] = React.useState("");
  const [FactoryPrice, setFactoryPrice] = React.useState(0);
  const [MrpPrice, setMrpPrice] = React.useState("");
  const [OriginCountry, setOriginCountry] = React.useState("");
  const [SizeChartCountry, setSizeChartCountry] = React.useState("");
  const SavePrice = () => {
    let obj = {
      lable: "Beejora Price",
      value: [FactoryPrice, MrpPrice],
    };
    let obj2 = {
      lable: "Video URL",
      value: [""],
    };
    let obj3 = {
      lable: "Size Chart",
      value: [SizeChartCountry],
    };
    let obj7 = {
      lable: "Country of Origin",
      value: [OriginCountry],
    };
    let obj4 = {
      lable: "Tags",
      value: ["abc"],
    };
    let obj5 = {
      lable: "HSN Code",
      value: [ProductHsn],
    };
    let obj6 = {
      lable: "Product Description",
      value: [ProductDescription],
    };
    var tempList = [];
    tempList.push(obj);
    tempList.push(obj2);
    tempList.push(obj3);
    tempList.push(obj4);
    tempList.push(obj5);
    tempList.push(obj6);
    tempList.push(obj7);
    setNewCatelog(tempList);
    dispatch(handleCatelog(tempList));
    if (routeNameToSize) {
      navigation.navigate(routeNameToSize);
    } else {
      navigation.navigate(routeName);
    }
  };
  console.log(routeName, routeNameToSize);
  const { isOpen, onOpen, onClose } = useDisclose();
  return (
    <Box flex={1} bg={"#fff"}>
      {/* Header */}
      <DarkHeader navigation={navigation} routeName={"Catelog"} />
      <ScrollView flex={1} p={5} w={"100%"}>
        <Flex direction="row">
          <Box w={"40%"} px={2}>
            <Text fontSize={14} color={"#4E4E4E"} mb={2}>
              Selling Price *
            </Text>
            <Box
              borderWidth={1}
              borderRadius={6}
              borderColor={"#CCCCCC"}
              h={"47px"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Input
                onChangeText={(val) => setFactoryPrice(val)}
                fontSize={20}
                color={"#4E4E4E"}
                placeholder={"₹ 599"}
              />
            </Box>
          </Box>
          <Box w={"40%"} px={2}>
            <Text fontSize={14} color={"#4E4E4E"} mb={2}>
              MRP
            </Text>
            <Box
              borderWidth={1}
              borderRadius={6}
              borderColor={"#CCCCCC"}
              h={"47px"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Input
                onChangeText={(val) => setMrpPrice(val)}
                fontSize={20}
                color={"#4E4E4E"}
                placeholder={"₹ 899"}
              />
            </Box>
          </Box>
          {/* <Box w={'20%'} justifyContent={'flex-end'} px={2} pb={3}>
            <FontAwesome5
              name="calculator"
              size={20}
              color={'#1492E6'}
              onPress={onOpen}
            />
          </Box> */}
        </Flex>
        <Text color={"#1492E6"} fontSize={15} my={4}>
          This is the final landing price for the retailer.
        </Text>
        <ProductInfoPickers
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
          categoryType={"Origin Country"}
          brandName={"Country of Origin"}
          placeholder={"Country"}
          pickerItem={COUNTRYLIST}
          setDropDwon={setOriginCountry}
        />
        {/* <ProductInfoPickers
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
          categoryType={'Size Chart'}
          brandName={'Size Chart'}
          placeholder={'Choose Chart'}
          pickerItem={COUNTRYLIST}
          setDropDwon={setSizeChartCountry}
        /> */}
        <Box w="100%" my={2}>
          <Text style={styles.label}>Product Description</Text>
          <TextArea
            onChangeText={(val) => setProductDescription(val)}
            borderColor={"#AEAEAE"}
            h={20}
            placeholder="Product Description"
            w="100%"
          />
        </Box>
        <Box w="100%">
          <Text style={styles.label}>
            HSN Code <Text style={styles.required}>*</Text>
          </Text>
          <Input
            borderColor={"#AEAEAE"}
            w="100%"
            onChangeText={(val) => setProductHsn(val)}
          />
        </Box>
        <PriceBreakUp isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
        <Box h={50}></Box>
      </ScrollView>
      <Box
        h={"100px"}
        bg={"#fff"}
        borderTopWidth={1}
        borderColor={"#D0D0D0"}
        justifyContent={"center"}
      >
        <Button
          h={"56px"}
          w={"90%"}
          alignSelf={"center"}
          bg={"#1492E6"}
          _text={{
            fontSize: 18,
            color: "#fff",
          }}
          _pressed={{
            bg: "#1492E6",
          }}
          onPress={SavePrice}
        >
          Save
        </Button>
      </Box>
    </Box>
  );
};

const ProductInfoPickers = ({
  selectedItems,
  setSelectedItems,
  categoryType,
  brandName,
  placeholder,
  pickerItem,
  setDropDwon,
}) => {
  const [selectPickerValue, setSelectPickerValue] = React.useState("");
  const { isOpen, onOpen, onClose } = useDisclose();

  const handlePickerSelection = (item) => {
    let selected = [selectPickerValue, ...selectedItems];
    setSelectedItems(selected);
    setSelectPickerValue(item);
    console.log("item", item);
    setDropDwon(item);
    onClose();
  };
  return (
    <Box style={styles.product_info} mt={2}>
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
          name={isOpen ? "chevron-up" : "chevron-down"}
          size={30}
          color={"#1492E6"}
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
                  color={"#95AEC5"}
                  onPress={onClose}
                />
              </Box>
              <ScrollView
                h={230}
                w={"100%"}
                showsVerticalScrollIndicator={false}
              >
                {pickerItem.map((item, index) => {
                  return (
                    <Actionsheet.Item
                      style={styles.ItemText}
                      key={index}
                      onPress={() => handlePickerSelection(item)}
                    >
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

const PriceBreakUp = ({ isOpen, onClose, onOpen }) => {
  return (
    <Center flex={1}>
      <Center>
        <Actionsheet isOpen={isOpen} onClose={onClose}>
          <Actionsheet.Content
            _dragIndicator={{ display: "none" }}
            minH={"250px"}
            justifyContent={"center"}
          >
            <Box style={styles.priceBreakHeader}>
              <Text style={styles.selectHeadingText}>Price Break - Up</Text>
              <AntDesign
                name="closecircle"
                size={30}
                color={"#95AEC5"}
                onPress={onClose}
              />
            </Box>
            <Box w={"100%"}>
              <Box
                mx={5}
                flexDir={"row"}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Text fontSize={18} color={"#6D6D6D"}>
                  Seller Price
                </Text>
                <Text fontSize={20} color={"#4E4E4E"}>
                  ₹599
                </Text>
              </Box>
              <Box
                mx={5}
                my={1}
                flexDir={"row"}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Text fontSize={18} color={"#6D6D6D"}>
                  (+) Product GST @ 12 %
                </Text>
                <Text fontSize={20} color={"#4E4E4E"}>
                  ₹71.88
                </Text>
              </Box>
              <Box
                bg={"#E4EBFB"}
                flexDir={"row"}
                alignItems={"center"}
                justifyContent={"space-between"}
                h={"48px"}
                px={5}
              >
                <Text fontSize={18} color={"#6D6D6D"}>
                  Beejora Price
                </Text>
                <Text fontSize={20} color={"#4E4E4E"}>
                  ₹71.88
                </Text>
              </Box>
            </Box>
          </Actionsheet.Content>
        </Actionsheet>
      </Center>
    </Center>
  );
};

const styles = StyleSheet.create({
  product_info: {
    width: "100%",
  },
  label: {
    color: "#5C5C5C",
    fontSize: 16,
    fontWeight: "400",
    marginVertical: 8,
  },
  textArea: {
    borderWidth: 1,
    borderColor: "#AEAEAE",
    borderRadius: 4,
    paddingHorizontal: 15,
  },
  picker: {
    borderWidth: 1,
    borderColor: "#AEAEAE",
    borderRadius: 4,
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  pickerValue: {
    color: "#1A1A1A",
    fontSize: 14,
    fontWeight: "400",
  },
  placeholder: {
    color: "#A7A7A7",
    fontSize: 14,
    fontWeight: "400",
  },
  selectHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 60,
    width: "100%",
    paddingHorizontal: 15,
  },
  selectHeadingText: {
    color: "#1A1A1A",
    fontSize: 18,
    fontWeight: "500",
  },
  ItemText: {
    borderBottomWidth: 1,
    borderColor: "#DBDBDB",
    color: "#1A1A1A",
    opacity: 0.76,
  },
  required: {
    color: "#FF3636",
    fontSize: 16,
    position: "absolute",
    top: 0,
    right: 0,
  },
  priceBreakHeader: {
    width: Dimensions.get("screen").width,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#E4EBFB",
    position: "absolute",
    top: 0,
    height: 60,
    paddingHorizontal: 30,
  },
});

export default Catelog;
