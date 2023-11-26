import React from "react";
import { View, Text, Button } from "react-native";

export default function HomeScreen(props) {
    return(
        <View>
            <Text>Saldo: R$9.999,00</Text>
            <Text>Despesa: R$123</Text>
            <Text>Receita: R$10.000</Text>
            <Button title="Adicionar Transação" onPress={() => props.navigation.navigate("Transaction")}/>
        </View>
    )

}