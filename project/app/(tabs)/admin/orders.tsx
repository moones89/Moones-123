import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, Search, Filter, Calendar, Clock, TriangleAlert as AlertTriangle, Bell } from 'lucide-react-native';

const orders = [
  {
    id: '#ORD-001',
    customer: 'John Doe',
    date: '2024-02-20',
    amount: 150.00,
    status: 'In Progress',
    items: 3,
    expectedDelivery: '14:30',
    actualDelivery: null,
    isDelayed: false,
    assignedTo: 'Mike Wilson',
    location: '123 Main St, San Francisco',
  },
  {
    id: '#ORD-002',
    customer: 'Jane Smith',
    date: '2024-02-20',
    amount: 85.50,
    status: 'Delayed',
    items: 2,
    expectedDelivery: '13:45',
    actualDelivery: null,
    isDelayed: true,
    delayTime: '25 mins',
    assignedTo: 'Sarah Johnson',
    location: '456 Market St, San Francisco',
  },
  {
    id: '#ORD-003',
    customer: 'Mike Johnson',
    date: '2024-02-19',
    amount: 220.00,
    status: 'Completed',
    items: 4,
    expectedDelivery: '12:30',
    actualDelivery: '12:35',
    isDelayed: false,
    assignedTo: 'John Smith',
    location: '789 Oak St, San Francisco',
  },
];

const statusColors = {
  'In Progress': { bg: '#FEF3C7', text: '#D97706' },
  'Delayed': { bg: '#FEE2E2', text: '#DC2626' },
  'Completed': { bg: '#D1FAE5', text: '#059669' },
};

const NotificationBadge = ({ count }: { count: number }) => (
  count > 0 ? (
    <View style={styles.notificationBadge}>
      <Text style={styles.notificationText}>{count}</Text>
    </View>
  ) : null
);

export default function OrdersScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState<string[]>([]);

  // Monitor orders for delays and send alerts
  useEffect(() => {
    const interval = setInterval(() => {
      orders.forEach(order => {
        if (order.isDelayed) {
          // Add notification for delayed order
          setNotifications(prev => [
            ...prev,
            `⚠️ Order ${order.id} is delayed by ${order.delayTime}. Driver: ${order.assignedTo}`
          ]);
          
          // TODO: Integrate with real SMS alert service in production
          // Example: sendSmsAlert(order.id, order.delayTime, order.assignedTo);
        }
      });
    }, 5000); // Check every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <ArrowLeft size={24} color="#000000" />
          </Pressable>
          <Text style={styles.title}>Orders</Text>
          <View style={styles.notificationContainer}>
            <Bell size={24} color="#000000" />
            <NotificationBadge count={notifications.length} />
          </View>
        </View>

        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <Search size={20} color="#6B7280" />
            <TextInput
              placeholder="Search orders..."
              style={styles.searchInput}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          <Pressable style={styles.filterButton}>
            <Calendar size={20} color="#6B7280" />
          </Pressable>
          <Pressable style={styles.filterButton}>
            <Filter size={20} color="#6B7280" />
          </Pressable>
        </View>
      </View>

      {notifications.length > 0 && (
        <ScrollView style={styles.notificationList}>
          {notifications.map((notification, index) => (
            <View key={index} style={styles.notificationItem}>
              <Text style={styles.notificationMessage}>{notification}</Text>
            </View>
          ))}
        </ScrollView>
      )}

      <ScrollView style={styles.content}>
        {orders.map((order) => (
          <Pressable key={order.id} style={styles.orderCard}>
            <View style={styles.orderHeader}>
              <Text style={styles.orderId}>{order.id}</Text>
              <View style={[
                styles.statusBadge,
                { backgroundColor: statusColors[order.status].bg }
              ]}>
                <Text style={[
                  styles.statusText,
                  { color: statusColors[order.status].text }
                ]}>{order.status}</Text>
              </View>
            </View>

            <View style={styles.orderDetails}>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Customer</Text>
                <Text style={styles.detailValue}>{order.customer}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Location</Text>
                <Text style={styles.detailValue}>{order.location}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Assigned To</Text>
                <Text style={styles.detailValue}>{order.assignedTo}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Items</Text>
                <Text style={styles.detailValue}>{order.items} items</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Amount</Text>
                <Text style={styles.detailValue}>${order.amount.toFixed(2)}</Text>
              </View>

              <View style={styles.deliveryInfo}>
                <View style={styles.deliveryTimeRow}>
                  <Clock size={16} color="#6B7280" />
                  <Text style={styles.deliveryTimeLabel}>Expected:</Text>
                  <Text style={styles.deliveryTime}>{order.expectedDelivery}</Text>
                </View>
                {order.actualDelivery && (
                  <View style={styles.deliveryTimeRow}>
                    <Clock size={16} color="#059669" />
                    <Text style={styles.deliveryTimeLabel}>Delivered:</Text>
                    <Text style={styles.deliveryTime}>{order.actualDelivery}</Text>
                  </View>
                )}
                {order.isDelayed && (
                  <View style={styles.delayAlert}>
                    <AlertTriangle size={16} color="#DC2626" />
                    <Text style={styles.delayText}>Delayed by {order.delayTime}</Text>
                  </View>
                )}
              </View>
            </View>
          </Pressable>
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
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
  },
  notificationContainer: {
    position: 'relative',
    padding: 8,
  },
  notificationBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: '#EF4444',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: 'Inter-Bold',
  },
  notificationList: {
    maxHeight: 100,
    backgroundColor: '#FEF2F2',
  },
  notificationItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#FEE2E2',
  },
  notificationMessage: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#991B1B',
  },
  searchContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  searchInput: {
    flex: 1,
    height: 40,
    marginLeft: 8,
    fontFamily: 'Inter-Regular',
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  orderCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  orderId: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
  },
  orderDetails: {
    gap: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  detailValue: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
  },
  deliveryInfo: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    gap: 8,
  },
  deliveryTimeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  deliveryTimeLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  deliveryTime: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
  },
  delayAlert: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#FEE2E2',
    padding: 8,
    borderRadius: 8,
  },
  delayText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#DC2626',
  },
});