import React, { useState } from "react";
import { View, Text, StyleSheet, Button, TextInput } from "react-native";
import { Picker } from "@react-native-picker/picker";
import CurrencyInput from 'react-native-currency-input';
import { useTransaction } from "../context/TransactionContext";
import { showToast } from "../components/Toast";

export default function EditTransactionScreen({ navigation }) {
    const { transactions, updateTransaction  } = useTransaction();
    const { transactionId } = navigation.state.params;

    const transaction = transactions.find((item) => item.id === transactionId);

    
    const [state, setState] = useState({
        inputName: transaction.name || "VAZIO",
        inputValue: transaction.value ? transaction.value.toString() : "0.99",
        transactionType: transaction.type || "",
        recurrent: transaction.recurrent || "VAZIO",
        category: transaction.category || "VAZIO",
    });

    const categoriesMap = {
        RECEITA: ["Salário", "Freelance", "Outros"],
        DESPESA: ["Alimentação", "Transporte", "Lazer", "Outros"],
    };

    const handleSave = () => {
        if (state.inputName && state.inputValue && state.transactionType && state.recurrent && state.category) {
            const updatedTransaction = {
                id: transactionId,
                name: state.inputName,
                value: parseFloat(state.inputValue),
                type: state.transactionType,
                recurrent: state.recurrent,
                category: state.category,
            };

            updateTransaction(updatedTransaction);

            showToast('success', 'Transação Atualizada!', '');
        } else {
            showToast('error', 'Erro', 'Preencha todos os campos');
        }
    };

    const handleChange = (fieldName, value) => {
        setState({ ...state, [fieldName]: value });
    };


    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Nome"
                value={state.inputName}
                onChangeText={(text) => handleChange("inputName", text)}
            />

            <CurrencyInput
                value={state.inputValue}
                onChangeValue={(text) => handleChange("inputValue", text)}
                renderTextInput={(textInputProps) => (
                    <TextInput {...textInputProps} placeholder='R$0,00' style={styles.input} />
                )}
                prefix="R$"
                delimiter="."
                separator=","
                precision={2}
            />
            <Picker
                style={styles.input}
                mode="dropdown"
                selectedValue={state.transactionType}
                onValueChange={(itemValue, itemIndex) => handleChange("transactionType", itemValue)}
            >
                <Picker.Item label="Selecione um tipo" value="" />
                <Picker.Item label="Receita" value="RECEITA" />
                <Picker.Item label="Despesa" value="DESPESA" />
            </Picker>
            <Picker
                style={styles.input}
                mode="dropdown"
                selectedValue={state.category}
                onValueChange={(itemValue, itemIndex) => handleChange("category", itemValue)}
            >
                <Picker.Item
                    label={`Selecione uma categoria ${state.transactionType === 'RECEITA' ? 'de receita' : state.transactionType === 'DESPESA' ? 'de despesa' : ''}`}
                    value=""
                />
                {categoriesMap[state.transactionType]?.map((category, index) => (
                    <Picker.Item key={index} label={category} value={category} />
                ))}
            </Picker>

            <Picker
                style={styles.input}
                mode="dropdown"
                selectedValue={state.recurrent}
                onValueChange={(itemValue, itemIndex) => handleChange("recurrent", itemValue)}
            >
                <Picker.Item label="Recorrente" value="" />
                <Picker.Item label="Não" value="NAO" />
                <Picker.Item label="Sim" value="SIM" />
            </Picker>

            <Button title="Salvar" onPress={handleSave} color={styles.button.color} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
        backgroundColor: '#ecf0f1',
    },
    input: {
        height: 40,
        borderColor: '#B0BEC5',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 16,
        paddingLeft: 8,
        backgroundColor: "#FFFFFF",
    },
    button: {
        color: "#4CAF50", // Verde para representar saúde financeira
    },
});
