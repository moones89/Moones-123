import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Pressable,
  TextInput,
  SafeAreaView,
  Alert,
  Modal,
} from 'react-native';
import { X, Plus, Minus } from 'lucide-react-native';
import { CartContext } from '@/context/CartContext';
import { CartItem } from '@/types';
import { CART_DISCOUNT_RATE, CART_SHIPPING_FEE } from '@/utils/constants';

export default function CartScreen(): JSX.Element {
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    updateNote,
    getSubtotal, 
    getTotal, 
    clearCart 
  } = useContext(CartContext);

  const handleQuantityChange = (id: string, change: number) => {
    const item = cartItems.find(item => item.id === id);
    if (item) {
      const newQuantity = item.quantity + change;
      if (newQuantity >= 1) {
        updateQuantity(id, newQuantity);
      } else {
        Alert.alert('Minimum Quantity', 'You cannot have less than 1 item.');
      }
    }
  };

  const subtotal = getSubtotal();
  const total = getTotal();
  const [checkoutVisible, setCheckoutVisible] = React.useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>My cart</Text>

      {cartItems.length === 0 ? (
        <View style={styles.emptyCart}>
          <Text style={styles.emptyCartText}>Your cart is empty</Text>
        </View>
      ) : (
        <FlatList
          data={cartItems}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingHorizontal: 16 }}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Pressable
                onPress={() => removeFromCart(item.id)}
                style={styles.remove}
                accessibilityRole="button"
                accessibilityLabel={`Remove ${item.name} from cart`}
              >
                <X size={18} color="#fff" />
              </Pressable>
              <Image source={{ uri: item.image }} style={styles.image} />
              <View style={styles.info}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.price}>${item.price}</Text>
                <TextInput
                  placeholder="Notes"
                  style={styles.note}
                  value={item.note || ''}
                  onChangeText={text => updateNote(item.id, text)}
                  accessibilityLabel={`Notes for ${item.name}`}
                />
              </View>
              <View style={styles.quantity}>
                <Pressable
                  onPress={() => handleQuantityChange(item.id, 1)}
                  accessibilityRole="button"
                  accessibilityLabel={`Increase quantity of ${item.name}`}
                >
                  <Plus size={20} color="#6B4EFF" />
                </Pressable>
                <Text style={styles.qtyText}>{item.quantity}</Text>
                <Pressable
                  onPress={() => handleQuantityChange(item.id, -1)}
                  accessibilityRole="button"
                  accessibilityLabel={`Decrease quantity of ${item.name}`}
                >
                  <Minus size={20} color="#6B4EFF" />
                </Pressable>
              </View>
            </View>
          )}
        />
      )}

      {cartItems.length > 0 && (
        <View>
          <View style={styles.summary}>
            <View style={styles.row}>
              <Text style={styles.label}>Subtotal</Text>
              <Text style={styles.value}>${subtotal.toFixed(2)}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Discount</Text>
              <Text style={styles.value}>{CART_DISCOUNT_RATE * 100}%</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Shipping</Text>
              <Text style={styles.value}>${CART_SHIPPING_FEE.toFixed(2)}</Text>
            </View>
            <View style={[styles.row, styles.totalRow]}>
              <Text style={styles.label}>Total</Text>
              <Text style={[styles.value, styles.total]}>${total.toFixed(2)}</Text>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <Pressable
              style={styles.clearButton}
              onPress={clearCart}
              accessibilityRole="button"
              accessibilityLabel="Clear cart"
            >
              <Text style={styles.clearText}>CLEAR</Text>
            </Pressable>
            <Pressable
              style={styles.buyButton}
              onPress={() => setCheckoutVisible(true)}
              accessibilityRole="button"
              accessibilityLabel="Proceed to checkout"
            >
              <Text style={styles.buyText}>CHECKOUT</Text>
            </Pressable>
          </View>
        </View>
      )}
    <Modal visible={checkoutVisible} animationType="slide" transparent>
        <View style={modalStyles.overlay}>
          <View style={modalStyles.container}>
            <Text style={modalStyles.title}>Checkout</Text>
            <Text style={modalStyles.text}>This is a placeholder for the checkout flow.</Text>
            <Pressable
              style={modalStyles.closeButton}
              onPress={() => setCheckoutVisible(false)}
              accessibilityRole="button"
              accessibilityLabel="Close checkout modal"
            >
              <Text style={modalStyles.closeText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 22,
    fontFamily: 'Inter-Bold',
    padding: 16,
    color: '#111827',
  },
  emptyCart: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyCartText: {
    fontSize: 18,
    fontFamily: 'Inter-Medium',
    color: '#8E8E93',
    textAlign: 'center',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 12,
    position: 'relative',
  },
  remove: {
    position: 'absolute',
    left: -12,
    top: -12,
    backgroundColor: '#EF4444',
    borderRadius: 12,
    padding: 4,
    zIndex: 10,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },

  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 4,
  },
  price: {
    fontSize: 14,
    color: '#6B7280',
  },
  note: {
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    fontSize: 12,
    marginTop: 4,
    color: '#6B7280',
  },
  quantity: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  qtyText: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    marginVertical: 4,
  },
  summary: {
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  clearText: {
    color: '#6B7280',
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#111827',
  },
  value: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
  },
  totalRow: {
    marginTop: 8,
  },
  total: {
    fontFamily: 'Inter-Bold',
    color: '#6B4EFF',
  },
  buttonContainer: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },
  buyButton: {
    backgroundColor: '#6B4EFF',
    height: 48,
    borderRadius: 24,
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearButton: {
    backgroundColor: '#F3F4F6',
    height: 48,
    borderRadius: 24,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buyText: {
    color: '#FFFFFF',
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
  },
});

const modalStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  title: {
    fontSize: 22,
    fontFamily: 'Inter-Bold',
    marginBottom: 12,
  },
  text: {
    fontSize: 16,
    color: '#333',
    marginBottom: 24,
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: '#6B4EFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  closeText: {
    color: '#fff',
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
  },
});