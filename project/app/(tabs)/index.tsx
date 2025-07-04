import { View, Text, ScrollView, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import AppHeader from '@/components/AppHeader';
import ProductCard from '@/components/ProductCard';
import AdvertisementSlider from '@/components/AdvertisementSlider';
import { homeAdvertisements } from '@/components/advertisements';
import { Category, Product } from '@/types';
import { navigateToTab, navigateToSupermarket } from '@/utils/navigation';

const categories: Category[] = [
  { id: 'restaurants', title: 'Restaurants', icon: '🍽️' },
  { id: 'hotels', title: 'Hotels', icon: '🏨' },
  { id: 'taxi', title: 'Taxi & Delivery', icon: '🚗' },
  { id: 'events', title: 'Events', icon: '📅' },
  { id: 'supermarket', title: 'SuperMarket', icon: '🛒' },
  { id: 'pharmacies', title: 'Pharmacies', icon: '💊' },
  { id: 'properties', title: 'Properties', icon: '🏠' },
  { id: 'other-store', title: 'Other Store', icon: '🏪' },
];

const discountProducts: Product[] = [
  {
    id: '1',
    name: 'Ice cream',
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&auto=format',
    price: 50.00,
    originalPrice: 60.00,
    discount: 20,
  },
  {
    id: '2',
    name: 'Chocolate Ice cream',
    image: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=800&auto=format',
    price: 45.00,
    originalPrice: 55.00,
    discount: 18,
  },
  {
    id: '3',
    name: 'Vanilla Ice cream',
    image: 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=800&auto=format',
    price: 40.00,
    originalPrice: 50.00,
    discount: 20,
  },
];

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleCategoryPress = (categoryId: string) => {
    navigateToTab(categoryId as any);
  };

  const handleProductPress = (productId: string) => {
    navigateToSupermarket('products', { category: productId });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <AppHeader 
        showSearch={true}
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Search products, stores..."
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Advertisement Slider */}
        <View style={styles.sliderContainer}>
          <AdvertisementSlider
            advertisements={homeAdvertisements}
            height={200}
            autoPlayInterval={5000}
          />
        </View>

        {/* Categories */}
        <Text style={styles.sectionTitle}>Categories</Text>
        <View style={styles.categoriesGrid}>
          {categories.map((category) => (
            <Pressable
              key={category.id}
              style={styles.categoryCard}
              onPress={() => handleCategoryPress(category.id)}
            >
              <Text style={styles.categoryIcon}>{category.icon}</Text>
              <Text style={styles.categoryTitle}>{category.title}</Text>
            </Pressable>
          ))}
        </View>

        {/* Supermarket Discounts */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Discounts Supermarket</Text>
            <Pressable onPress={() => navigateToTab('supermarket')}>
              <Text style={styles.viewAll}>View all</Text>
            </Pressable>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.productsRow}>
              {discountProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onPress={() => handleProductPress(product.id)}
                  containerStyle={styles.productCardContainer}
                />
              ))}
            </View>
          </ScrollView>
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
  scrollContent: {
    padding: 16,
  },
  sliderContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#000000',
    marginBottom: 16,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 16,
    columnGap: 8,
    marginBottom: 32,
  },
  categoryCard: {
    width: '22%',
    aspectRatio: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  categoryIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  categoryTitle: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
    color: '#000000',
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  viewAll: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#6B4EFF',
  },
  productsRow: {
    flexDirection: 'row',
    gap: 16,
    paddingBottom: 8,
  },
  productCardContainer: {
    width: 200,
    marginRight: 4,
  },
});
