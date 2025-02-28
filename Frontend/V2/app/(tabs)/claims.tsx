import { View, Text, FlatList, StyleSheet, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const claims = [
  {
    id: '1',
    date: '2024-02-15',
    amount: 15000,
    status: 'Completed',
    type: 'Drought',
  },
  {
    id: '2',
    date: '2024-01-20',
    amount: 25000,
    status: 'Processing',
    type: 'Flood',
  },
];

export default function ClaimsScreen() {
  const renderClaimItem = ({ item }) => (
    <Pressable style={styles.claimCard}>
      <View style={styles.claimHeader}>
        <View style={styles.claimType}>
          <MaterialCommunityIcons
            name={item.type === 'Drought' ? 'weather-sunny' : 'weather-pouring'}
            size={24}
            color="#2563eb"
          />
          <Text style={styles.claimTypeText}>{item.type}</Text>
        </View>
        <Text
          style={[
            styles.statusBadge,
            { backgroundColor: item.status === 'Completed' ? '#dcfce7' : '#fef9c3' },
            { color: item.status === 'Completed' ? '#166534' : '#854d0e' },
          ]}>
          {item.status}
        </Text>
      </View>
      
      <View style={styles.claimDetails}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Date</Text>
          <Text style={styles.detailValue}>{item.date}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Amount</Text>
          <Text style={styles.detailValue}>₹{item.amount}</Text>
        </View>
      </View>
      
      <Pressable style={styles.viewDetailsButton}>
        <Text style={styles.viewDetailsText}>View Details</Text>
        <MaterialCommunityIcons name="chevron-right" size={20} color="#2563eb" />
      </Pressable>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Claims History</Text>
        <Text style={styles.subtitle}>Track your insurance claims</Text>
      </View>

      <FlatList
        data={claims}
        renderItem={renderClaimItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
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
  listContainer: {
    padding: 16,
  },
  claimCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 5,
  },
  claimHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  claimType: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  claimTypeText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginLeft: 8,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    fontSize: 14,
    fontWeight: '500',
  },
  claimDetails: {
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    paddingTop: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 14,
    color: '#64748b',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1e293b',
  },
  viewDetailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#eff6ff',
  },
  viewDetailsText: {
    color: '#2563eb',
    fontSize: 14,
    fontWeight: '600',
    marginRight: 4,
  },
});