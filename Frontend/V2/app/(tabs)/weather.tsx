import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const weatherData = {
  current: {
    temperature: 28,
    condition: 'Partly Cloudy',
    humidity: 65,
    windSpeed: 12,
    rainfall: 2.5,
  },
  forecast: [
    { day: 'Mon', temp: 29, condition: 'Sunny' },
    { day: 'Tue', temp: 27, condition: 'Cloudy' },
    { day: 'Wed', temp: 26, condition: 'Rain' },
    { day: 'Thu', temp: 28, condition: 'Partly Cloudy' },
    { day: 'Fri', temp: 30, condition: 'Sunny' },
  ],
  alerts: [
    {
      type: 'Heavy Rain Warning',
      description: 'Expected heavy rainfall in your area in the next 24 hours',
      severity: 'moderate',
    },
  ],
};

const getWeatherIcon = (condition) => {
  switch (condition.toLowerCase()) {
    case 'sunny':
      return 'weather-sunny';
    case 'cloudy':
      return 'weather-cloudy';
    case 'rain':
      return 'weather-rainy';
    case 'partly cloudy':
      return 'weather-partly-cloudy';
    default:
      return 'weather-cloudy';
  }
};

export default function WeatherScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Weather Monitor</Text>
        <Text style={styles.subtitle}>Real-time weather conditions</Text>
      </View>

      <View style={styles.currentWeather}>
        <MaterialCommunityIcons
          name={getWeatherIcon(weatherData.current.condition)}
          size={64}
          color="#2563eb"
        />
        <Text style={styles.temperature}>{weatherData.current.temperature}°C</Text>
        <Text style={styles.condition}>{weatherData.current.condition}</Text>
      </View>

      <View style={styles.detailsCard}>
        <View style={styles.detailItem}>
          <MaterialCommunityIcons name="water-percent" size={24} color="#2563eb" />
          <Text style={styles.detailValue}>{weatherData.current.humidity}%</Text>
          <Text style={styles.detailLabel}>Humidity</Text>
        </View>
        <View style={styles.detailItem}>
          <MaterialCommunityIcons name="weather-windy" size={24} color="#2563eb" />
          <Text style={styles.detailValue}>{weatherData.current.windSpeed} km/h</Text>
          <Text style={styles.detailLabel}>Wind Speed</Text>
        </View>
        <View style={styles.detailItem}>
          <MaterialCommunityIcons name="weather-rainy" size={24} color="#2563eb" />
          <Text style={styles.detailValue}>{weatherData.current.rainfall} mm</Text>
          <Text style={styles.detailLabel}>Rainfall</Text>
        </View>
      </View>

      <View style={styles.forecastCard}>
        <Text style={styles.cardTitle}>5-Day Forecast</Text>
        <View style={styles.forecast}>
          {weatherData.forecast.map((day, index) => (
            <View key={index} style={styles.forecastDay}>
              <Text style={styles.forecastDayText}>{day.day}</Text>
              <MaterialCommunityIcons
                name={getWeatherIcon(day.condition)}
                size={24}
                color="#2563eb"
              />
              <Text style={styles.forecastTemp}>{day.temp}°</Text>
            </View>
          ))}
        </View>
      </View>

      {weatherData.alerts.map((alert, index) => (
        <View key={index} style={styles.alertCard}>
          <View style={styles.alertHeader}>
            <MaterialCommunityIcons name="alert" size={24} color="#dc2626" />
            <Text style={styles.alertTitle}>{alert.type}</Text>
          </View>
          <Text style={styles.alertDescription}>{alert.description}</Text>
        </View>
      ))}
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
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1e293b',
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    marginTop: 4,
  },
  currentWeather: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    marginBottom: 16,
  },
  temperature: {
    fontSize: 48,
    fontWeight: '700',
    color: '#1e293b',
    marginTop: 8,
  },
  condition: {
    fontSize: 20,
    color: '#64748b',
    marginTop: 4,
  },
  detailsCard: {
    flexDirection: 'row',
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
  detailItem: {
    flex: 1,
    alignItems: 'center',
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginTop: 8,
  },
  detailLabel: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 4,
  },
  forecastCard: {
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
    marginBottom: 16,
  },
  forecast: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  forecastDay: {
    alignItems: 'center',
  },
  forecastDayText: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 8,
  },
  forecastTemp: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginTop: 8,
  },
  alertCard: {
    backgroundColor: '#fee2e2',
    borderRadius: 12,
    padding: 16,
    margin: 12,
  },
  alertHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#dc2626',
    marginLeft: 8,
  },
  alertDescription: {
    fontSize: 14,
    color: '#991b1b',
  },
});