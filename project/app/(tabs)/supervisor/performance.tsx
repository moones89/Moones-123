import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, Star, Clock, TrendingUp, CircleCheck as CheckCircle } from 'lucide-react-native';

const staffPerformance = [
  {
    id: '1',
    name: 'John Smith',
    role: 'Delivery Driver',
    metrics: {
      rating: 4.8,
      deliveries: 156,
      avgTime: '28min',
      completion: 98,
    },
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    role: 'Delivery Driver',
    metrics: {
      rating: 4.9,
      deliveries: 142,
      avgTime: '25min',
      completion: 99,
    },
  },
  {
    id: '3',
    name: 'Mike Wilson',
    role: 'Delivery Driver',
    metrics: {
      rating: 4.7,
      deliveries: 128,
      avgTime: '30min',
      completion: 97,
    },
  },
];

const timeRanges = ['Today', 'Week', 'Month', 'Year'];

export default function PerformanceScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#000000" />
        </Pressable>
        <Text style={styles.title}>Performance</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.timeRanges}>
        {timeRanges.map((range, index) => (
          <Pressable
            key={range}
            style={[
              styles.timeRangeButton,
              index === 1 && styles.activeTimeRange,
            ]}>
            <Text
              style={[
                styles.timeRangeText,
                index === 1 && styles.activeTimeRangeText,
              ]}>
              {range}
            </Text>
          </Pressable>
        ))}
      </View>

      <ScrollView style={styles.content}>
        {staffPerformance.map((staff) => (
          <View key={staff.id} style={styles.performanceCard}>
            <View style={styles.cardHeader}>
              <View>
                <Text style={styles.staffName}>{staff.name}</Text>
                <Text style={styles.staffRole}>{staff.role}</Text>
              </View>
              <View style={styles.ratingContainer}>
                <Star size={16} color="#F59E0B" fill="#F59E0B" />
                <Text style={styles.rating}>{staff.metrics.rating}</Text>
              </View>
            </View>

            <View style={styles.metricsGrid}>
              <View style={styles.metricItem}>
                <TrendingUp size={20} color="#6366F1" />
                <Text style={styles.metricValue}>{staff.metrics.deliveries}</Text>
                <Text style={styles.metricLabel}>Deliveries</Text>
              </View>

              <View style={styles.metricItem}>
                <Clock size={20} color="#10B981" />
                <Text style={styles.metricValue}>{staff.metrics.avgTime}</Text>
                <Text style={styles.metricLabel}>Avg Time</Text>
              </View>

              <View style={styles.metricItem}>
                <CheckCircle size={20} color="#F59E0B" />
                <Text style={styles.metricValue}>{staff.metrics.completion}%</Text>
                <Text style={styles.metricLabel}>Completion</Text>
              </View>
            </View>

            <View style={styles.performanceBar}>
              <View 
                style={[
                  styles.performanceFill,
                  { width: `${staff.metrics.completion}%` }
                ]} 
              />
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
  timeRanges: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    margin: 16,
    borderRadius: 8,
    padding: 4,
  },
  timeRangeButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 6,
  },
  activeTimeRange: {
    backgroundColor: '#FFFFFF',
  },
  timeRangeText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  activeTimeRangeText: {
    color: '#111827',
    fontFamily: 'Inter-SemiBold',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  performanceCard: {
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
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  staffName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 4,
  },
  staffRole: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  rating: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#D97706',
    marginLeft: 4,
  },
  metricsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  metricItem: {
    alignItems: 'center',
  },
  metricValue: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#111827',
    marginTop: 4,
    marginBottom: 2,
  },
  metricLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  performanceBar: {
    height: 4,
    backgroundColor: '#F3F4F6',
    borderRadius: 2,
    overflow: 'hidden',
  },
  performanceFill: {
    height: '100%',
    backgroundColor: '#10B981',
    borderRadius: 2,
  },
});