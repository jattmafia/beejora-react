import { Avatar, Box, Button, Icon, Input, ScrollView, Text } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';
import LightHeader from '../../../component/header/LightHeader';

// Icon
import Feather from 'react-native-vector-icons/Feather'

const Profile = ({ navigation }) => {
    return (
        <Box flex={1} bg={'#fff'}>
            {/* Header */}
            <LightHeader navigation={navigation} routeName={'Account info'} />
            <ScrollView p={5}>
                <Box alignItems={'center'} w={'100%'}>
                    <Box my={5}>
                        <Avatar bg="amber.500"
                            source={{
                                uri: "https://images.unsplash.com/photo-1614289371518-722f2615943d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                            }} size="xl">
                            Profile
                        </Avatar>
                        <Icon
                            shadow={3}
                            as={Feather}
                            name={'camera'}
                            color={'#000'}
                            size={'20px'}
                            style={styles.uploadimg}
                        />
                    </Box>
                    <Text style={styles.name}>Rahul Rakesh</Text>
                    <Text style={styles.country}>Bangalore, India</Text>
                </Box>
                <Box w={'100%'} mt={5}>
                    <Input style={styles._input} placeholder='Phone No.' placeholderTextColor={'#B3B3B3'}
                        borderWidth={0}
                        mt={2}
                        _input={{
                            color: '#484848',
                            fontSize: 17,
                        }}
                        _focus={{
                            borderColor: '#D3D3D3',
                            borderWidth: 0
                        }}
                    />
                    <Input style={styles._input} placeholder='Full Name' placeholderTextColor={'#B3B3B3'}
                        borderWidth={0}
                        mt={2}
                        _input={{
                            color: '#484848',
                            fontSize: 17,
                        }}
                        _focus={{
                            borderColor: '#D3D3D3',
                            borderWidth: 0
                        }}
                    />
                    <Input style={styles._input} placeholder='Shop Name' placeholderTextColor={'#B3B3B3'}
                        borderWidth={0}
                        mt={2}
                        _input={{
                            color: '#484848',
                            fontSize: 17,
                        }}
                        _focus={{
                            borderColor: '#D3D3D3',
                            borderWidth: 0
                        }}
                    />
                    <Input style={styles._input} placeholder='Email' placeholderTextColor={'#B3B3B3'}
                        borderWidth={0}
                        mt={2}
                        _input={{
                            color: '#484848',
                            fontSize: 17,
                        }}
                        _focus={{
                            borderColor: '#D3D3D3',
                            borderWidth: 0
                        }}
                    />
                    <Input style={styles._input} placeholder='Address' placeholderTextColor={'#B3B3B3'}
                        borderWidth={0}
                        mt={2}
                        _input={{
                            color: '#484848',
                            fontSize: 17,
                        }}
                        _focus={{
                            borderColor: '#D3D3D3',
                            borderWidth: 0
                        }}
                    />
                </Box>
                <Button
                    style={styles.updateBtn}
                >Update info</Button>
                <Text alignSelf={'center'} fontWeight={'500'} my={3} color={'#1492E6'}>Change Password</Text>
                <Box h={50}></Box>
            </ScrollView>
        </Box>
    );
}

const styles = StyleSheet.create({
    uploadimg: {
        position: 'absolute',
        top: 15,
        right: -20,
        backgroundColor: '#fff',
        width: 40,
        height: 40,
        paddingTop: 10,
        borderRadius: 30,
        textAlign: 'center'
    },
    name: {
        color: '#484848',
        fontSize: 22,
        fontWeight: '500'
    },
    country: {
        color: '#7E7E7E',
        fontSize: 15,
    },
    _input: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#B3B3B3',
        borderRadius: 7,
        height: 52,
        width: '100%'
    },
    updateBtn: {
        height: 52,
        backgroundColor: '#1492E6',
        borderRadius: 7,
        width: '100%',
        marginTop: 50
    }
})

export default Profile;
