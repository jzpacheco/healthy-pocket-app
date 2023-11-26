import React,{ createContext, useContext, useState } from "react"

const TransactionContext = createContext()

export const TransactionProvider = ({children}) =>{
    const [transactions, setTransactions] = useState([])

    const addTransaction =(transaction) => {
        setTransactions([...transactions, transaction])
    }

    return (
        <TransactionContext.Provider value={{transactions, addTransaction}}>
            {children}
        </TransactionContext.Provider>
    )
}


export const useTransaction = () => {
    const context = useContext(TransactionContext);
    
    if(!context) {
        throw new Error('useTransaction must be used within a TransactionProvider')
    }

    return context;
}