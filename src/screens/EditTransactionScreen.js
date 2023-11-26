import React, { useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { Picker } from "@react-native-picker/picker";
import CurrencyInput from 'react-native-currency-input'
import { useTransaction } from "../context/TransactionContext";
import { showToast } from "../components/Toast";

export default function EditTransactionScreen( props ) {
    useEffect(() => {
        console.log("EditTransactionScreen Props:", props);
      }, []); // O array vazio assegura que o log é impresso apenas uma vez ao montar o componente
    
    const { transactions, updateTransaction } = useTransaction()
    const { transactionId } = props.route || {}
    const transaction = transactions.find((item) => item.id === transactionId)

    // Mapeamento das categorias por tipo de transação
    const [state, setState] = useState({
        inputName: transaction.name,
        inputValue: transaction.value,
        transactionType: transaction.type,
        recurrent: transaction.recurrent,
        category: transaction.category,
    })

    const handleSave = () => {

        if (state.inputName && state.inputValue && state.transactionType && state.recurrent && state.category) {
            const updatedTransaction = {
                id: transactionId,
                name: state.inputName,
                value: state.inputValue,
                type: state.transactionType,
                recurrent: state.recurrent,
                category: state.category
            }

            updateTransaction(updatedTransaction)

            showToast('success', 'Transação Atualizada!', '')

        } else {
            showToast('error', 'Erro', 'Preencha todos os campos')
        }
    }

    const handleChange = (fieldName, value) => {
        setState({...state, [fieldName]: value})
    }

    return (
        <View  >
            <TextInput style={styles.input}
                placeholder="Nome"
                value={state.inputName}
                onChangeText={(text) => handleChange("inputName",text)}

            />

            <CurrencyInput
                value={state.inputValue}
                onChangeValue={(text) => handleChange("inputValue", text)}
                renderTextInput={textInputProps => <TextInput {...textInputProps} placeholder='R$0,00' />}
                prefix="R$"
                delimiter="."
                separator=","
                precision={2}

            />
            <Picker
                mode='dropdown'
                selectedValue={state.transactionType}
                onValueChange={(itemValue, itemIndex) => handleChange("transactionType",itemValue)}
            >
                <Picker.Item label="Selecione um tipo" value="" />
                <Picker.Item label="Receita" value="RECEITA" />
                <Picker.Item label="Despesa" value="DESPESA" />
            </Picker>
            <Picker
                mode="dropdown"
                selectedValue={state.category}
                onValueChange={(itemValue, itemIndex) => handleChange("category", itemValue)}
            >
                <Picker.Item label={`Selecione uma categoria ${transactionType === 'RECEITA' ? 'de receita' : transactionType === 'DESPESA' ? 'de despesa' : ''}`} value="" />
                {categoriesMap[transactionType]?.map((category, index) => (
                    <Picker.Item key={index} label={category} value={category} />
                ))}
            </Picker>

            <Picker
                mode='dropdown'
                selectedValue={state.recurrent}
                onValueChange={(itemValue, itemIndex) => handleChange("recurrent", itemValue)}
            >
                <Picker.Item label="Recorrente" value="" />
                <Picker.Item label="Não" value="NAO" />
                <Picker.Item label="Sim" value="SIM" />
            </Picker>

            <Button title="Salvar" onPress={handleSave}
            />
        </View>
    )
}


const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    input: {
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 8,
    }
})