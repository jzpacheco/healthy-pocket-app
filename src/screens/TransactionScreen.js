import React, { useState } from "react";
import { View, Text, StyleSheet, Button, TextInput } from "react-native";
import { Picker } from "@react-native-picker/picker";
import CurrencyInput from 'react-native-currency-input';
import { useTransaction } from "../context/TransactionContext";
import { showToast } from "../components/Toast";
import uuid from 'uuid-random';

export default function TransactionScreen(props) {
    const { addTransaction } = useTransaction();
    const [inputName, setInputName] = useState('');
    const [inputValue, setInputValue] = useState(0);
    const [transactionType, setTransactionType] = useState('');
    const [recurrent, setRecurrent] = useState('');
    const [category, setCategory] = useState('');

    // Mapeamento das categorias por tipo de transação
    const categoriesMap = {
        RECEITA: ["Salário", "Freelance", "Outros"],
        DESPESA: ["Alimentação", "Transporte", "Lazer", "Outros"],
    };

    const handleSave = () => {
        const id = uuid();
        if (inputName && inputValue && transactionType && recurrent && category) {
            const transaction = {
                id: id,
                name: inputName,
                value: inputValue,
                type: transactionType,
                category: category,
                recurrent: recurrent
            };

            addTransaction(transaction);

            showToast('success', 'Transação salva!', '');

            setInputName('');
            setInputValue(0);
            setTransactionType('');
            setRecurrent('');
            setCategory('');
        } else {
            showToast('error', 'Erro', 'Preencha todos os campos');
        }
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Nome"
                value={inputName}
                onChangeText={(text) => setInputName(text)}
            />

            <CurrencyInput
                value={inputValue}
                onChangeValue={setInputValue}
                renderTextInput={textInputProps => <TextInput {...textInputProps} placeholder='R$0,00' />}
                prefix="R$"
                delimiter="."
                separator=","
                precision={2}
                style={styles.input}
            />
            <Picker
                style={styles.input}
                mode='dropdown'
                selectedValue={transactionType}
                onValueChange={(itemValue, itemIndex) => setTransactionType(itemValue)}
            >
                <Picker.Item label="Selecione um tipo" value="" />
                <Picker.Item label="Receita" value="RECEITA" />
                <Picker.Item label="Despesa" value="DESPESA" />
            </Picker>
            <Picker
                style={styles.input}
                mode="dropdown"
                selectedValue={category}
                onValueChange={(itemValue, itemIndex) => setCategory(itemValue)}
            >
                <Picker.Item label={`Selecione uma categoria ${transactionType === 'RECEITA' ? 'de receita' : transactionType === 'DESPESA' ? 'de despesa' : ''}`} value="" />
                {categoriesMap[transactionType]?.map((category, index) => (
                    <Picker.Item key={index} label={category} value={category} />
                ))}
            </Picker>

            <Picker
                style={styles.input}
                mode='dropdown'
                selectedValue={recurrent}
                onValueChange={(itemValue, itemIndex) => setRecurrent(itemValue)}
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
