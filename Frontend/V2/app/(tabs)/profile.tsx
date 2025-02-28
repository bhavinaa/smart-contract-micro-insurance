import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function ProfileScreen() {
  const farmerProfile = {
    name: 'John Smith',
    farmLocation: 'Karnataka, India',
    farmSize: '5 acres',
    cropTypes: ['Rice', 'Wheat', 'Sugarcane'],
    activePolicies: 2,
  };

  const menuItems = [
    {
      icon: 'file-document-edit',
      title: 'Edit Profile',
      subtitle: 'Update your personal information',
    },
    {
      icon: 'shield-check',
      title: 'Insurance Policies',
      subtitle: 'View and manage your policies',
    },
    {
      icon: 'bank',
      title: 'Bank Details',
      subtitle: 'Manage payout account',
    },
    {
      icon: 'bell',
      title: 'Notifications',
      subtitle: 'Configure alert preferences',
    },
    {
      icon: 'help-circle',
      title: 'Help & Support',
      subtitle: 'Get assistance',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>
              {farmerProfile.name.split(' ').map(n => n[0]).join('')}
            </Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.name}>{farmerProfile.name}</Text>
            <Text style={styles.location}>{farmerProfile.farmLocation}</Text>
          </View>
        </View>
      </View>

      <View style={styles.farmDetails}>
        <View style={styles.farmDetail}>
          <MaterialCommunityIcons name="terrain" size={24} color="#2563eb" />
          <Text style={styles.farmDetailLabel}>Farm Size</Text>
          <Text style={styles.farmDetailValue}>{farmerProfile.farmSize}</Text>
        </View>
        <View style={styles.farmDetail}>
          <MaterialCommunityIcons name="shield-check" size={24} color="#2563eb" />
          <Text style={styles.farmDetailLabel}>Active Policies</Text>
          <Text style={styles.farmDetailValue}>{farmerProfile.activePolicies}</Text>
        </View>
      </View>

      <View style={styles.cropTypes}>
        <Text style={styles.sectionTitle}>Crop Types</Text>
        <View style={styles.cropList}>
          {farmerProfile.cropTypes.map((crop, index) => (
            <View key={index} style={styles.cropTag}>
              <Text style={styles.cropTagText}>{crop}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.menuSection}>
        {menuItems.map((item, index) => (
          <Pressable key={index} style={styles.menuItem}>
            <MaterialCommunityIcons name={item.icon} size={24} color="#2563eb" />
            <View style={styles.menuItemText}>
              <Text style={styles.menuItemTitle}>{item.title}</Text>
              <Text style={styles.menuItemSubtitle}>{item.subtitle}</Text>
            </View>
            <MaterialCommunityIcons name="chevron-right" size={24} color="#64748b" />
          </Pressable>
        ))}
      </View>

      <Pressable style={styles.logoutButton}>
        <MaterialCommunityIcons name="logout" size={24} color="#dc2626" />
        <Text style={styles.logoutText}>Log Out</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    backgroundColor: '#fff',
    padding: 20,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#2563eb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#fff',
    fontSize: 32,
    fontWeight: '600',
  },
  profileInfo: {
    marginLeft: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1e293b',
  },
  location: {
    fontSize: 16,
    color: '#64748b',
    marginTop: 4,
  },
  farmDetails: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 16,
    marginTop: 16,
  },
  farmDetail: {
    flex: 1,
    alignItems: 'center',
  },
  farmDetailLabel: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 8,
  },
  farmDetailValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginTop: 4,
  },
  cropTypes: {
    backgroundColor: '#fff',
    padding: 16,
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 12,
  },
  cropList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  cropTag: {
    backgroundColor: '#eff6ff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  cropTagText: {
    color: '#2563eb',
    fontSize: 14,
    fontWeight: '500',
  },
  menuSection: {
    backgroundColor: '#fff',
    marginTop: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  menuItemText: {
    flex: 1,
    marginLeft: 16,
  },
  menuItemTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1e293b',
  },
  menuItemSubtitle: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 2,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fee2e2',
    margin: 16,
    padding: 16,
    borderRadius: 12,
  },
  logoutText: {
    color: '#dc2626',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});