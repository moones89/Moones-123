import { View, Text, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';

const orders = [
  {
    id: '1',
    item: 'Grilled Chicken',
    orderedBy: 'Antony Hopkins',
    status: 'Pending',
    orderNumber: '2546869874',
    quantity: 2,
    totalPaid: 100.00,
    orderDate: '6 May 2020',
    image: 'https://images.unsplash.com/photo-1488900128323-21503983a07e?w=800&auto=format',
  },
  {
    id: '2',
    item: 'Grilled Chicken',
    orderedBy: 'Antony Hopkins',
    status: 'Delivered',
    orderNumber: '2546869874',
    quantity: 1,
    totalPaid: 25.00,
    orderDate: '6 May 2020',
    image: 'https://images.unsplash.com/photo-1488900128323-21503983a07e?w=800&auto=format',
  },
];

export default function OrdersScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#000000" />
        </Pressable>
        <Text style={styles.title}>My order</Text>
      </View>

      <View style={styles.tabs}>
        <Pressable style={[styles.tab, styles.activeTab]}>
          <Text style={[styles.tabText, styles.activeTabText]}>Pending (2)</Text>
        </Pressable>
        <Pressable style={styles.tab}>
          <Text style={styles.tabText}>Fulfilled</Text>
        </Pressable>
        <Pressable style={styles.tab}>
          <Text style={styles.tabText}>Canceled</Text>
        </Pressable>
      </View>

      <View style={styles.ordersList}>
        {orders.map((order) => (
          <View key={order.id} style={styles.orderCard}>
            <View style={styles.orderHeader}>
              <Image source={{ uri: order.image }} style={styles.orderImage} />
              <View style={styles.orderInfo}>
                <Text style={styles.orderItem}>{order.item}</Text>
                <Text style={styles.orderedBy}>Ordered by {order.orderedBy}</Text>
              </View>
              <View style={[styles.statusBadge, order.status === 'Delivered' && styles.deliveredBadge]}>
                <Text style={[styles.statusText, order.status === 'Delivered' && styles.deliveredText]}>
                  {order.status}
                </Text>
              </View>
            </View>

            <View style={styles.orderDetails}>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Order Number:</Text>
                <Text style={styles.detailValue}>{order.orderNumber}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Quantity:</Text>
                <Text style={styles.detailValue}>{order.quantity} Plate(s)</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Order Date:</Text>
                <Text style={styles.detailValue}>{order.orderDate}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Total Paid:</Text>
                <Text style={styles.detailValue}>$ {order.totalPaid.toFixed(2)}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    marginRight: 16,
  },
  title: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 20,
  },
  tabs: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#6B4EFF',
  },
  tabText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#8E8E93',
  },
  activeTabText: {
    color: '#6B4EFF',
    fontFamily: 'Inter-SemiBold',
  },
  ordersList: {
    padding: 16,
    gap: 16,
  },
  orderCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
  },
  orderHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  orderImage: {
    width: 64,
    height: 64,
    borderRadius: 8,
  },
  orderInfo: {
    flex: 1,
    marginLeft: 12,
  },
  orderItem: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    marginBottom: 4,
  },
  orderedBy: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#8E8E93',
  },
  statusBadge: {
    backgroundColor: '#FFF3E0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  deliveredBadge: {
    backgroundColor: '#E8F5E9',
  },
  statusText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    color: '#F57C00',
  },
  deliveredText: {
    color: '#43A047',
  },
  orderDetails: {
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#8E8E93',
  },
  detailValue: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
  },
});