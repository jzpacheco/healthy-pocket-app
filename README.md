# Healty Pocket App

Este aplicativo móvel foi desenvolvido usando React Native para fornecer uma solução simples para o controle financeiro pessoal. Ele permite que você registre suas transações, visualize um resumo do seu saldo, despesas e receitas, e também fornece gráficos analíticos.

## Tecnologias Utilizadas

- React Native
- React Navigation
- React Native Gesture Handler
- React Native Chart Kit
- react-native-currency-input
- uuid-random

## Funcionalidades

1. **Adicionar Transações:**
   - Nome
   - Valor
   - Tipo (Receita ou Despesa)
   - Categoria
   - Recorrente

2. **Editar Transações:**
   - Alterar detalhes de uma transação existente

3. **Excluir Transações:**
   - Remover transações indesejadas

4. **Visualizar Resumo Financeiro:**
   - Saldo total
   - Despesas totais
   - Receitas totais

5. **Analytics:**
   - Gráficos de barras para visualizar distribuição de transações por categoria

## Salvando Dados Localmente

Os dados das transações são armazenados localmente no dispositivo usando o React AsyncStorage. Isso garante que suas transações sejam preservadas mesmo quando você fecha o aplicativo.

## Como Rodar o Projeto

1. Certifique-se de ter o ambiente React Native configurado.
2. Clone este repositório.
3. Execute `npm install` para instalar as dependências.
4. Execute `npx react-native run-android` ou `npx react-native run-ios` para iniciar o aplicativo.

