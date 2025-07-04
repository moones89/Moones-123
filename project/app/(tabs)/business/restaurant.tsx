import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import { UtensilsCrossed, Users, Star, TrendingUp, ArrowUpRight, ClipboardList, UserCog, MessageSquare } from 'lucide-react-native';

const metrics = [
  {
    title: 'Total Orders',
    value: '1,240',
    change: '+12.5%',
    color: '#10B981',
  },
  {
    title: 'Total Revenue',
    value: '$8,500',
    change: '+8.1%',
    color: '#6366F1',
  },
  {
    title: 'Customer Rating',
    value: '4.9',
    change: '+0.3',
    color: '#F59E0B',
  },
  {
    title: 'Growth',
    value: '18.2%',
    change: '+5.3%',
    color: '#EC4899',
  },
];

const quickActions = [
  {
    title: 'Menu',
    description: 'Manage your menu',
    icon: ClipboardList,
    href: '/business/menu',
    color: '#6366F1',
  },
  {
    title: 'Staff',
    description: 'Manage employees',
    icon: UserCog,
    href: '/business/staff',
    color: '#10B981',
  },
  {
    title: 'Reviews',
    description: 'Customer feedback',
    icon: MessageSquare,
    href: '/business/reviews',
    color: '#F59E0B',
  },
];

export default function RestaurantDashboard() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Restaurant Dashboard</Text>
            <Text style={styles.subtitle}>Welcome back, Italian Bistro</Text>
          </View>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Premium</Text>
          </View>
        </View>

        <View style={styles.metricsGrid}>
          {metrics.map((metric) => (
            <View key={metric.title} style={styles.metricCard}>
              <View style={[styles.iconContainer, { backgroundColor: `${metric.color}20` }]}>
                {metric.title === 'Total Orders' && <UtensilsCrossed size={24} color={metric.color} />}
                {metric.title === 'Total Revenue' && <Users size={24} color={metric.color} />}
                {metric.title === 'Customer Rating' && <Star size={24} color={metric.color} />}
                {metric.title === 'Growth' && <TrendingUp size={24} color={metric.color} />}
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
    backgroundColor: '#F59E0B',
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
});