import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { Search, Filter } from 'lucide-react-native';

const restaurants = [
  {
    id: '1',
    name: 'Italian Restaurant',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800',
    type: 'Italian',
    rating: 4.8,
    distance: 2.4,
    isOpen: true,
  },
  {
    id: '2',
    name: 'Sushi Place',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800',
    type: 'Japanese',
    rating: 4.6,
    distance: 5.1,
    isOpen: false,
  },
  {
    id: '3',
    name: 'Nigerian Kitchen',
    image: 'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=800',
    type: 'Nigerian',
    rating: 4.9,
    distance: 1.2,
    isOpen: true,
  },
];

export default function RestaurantsScreen() {
  const [sortBy, setSortBy] = useState<'rating' | 'distance'>('rating');
  const [openFilter, setOpenFilter] = useState<'all' | 'open'>('all');

  const sorted = [...restaurants]
    .filter(r => openFilter === 'all' || r.isOpen)
    .sort((a, b) =>
      sortBy === 'rating' ? b.rating - a.rating : a.distance - b.distance
    );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>Restaurants</Text>
          <View style={styles.searchBar}>
            <Search size={20} color="#8E8E93" />
            <TextInput
              placeholder="Search restaurants..."
              placeholderTextColor="#8E8E93"
              style={styles.searchInput}
            />
          </View>
        </View>

        <View style={styles.filters}>
          <Pressable
            style={[styles.filterButton, sortBy === 'rating' && styles.activeFilter]}
            onPress={() => setSortBy('rating')}
          >
            <Text style={styles.filterText}>Rating</Text>
            <Filter size={16} color={sortBy === 'rating' ? '#6B4EFF' : '#8E8E93'} />
          </Pressable>

          <Pressable
            style={[styles.filterButton, sortBy === 'distance' && styles.activeFilter]}
            onPress={() => setSortBy('distance')}
          >
            <Text style={styles.filterText}>Distance</Text>
            <Filter size={16} color={sortBy === 'distance' ? '#6B4EFF' : '#8E8E93'} />
          </Pressable>

          <Pressable
            style={[styles.filterButton, openFilter === 'open' && styles.activeFilter]}
            onPress={() => setOpenFilter(openFilter === 'open' ? 'all' : 'open')}
          >
            <Text style={styles.filterText}>Open Now</Text>
            <Filter size={16} color={openFilter === 'open' ? '#6B4EFF' : '#8E8E93'} />
          </Pressable>
        </View>

        <View style={styles.list}>
          {sorted.map((r) => (
            <Link key={r.id} href={`/restaurants/${r.id}`} asChild>
              <Pressable style={styles.card}>
                <Image source={r.image} style={styles.image} contentFit="cover" />
                <View style={styles.cardContent}>
                  <View style={styles.headerRow}>
                    <Text style={styles.name}>{r.name}</Text>
                    <Text style={[styles.status, { color: r.isOpen ? '#00C853' : '#FF3B30' }]}>
                      {r.isOpen ? 'Open' : 'Closed'}
                    </Text>
                  </View>
                  <Text style={styles.meta}>
                    {r.type} • {r.distance} km
                  </Text>
                  <Text style={styles.rating}>⭐ {r.rating}</Text>
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
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: { padding: 16 },
  title: { fontFamily: 'Inter-Bold', fontSize: 24, marginBottom: 12 },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F7',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 40,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  filters: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F7',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  activeFilter: {
    backgroundColor: '#E0E7FF',
  },
  filterText: {
    fontSize: 14,
    color: '#6B4EFF',
    marginRight: 6,
    fontFamily: 'Inter-Regular',
  },
  list: {
    padding: 16,
    gap: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
  },
  image: {
    width: '100%',
    height: 160,
  },
  cardContent: {
    padding: 16,
    gap: 4,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
  },
  status: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
  },
  meta: {
    fontSize: 14,
    color: '#6B7280',
    fontFamily: 'Inter-Regular',
  },
  rating: {
    fontSize: 14,
    color: '#6B4EFF',
    fontFamily: 'Inter-SemiBold',
  },
});
