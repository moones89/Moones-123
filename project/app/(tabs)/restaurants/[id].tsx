import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Menu, Search, ShoppingCart, Heart, Star, MapPin } from 'lucide-react-native';
import { CartContext } from '@/context/CartContext';

const categories = ['Food', 'Drink', 'Electronics', 'Cheese'];

const menuItems = [
  {
    id: '1',
    name: 'Grilled Chicken',
    image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=800&auto=format',
    description: 'Tender grilled chicken with special sauce',
    price: 50.0,
    rating: 4.8,
  },
  {
    id: '2',
    name: 'Pasta Carbonara',
    image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800&auto=format',
    description: 'Classic Italian pasta with creamy sauce',
    price: 45.0,
    rating: 4.7,
  },
  {
    id: '3',
    name: 'Caesar Salad',
    image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=800&auto=format',
    description: 'Fresh salad with grilled chicken',
    price: 35.0,
    rating: 4.6,
  },
  {
    id: '4',
    name: 'Margherita Pizza',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format',
    description: 'Traditional Italian pizza',
    price: 55.0,
    rating: 4.9,
  },
];

export default function RestaurantDetailsScreen() {
  const { id } = useLocalSearchParams();
  const [selectedCategory, setSelectedCategory] = useState('Food');
  const { addToCart, cartItems } = useContext(CartContext);
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      {/* 🔷 Header */}
      <View style={styles.header}>
        <Menu size={24} color="#FFF" style={styles.icon} />
        <TextInput
          placeholder="Search..."
          placeholderTextColor="#8E8E93"
          style={styles.searchInput}
        />
        <Pressable style={styles.cartIcon} onPress={() => router.push('/(tabs)/shopping/cart')}>
          <ShoppingCart size={24} color="#FFF" />
          {cartItems.length > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{cartItems.length}</Text>
            </View>
          )}
        </Pressable>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.banner}>
          <Image
            source="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format"
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

        <View style={styles.restaurantInfo}>
          <Text style={styles.restaurantName}>Italian Restaurant</Text>
          <View style={styles.ratingRow}>
            <Star size={16} color="#FFD700" fill="#FFD700" />
            <Text style={styles.rating}>4.8</Text>
            <Text style={styles.ratingCount}>(200+ ratings)</Text>
          </View>
          <View style={styles.locationRow}>
            <MapPin size={16} color="#8E8E93" />
            <Text style={styles.location}>123 Main St, San Francisco</Text>
            <Text style={styles.distance}>1.2 km</Text>
          </View>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categories}>
          {categories.map((category) => (
            <Pressable
              key={category}
              style={[styles.categoryTab, category === selectedCategory && styles.activeTab]}
              onPress={() => setSelectedCategory(category)}>
              <Text style={[styles.categoryText, category === selectedCategory && styles.activeText]}>
                {category}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        <View style={styles.menuGrid}>
          {menuItems.map((item) => (
            <View key={item.id} style={styles.menuItem}>
              <Image source={item.image} style={styles.menuImage} contentFit="cover" />
              <View style={styles.menuInfo}>
                <Text style={styles.menuName}>{item.name}</Text>
                <Text style={styles.menuDescription} numberOfLines={2}>
                  {item.description}
                </Text>
                <View style={styles.menuBottom}>
                  <Text style={styles.menuPrice}>${item.price.toFixed(2)}</Text>
                  <Pressable
                    style={styles.cartButton}
                    onPress={() => addToCart({ ...item, quantity: 1 })}
                  >
                    <ShoppingCart size={18} color="#6B4EFF" />
                  </Pressable>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F2F2F7' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6B4EFF',
    padding: 16,
  },
  icon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    height: 40,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  cartIcon: {
    marginLeft: 12,
    position: 'relative',
  },
  cartBadge: {
    position: 'absolute',
    top: -4,
    right: -6,
    backgroundColor: '#FF3B30',
    borderRadius: 8,
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  cartBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  content: { flex: 1 },
  banner: { height: 200, position: 'relative' },
  bannerImage: { width: '100%', height: '100%' },
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
  bannerTitle: { fontSize: 32, color: '#FFFFFF', fontWeight: 'bold' },
  discountBadge: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FF3B30',
    alignItems: 'center',
    justifyContent: 'center',
  },
  discountText: { fontSize: 24, color: '#FFFFFF', fontWeight: 'bold' },
  restaurantInfo: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    marginBottom: 4,
  },
  restaurantName: { fontSize: 24, fontWeight: 'bold', marginBottom: 8 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  rating: { fontSize: 14, fontWeight: '600' },
  ratingCount: { fontSize: 14, color: '#6B7280' },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  location: { fontSize: 14, color: '#6B7280', flex: 1 },
  distance: { fontSize: 14, color: '#6B7280' },
  categories: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  categoryTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F2F2F7',
    marginRight: 8,
  },
  activeTab: { backgroundColor: '#6B4EFF' },
  categoryText: { fontSize: 14, color: '#8E8E93' },
  activeText: { color: '#FFFFFF', fontWeight: '600' },
  menuGrid: {
    padding: 16,
    gap: 16,
  },
  menuItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  menuImage: { width: 100, height: 100 },
  menuInfo: { flex: 1, padding: 12 },
  menuName: { fontSize: 16, fontWeight: '600', marginBottom: 4 },
  menuDescription: { fontSize: 14, color: '#6B7280', marginBottom: 8 },
  menuBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuPrice: { fontSize: 16, color: '#FFD700', fontWeight: 'bold' },
  cartButton: {
    backgroundColor: '#F2F2F7',
    padding: 6,
    borderRadius: 8,
  },
});
