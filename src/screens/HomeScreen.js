import React from "react";
import { View, Text, Button } from "react-native";
import { TransactionProvider, useTransaction } from "../context/TransactionContext";
import { FlatList } from "react-native-gesture-handler";



export default function HomeScreen(props) {
    const { transactions } = useTransaction();

    const calculateSummary = () => {
        let totalBalance = 0
        let totalExpense = 0
        let totalIncome = 0

        transactions.map((transaction) => {
            const value = transaction.value
            if (transaction.type === 'DESPESA') {
                totalExpense += value
                totalBalance -= value
            } else if (transaction.type === 'RECEITA') {
                totalIncome += value
                totalBalance += value
            }
        })
        return {
            totalBalance: totalBalance.toFixed(2),
            totalIncome: totalIncome.toFixed(2),
            totalExpense: totalExpense.toFixed(2)
        }
    }

    const { totalBalance, totalIncome, totalExpense } = calculateSummary()



    return (
        <View>
            <Button title="Adicionar Transação" onPress={() => props.navigation.navigate("Transaction")} />
            <Text>Saldo: R${totalBalance}</Text>
            <Text>Despesa: R${totalExpense}</Text>
            <Text>Receita: R${totalIncome}</Text>
            <FlatList
                data={transactions}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View>
                        <Text>Nome: {item.name}</Text>
                        <Text>Valor: {item.value}</Text>
                        <Text>Tipo: {item.type}</Text>
                        <Text>Recorrente: {item.recurrent}</Text>
                    </View>
                )}
            />
        </View>
    )

}