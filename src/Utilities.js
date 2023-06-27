import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform, PermissionsAndroid, ToastAndroid } from "react-native";
// import { check, PERMISSIONS, RESULTS, request } from 'react-native-permissions';

export const createSession = async (sData, onCompleted) => {
  try {
    await AsyncStorage.setItem("@Tokeeen", JSON.stringify(sData));
    onCompleted(true);
  } catch (error) {
    console.log(error.message);
    onCompleted(false);
  }
};

export const deleteSession = async (onCompleted, onFale) => {
  try {
    await AsyncStorage.removeItem("@Tokeeen");
    onCompleted(true);
  } catch (exception) {
    console.log(exception.message);
    onFale(exception);
  }
};

export const getSession = async (onResult) => {
  var result = { data: null };
  try {
    const info = await AsyncStorage.getItem("@Tokeeen");

    if (info) {
      result.data = JSON.parse(info);
    }

    onResult(result);
  } catch (error) {
    console.log(error.message);
    onResult(result);
  }
};

export const getToken = async () => {
  try {
    const value = await AsyncStorage.getItem("@token");
    if (value !== null) {
      return value;
      // value previously stored
    }
  } catch (e) {
    return false;
    // error reading value
  }
};
export const PostRequest = async (
  requestUrl,
  requestHeaders,
  requestMethod,
  requestBody,
  requestTag
) => {
  console.log("requestTag", requestTag);
  console.log("requestBody", requestBody);
  let response = await fetch(requestUrl, {
    method: requestMethod,
    body: requestBody,
    headers: requestHeaders,
  });
  // console.log('hehe response',  response)
  return response.json();
};
export const PostRequestWithoutHeaders = async (
  requestUrl,
  requestHeaders,
  requestMethod,
  requestBody,
  requestTag
) => {
  try {
    console.log("requestTag");
    // console.log('requestBody', requestBody);
    let response = await fetch(requestUrl, {
      method: requestMethod,
      body: requestBody,
      headers: requestHeaders,
    });
    console.log("4444444444444", response);
    return response;
  } catch (e) {
    console.log("666666666", e);
  }
};
export const GetRequest = async (requestUrl, requestHeaders, requestMethod) => {
  const token = await getToken();
  console.log("token this is ", token);
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
  let respose = await fetch(requestUrl, {
    method: requestMethod,
    headers: headers,
  });
  return respose;
};

export const storeToken = async (value) => {
  try {
    await AsyncStorage.setItem("@token", value);
    console.log("value token", value);
    return true;
  } catch (e) {
    // saving errorret
    console.log("exception e", e);
    return false;
  }
};

export async function checkAppPermissions(permission, message) {
  // console.log('permission', permission);
  // if (Platform.OS === 'android') {
  //   try {
  //     return await check(permission, {
  //       title: 'Beejora  APP PERMISSIONS',
  //       message: message,
  //       buttonNeutral: 'Ask Me Later',
  //       buttonNegative: 'Cancel',
  //       buttonPositive: 'ALLOW',
  //     }).then(result => {
  //       switch (result) {
  //         case RESULTS.UNAVAILABLE:
  //           console.log(
  //             'This feature is not available (on this device / in this context)',
  //           );
  //           return 2;
  //         case RESULTS.DENIED:
  //           console.log(
  //             'The permission has not been requested / is denied but requestable',
  //           );
  //           return 7;
  //         case RESULTS.LIMITED:
  //           console.log('The permission is limited: some actions are possible');
  //           return false;
  //         case RESULTS.GRANTED:
  //           console.log('The permission is granted');
  //           return true;
  //         case RESULTS.BLOCKED:
  //           console.log('The permission is denied and not requestable anymore');
  //           return 5;
  //       }
  //     });
  //   } catch (err) {
  //     console.log(`err`, err);
  //     console.warn(err);
  //     return 0;
  //   }
  // } else {
  //   return check(permission)
  //     .then(result => {
  //       switch (result) {
  //         case RESULTS.UNAVAILABLE:
  //           console.log(
  //             'This feature is not available (on this device / in this context)',
  //           );
  //           return 2;
  //         case RESULTS.DENIED:
  //           console.log(
  //             'The permission has not been requested / is denied but requestable',
  //           );
  //           return 7;
  //         case RESULTS.LIMITED:
  //           console.log('The permission is limited: some actions are possible');
  //           return false;
  //         case RESULTS.GRANTED:
  //           console.log('The permission is granted');
  //           return 1;
  //         case RESULTS.BLOCKED:
  //           console.log('The permission is denied and not requestable anymore');
  //           return 5;
  //       }
  //     })
  //     .catch(error => {
  //       // …
  //       console.log('permssion catch UTILITY');
  //       return false;
  //     });
  // }
}
export const checkAppPermission = async () => {
  // let resp;
  // if (Platform.OS === 'android') {
  //   resp = await checkAppPermissions();
  // } else {
  //   resp = await checkAppPermissions(PERMISSIONS.IOS.CONTACTS, 'hahahah');
  // }
  // console.log(`response `, resp);
  // if (resp == true) {
  //   getMobileContacts();
  //   return;
  // }
  // if (resp === undefined) {
  //   alert('something went wrong');
  //   return;
  // }
  // if (resp === 2) {
  //   alert('Support App need read storage Permission');
  //   return;
  // }
  // if (resp === 5) {
  //   console.log(`resp 444 5`, resp);
  //   Alert.alert(
  //     'Contacts Permission',
  //     'Gap Messenger app requires Contact permission to save contacts',
  //     [
  //       {
  //         text: 'cancel',
  //         onPress: () => console.log('Cancel Pressed'),
  //         style: 'cancel',
  //       },
  //       {
  //         text: 'Allow access',
  //         onPress: () => Linking.openSettings(),
  //       },
  //     ],
  //     { cancelable: false },
  //   );
  //   return;
  // }
  // if (resp == 7) {
  //   console.log(`im check 1`);
  //   let ce;
  //   if (Platform.OS === 'android') {
  //     ce = await requestAndroidPermission();
  //   } else {
  //     ce = await requestPermission(
  //       Platform.OS === 'ios'
  //         ? PERMISSIONS.IOS.CONTACTS
  //         : PERMISSIONS.ANDROID.READ_CONTACTS,
  //       'hahahah',
  //     );
  //     console.log('ce', ce);
  //     if (ce == 1) {
  //       getMobileContacts();
  //     }
  //   }
  //   console.log(`res ce`, ce);
  //   if (ce == 2) {
  //     Alert.alert(
  //       'Contacts Permission',
  //       'Gap Messenger app requires Contact permission to save contacts',
  //       [
  //         {
  //           text: 'cancel',
  //           onPress: () => console.log('Cancel Pressed'),
  //           style: 'cancel',
  //         },
  //         {
  //           text: 'Allow access',
  //           onPress: () => Linking.openSettings(),
  //         },
  //       ],
  //       { cancelable: false },
  //     );
  //     return;
  //   }
  // }
};
export async function requestPermission(permission, message) {
  // console.log(`now requesting permission`, permission, message);
  // console.log(`PermissionsAndroid`, PermissionsAndroid);
  // if (Platform.OS === 'android') {
  //   // PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
  //   try {
  //     const granted = await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
  //       {
  //         title: 'Beejora App Gallery Permission',
  //         message:
  //           'Beejora App needs access to your gallery ' +
  //           'so you can take awesome pictures.',
  //         buttonNeutral: 'Ask Me Later',
  //         buttonNegative: 'Cancel',
  //         buttonPositive: 'OK',
  //       },
  //     );
  //     console.log(`grantedqd`, granted);
  //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //       console.log('You can use the camera');
  //       return 1;
  //     } else {
  //       console.log('Camera permission denied');
  //       return 0;
  //     }
  //   } catch (err) {
  //     console.warn(err);
  //     return 0;
  //   }
  // }
  // if (Platform.OS === 'ios') {
  //   console.log('in ios');
  //   try {
  //     return request(permission)
  //       .then(result => {
  //         console.log(`result`, result);
  //         switch (result) {
  //           case RESULTS.UNAVAILABLE:
  //             console.log(`RESULTS.UNAVAILABLE`, RESULTS.UNAVAILABLE);
  //             return 0;
  //           case RESULTS.DENIED:
  //             console.log(`RESULTS.DENIED`, RESULTS.DENIED);
  //             return 2;
  //           case RESULTS.LIMITED:
  //             return 1;
  //           case RESULTS.GRANTED:
  //             console.log('The permission is granted');
  //             return 1;
  //           case RESULTS.BLOCKED:
  //             return 2;
  //         }
  //       })
  //       .catch(error => {
  //         return 0;
  //         // …
  //       });
  //   } catch (err) {
  //     console.log(`err`, err);
  //     console.warn(err);
  //     return 0;
  //   }
  // }
}
