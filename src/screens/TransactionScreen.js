import React, { useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { Picker } from "@react-native-picker/picker";
import CurrencyInput from 'react-native-currency-input'
import { useTransaction } from "../context/TransactionContext";

export default function TransactionScreen(props) {
    const { addTransaction } = useTransaction()
    const [inputName,setInputName] = useState('')
    const [inputValue, setInputValue] = useState(0)
    const [transactionType, setTransactionType] = useState('')
    const [recurrent, setRecurrent] = useState('')

    const handleSave = () => {
        const transaction = {
            name: inputName,
            value: inputValue,
            type: transactionType,
            recurrent: recurrent
        }

        addTransaction(transaction)
    }

    return (
        <View  >
            <TextInput style={styles.input}
                placeholder="Nome"
                value={inputName}
                onChangeText={(text) => setInputName(text)}

            />

            <CurrencyInput 
                value = {inputValue}
                onChangeValue={setInputValue}
                renderTextInput={textInputProps => <TextInput {...textInputProps} placeholder='R$0,00' />}
                prefix="R$"
                delimiter="."
                separator=","
                precision={2}

            />
             <Picker 
                mode = 'dropdown'
                selectedValue = {transactionType}
                onValueChange = {(itemValue, itemIndex) => setTransactionType(itemValue)}
            >
                <Picker.Item label="Selecione um tipo" value= ""/>
                <Picker.Item label="Receita" value= "RECEITA"/>
                <Picker.Item label="Despesa" value= "DESPESA"/>
            </Picker> 
            <Picker
                mode = 'dropdown'
                selectedValue = {recurrent}
                onValueChange ={(itemValue, itemIndex) => setRecurrent(itemValue)}
            >
                <Picker.Item label="Recorrente" value= ""/>
                <Picker.Item label="Não" value= "NAO"/>
                <Picker.Item label="Sim" value= "SIM"/>
            </Picker>

            <Button  title="Salvar" onPress={handleSave}
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