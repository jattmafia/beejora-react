import { combineReducers } from 'redux';

// Reducers
import ProductSummary from './Reducers/ProductVarientReducer';
import ProductSizeReducer from './Reducers/ProductSizeReducer';

const rootReducer = combineReducers({
    Product: ProductSummary,
    ProductSize: ProductSizeReducer
})

export default rootReducer