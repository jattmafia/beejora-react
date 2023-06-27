import { View, Text, StyleSheet, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { AppUrl } from '../AppUrl';
import { PostRequest, GetRequest, getSession } from '../../Utilities';
import DarkHeader from '../../component/header/DarkHeader';

export default function ProductSubmission({ navigation, route }) {
    const [userId, setUserId] = useState('');
    const [token, setToken] = useState('');
    const [data, setData] = useState('');

    useEffect(() => {
        getSession((result) => {
            if (result.data) {
                console.log(result.data.token);
                setUserId(result.data.user.id);
                setToken(result.data.token);
            } else {
                // navigation.navigate("AppAuthScreens")
            }
        });
        handleApiCalls();
    }, []);

    const DATA = [
        {
            id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
            title: 'First Item',
        },
        {
            id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
            title: 'Second Item',
        },
        {
            id: '58694a0f-3da1-471f-bd96-145571e29d72',
            title: 'Third Item',
        },
    ];
    ////////Component To show Details
    const InfoBullet = (props) => {
        return (
            <View style={{ ...styles.innerContainer, ...styles.Dividerhelper }}>
                <Text style={{ color: 'black' }}>{props.title}</Text>
                <Text>{props.value}</Text>
            </View>
        );
    };

    const CardView = ({ item }) => {
        return (
            <View style={{ flexDirection: 'row', marginHorizontal: 20, marginTop: 10 }}>
                <View style={{ height: 160, width: '35%', borderWidth: 1, borderColor: 'grey' }}>
                    <Text style={{ textAlign: 'center', color: '#000' }}>IMG</Text>
                </View>
                <View style={{ height: 160, width: '65%', borderWidth: 1, borderColor: 'grey', justifyContent: 'space-between' }}>
                    <Text style={{ left: 10, color: '#000' }}>Name: {item.name}</Text>
                    <Text style={{ left: 10, color: '#000' }}>Category: {item.category_name}</Text>

                    <Text style={{ left: 10, color: '#000' }}>Price:  {item.price}</Text>
                    <Text style={{ left: 10, color: '#000' }}>Description: {item.description}</Text>
                    <Text style={{ left: 10, color: '#000' }}>Stock: {item.stock}</Text>
                    <Text style={{ left: 10, color: '#000' }}>Company: {item.seller.company_name}</Text>
                    <Text style={{ left: 10, color: '#000' }}>Count: {item.id}</Text>

                    {/* <InfoBullet title="Count:" value={data?.count} /> */}
                </View>
            </View>
        )
    }

    const handleApiCalls = () => {
        const headers = {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        };
        GetRequest(AppUrl.productSubmisstion + userId, headers, 'GET').then((res) => res.json()).then((response) => {
            console.log('response', JSON.stringify(response));
            setData(response.results);
        });
    };
    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <DarkHeader navigation={navigation} routeName={'Product Submission'} />
            <View style={{paddingBottom:70}}>
                <FlatList
                    data={data}
                    renderItem={CardView}
                    keyExtractor={item => item.id}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    innerContainer: {
        backgroundColor: 'white',
        alignSelf: 'center',
        width: '95%'
    },
    Dividerhelper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: '3%',
        borderBottomWidth: 2,
        borderColor: 'lightgrey'
    }
});
