import { Box, Text } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign'

const LightHeader = ({ navigation, routeName, searchbar }) => {
    return (
        <Box style={styles.header}>
            <AntDesign name='arrowleft' size={30} color={'#000000'} onPress={() => navigation.goBack()} />
            <Text style={styles.headerTitle}>{routeName}</Text>
            {searchbar === true &&
                <AntDesign name='search1' size={25} color={'#000000'} />
            }
        </Box>
    );
}

const styles = StyleSheet.create({
    header: {
        height: 60,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: 'transparent',
        paddingHorizontal: 15,
        backgroundColor: 'transparent'
    },
    headerTitle: {
        textAlign: 'center',
        width: '80%',
        fontSize: 19,
        fontWeight: '500',
        color: '#000000'
    },
})

export default LightHeader;
