import {
  Box,
  ScrollView,
  Text,
  Button,
  Pressable,
  Image,
  Flex,
  Divider,
} from "native-base";
import React from "react";
import { View, StyleSheet } from "react-native";

// Icons
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Feather from "react-native-vector-icons/Feather";
import Entypo from "react-native-vector-icons/Entypo";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import DarkHeader from "../../component/header/DarkHeader";
import { useSelector, useDispatch } from "react-redux";
import { SortImportantData } from "../../Redux/Actions";
import { getToken, PostRequestWithoutHeaders } from "../../Utilities";
import { removeSizeDraft } from "../../Redux/Reducers/ProductSizeReducer";
import { AppUrl } from "../AppUrl";
import { removeDraft } from "../../Redux/Reducers/ProductVarientReducer";
const SizeSummary = ({ navigation, route }) => {
  const [variantsOfProduct, setVariantsOfProduct] = React.useState(null);
  const [enableSubmit, setEnableSubmit] = React.useState(false);
  const _state = useSelector((state) => state);
  const { ProductVariantInfo, SizeSet } = _state.ProductSize;
  const { AttributeAndStyles, Catelog, Stock, addProductInfo } = _state.Product;
  const dispatch = useDispatch();
  console.log("_state", _state);
  console.log("_state stock", Stock);
  const tableDate = [
    { lable: "Main Category", value: addProductInfo?.Category || "" },
    {
      lable: "Sub Category",
      value: addProductInfo?.SubCategory || "",
    },
    { lable: "Set Type", value: addProductInfo?.Type + " Set" || "" },
    { lable: "Lot Type", value: addProductInfo?.Lot || "0" },
    { lable: "Product Name", value: addProductInfo?.Brand || "" },
  ];
  React.useEffect(() => {
    let Obj = _state.Product;
    for (const key in Obj) {
      if (Obj[key] !== "" && Obj[key] !== 0) {
        setEnableSubmit(true);
      }
    }
  }, [ProductVariantInfo, SizeSet, Stock, AttributeAndStyles, Catelog]);

  React.useEffect(() => {
    if (ProductVariantInfo !== "") {
      const getSortedProductVariant = SortImportantData(ProductVariantInfo);
      setVariantsOfProduct(getSortedProductVariant);
    }
  }, [ProductVariantInfo]);
  const handleProductSubmit = async () => {
    let token = await getToken();
    console.log("token", token);
    if (!token && token.length < 6) {
      alert("please login to continue");
      return;
    }
    let formdata = new FormData();
    if (!Catelog) {
      alert("enter catelog");
      return;
    } else {
      Catelog.forEach((element) => {
        if (element.lable == "Beejora Price") {
          formdata.append("actual_price", element.value[0] ?? 0);
          formdata.append("price", element.value[1] ?? 0);
        } else if (element.lable == "HSN Code") {
          formdata.append("hsn", element.value[0]);
        } else if (element.lable == "Product Description") {
          formdata.append("description", element.value[0]);
        }
      });
    }
    if (!AttributeAndStyles) {
      alert("add attributes and styles");
      return;
    } else {
      AttributeAndStyles.forEach((element) => {
        // colors.push(element.colorName);
        console.log("element[0]", element[0]);
        formdata.append(
          element[0].attribute_name.toLowerCase().replace(" ", "_"),
          element[0].attributes[0]
        );
      });
    }
    let colorsList = "";
    let imagelist = [];

    if (!ProductVariantInfo) {
      alert("Add Product Varient");
      return;
    } else {
      var i = 0;
      ProductVariantInfo.forEach((element) => {
        if (element.colorName == undefined) {
        } else if (i == ProductVariantInfo.length - 1) {
          colorsList = colorsList + element.colorName;
        } else {
          colorsList = colorsList + element.colorName + ",";
        }
        i += 1;
      });
    }

    if (colorsList) {
      const imageObj = {
        uri: ProductVariantInfo[0]?.upload[0] ?? "",
        type: "image/jpg",
        name: "myimage",
        color: colorsList,
      };
      imagelist.push(imageObj);
    }

    console.log("colorsList123", colorsList);
    formdata.append("variation_images", JSON.stringify(imagelist));
    // formdata.append("name", route?.params?.data?.Brand);
    // formdata.append("colors", colorsList);
    // formdata.append("seller", "ali");
    // formdata.append("category", route?.params?.data?.Type);
    // formdata.append("main_category", route?.params?.data?.Category);
    // formdata.append("sub_category", route.params?.data?.SubCategory);
    // formdata.append("stock", Stock);
    // // formdata.append('size', SizeSet.split('/')[0]);
    // // formdata.append('size_type', SizeSet.split('/')[2]);
    // // formdata.append('size_stock', SizeSet.split('/')[1]);
    // // formdata.append('arraytest[]', {uri: ;'helo'});
    // // formdata.append('arraytest[]', {uri: 'heloworld'})

    formdata.append("name", addProductInfo?.Brand);
    formdata.append("colors", colorsList);
    formdata.append("seller", "ali");
    formdata.append("category", addProductInfo?.Type);
    formdata.append("main_category", addProductInfo?.Category);
    formdata.append("sub_category", addProductInfo?.SubCategory);
    formdata.append("stock", Stock);
    console.log("formdata", formdata);

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    };
    PostRequestWithoutHeaders(
      AppUrl.addProduct,
      headers,
      "POST",
      formdata,
      "Add Product color vari"
    )
      .then((res) => {
        // res.json();
        console.log(">>>>>>>>>>>>>>>>", res);
        if (res.status === 200) {
          return res.json();
        }
        throw JSON.stringify(res);
      })
      .then((rsp) => {
        console.log("rsp add product", rsp);
        dispatch(removeDraft(""));
        navigation.navigate("ProductReview", { variantsOfProduct });
      })
      .catch((err) => console.log("Error in SizeSummary::", err));
  };
  const handleSave = () => {
    if (enableSubmit) {
      navigation.navigate("ProductReview", { variantsOfProduct });
    }
  };

  const productOptions = [
    {
      IconType: Feather,
      IconName: "shopping-cart",
      PTitle: "Product Variants",
      Status: "Pending",
      Lock: false,
      Chev: Entypo,
      ChevName: "chevron-thin-right",
      jumpTo: "CreateSizeSet",
      edit: "CreateSizeSet",
      data:
        ProductVariantInfo !== null && ProductVariantInfo !== ""
          ? ProductVariantInfo
          : false,
    },
    {
      IconType: MaterialCommunityIcons,
      IconName: "tape-measure",
      PTitle: "Add Size Set",
      Status: "Pending",
      Lock: false,
      Chev: Entypo,
      ChevName: "chevron-thin-right",
      jumpTo: "AddSizeSet",
      edit: "AddSizeSet",
      data: SizeSet == "" || SizeSet == null ? false : SizeSet,
    },
    {
      IconType: AntDesign,
      IconName: "linechart",
      PTitle: "Stock",
      Status: "Pending",
      Lock: false,
      Chev: EvilIcons,
      ChevName: "lock",
      jumpTo: "SizeStock",
      edit: "SizeStock",
      data:
        Stock !== 0 &&
        (ProductVariantInfo !== null || ProductVariantInfo !== "")
          ? [Stock, variantsOfProduct]
          : false,
    },
    {
      IconType: Entypo,
      IconName: "ticket",
      PTitle: "Attributes & Styles",
      Status: "Pending",
      Lock: false,
      Chev: Entypo,
      ChevName: "chevron-thin-right",
      jumpTo: "AttriAndSty",
      edit: "AttriAndSty",
      data: AttributeAndStyles !== "" ? AttributeAndStyles : false,
    },
    {
      IconType: MaterialCommunityIcons,
      IconName: "format-list-text",
      PTitle: "Catelog",
      Status: "Pending",
      Lock: false,
      Chev: Entypo,
      ChevName: "chevron-thin-right",
      jumpTo: "Catelog",
      edit: "Summary",
      data: Catelog !== "" ? Catelog : false,
    },
  ];

  const handleRemoveDraft = () => {
    navigation.goBack();
    dispatch(removeSizeDraft());
  };
  return (
    <Box style={styles.main}>
      {/* Header */}
      <DarkHeader navigation={navigation} routeName={"Summary"} />
      <ScrollView>
        {/* Data table */}
        <Box style={styles.table}>
          {/* Table header */}
          <Box style={styles.theader}>
            <FontAwesome5 name="box-open" size={20} color={"#484848"} />
            <Text style={styles.tableTitle}>Base Details</Text>
            <Feather
              name="edit-2"
              size={20}
              color={"#1492E6"}
              style={styles.editIcon}
              onPress={() => navigation.goBack()}
            />
          </Box>
          {tableDate.map((item, index) => {
            return (
              <Box key={index} style={styles.trow}>
                <Box style={styles.tlable}>
                  <Text fontSize={14} color={"#939393"}>
                    {item.lable}
                  </Text>
                </Box>
                <Box style={styles.tval}>
                  <Text fontSize={14} color={"#434343"}>
                    {item.value}
                  </Text>
                </Box>
              </Box>
            );
          })}
        </Box>
        <Box px={5}>
          {productOptions.map((item, index) => {
            const { PTitle, IconType, Chev, jumpTo, edit, data } = item;
            const checkPV = PTitle === "Product Variants" && data !== false;
            const checkASS = PTitle === "Add Size Set" && data !== false;
            const checkStock = PTitle === "Stock" && data !== false;
            const checkAS = PTitle === "Attributes & Styles" && data !== false;
            const checkCatlog = PTitle === "Catelog" && data !== false;
            console.log("checkPV", checkPV);
            return (
              <Box key={index}>
                <Box style={styles.productProcess}>
                  <IconType name={item.IconName} size={20} color={"#484848"} />
                  <Text
                    fontSize={17}
                    color={"#484848"}
                    lineHeight={40}
                    paddingLeft={5}
                    fontWeight={"500"}
                  >
                    {PTitle}
                  </Text>
                  {data === false || data === 0 ? (
                    <Pressable
                      style={styles.pendingOrLock}
                      onPress={() =>
                        navigation.navigate(jumpTo, {
                          routeNameToSize: "SizeSummary",
                        })
                      }
                    >
                      <Text
                        fontSize={17}
                        color={"#DC3B3B"}
                        lineHeight={40}
                        fontWeight={"500"}
                      >
                        Pending
                      </Text>
                      <Chev
                        name={item.ChevName}
                        size={20}
                        color={"#DC3B3B"}
                        style={{ paddingTop: 5 }}
                      />
                    </Pressable>
                  ) : (
                    <EvilIcons
                      style={styles.pendingOrLock}
                      name="pencil"
                      size={30}
                      color={"#1492E6"}
                      onPress={() =>
                        navigation.navigate(edit, {
                          selectedColors: ProductVariantInfo,
                          routeNameToSize: "SizeSummary",
                        })
                      }
                    />
                  )}
                </Box>
                {checkPV && <Product_Variant items={data} />}
                {checkASS && <AddSizeSet items={data} />}
                {checkStock && (
                  <StockSet items={data} SizeSet={SizeSet !== "" && SizeSet} />
                )}
                {checkAS && <SelectedAttributeAndStyles item={data} />}
                {checkCatlog && <CatelogCom item={data} />}
              </Box>
            );
          })}
        </Box>
        <Box h={50}></Box>
      </ScrollView>
      <Box style={styles.btnCont}>
        <Button
          style={styles.saveAndDraft}
          _text={{
            color: "#1492E6",
            fontSize: 15,
            fontWeight: "500",
          }}
          onPress={() => handleRemoveDraft()}
        >
          Delete DRAFT
        </Button>
        <Button
          style={[
            styles.saveAndDraft,
            {
              backgroundColor: enableSubmit ? "#467DF2" : "#E8E8E8",
              borderColor: enableSubmit ? "#467DF2" : "#E8E8E8",
            },
          ]}
          _text={{
            color: "#fff",
            fontSize: 15,
            fontWeight: "500",
          }}
          onPress={handleProductSubmit}
        >
          SUBMIT FOR REVIEW
        </Button>
      </Box>
    </Box>
  );
};

const Product_Variant = ({ items }) => {
  console.log("itemdddds", items[0]);
  if (!items) {
    return null;
  }

  //   return <Text>helo</Text>;
  //   const {articleCode, colorsSelected, stock} = items;
  return (
    <Flex p={3} bg={"#fff"} direction="row">
      <Box
        w={"100px"}
        h={"100px"}
        mr={5}
        p={2}
        borderWidth={1}
        borderColor={"#CECECE"}
        borderRadius={3}
      >
        <Image
          w={"100%"}
          h={"85px"}
          resizeMode={"cover"}
          borderRadius={3}
          source={{ uri: items[0].upload[0] || "" }}
          alt={"product-img"}
        />
      </Box>
      <Box>
        <Text color={"#000"} fontSize={14}>
          Article Code: {items[0].articalCode0}
        </Text>
        <Flex direction="row" alignItems={"center"} h="20px">
          <Text color={"#0C65A1"} fontSize={14}>
            Color:{" "}
          </Text>
          {items.map((item, index) => {
            return (
              <Flex direction="row" alignItems={"center"} h="20px" key={index}>
                <Text color={"#0C65A1"} fontSize={14}>
                  {item.colorName}
                </Text>
                {items.length - 1 !== index && (
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
        </Flex>
        <Text color={"#000"} fontSize={14}>
          Stock: {items[0].stock}
        </Text>
      </Box>
    </Flex>
  );
};

const AddSizeSet = ({ items }) => {
  console.log("this is items", items);
  if (!items) {
    return null;
  }
  return (
    <Box bg={"#fff"} p={3}>
      <Text color={"#484848"} fontSize={18}>
        Size Set
      </Text>
      <Text color={"#484848"} fontSize={18}>
        {items}
      </Text>
    </Box>
  );
};

const StockSet = ({ items, SizeSet }) => {
  if (!items) {
    return null;
  }
  return null;
  console.log("items,SizeSet", items, SizeSet);
  const { articleCode, colorsSelected } = items[1];
  return (
    <Box>
      <Flex p={3} bg={"#fff"} direction="row">
        <Box
          w={"100px"}
          h={"100px"}
          mr={5}
          p={2}
          borderWidth={1}
          borderColor={"#CECECE"}
          borderRadius={3}
        >
          <Image
            w={"100%"}
            h={"85px"}
            resizeMode={"cover"}
            borderRadius={3}
            source={{ uri: items[1][0].upload[0].uri }}
            alt={"product-img"}
          />
        </Box>
        <Box>
          <Text color={"#000"} fontSize={14}>
            Article Code: {items[1][0].articleCode}
          </Text>
          <Flex direction="row" alignItems={"center"} h="20px">
            <Text color={"#0C65A1"} fontSize={14}>
              Color:{" "}
            </Text>
            {items[1].map((item, index) => {
              return (
                <Flex
                  direction="row"
                  alignItems={"center"}
                  h="20px"
                  key={index}
                >
                  <Text color={"#0C65A1"} fontSize={14}>
                    {item.colorName}
                  </Text>
                  {items[1].length - 1 !== index && (
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
          </Flex>
        </Box>
      </Flex>
      <Box
        p={3}
        bg={"#fff"}
        flexDir={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Box>
          <Text color={"#434343"} fontSize={14}>
            Size Set
          </Text>
          <Text color={"#434343"} fontSize={14}>
            {SizeSet}
          </Text>
        </Box>
        <Box>
          <Text color={"#434343"} fontSize={14}>
            Stock
          </Text>
          <Text color={"#434343"} fontSize={14}>
            {items[0]} lots
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

const SelectedAttributeAndStyles = ({ item }) => {
  console.log("item attributes", item);
  if (!item) {
    return null;
  }
  // return null;
  return (
    <Box>
      {item.map((_item, index) => {
        return (
          <Box key={index} style={styles.trow} bg={"#fff"}>
            <Box style={styles.tlable}>
              <Text fontSize={14} color={"#939393"}>
                {_item[0].attribute_name}
              </Text>
            </Box>
            <Box style={styles.tval}>
              <Text fontSize={14} color={"#434343"}>
                {_item[0].attributes[0]}
              </Text>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

const CatelogCom = ({ item }) => {
  console.log("item cate", item);
  if (!item) {
    return null;
  }
  // return null;
  return (
    <React.Fragment>
      {item.map((_item, index) => {
        return _item.lable == "Video URL" ? null : (
          <Box key={index} style={styles.trow} bg={"#fff"}>
            <Box style={styles.tlable}>
              <Text fontSize={14} color={"#939393"}>
                {_item.lable}
              </Text>
            </Box>
            <Box
              style={[styles.tval, { justifyContent: "space-between" }]}
              flexDir={"row"}
              alignItems={"center"}
            >
              <Text fontSize={14} color={"#434343"}>
                {_item.value[0]}
              </Text>
              {_item.value[1] !== undefined && (
                <Text fontSize={14} color={"#434343"} style={styles.mrp}>
                  {_item.value[1]}
                </Text>
              )}
            </Box>
          </Box>
        );
      })}
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "#F7F7F7",
  },
  table: {
    width: "90%",
    alignSelf: "center",
    marginVertical: 20,
    backgroundColor: "#fff",
  },
  theader: {
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    paddingHorizontal: 20,
    borderColor: "#EBEBEB",
    borderWidth: 1,
  },
  tableTitle: {
    fontSize: 18,
    fontWeight: "500",
    color: "#484848",
    paddingLeft: 20,
  },
  editIcon: {
    position: "absolute",
    right: 10,
  },
  trow: {
    flexDirection: "row",
    alignItems: "center",
  },
  tlable: {
    width: "40%",
    height: 50,
    justifyContent: "center",
    paddingHorizontal: 10,
    borderWidth: 1,
    borderTopWidth: 0,
    borderColor: "#EBEBEB",
  },
  tval: {
    width: "60%",
    height: 50,
    justifyContent: "center",
    paddingHorizontal: 10,
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderColor: "#EBEBEB",
  },
  productProcess: {
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "#fff",
    height: 60,
    paddingHorizontal: 10,
    marginTop: 5,
    marginBottom: 2,
  },
  pendingOrLock: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    right: 5,
  },
  btnCont: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%",
    height: 100,
    backgroundColor: "#fff",
  },
  saveAndDraft: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#1492E6",
    height: 48,
  },
  mrp: {
    backgroundColor: "#F1F1F1",
    height: 30,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
});

export default SizeSummary;
