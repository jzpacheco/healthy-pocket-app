import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { PieChart } from "react-native-chart-kit";

function AnalyticsScreen({ navigation }) {
  const { transactions } = navigation.state.params;

  const calculateBalance = () => {
    let totalBalance = 0;

    transactions.forEach((transaction) => {
      const value = transaction.value;
      if (transaction.type === 'DESPESA') {
        totalBalance -= value;
      } else if (transaction.type === 'RECEITA') {
        totalBalance += value;
      }
    });

    return totalBalance.toFixed(2);
  }

  const calculatePercentage = (type, category) => {
    const total = transactions
      .filter((transaction) => transaction.type === type)
      .reduce((acc, transaction) => (type === 'RECEITA' ? acc + transaction.value : acc - transaction.value), 0);

    const categoryTotal = transactions
      .filter((transaction) => transaction.type === type && transaction.category === category)
      .reduce((acc, transaction) => (type === 'RECEITA' ? acc + transaction.value : acc - transaction.value), 0);

    const percentage = (categoryTotal / parseFloat(total)) * 100 || 0;
    return percentage.toFixed(2);
  }

  const getChartData = (type) => {
    const categories = [...new Set(transactions.filter((transaction) => transaction.type === type).map((transaction) => transaction.category))];

    const data = categories.map((category) => ({
      name: category,
      value: parseFloat(calculatePercentage(type, category)),
      color: getRandomColor(),
    }));

    return data;
  }

  
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  const formatLabel = ({ name, value }) => `${name}: (${value}%)`;

  return (
    <View style={styles.container}>
      <Text style={styles.balance}>Balanço: R${calculateBalance()}</Text>

      <Text style={styles.chartLabel}>Gráfico de Receitas</Text>
      <PieChart
        data={getChartData('RECEITA')}
        width={400}
        height={200}
        chartConfig={{
          backgroundGradientFrom: "#ffffff",
          backgroundGradientTo: "#ffffff",
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        accessor="value"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
        formatLabelText={(_, value) => formatLabel(value)}
      />

      <Text style={styles.chartLabel}>Gráfico de Despesas</Text>
      <PieChart
        data={getChartData('DESPESA')}
        width={400}
        height={200}
        chartConfig={{
          backgroundGradientFrom: "#ffffff",
          backgroundGradientTo: "#ffffff",
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        accessor="value"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#ecf0f1',
  },
  balance: {
    marginBottom: 16,
    fontSize: 16,
    fontWeight: 'bold',
  },
  chartLabel: {
    marginBottom: 8,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AnalyticsScreen;
