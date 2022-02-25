import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

export default function Loader(props){
    return(
        <View style={{
            flex:1,
            justifyContent:'center',
            alignContent : 'center',
            alignItems : 'center'
        }}>
            <ActivityIndicator size='large' color='#ce348b' />
            <Text style={{textAlign: 'center', marginTop: 15}}>{props.message}</Text>
        </View>
    );
}