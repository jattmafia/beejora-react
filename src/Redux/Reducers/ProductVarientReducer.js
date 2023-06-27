import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  ProductVariantInfo: '',
  SizeSet: '',
  Stock: 0,
  AttributeAndStyles: '',
  Catelog: '',
  ProductVariantInfoColors: '',
  SizeSetColors: '',
  StockColors: 0,
  AttributeAndStylesColors: '',
  CatelogColors: '',
  addProductInfo: {
    Brand: '',
    Category: '',
    SubCategory: '',
    Lot: '',
    Type: '',
  }
};

const ProductSummary = createSlice({
  name: 'Product',
  initialState,
  reducers: {
    setProductVariant: (state, action) => {
      state.ProductVariantInfo = action.payload;
    },
    handleSize: (state, action) => {
      state.SizeSet = action.payload;
    },
    handleStock: (state, action) => {
      console.log('action.payload', action.payload);
      state.Stock = action.payload;
    },
    handleStockNull: (state, action) => {
      console.log('action.payload', action.payload);
      state.null = action.payload;
    },
    handleAttriAndStyles: (state, action) => {
      state.AttributeAndStyles = action.payload;
    },

    handleCatelog: (state, action) => {
      state.Catelog = action.payload;
    },

    handleAddProduct: (state, action) => {
      state.addProductInfo = action.payload
    },

    removeDraft: (state, action) => {
      state.ProductVariantInfo = '';
      state.SizeSet = '';
      state.Stock = 0;
      state.AttributeAndStyles = '';
      state.Catelog = '';
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setProductVariant,
  handleSize,
  handleStock,
  handleStockNull,
  handleAttriAndStyles,
  handleCatelog,
  setProductVariantColors,
  handleSizeColors,
  handleStockColors,
  handleAttriAndStylesColors,
  handleCatelogColors,
  removeDraft,
  removeDraftColors,
  handleAddProduct
} = ProductSummary.actions;

export default ProductSummary.reducer;
