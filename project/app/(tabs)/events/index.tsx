import { View, Text, ScrollView, StyleSheet, Pressable, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { Search, Filter, Bell, ShoppingCart } from 'lucide-react-native';

const categories = ['Music', 'Sports', 'Theater', 'Art'];

const events = [
  {
    id: '1',
    title: 'Rock Night',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&auto=format',
    date: 'SAT, JUN 15',
    endDate: 'TUE, JUN 25',
    time: '7:30 PM - 11:00 PM',
    location: 'The Criterion, San Francisco',
    distance: '1.7 KM',
    going: '1.2K',
    levels: [
      { id: 1, name: 'Level 1', price: 200 },
      { id: 2, name: 'Level 2', price: 150 },
      { id: 3, name: 'Level 3', price: 300 },
    ],
  },
  {
    id: '2',
    title: 'Jazz Night',
    image: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=800&auto=format',
    date: 'SAT, JUN 15',
    time: '8:00 PM - 12:00 AM',
    location: 'The Criterion, San Francisco',
    distance: '1.7 KM',
    going: '800',
  },
];

export default function EventsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <Search size={20} color="#8E8E93" style={styles.searchIcon} />
          <TextInput
            placeholder="Search events..."
            style={styles.searchInput}
            placeholderTextColor="#8E8E93"
          />
        </View>
        <View style={styles.headerIcons}>
          <Filter size={24} color="#6B4EFF" style={styles.icon} />
          <Bell size={24} color="#6B4EFF" style={styles.icon} />
          <View style={styles.walletContainer}>
            <ShoppingCart size={24} color="#6B4EFF" />
            <Text style={styles.walletAmount}>$1000</Text>
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll}>
          <View style={styles.categories}>
            <Pressable style={styles.addCategory}>
              <Text style={styles.addCategoryText}>+</Text>
            </Pressable>
            {categories.map((category, index) => (
              <Pressable
                key={category}
                style={[styles.categoryTab, index === 0 && styles.activeTab]}>
                <Text style={[styles.categoryText, index === 0 && styles.activeText]}>
                  {category}
                </Text>
              </Pressable>
            ))}
          </View>
        </ScrollView>

        <View style={styles.eventsList}>
          {events.map((event) => (
            <Link key={event.id} href={`/events/${event.id}`} asChild>
              <Pressable style={styles.eventCard}>
                <Image source={event.image} style={styles.eventImage} contentFit="cover" />
                <View style={styles.eventInfo}>
                  <View style={styles.eventHeader}>
                    <Text style={styles.eventDate}>{event.date}</Text>
                    <Pressable style={styles.favoriteButton}>
                      <Text style={styles.favoriteIcon}>★</Text>
                    </Pressable>
                  </View>
                  <Text style={styles.eventTitle}>{event.title}</Text>
                  <View style={styles.eventLocation}>
                    <Text style={styles.locationText}>{event.location}</Text>
                    <Text style={styles.distance}>{event.distance}</Text>
                  </View>
                  <View style={styles.eventFooter}>
                    <Text style={styles.goingText}>{event.going} Going</Text>
                  </View>
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
    backgroundColor: '#F2F2F7',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#6B4EFF',
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 40,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
  },
  icon: {
    marginRight: 16,
  },
  walletContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  walletAmount: {
    marginLeft: 4,
    color: '#FFFFFF',
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
  },
  content: {
    padding: 16,
  },
  categoriesScroll: {
    marginBottom: 16,
  },
  categories: {
    flexDirection: 'row',
    paddingRight: 16,
  },
  addCategory: {
    width: 40,
    height: 40,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  addCategoryText: {
    fontSize: 24,
    color: '#6B4EFF',
  },
  categoryTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    marginRight: 8,
  },
  activeTab: {
    backgroundColor: '#6B4EFF',
  },
  categoryText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#8E8E93',
  },
  activeText: {
    color: '#FFFFFF',
    fontFamily: 'Inter-SemiBold',
  },
  eventsList: {
    gap: 16,
  },
  eventCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
  },
  eventImage: {
    width: '100%',
    height: 200,
  },
  eventInfo: {
    padding: 16,
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  eventDate: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#6B4EFF',
  },
  favoriteButton: {
    padding: 4,
  },
  favoriteIcon: {
    fontSize: 20,
    color: '#FFD700',
  },
  eventTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    marginBottom: 8,
  },
  eventLocation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  locationText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#8E8E93',
  },
  distance: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#8E8E93',
  },
  eventFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  goingText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#8E8E93',
  },
});