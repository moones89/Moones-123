import { View, Text, ScrollView, StyleSheet, Pressable, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { Search, Bell, ShoppingCart, Heart } from 'lucide-react-native';

const categories = ['Food', 'Drink', 'Electronics', 'Cheese'];

const products = {
  'Ice cream': [
    {
      id: '1',
      name: 'Ice cream',
      description: 'This is ice cream which is made by spark pick',
      price: 50,
      originalPrice: 80,
      image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&auto=format',
    },
    {
      id: '2',
      name: 'Ice cream',
      description: 'This is ice cream which is made by spark pick',
      price: 50,
      originalPrice: 80,
      image: 'https://images.unsplash.com/photo-1488900128323-21503983a07e?w=800&auto=format',
    },
    {
      id: '3',
      name: 'Ice cream',
      description: 'This is ice cream which is made by spark pick',
      price: 50,
      originalPrice: 80,
      image: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=800&auto=format',
    },
    {
      id: '4',
      name: 'Ice cream',
      description: 'This is ice cream which is made by spark pick',
      price: 50,
      originalPrice: 80,
      image: 'https://images.unsplash.com/photo-1516559828984-fb3b99548b21?w=800&auto=format',
    },
  ],
};

const sections = ['Ice cream', 'Chicken', 'Coffee', 'Burger', 'Bread'];

export default function ShoppingScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <Search size={20} color="#8E8E93" style={styles.searchIcon} />
          <TextInput
            placeholder="Search..."
            style={styles.searchInput}
            placeholderTextColor="#8E8E93"
          />
        </View>
        <View style={styles.headerIcons}>
          <Bell size={24} color="#6B4EFF" style={styles.icon} />
          <Link href="/shopping/cart" asChild>
            <Pressable style={styles.walletContainer}>
              <ShoppingCart size={24} color="#6B4EFF" />
              <Text style={styles.walletAmount}>$1000</Text>
            </Pressable>
          </Link>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.promoContainer}>
          <Image
            source="https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=1200&auto=format"
            style={styles.promoImage}
            contentFit="cover"
          />
          <View style={styles.promoOverlay}>
            <Text style={styles.promoText}>50% OFF</Text>
            <Text style={styles.promoDescription}>on selected items</Text>
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

        {sections.map((section) => (
          <View key={section} style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>{section}</Text>
              <Link href={`/shopping/${section.toLowerCase()}`} asChild>
                <Pressable>
                  <Text style={styles.seeAll}>See All</Text>
                </Pressable>
              </Link>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.productRow}>
                {products['Ice cream']?.map((product) => (
                  <Pressable key={product.id} style={styles.productCard}>
                    <Image source={product.image} style={styles.productImage} contentFit="cover" />
                    <View style={styles.productInfo}>
                      <Text style={styles.productName}>{product.name}</Text>
                      <Text style={styles.productDescription} numberOfLines={2}>
                        {product.description}
                      </Text>
                      <View style={styles.priceRow}>
                        <View>
                          <Text style={styles.originalPrice}>${product.originalPrice}</Text>
                          <Text style={styles.price}>${product.price}</Text>
                        </View>
                        <Heart size={24} color="#8E8E93" />
                      </View>
                    </View>
                  </Pressable>
                ))}
              </View>
            </ScrollView>
          </View>
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
  scrollContent: {
    padding: 16,
  },
  promoContainer: {
    height: 200,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 24,
  },
  promoImage: {
    width: '100%',
    height: '100%',
  },
  promoOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  promoText: {
    color: '#FFFFFF',
    fontFamily: 'Inter-Bold',
    fontSize: 24,
  },
  promoDescription: {
    color: '#FFFFFF',
    fontFamily: 'Inter-Regular',
    fontSize: 16,
  },
  categories: {
    flexDirection: 'row',
    marginBottom: 24,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 4,
  },
  categoryTab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#6B4EFF',
    borderRadius: 6,
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
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: '#000000',
  },
  seeAll: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#6B4EFF',
  },
  productRow: {
    flexDirection: 'row',
    gap: 16,
  },
  productCard: {
    width: 200,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: 150,
  },
  productInfo: {
    padding: 12,
  },
  productName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    marginBottom: 4,
  },
  productDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#8E8E93',
    marginBottom: 8,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  originalPrice: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#8E8E93',
    textDecorationLine: 'line-through',
  },
  price: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#6B4EFF',
  },
});