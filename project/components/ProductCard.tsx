import { useContext } from 'react';
import { CartContext } from '../context/CartContext'; // Adjust the path as needed
import { View, Text, StyleSheet, Pressable, ViewStyle } from 'react-native';
import { Image } from 'expo-image';
import { FontAwesome } from '@expo/vector-icons'; // Ensure FontAwesome is imported for icons

export interface ProductProps {
  id: string;
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  description?: string;
  discount?: number;
  rating?: number;
}

interface ProductCardProps {
  product: ProductProps;
  onPress?: () => void;
  showDiscount?: boolean;
  showRating?: boolean;
  showAddToCart?: boolean;
  containerStyle?: ViewStyle;
  horizontal?: boolean;
}

export default function ProductCard({
  product,
  onPress,
  showDiscount = true,
  showRating = true,
  showAddToCart = true,
  containerStyle,
  horizontal = false,
}: ProductCardProps) {
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      image: product.image,
      price: product.price,
      quantity: 1,
    });
    // Optionally: show feedback to user (toast/snackbar)
  };

  return (
    <Pressable 
      style={[
        styles.container, 
        horizontal ? styles.horizontalContainer : styles.verticalContainer,
        containerStyle
      ]}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`View details for ${product.name}, price ${product.price.toFixed(2)}`}
    >
      <View style={horizontal ? styles.horizontalImageContainer : styles.imageContainer}>
        <Image source={product.image} style={styles.image} contentFit="cover" />
        
        {showDiscount && product.discount && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>{product.discount}% OFF</Text>
          </View>
        )}
        
        <FontAwesome name="heart" size={16} color="#FF2D55" accessibilityLabel="Favorite" />
      </View>
      
      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={1}>{product.name}</Text>
        
        {product.description && (
          <Text style={styles.description} numberOfLines={2}>
            {product.description}
          </Text>
        )}
        
        <View style={styles.footer}>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>${product.price.toFixed(2)}</Text>
            {product.originalPrice && (
              <Text style={styles.originalPrice}>${product.originalPrice.toFixed(2)}</Text>
            )}
          </View>
          
          {showRating && product.rating && (
            <View style={styles.rating}>
              <FontAwesome name="star" size={12} color="#FFD700" />
              <Text style={styles.ratingText}>{product.rating.toFixed(1)}</Text>
            </View>
          )}
          
          {showAddToCart && (
            <Pressable
              style={styles.cartButton}
              onPress={handleAddToCart}
              accessibilityRole="button"
              accessibilityLabel={`Add ${product.name} to cart, price ${product.price.toFixed(2)}`}
            >
              <FontAwesome name="shopping-cart" size={18} color="#6B4EFF" />
            </Pressable>
          )}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  // Removed duplicate and misplaced styles
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  verticalContainer: {
    width: 200,
  },
  horizontalContainer: {
    flexDirection: 'row',
    width: '100%',
  },
  imageContainer: {
    width: '100%',
    height: 150,
    position: 'relative',
  },
  horizontalImageContainer: {
    width: 100,
    height: 100,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  discountBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#FF3B30',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  discountText: {
    color: '#FFFFFF',
    fontFamily: 'Inter-Bold',
    fontSize: 12,
  },
  heartButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 4,
  },
  content: {
    padding: 12,
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#8E8E93',
    marginBottom: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  price: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#6B4EFF',
  },
  originalPrice: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#8E8E93',
    textDecorationLine: 'line-through',
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#8E8E93',
  },
  cartButton: {
    backgroundColor: '#F2F2F7',
    padding: 6,
    borderRadius: 8,
  },
});