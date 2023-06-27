import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  ProductVariantInfo: '',
  SizeSet: '',
  Stock: 0,
  AttributeAndStyles: '',
  Catelog: '',
};

const ProductSizeSummary = createSlice({
  name: 'Size',
  initialState,
  reducers: {
    setSizeProductVariant: (state, action) => {
      console.log('action.payload', action.payload);
      state.ProductVariantInfo = action.payload;
    },
    handleSizeSet: (state, action) => {
      state.SizeSet = action.payload;
    },
    handleSizeSetStock: (state, action) => {
      state.Stock = action.payload;
    },
    removeSizeDraft: (state, action) => {
      state.ProductVariantInfo = null;
      state.SizeSet = null;
      state.Stock = 0;
      state.AttributeAndStyles = null;
      state.Catelog = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  removeSizeDraft,
  setSizeProductVariant,
  handleSizeSet,
  handleSizeSetStock,
} = ProductSizeSummary.actions;

export default ProductSizeSummary.reducer;
