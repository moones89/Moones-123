import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import { MapPin, Clock, TrendingUp, Users, ArrowUpRight, Map, ClipboardList, ChartBar as BarChart3 } from 'lucide-react-native';

const metrics = [
  {
    title: 'Active Deliveries',
    value: '24',
    change: '+8',
    color: '#10B981',
    icon: MapPin,
  },
  {
    title: 'Average Time',
    value: '28min',
    change: '-2min',
    color: '#6366F1',
    icon: Clock,
  },
  {
    title: 'Efficiency Rate',
    value: '94%',
    change: '+2.4%',
    color: '#F59E0B',
    icon: TrendingUp,
  },
  {
    title: 'Active Staff',
    value: '12',
    change: '+3',
    color: '#EC4899',
    icon: Users,
  },
];

const quickActions = [
  {
    title: 'Delivery Tracking',
    description: 'Track delivery personnel in real-time',
    icon: Map,
    href: '/supervisor/delivery-tracking',
    color: '#6366F1',
  },
  {
    title: 'Activity Log',
    description: 'Monitor store activities',
    icon: ClipboardList,
    href: '/supervisor/activity-log',
    color: '#10B981',
  },
  {
    title: 'Performance',
    description: 'View staff performance metrics',
    icon: BarChart3,
    href: '/supervisor/performance',
    color: '#F59E0B',
  },
];

const activeDeliveries = [
  {
    id: '1',
    driver: 'John Smith',
    location: '123 Main St, San Francisco',
    status: 'In Transit',
    timeElapsed: '15 mins',
    orderId: '#ORD-001',
  },
  {
    id: '2',
    driver: 'Sarah Johnson',
    location: '456 Market St, San Francisco',
    status: 'Picking Up',
    timeElapsed: '5 mins',
    orderId: '#ORD-002',
  },
  {
    id: '3',
    driver: 'Mike Wilson',
    location: '789 Oak St, San Francisco',
    status: 'Delivered',
    timeElapsed: '32 mins',
    orderId: '#ORD-003',
  },
];

export default function SupervisorDashboard() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Supervisor Dashboard</Text>
            <Text style={styles.subtitle}>Real-time monitoring & tracking</Text>
          </View>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>On Duty</Text>
          </View>
        </View>

        <View style={styles.metricsGrid}>
          {metrics.map((metric) => (
            <View key={metric.title} style={styles.metricCard}>
              <View style={[styles.iconContainer, { backgroundColor: `${metric.color}20` }]}>
                <metric.icon size={24} color={metric.color} />
              </View>
              <Text style={styles.metricTitle}>{metric.title}</Text>
              <Text style={styles.metricValue}>{metric.value}</Text>
              <Text style={[styles.metricChange, { color: metric.color }]}>{metric.change}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Quick Actions</Text>

        <View style={styles.actionGrid}>
          {quickActions.map((action) => (
            <Link key={action.title} href={action.href} asChild>
              <Pressable style={styles.actionCard}>
                <View style={[styles.actionIcon, { backgroundColor: `${action.color}20` }]}>
                  <action.icon size={24} color={action.color} />
                </View>
                <View style={styles.actionContent}>
                  <Text style={styles.actionTitle}>{action.title}</Text>
                  <Text style={styles.actionDescription}>{action.description}</Text>
                </View>
                <ArrowUpRight size={20} color="#6B7280" />
              </Pressable>
            </Link>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Active Deliveries</Text>

        <View style={styles.deliveriesGrid}>
          {activeDeliveries.map((delivery) => (
            <View key={delivery.id} style={styles.deliveryCard}>
              <View style={styles.deliveryHeader}>
                <Text style={styles.driverName}>{delivery.driver}</Text>
                <View style={[
                  styles.statusBadge,
                  { 
                    backgroundColor: 
                      delivery.status === 'In Transit' ? '#FEF3C7' :
                      delivery.status === 'Picking Up' ? '#D1FAE5' :
                      '#F3F4F6'
                  }
                ]}>
                  <Text style={[
                    styles.statusText,
                    {
                      color:
                        delivery.status === 'In Transit' ? '#D97706' :
                        delivery.status === 'Picking Up' ? '#059669' :
                        '#6B7280'
                    }
                  ]}>{delivery.status}</Text>
                </View>
              </View>
              <View style={styles.deliveryInfo}>
                <MapPin size={16} color="#6B7280" />
                <Text style={styles.location}>{delivery.location}</Text>
              </View>
              <View style={styles.deliveryFooter}>
                <Text style={styles.orderId}>{delivery.orderId}</Text>
                <Text style={styles.timeElapsed}>{delivery.timeElapsed}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#111827',
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginTop: 4,
  },
  badge: {
    backgroundColor: '#10B981',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  badgeText: {
    color: '#FFFFFF',
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 32,
  },
  metricCard: {
    width: '47%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  metricTitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#111827',
    marginBottom: 4,
  },
  metricChange: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 16,
  },
  actionGrid: {
    gap: 12,
    marginBottom: 32,
  },
  actionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionContent: {
    flex: 1,
    marginLeft: 16,
  },
  actionTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 4,
  },
  actionDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  deliveriesGrid: {
    gap: 12,
  },
  deliveryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  deliveryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  driverName: {
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
  deliveryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  location: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginLeft: 8,
  },
  deliveryFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderId: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#6366F1',
  },
  timeElapsed: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
});