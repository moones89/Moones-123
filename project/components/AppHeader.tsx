import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  ViewStyle,
  TextStyle,
  Alert,
} from 'react-native';
import { Bell, ShoppingCart, Search } from 'lucide-react-native';
import { Link } from 'expo-router';
import { useContext } from 'react';
import { CartContext } from '@/context/CartContext';
import NotificationList from './NotificationList';

interface AppHeaderProps {
  title?: string;
  showSearch?: boolean;
  showCart?: boolean;
  showNotifications?: boolean;
  searchPlaceholder?: string;
  onSearchChange?: (text: string) => void;
  searchValue?: string;
  walletAmount?: string;
  containerStyle?: ViewStyle;
  titleStyle?: TextStyle;
  rightContent?: React.ReactNode;
}

export default function AppHeader({
  title,
  showSearch = true,
  showCart = true,
  showNotifications = true,
  searchPlaceholder = 'Search...',
  onSearchChange,
  searchValue = '',
  // For real use, fetch walletAmount from user context or API
  walletAmount = '$1000',
  containerStyle,
  titleStyle,
  rightContent,
}: AppHeaderProps) {
  const { cartItems } = useContext(CartContext);
  const [notifVisible, setNotifVisible] = useState(false);
  
  return (
    <View>
      <View style={[styles.header, containerStyle]}>
        {title && <Text style={[styles.title, titleStyle]}>{title}</Text>}
        
        {showSearch && (
          <View style={styles.searchContainer}>
            <Search size={20} color="#8E8E93" style={styles.searchIcon} />
            <TextInput
              placeholder={searchPlaceholder}
              style={styles.searchInput}
              placeholderTextColor="#8E8E93"
              value={searchValue}
              onChangeText={onSearchChange}
              accessibilityLabel="Search input"
            />
          </View>
        )}
        
        <View style={styles.headerIcons}>
          {showNotifications && (
            <Pressable
              onPress={() => setNotifVisible(true)}
              accessibilityLabel="Open notifications"
              accessibilityRole="button"
            >
              <Bell size={24} color="#6B4EFF" style={styles.icon} />
            </Pressable>
          )}
          
          {showCart && (
            <Link href="/shopping/cart" asChild>
              <Pressable
                style={styles.walletContainer}
                accessibilityRole="button"
                accessibilityLabel={`Open cart${cartItems.length > 0 ? `, ${cartItems.length} items` : ''}`}
              >
                <ShoppingCart size={24} color="#6B4EFF" />
                {cartItems.length > 0 && (
                  <View style={styles.cartBadge}>
                    <Text style={styles.cartCount}>{cartItems.length}</Text>
                  </View>
                )}
                <Text style={styles.walletAmount}>{walletAmount}</Text>
              </Pressable>
            </Link>
          )}
          
          {rightContent}
        </View>
      </View>
      <NotificationList visible={notifVisible} onClose={() => setNotifVisible(false)} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#6B4EFF',
  },
  title: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginRight: 16,
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
    position: 'relative',
  },
  walletAmount: {
    marginLeft: 4,
    color: '#FFFFFF',
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
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
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
});