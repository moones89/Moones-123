import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  ScrollView,
  FlatList,
  Dimensions,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { useLocalSearchParams, router } from 'expo-router';
import {
  Search,
  Heart,
  ShoppingCart,
  Star,
  ChevronDown,
  Menu,
} from 'lucide-react-native';
import { CartContext } from '../../../context/CartContext';

const filters = ['Ice cream', 'Vegetables', 'Fruits', 'Sweets'];

const products = Array.from({ length: 30 }).map((_, i) => ({
  id: `${i + 1}`,
  name: `Product ${i + 1}`,
  image:
    'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&auto=format',
  price: 50,
  rating: Math.floor(Math.random() * 5) + 1,
  type: filters[i % filters.length],
}));

export default function CategoryScreen() {
  const { category } = useLocalSearchParams();
  const decodedCategory = decodeURIComponent(category as string);
  const [selectedFilter, setSelectedFilter] = useState('Ice cream');
  const [searchQuery, setSearchQuery] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const { addToCart, cartItems } = useContext(CartContext);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesFilter =
      selectedFilter === 'All' || product.type === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Menu size={24} color="#FFFFFF" style={styles.menuIcon} />
        <TextInput
          placeholder="Search..."
          placeholderTextColor="#8E8E93"
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <Pressable
          style={styles.cartWrapper}
          onPress={() => router.push('/(tabs)/shopping/cart')}
        >
          <ShoppingCart size={24} color="#FFF" />
          {cartItems.length > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartCount}>{cartItems.length}</Text>
            </View>
          )}
        </Pressable>
      </View>

      <View style={styles.filterHeader}>
        <Pressable
          style={styles.menuButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.menuText}>Menu</Text>
          <ChevronDown size={16} color="#6B4EFF" />
        </Pressable>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterRow}
          contentContainerStyle={styles.filterRowContent}
        >
          {filters.map(filter => (
            <Pressable
              key={filter}
              onPress={() => setSelectedFilter(filter)}
              style={[
                styles.filterChip,
                selectedFilter === filter && styles.activeChip,
              ]}
            >
              <Text
                style={[
                  styles.filterText,
                  selectedFilter === filter && styles.activeFilterText,
                ]}
              >
                {filter}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={filteredProducts}
        keyExtractor={item => item.id}
        numColumns={3}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.productsGrid}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image
              source={item.image}
              style={styles.image}
              contentFit="cover"
            />
            <Pressable style={styles.heart}>
              <Heart size={16} color="#FF2D55" />
            </Pressable>
            <Text style={styles.title}>{item.name}</Text>
            <View style={styles.rowBetween}>
              <Text style={styles.price}>${item.price.toFixed(2)}</Text>
              <Pressable
                style={styles.cart}
                onPress={() => addToCart({ ...item, quantity: 1 })}
              >
                <ShoppingCart size={18} color="#6B4EFF" />
              </Pressable>
            </View>
            <View style={styles.rating}>
              <Star size={12} color="#FFD700" />
              <Text style={styles.ratingText}>
                {item.rating.toFixed(1)}
              </Text>
            </View>
          </View>
        )}
      />

      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {filters.map(filter => (
              <Pressable
                key={filter}
                style={styles.modalItem}
                onPress={() => {
                  setSelectedFilter(filter);
                  setModalVisible(false);
                }}
              >
                <Text style={styles.modalText}>{filter}</Text>
              </Pressable>
            ))}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const screenWidth = Dimensions.get('window').width;
const cardWidth = (screenWidth - 48) / 3;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F2F2F7' },
  header: {
    backgroundColor: '#6B4EFF',
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  menuIcon: {
    marginRight: 8,
  },
  searchInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 40,
    fontSize: 16,
    color: '#000',
    flex: 1,
  },
  cartWrapper: {
    marginLeft: 8,
    position: 'relative',
  },
  cartBadge: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: '#FF3B30',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartCount: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  filterHeader: {
    backgroundColor: '#FFFFFF',
    paddingTop: 10,
    paddingBottom: 4,
  },
  menuButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginLeft: 12,
    marginBottom: 8,
    gap: 4,
  },
  menuText: {
    color: '#6B4EFF',
    fontWeight: '600',
    fontSize: 14,
  },
  filterRow: {
    flexDirection: 'row',
  },
  filterRowContent: {
    paddingHorizontal: 8,
    gap: 4,
  },
  filterChip: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#F2F2F7',
  },
  activeChip: {
    backgroundColor: '#6B4EFF',
  },
  filterText: {
    color: '#8E8E93',
    fontSize: 14,
  },
  activeFilterText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  productsGrid: {
    padding: 12,
    paddingBottom: 100,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  card: {
    width: cardWidth,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 8,
    alignItems: 'center',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 80,
    borderRadius: 8,
    marginBottom: 4,
  },
  title: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: 4,
  },
  price: {
    color: '#FFD700',
    fontWeight: 'bold',
  },
  heart: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 2,
  },
  cart: {
    backgroundColor: '#F2F2F7',
    padding: 4,
    borderRadius: 8,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    gap: 4,
  },
  ratingText: {
    fontSize: 12,
    color: '#888',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 20,
  },
  modalItem: {
    paddingVertical: 12,
  },
  modalText: {
    fontSize: 16,
    fontWeight: '500',
  },
});
