import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, TrendingUp, TrendingDown, DollarSign, Users, ShoppingBag, Clock } from 'lucide-react-native';

const metrics = [
  {
    title: 'Total Revenue',
    value: '$52,000',
    change: '+12.5%',
    trend: 'up',
    chart: [40, 35, 45, 42, 50, 48, 52],
  },
  {
    title: 'Total Users',
    value: '2,300',
    change: '+8.1%',
    trend: 'up',
    chart: [20, 22, 25, 24, 26, 28, 30],
  },
  {
    title: 'Orders',
    value: '1,520',
    change: '-2.4%',
    trend: 'down',
    chart: [80, 75, 72, 70, 68, 65, 63],
  },
  {
    title: 'Average Time',
    value: '25min',
    change: '+4.3%',
    trend: 'up',
    chart: [15, 18, 20, 22, 21, 23, 25],
  },
];

const timeRanges = ['Today', 'Week', 'Month', 'Year'];

export default function AnalyticsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#000000" />
        </Pressable>
        <Text style={styles.title}>Analytics</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.content}>
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

        <View style={styles.metricsGrid}>
          {metrics.map((metric) => (
            <View key={metric.title} style={styles.metricCard}>
              <View style={styles.metricHeader}>
                {metric.title === 'Total Revenue' && <DollarSign size={20} color="#6366F1" />}
                {metric.title === 'Total Users' && <Users size={20} color="#10B981" />}
                {metric.title === 'Orders' && <ShoppingBag size={20} color="#F59E0B" />}
                {metric.title === 'Average Time' && <Clock size={20} color="#EC4899" />}
                <Text style={styles.metricTitle}>{metric.title}</Text>
              </View>

              <Text style={styles.metricValue}>{metric.value}</Text>

              <View style={styles.metricFooter}>
                <View style={styles.changeContainer}>
                  {metric.trend === 'up' ? (
                    <TrendingUp size={16} color="#10B981" />
                  ) : (
                    <TrendingDown size={16} color="#EF4444" />
                  )}
                  <Text
                    style={[
                      styles.changeText,
                      { color: metric.trend === 'up' ? '#10B981' : '#EF4444' },
                    ]}>
                    {metric.change}
                  </Text>
                </View>
                <Text style={styles.periodText}>vs last week</Text>
              </View>

              <View style={styles.chartContainer}>
                {metric.chart.map((value, index) => (
                  <View
                    key={index}
                    style={[
                      styles.chartBar,
                      {
                        height: `${value}%`,
                        backgroundColor:
                          metric.title === 'Total Revenue'
                            ? '#6366F1'
                            : metric.title === 'Total Users'
                            ? '#10B981'
                            : metric.title === 'Orders'
                            ? '#F59E0B'
                            : '#EC4899',
                      },
                    ]}
                  />
                ))}
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
  content: {
    flex: 1,
    padding: 16,
  },
  timeRanges: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    padding: 4,
    marginBottom: 24,
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
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
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
  metricHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  metricTitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginLeft: 8,
  },
  metricValue: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#111827',
    marginBottom: 8,
  },
  metricFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
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
  periodText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  chartContainer: {
    flexDirection: 'row',
    height: 60,
    alignItems: 'flex-end',
    gap: 4,
  },
  chartBar: {
    flex: 1,
    borderRadius: 4,
    opacity: 0.8,
  },
});