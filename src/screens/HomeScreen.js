import React from "react";
import { View, Text, Button, TouchableOpacity, StyleSheet } from "react-native";
import { TransactionProvider, useTransaction } from "../context/TransactionContext";
import { FlatList } from "react-native-gesture-handler";
import { withNavigation } from "react-navigation";

const colors = {
    primary: "#4CAF50", // Verde para representar saúde financeira
    background: "#F0F0F0", // Cinza claro para o fundo
    white: "#FFFFFF", // Branco para textos
    black: "#000000", // Preto para detalhes
};

function HomeScreen({ navigation }) {
    const { transactions,deleteTransaction  } = useTransaction();

    const handleEditTransaction = (id) => {
        navigation.navigate("EditTransaction", { transactionId: id });
    };

    const handleNavigateToAnalytics = () => {
        navigation.navigate("Analytics", { transactions }); // Passando os dados para a tela de Analytics
    };
    const handleDeleteTransaction = (id) => {
        deleteTransaction (id);
    }

    const calculateSummary = () => {
        let totalBalance = 0;
        let totalExpense = 0;
        let totalIncome = 0;

        transactions.forEach((transaction) => {
            const value = transaction.value;
            if (transaction.type === "DESPESA") {
                totalExpense += value;
                totalBalance -= value;
            } else if (transaction.type === "RECEITA") {
                totalIncome += value;
                totalBalance += value;
            }
        });
        return {
            totalBalance: totalBalance.toFixed(2),
            totalIncome: totalIncome.toFixed(2),
            totalExpense: totalExpense.toFixed(2),
        };
    };

    const { totalBalance, totalIncome, totalExpense } = calculateSummary();

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Button title="Adicionar Transação" onPress={() => navigation.navigate("Transaction")} color={colors.primary} />
                <Button title="Ver Analytics" onPress={handleNavigateToAnalytics} color={colors.primary} />
            </View>
            <View style={styles.summary}>
                <Text style={styles.summaryText}>Saldo: R${totalBalance}</Text>
                <Text style={styles.summaryText}>Despesa: R${totalExpense}</Text>
                <Text style={styles.summaryText}>Receita: R${totalIncome}</Text>
            </View>
            <FlatList
                data={transactions}
                keyExtractor={(item, index) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handleEditTransaction(item.id)}>
                        <View style={styles.transactionItem}>
                            <Text style={styles.transactionName}>Nome: {item.name}</Text>
                            <Text style={styles.transactionValue}>Valor: {item.value}</Text>
                            <Text style={styles.transactionType}>Tipo: {item.type}</Text>
                            <Text style={styles.transactionCategory}>Categoria: {item.category}</Text>
                            <Text style={styles.transactionRecurrent}>Recorrente: {item.recurrent}</Text>
                            <TouchableOpacity
                                style={styles.deleteButton}
                                onPress={() => handleDeleteTransaction(item.id)}
                            >
                                <Text style={styles.buttonText}>Excluir</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: colors.background,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 16,
    },
    summary: {
        backgroundColor: colors.white,
        padding: 16,
        borderRadius: 8,
        marginBottom: 16,
    },
    summaryText: {
        fontSize: 18,
        marginBottom: 8,
        color: colors.black,
    },
    transactionItem: {
        backgroundColor: colors.white,
        borderWidth: 1,
        borderColor: colors.background,
        borderRadius: 8,
        padding: 16,
        marginBottom: 8,
    },
    transactionName: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 4,
        color: colors.black,
    },
    transactionValue: {
        fontSize: 14,
        marginBottom: 4,
        color: colors.black,
    },
    transactionType: {
        fontSize: 14,
        marginBottom: 4,
        color: colors.black,
    },
    transactionCategory: {
        fontSize: 14,
        marginBottom: 4,
        color: colors.black,
    },
    transactionRecurrent: {
        fontSize: 14,
        color: colors.black,
    },
    deleteButton: {
        backgroundColor: 'red',
        color: 'white',
        borderRadius: 4,
        paddingVertical: 8,
        paddingHorizontal: 12,
        marginTop: 8,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    },
});

export default withNavigation(HomeScreen);
