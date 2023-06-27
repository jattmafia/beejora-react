export const SortImportantData = (ProductVariantInfo, _type) => {
  try {
    let colors = [];
    if (_type == 'variants') {
      return ProductVariantInfo;
    }
    let variants = ProductVariantInfo || [];

    return variants;
    // ProductVariantInfo.forEach(element => {
    //   colors.push(element.colorName);
    // });
    // const variants = {
    //   articleCode: ProductVariantInfo[0].articleCode,
    //   colorsSelected: colors,
    //   uri: ProductVariantInfo[0].upload[0],
    //   stock: 'ulimited',
    // };
    // if (Object.keys(variants).length !== 0) {
    //   return variants;
    // }
  } catch (error) {
    console.log(error);
  }
};
