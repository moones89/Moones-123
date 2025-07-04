import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { useLocalSearchParams, router } from 'expo-router';
import { ShoppingCart, Star, MapPin, ArrowLeft } from 'lucide-react-native';
import { CartContext } from '@/context/CartContext';

const categories = ['Medications', 'Health Products', 'Personal Care', 'Supplements'];

const products = [
  {
    id: '1',
    name: 'Paracetamol',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&auto=format',
    description: 'Pain reliever and fever reducer',
    price: 12.99,
    rating: 4.8,
  },
  {
    id: '2',
    name: 'Vitamin C',
    image: 'https://images.unsplash.com/photo-1584362917165-526a968579e8?w=800&auto=format',
    description: 'Immune system support supplement',
    price: 15.50,
    rating: 4.7,
  },
  {
    id: '3',
    name: 'First Aid Kit',
    image: 'https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=800&auto=format',
    description: 'Essential first aid supplies',
    price: 25.99,
    rating: 4.9,
  },
  {
    id: '4',
    name: 'Digital Thermometer',
    image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&auto=format',
    description: 'Accurate temperature measurement',
    price: 18.75,
    rating: 4.6,
  },
];

export default function PharmacyDetailsScreen() {
  const { id } = useLocalSearchParams();
  const [selectedCategory, setSelectedCategory] = useState('Medications');
  const { addToCart } = useContext(CartContext);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#000" />
        </Pressable>
        <Text style={styles.headerTitle}>Pharmacy Details</Text>
      </View>
      
      <ScrollView style={styles.content}>
        <View style={styles.banner}>
          <Image
            source="https://images.unsplash.com/photo-1576602976047-174e57a47881?w=800&auto=format"
            style={styles.bannerImage}
            contentFit="cover"
          />
          <View style={styles.bannerOverlay}>
            <View style={styles.bannerContent}>
              <Text style={styles.bannerTitle}>City Pharmacy</Text>
              <View style={styles.discountBadge}>
                <Text style={styles.discountText}>20%</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.pharmacyInfo}>
          <Text style={styles.pharmacyName}>City Pharmacy</Text>
          <View style={styles.ratingRow}>
            <Star size={16} color="#FFD700" fill="#FFD700" />
            <Text style={styles.rating}>4.8</Text>
            <Text style={styles.ratingCount}>(150+ ratings)</Text>
          </View>
          <View style={styles.locationRow}>
            <MapPin size={16} color="#8E8E93" />
            <Text style={styles.location}>456 Health Ave, New York</Text>
            <Text style={styles.distance}>0.8 km</Text>
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

        <View style={styles.productsGrid}>
          {products.map((product) => (
            <View key={product.id} style={styles.productItem}>
              <Image source={product.image} style={styles.productImage} contentFit="cover" />
              <View style={styles.productInfo}>
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.productDescription} numberOfLines={2}>
                  {product.description}
                </Text>
                <View style={styles.productBottom}>
                  <Text style={styles.productPrice}>${product.price.toFixed(2)}</Text>
                  <Pressable
                    style={styles.cartButton}
                    onPress={() => addToCart({ ...product, quantity: 1 })}
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
  container: { 
    flex: 1, 
    backgroundColor: '#F2F2F7' 
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  content: { 
    flex: 1 
  },
  banner: { 
    height: 200, 
    position: 'relative' 
  },
  bannerImage: { 
    width: '100%', 
    height: '100%' 
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
    fontSize: 32, 
    color: '#FFFFFF', 
    fontWeight: 'bold' 
  },
  discountBadge: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
    justifyContent: 'center',
  },
  discountText: { 
    fontSize: 24, 
    color: '#FFFFFF', 
    fontWeight: 'bold' 
  },
  pharmacyInfo: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    marginBottom: 4,
  },
  pharmacyName: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 8 
  },
  ratingRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 6 
  },
  rating: { 
    fontSize: 14, 
    fontWeight: '600' 
  },
  ratingCount: { 
    fontSize: 14, 
    color: '#6B7280' 
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  location: { 
    fontSize: 14, 
    color: '#6B7280', 
    flex: 1 
  },
  distance: { 
    fontSize: 14, 
    color: '#6B7280' 
  },
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
  activeTab: { 
    backgroundColor: '#6B4EFF' 
  },
  categoryText: { 
    fontSize: 14, 
    color: '#8E8E93' 
  },
  activeText: { 
    color: '#FFFFFF', 
    fontWeight: '600' 
  },
  productsGrid: {
    padding: 16,
    gap: 16,
  },
  productItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    flexDirection: 'row',
    marginBottom: 16,
  },
  productImage: { 
    width: 100, 
    height: 100 
  },
  productInfo: { 
    flex: 1, 
    padding: 12 
  },
  productName: { 
    fontSize: 16, 
    fontWeight: '600', 
    marginBottom: 4 
  },
  productDescription: { 
    fontSize: 14, 
    color: '#6B7280', 
    marginBottom: 8 
  },
  productBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productPrice: { 
    fontSize: 16, 
    color: '#4CAF50', 
    fontWeight: 'bold' 
  },
  cartButton: {
    backgroundColor: '#F2F2F7',
    padding: 6,
    borderRadius: 8,
  },
});