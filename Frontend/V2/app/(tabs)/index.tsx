import { View, Text, ScrollView, StyleSheet, Pressable } from 'react-native';
import { VictoryPie, VictoryLabel } from 'victory-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Card from './Card';

export default function DashboardScreen() {
  const policyData = {
    activePolicies: 2,
    totalCoverage: 50000,
    nextPayout: '2024-03-15',
  };

  const weatherData = {
    temperature: 28,
    humidity: 65,
    rainfall: 2.5,
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Welcome back, John</Text>
        <Text style={styles.subtitle}>Your Insurance Dashboard</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Active Policies</Text>
        <View style={styles.policyStats}>
          <View style={styles.stat}>
            <Text style={styles.statValue}>{policyData.activePolicies}</Text>
            <Text style={styles.statLabel}>Active</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statValue}>₹{policyData.totalCoverage}</Text>
            <Text style={styles.statLabel}>Coverage</Text>
          </View>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Weather Conditions</Text>
        <View style={styles.weatherGrid}>
          <View style={styles.weatherItem}>
            <MaterialCommunityIcons name="thermometer" size={24} color="#2563eb" />
            <Text style={styles.weatherValue}>{weatherData.temperature}°C</Text>
            <Text style={styles.weatherLabel}>Temperature</Text>
          </View>
          <View style={styles.weatherItem}>
            <MaterialCommunityIcons name="water-percent" size={24} color="#2563eb" />
            <Text style={styles.weatherValue}>{weatherData.humidity}%</Text>
            <Text style={styles.weatherLabel}>Humidity</Text>
          </View>
          <View style={styles.weatherItem}>
            <MaterialCommunityIcons name="weather-rainy" size={24} color="#2563eb" />
            <Text style={styles.weatherValue}>{weatherData.rainfall}mm</Text>
            <Text style={styles.weatherLabel}>Rainfall</Text>
          </View>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Next Automated Payout</Text>
        <Text style={styles.payoutDate}>{policyData.nextPayout}</Text>
        <Pressable style={styles.viewButton}>
          <Text style={styles.viewButtonText}>View Details</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
  },
  greeting: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1e293b',
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    marginTop: 4,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    margin: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 12,
  },
  policyStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 8,
  },
  stat: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2563eb',
  },
  statLabel: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 4,
  },
  weatherGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  weatherItem: {
    alignItems: 'center',
    flex: 1,
  },
  weatherValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginTop: 8,
  },
  weatherLabel: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 4,
  },
  payoutDate: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2563eb',
    textAlign: 'center',
    marginVertical: 12,
  },
  viewButton: {
    backgroundColor: '#2563eb',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  viewButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});