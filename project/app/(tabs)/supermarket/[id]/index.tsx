import React, { useContext } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, ScrollView, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { Link, router } from 'expo-router';
import { Menu, Search, ShoppingCart } from 'lucide-react-native';

import { CartContext } from '@/context/CartContext'; // 👈 adjust path if needed


const categories = ['Food', 'Drink', 'Electronics', 'Cheese'];

const foodCategories = [
  { id: 'drinks', title: 'Drinks', image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400&auto=format' },
  { id: 'ice-cream', title: 'Ice cream', image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&auto=format' },
  { id: 'burger', title: 'Burger', image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=400&auto=format' },
  { id: 'food', title: 'Food', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&auto=format' },
  { id: 'fruit', title: 'Fruit', image: 'https://images.unsplash.com/photo-1591287083773-9a52ba8184a4?w=400&auto=format' },
  { id: 'vegetable', title: 'Vegetable', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400&auto=format' },
  { id: 'sandwich', title: 'Sandwich', image: 'https://images.unsplash.com/photo-1553909489-cd47e0907980?w=400&auto=format' },
  { id: 'coffee', title: 'Coffee', image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&auto=format' },
  { id: 'burger-2', title: 'Burger', image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=400&auto=format' },
  { id: 'food-2', title: 'Food', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&auto=format' },
  { id: 'drinks-2', title: 'Drinks', image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400&auto=format' },
  { id: 'vegetable-2', title: 'Vegetable', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400&auto=format' },
];

export default function SupermarketScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.banner}>
          <Image
            source="https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=1200&auto=format"
            style={styles.bannerImage}
            contentFit="cover"
          />
          <View style={styles.bannerOverlay}>
            <View style={styles.bannerContent}>
              <Text style={styles.bannerTitle}>cher FOOD</Text>
              <View style={styles.discountBadge}>
                <Text style={styles.discountText}>50%</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.categories}>
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

        <View style={styles.grid}>
          {foodCategories.map((category) => (
            <Link key={category.id} href={`/supermarket/${category.id}`} asChild>
              <Pressable style={styles.gridItem}>
                <View style={styles.imageContainer}>
                  <Image source={category.image} style={styles.categoryImage} contentFit="cover" />
                </View>
                <Text style={styles.categoryTitle}>{category.title}</Text>
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
  banner: {
    height: 200,
    position: 'relative',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  bannerOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    padding: 20,
  },
  bannerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bannerTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 32,
    color: '#FFFFFF',
  },
  discountBadge: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FF3B30',
    alignItems: 'center',
    justifyContent: 'center',
  },
  discountText: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#FFFFFF',
  },
  categories: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 4,
    margin: 16,
    borderRadius: 8,
  },
  categoryTab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#6B4EFF',
    borderRadius: 4,
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
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    gap: 16,
  },
  gridItem: {
    width: '22%',
    aspectRatio: 1,
    alignItems: 'center',
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  categoryImage: {
    width: '100%',
    height: '100%',
  },
  categoryTitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#000000',
    marginTop: 4,
    textAlign: 'center',
  },
});
