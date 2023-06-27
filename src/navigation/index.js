// In App.js in a new project

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NativeBaseProvider} from 'native-base';
import Login from '../screens/auth/login';
import Afterlogin from '../screens/Deshboard/AfterLogin';
import Addproduct from '../screens/Deshboard/AddProduct';
import Summary from '../screens/Deshboard/Summary';
import CreateSet from '../screens/Deshboard/CreateSet';

// Redux with persistance
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from '../Redux/store';
import ProductVariants from '../screens/Deshboard/ProductVariants';
import Addsize from '../screens/Deshboard/AddSize';
import Stock from '../screens/Deshboard/Stock';
import AttributesAndStyles from '../screens/Deshboard/AttributesAndStyles';
import Catelog from '../screens/Deshboard/Catelog';
import ProductReview from '../screens/Deshboard/ProductReview';
import TrackOrder from '../screens/Deshboard/TrackOrder';
import Profile from '../screens/Deshboard/Profile';
import SizeSummary from '../screens/Deshboard/SizeSummary';
import SizeSetCreate from '../screens/Deshboard/Size/SizeSet';
import ProductSizeVariant from '../screens/Deshboard/Size/ProductSizeVariant';
import AddSizeSet from '../screens/Deshboard/Size/AddSizeSet';
import SizeStock from '../screens/Deshboard/Size/SizeStock';
import ProductSubmission from '../screens/Deshboard/ProductSubmission';

const Stack = createNativeStackNavigator();

function AppAuthScreens() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      />
    </Stack.Navigator>
  );
}
const AppDeshScreens = () => {
  return (
    <Stack.Navigator
      initialRouteName="SizeSummary"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}>
      {/* Add Product */}

      <Stack.Screen name="AfterLogin" component={Afterlogin} />
      <Stack.Screen name="AddProduct" component={Addproduct} />
      <Stack.Screen name="Summary" component={Summary} />
      <Stack.Screen name="CreateSet" component={CreateSet} />
      <Stack.Screen name="ProductVariants" component={ProductVariants} />
      <Stack.Screen name="AddSize" component={Addsize} />
      <Stack.Screen
        name="Stock"
        initialParams={{routeName: 'Summary'}}
        component={Stock}
      />
      <Stack.Screen
        name="AttriAndSty"
        initialParams={{routeName: 'Summary'}}
        component={AttributesAndStyles}
      />
      <Stack.Screen
        name="Catelog"
        initialParams={{routeName: 'Summary'}}
        component={Catelog}
      />
      <Stack.Screen name="ProductReview" component={ProductReview} />
      {/* <Stack.Screen name="Deshboard" component={AppDeshScreens} /> */}
      {/* Track Order */}
      <Stack.Screen name="TrackOrder" component={TrackOrder} />
      {/* Profile */}
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="ProductSubmission" component={ProductSubmission} />

      {/* Size set */}
      <Stack.Screen name="SizeSummary" component={SizeSummary} />
      <Stack.Screen name="CreateSizeSet" component={SizeSetCreate} />
      <Stack.Screen name="ProductSizeVariant" component={ProductSizeVariant} />
      <Stack.Screen name="AddSizeSet" component={AddSizeSet} />
      <Stack.Screen name="SizeStock" component={SizeStock} />
    </Stack.Navigator>
  );
};
const AppScreens = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}>
      <Stack.Screen name="Auth" component={AppAuthScreens} />
      <Stack.Screen name="AfterLogin" component={Afterlogin} />
      <Stack.Screen name="AddProduct" component={Addproduct} />
      <Stack.Screen name="Summary" component={Summary} />
      <Stack.Screen name="CreateSet" component={CreateSet} />
      <Stack.Screen name="ProductVariants" component={ProductVariants} />
      <Stack.Screen name="AddSize" component={Addsize} />
      <Stack.Screen
        name="Stock"
        initialParams={{routeName: 'Summary'}}
        component={Stock}
      />
      <Stack.Screen
        name="AttriAndSty"
        initialParams={{routeName: 'Summary'}}
        component={AttributesAndStyles}
      />
      <Stack.Screen
        name="Catelog"
        initialParams={{routeName: 'Summary'}}
        component={Catelog}
      />
      <Stack.Screen name="ProductReview" component={ProductReview} />
      {/* <Stack.Screen name="Deshboard" component={AppDeshScreens} /> */}
      {/* Track Order */}
      <Stack.Screen name="TrackOrder" component={TrackOrder} />
      {/* Profile */}
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="ProductSubmission" component={ProductSubmission} />

      {/* Size set */}
      <Stack.Screen name="SizeSummary" component={SizeSummary} />
      <Stack.Screen name="CreateSizeSet" component={SizeSetCreate} />
      <Stack.Screen name="ProductSizeVariant" component={ProductSizeVariant} />
      <Stack.Screen name="AddSizeSet" component={AddSizeSet} />
      <Stack.Screen name="SizeStock" component={SizeStock} />
    </Stack.Navigator>
  );
};

function AppNavScreen() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <AppScreens />
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

const AppNav = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppNavScreen />
      </PersistGate>
    </Provider>
  );
};

export default AppNav;
