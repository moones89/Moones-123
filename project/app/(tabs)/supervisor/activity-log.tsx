import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, Package, ShoppingCart, UserCheck, TriangleAlert as AlertTriangle } from 'lucide-react-native';

const activities = [
  {
    id: '1',
    type: 'order',
    message: 'New order #ORD-001 assigned to John Smith',
    timestamp: '2 mins ago',
    icon: Package,
    color: '#6366F1',
  },
  {
    id: '2',
    type: 'delivery',
    message: 'Sarah Johnson completed delivery #ORD-002',
    timestamp: '15 mins ago',
    icon: ShoppingCart,
    color: '#10B981',
  },
  {
    id: '3',
    type: 'staff',
    message: 'Mike Wilson started their shift',
    timestamp: '1 hour ago',
    icon: UserCheck,
    color: '#F59E0B',
  },
  {
    id: '4',
    type: 'alert',
    message: 'Delivery delayed for order #ORD-003',
    timestamp: '2 hours ago',
    icon: AlertTriangle,
    color: '#EF4444',
  },
];

const filterOptions = ['All', 'Orders', 'Deliveries', 'Staff', 'Alerts'];

export default function ActivityLogScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#000000" />
        </Pressable>
        <Text style={styles.title}>Activity Log</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filters}>
        {filterOptions.map((option, index) => (
          <Pressable
            key={option}
            style={[
              styles.filterButton,
              index === 0 && styles.activeFilter,
            ]}>
            <Text style={[
              styles.filterText,
              index === 0 && styles.activeFilterText,
            ]}>{option}</Text>
          </Pressable>
        ))}
      </ScrollView>

      <ScrollView style={styles.content}>
        {activities.map((activity) => (
          <View key={activity.id} style={styles.activityCard}>
            <View style={[styles.iconContainer, { backgroundColor: `${activity.color}20` }]}>
              <activity.icon size={24} color={activity.color} />
            </View>
            <View style={styles.activityContent}>
              <Text style={styles.message}>{activity.message}</Text>
              <Text style={styles.timestamp}>{activity.timestamp}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
  },
  filters: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    marginRight: 8,
  },
  activeFilter: {
    backgroundColor: '#6366F1',
  },
  filterText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  activeFilterText: {
    color: '#FFFFFF',
    fontFamily: 'Inter-SemiBold',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  activityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  activityContent: {
    flex: 1,
  },
  message: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 4,
  },
  timestamp: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
});