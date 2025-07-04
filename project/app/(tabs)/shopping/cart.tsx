import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Pressable,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { X, Plus, Minus } from 'lucide-react-native';
import { CartContext } from '@/context/CartContext';

export default function CartScreen() {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    getTotal,
    getSubtotal,
  } = useContext(CartContext);

  const subtotal = getSubtotal();
  const discount = subtotal * 0.05;
  const shipping = 5;
  const total = subtotal - discount + shipping;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>My Cart</Text>

      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Pressable onPress={() => removeFromCart(item.id)} style={styles.remove}>
              <X size={18} color="#fff" />
            </Pressable>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.price}>${item.price}</Text>
              <TextInput placeholder="Notes" style={styles.note} />
            </View>
            <View style={styles.quantity}>
              <Pressable onPress={() => updateQuantity(item.id, item.quantity + 1)}>
                <Plus size={20} color="#6B4EFF" />
              </Pressable>
              <Text style={styles.qtyText}>{item.quantity}</Text>
              <Pressable onPress={() => updateQuantity(item.id, item.quantity - 1)}>
                <Minus size={20} color="#6B4EFF" />
              </Pressable>
            </View>
          </View>
        )}
      />

      <View style={styles.summary}>
        <View style={styles.row}>
          <Text style={styles.label}>Subtotal</Text>
          <Text style={styles.value}>${subtotal.toFixed(2)}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Discount</Text>
          <Text style={styles.value}>5%</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Shipping</Text>
          <Text style={styles.value}>$5.00</Text>
        </View>
        <View style={[styles.row, styles.totalRow]}>
          <Text style={styles.label}>Total</Text>
          <Text style={[styles.value, styles.total]}>${total.toFixed(2)}</Text>
        </View>
      </View>

      <Pressable style={styles.buyButton}>
        <Text style={styles.buyText}>BUY</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  title: {
    fontSize: 22,
    fontFamily: 'Inter-Bold',
    padding: 16,
    color: '#111827',
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
    marginRight: 12,
  },
  info: { flex: 1 },
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
  buyButton: {
    backgroundColor: '#6B4EFF',
    height: 48,
    borderRadius: 24,
    margin: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buyText: {
    color: '#FFFFFF',
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
  },
});
