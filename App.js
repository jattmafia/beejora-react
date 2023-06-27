import { StatusBar } from 'native-base';
import React from 'react';
import AppNav from './src/navigation';
const App = ()=> (
    <>
        <StatusBar barStyle={'light-content'}  />
        <AppNav />
    </>
)
export default App;
