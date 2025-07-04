import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import { Users, ShoppingBag, ChartBar as BarChart3, ArrowUpRight, TrendingUp, UserCheck, Package, DollarSign } from 'lucide-react-native';

const metrics = [
  {
    title: 'Total Revenue',
    value: '$52,000',
    change: '+12.5%',
    icon: DollarSign,
    color: '#10B981',
  },
  {
    title: 'Active Users',
    value: '2,300',
    change: '+8.1%',
    icon: UserCheck,
    color: '#6366F1',
  },
  {
    title: 'Pending Orders',
    value: '182',
    change: '-2.4%',
    icon: Package,
    color: '#F59E0B',
  },
  {
    title: 'Growth Rate',
    value: '15.2%',
    change: '+4.3%',
    icon: TrendingUp,
    color: '#EC4899',
  },
];

const sections = [
  {
    title: 'User Management',
    description: 'Manage users, roles, and permissions',
    icon: Users,
    href: '/admin/users',
    color: '#6366F1',
  },
  {
    title: 'Order Management',
    description: 'View and manage all orders',
    icon: ShoppingBag,
    href: '/admin/orders',
    color: '#10B981',
  },
  {
    title: 'Analytics',
    description: 'View detailed analytics and reports',
    icon: BarChart3,
    href: '/admin/analytics',
    color: '#F59E0B',
  },
];

export default function AdminDashboard() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        <Text style={styles.title}>Dashboard</Text>

        <View style={styles.metricsGrid}>
          {metrics.map((metric) => (
            <View key={metric.title} style={styles.metricCard}>
              <View style={[styles.iconContainer, { backgroundColor: `${metric.color}20` }]}>
                <metric.icon size={24} color={metric.color} />
              </View>
              <Text style={styles.metricTitle}>{metric.title}</Text>
              <Text style={styles.metricValue}>{metric.value}</Text>
              <View style={styles.changeContainer}>
                <ArrowUpRight size={16} color={metric.change.startsWith('+') ? '#10B981' : '#EF4444'} />
                <Text style={[
                  styles.changeText,
                  { color: metric.change.startsWith('+') ? '#10B981' : '#EF4444' }
                ]}>{metric.change}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.sections}>
          {sections.map((section) => (
            <Link key={section.title} href={section.href} asChild>
              <Pressable style={styles.sectionCard}>
                <View style={[styles.sectionIcon, { backgroundColor: `${section.color}20` }]}>
                  <section.icon size={24} color={section.color} />
                </View>
                <View style={styles.sectionContent}>
                  <Text style={styles.sectionTitle}>{section.title}</Text>
                  <Text style={styles.sectionDescription}>{section.description}</Text>
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
  title: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    marginBottom: 24,
    color: '#111827',
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
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  changeText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    marginLeft: 4,
  },
  sections: {
    gap: 16,
  },
  sectionCard: {
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
  sectionIcon: {
    width: 48,
    height: 48,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionContent: {
    flex: 1,
    marginLeft: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 4,
  },
  sectionDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
});