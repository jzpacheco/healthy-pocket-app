import React from "react";
import { View, Text } from "react-native";

export default function TransactionScreen(props){
    return(
        <View>
            <Text>Nome:</Text>
            <Text>Tipo:</Text>
            <Text>Valor:</Text>
            <Text>Recorrente:</Text>
        </View>
    )
}