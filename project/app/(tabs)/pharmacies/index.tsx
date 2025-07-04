import React, { useContext } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, ScrollView, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { Link, router } from 'expo-router';
import { Menu, Search, ShoppingCart, Filter } from 'lucide-react-native';

import { CartContext } from '@/context/CartContext'; // 👈 adjust path if needed


const pharmacies = [
  {
    id: '1',
    name: 'City Pharmacy',
    image: 'https://images.unsplash.com/photo-1576602976047-174e57a47881?w=800&auto=format',
    description: '24/7 pharmacy with prescription services',
    rating: 4.8,
  },
  {
    id: '2',
    name: 'Health Plus',
    image: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=800&auto=format',
    description: 'Full-service pharmacy with health consultations',
    rating: 4.6,
  },
  {
    id: '3',
    name: 'MediCare',
    image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800&auto=format',
    description: 'Specialized in medical equipment and supplies',
    rating: 4.9,
  },
];

export default function PharmaciesScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Pharmacies</Text>
        <View style={styles.searchContainer}>
          <Search size={20} color="#8E8E93" style={styles.searchIcon} />
          <TextInput
            placeholder="Search pharmacies..."
            style={styles.searchInput}
            placeholderTextColor="#8E8E93"
          />
        </View>
      </View>

      <View style={styles.filters}>
        <Pressable style={styles.filterButton}>
          <Text style={styles.filterText}>Open Now</Text>
          <Filter size={16} color="#8E8E93" />
        </Pressable>
        <Pressable style={styles.filterButton}>
          <Text style={styles.filterText}>Distance</Text>
          <Filter size={16} color="#8E8E93" />
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {pharmacies.map((pharmacy) => (
          <Link key={pharmacy.id} href={{
            pathname: "/(tabs)/pharmacies",
            params: { id: pharmacy.id }
          }} asChild>
            <Pressable style={styles.card}>
              <Image source={pharmacy.image} style={styles.image} contentFit="cover" />
              <View style={styles.cardContent}>
                <View style={styles.cardHeader}>
                  <Text style={styles.name}>{pharmacy.name}</Text>
                  <View style={styles.rating}>
                    <Text style={styles.ratingText}>{pharmacy.rating}</Text>
                    <Text style={styles.stars}>★★★★★</Text>
                  </View>
                </View>
                <Text style={styles.description}>{pharmacy.description}</Text>
              </View>
            </Pressable>
          </Link>
        ))}
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
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F7',
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
  filters: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 8,
  },
  filterText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#8E8E93',
  },
  content: {
    padding: 16,
    gap: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 200,
  },
  cardContent: {
    padding: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  name: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#8E8E93',
  },
  stars: {
    color: '#FFD700',
    fontSize: 14,
  },
  description: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#8E8E93',
  },
});