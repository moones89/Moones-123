import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { Store, UtensilsCrossed, Pill, ArrowUpRight } from 'lucide-react-native';

const businessTypes = [
  {
    id: 'supermarket',
    title: 'Supermarket Dashboard',
    icon: Store,
    color: '#10B981',
    image: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=800&auto=format',
  },
  {
    id: 'restaurant',
    title: 'Restaurant Dashboard',
    icon: UtensilsCrossed,
    color: '#F59E0B',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format',
  },
  {
    id: 'pharmacy',
    title: 'Pharmacy Dashboard',
    icon: Pill,
    color: '#6366F1',
    image: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=800&auto=format',
  },
];

export default function BusinessDashboard() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        <Text style={styles.title}>Business Dashboard</Text>
        <Text style={styles.subtitle}>Select your business type to continue</Text>

        <View style={styles.businessGrid}>
          {businessTypes.map((business) => (
            <Link key={business.id} href={`/business/${business.id}`} asChild>
              <Pressable style={styles.businessCard}>
                <Image source={business.image} style={styles.businessImage} contentFit="cover" />
                <View style={styles.overlay} />
                <View style={styles.cardContent}>
                  <View style={[styles.iconContainer, { backgroundColor: business.color }]}>
                    <business.icon size={24} color="#FFFFFF" />
                  </View>
                  <View style={styles.textContainer}>
                    <Text style={styles.businessTitle}>{business.title}</Text>
                    <Text style={styles.businessDescription}>Manage your business operations</Text>
                  </View>
                  <ArrowUpRight size={24} color="#FFFFFF" />
                </View>
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
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#111827',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginBottom: 24,
  },
  businessGrid: {
    gap: 16,
  },
  businessCard: {
    height: 200,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  businessImage: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  cardContent: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  businessTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  businessDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#E5E7EB',
  },
});