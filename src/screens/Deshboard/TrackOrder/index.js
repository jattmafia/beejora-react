import { Box, Divider, Image, ScrollView, Text } from 'native-base';
import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import LightHeader from '../../../component/header/LightHeader';

// Icon
import Feather from 'react-native-vector-icons/Feather'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { OrderTrackingData } from '../../../Redux/DefaultData';
import { GetRequest } from '../../../Utilities';
import { AppUrl } from '../../AppUrl';

const _img = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'

const TrackOrder = ({ navigation }) => {
    const [trackData, setTrackData] = React.useState(OrderTrackingData);
    useEffect(() => {


        const headers = {
            'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTY1NzM4NDAwMiwiaWF0IjoxNjU2Nzc5MjAyLCJqdGkiOiJjMDlkNWNlN2IwZGE0MWYzODRlM2M5NjQ1OTM2MmQ0MiIsInVzZXJfaWQiOjExfQ.4U2oOPWvHnZw0ZWQAjLuGqB4y44LUh4c1Io1FrrF9Fk`,
            'Content-Type': 'application/json',
        }
        GetRequest(AppUrl.trackOrder, headers, 'GET')
            .then(res => res.json())
            .then(response => {
                console.log('response', response);
            });
        // GetRequest(AppUrl.trackOrder, headers, "GET").then(res => {
        //     console.log('res getOrders', res)
        
    }, [])

    const handleOrderSummary = (index) => {
        let showSummary = [...trackData];
        for (const key in showSummary) {
            if (showSummary[key].detailShown === true && key === index) {
                showSummary[key].detailShown = !showSummary[key].detailShown;
            }
        }
        showSummary[index].detailShown = !showSummary[index].detailShown;
        setTrackData(showSummary)
    }

    return (
        <Box flex={1} bg={'#FAF8F9'}>
            {/* Header */}
            <LightHeader navigation={navigation} routeName={'Track Order'} />
            <ScrollView w={'100%'} p={3}>
                {trackData.map((item, index) => {
                    return (
                        <Box key={index} w={'100%'}>
                            <Box style={styles._order}>
                                <Image
                                    source={{ uri: item.order_pic }}
                                    w={'64px'} h={'70px'} bg={'#B8B8B8'}
                                    borderRadius={2}
                                    alt={'order_photo'}
                                />
                                <Box flex={1.3} px={2}>
                                    <Text style={styles.orderStatus}>{item.status}</Text>
                                    <Text style={styles.orderQty}>{item.itemQty} item</Text>
                                    <Text style={styles.des}>{item.des}</Text>
                                </Box>
                                <Box flex={1}>
                                    <Text style={styles.deliveryDate} strikeThrough={item.status === 'Cancelled' && true}>{item.delivery_date}</Text>
                                    <Text style={styles.price} strikeThrough={item.status === 'Cancelled' && true}>Rs.{item.price}</Text>
                                </Box>
                                <Feather name={item.detailShown === true ? 'chevron-up' : 'chevron-down'} size={20} color={'#000'}
                                    onPress={() => handleOrderSummary(index)}
                                />
                            </Box>
                            {/* Order Summary */}
                            {item.detailShown === true && item.orderSummary.map((_item, _index) => {
                                return (
                                    <Box key={_index} style={styles.orderSummary}>
                                        <Text style={styles.orderSummaryTitle}>Order Summary</Text>
                                        <Box my={5} flexDir={'row'}>
                                            <Image
                                                h={'147px'} w={'119px'} mr={3}
                                                borderRadius={6} borderColor={'#B8B8B8'}
                                                source={{ uri: _img }}
                                                alt='order-photo'
                                            />
                                            <Box flex={1} py={2}>
                                                <Text style={styles.des_price}>Relexed Fit T-Shirt</Text>
                                                <Text style={styles.des_price}>Rs.699</Text>
                                                <Box my={3} w={'100%'}>
                                                    {_item._attributes.map((_attri, __index) => {
                                                        return (
                                                            <Box flexDir={'row'} alignItems={'center'} justifyContent={'space-between'}>
                                                                <Text w={'50%'} style={styles.attrilable}>{_attri.lable}</Text>
                                                                <Text w={'50%'} style={styles.attrival}>{_attri.val}</Text>
                                                            </Box>
                                                        )
                                                    })}
                                                </Box>
                                            </Box>
                                        </Box>
                                        {/* Estimated and delivery method */}
                                        <Box>
                                            <Text style={styles.estimated_and_delivery_method}>Estimated delivery: {_item.estimated_delivery}</Text>
                                            <Box flexDir={'row'}>
                                                <Text style={styles.estimated_and_delivery_method}>Delivery Method:</Text>
                                                <Text style={styles.estimated_and_delivery_method_val}>{`\t${_item.delivery_method}`}</Text>
                                            </Box>
                                        </Box>
                                        {/* Tracking */}
                                        <Box my={5}>
                                            {_item.orderTimeline.map((_timeline, index_) => {
                                                return (
                                                    <Box>
                                                        <Box key={index_} style={styles.orderTimeline}>
                                                            <AntDesign name='checkcircleo' size={30} color={_timeline.completed ? '#2EAA4E' : '#646464'} />
                                                            <Box flex={1} mx={2}>
                                                                <Text style={styles.orderStatus} >{_timeline._track_status}</Text>
                                                                <Text style={styles.orderDes} isTruncated maxW="200">{_timeline.remarks}</Text>
                                                            </Box>
                                                            {_timeline.completed && <Text style={styles.del_date}>{_timeline.delivered_date}</Text>}
                                                        </Box>
                                                        {_item.orderTimeline.length - 1 !== index_ && <Divider orientation='vertical' thickness={2} tintColor={'#494949'} h={30} ml={'15px'} />}
                                                    </Box>
                                                )
                                            })}
                                        </Box>
                                    </Box>
                                )
                            })}
                        </Box>
                    )
                })}
                <Box h={50}></Box>
            </ScrollView>
        </Box>
    );
}

const styles = StyleSheet.create({
    _order: {
        height: 84,
        width: '100%',
        borderRadius: 8,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
        marginVertical: 5
    },
    orderStatus: {
        color: '#000000',
        fontSize: 17,
    },
    orderQty: {
        color: '#888888',
        fontSize: 15
    },
    des: {
        color: '#000000',
        fontSize: 12
    },
    deliveryDate: {
        color: '#888888',
        fontSize: 15,
    },
    price: {
        color: '#888888',
        fontSize: 15,
    },
    orderSummary: {
        backgroundColor: '#FFFFFF',
        height: 750,
        width: '100%',
        borderRadius: 5,
        paddingVertical: 30,
        paddingHorizontal: 10
    },
    orderSummaryTitle: {
        color: '#000000',
        fontSize: 17,
        fontWeight: '600',
        textAlign: 'center'
    },
    des_price: {
        color: '#000000',
        fontSize: 14,
        fontWeight: '500',
    },
    attrilable: {
        color: '#868686',
        fontSize: 14
    },
    attrival: {
        color: '#000000',
        fontSize: 14,
        fontWeight: '500',
    },
    estimated_and_delivery_method: {
        color: '#000000',
        fontSize: 17,
        fontWeight: '600',
        marginVertical: 5
    },
    estimated_and_delivery_method_val: {
        color: '#888888',
        fontSize: 17,
        fontWeight: '600',
        marginVertical: 5
    },
    orderTimeline: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 5
    },
    orderStatus: {
        color: '#000000',
        fontSize: 17,
        fontWeight: '600',
    },
    orderDes: {
        color: '#888888',
        fontSize: 14,
        fontWeight: '500',
    },
    del_date: {
        color: '#888888',
        fontSize: 14,
        fontWeight: '500',
    }
})

export default TrackOrder;


// AntDesign check