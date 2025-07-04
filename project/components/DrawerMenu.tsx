import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import Animated, { 
  useAnimatedStyle, 
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { X, User, Wallet, ShoppingBag, Globe, Info } from 'lucide-react-native';

const menuItems = [
  { icon: User, label: 'My Account', href: '/profile/account' },
  { icon: Wallet, label: 'Wallet', href: '/profile/wallet' },
  { icon: ShoppingBag, label: 'Orders', href: '/profile/orders' },
  { icon: Globe, label: 'Language', href: '/profile/language' },
  { icon: Info, label: 'About app', href: '/profile/about' },
];

interface DrawerMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DrawerMenu({ isOpen, onClose }: DrawerMenuProps) {
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withTiming(isOpen ? 0 : -300, {
            duration: 300,
            easing: Easing.bezier(0.25, 0.1, 0.25, 1),
          }),
        },
      ],
    };
  });

  // Trap focus for accessibility (web)
  React.useEffect(() => {
    if (isOpen && typeof window !== 'undefined') {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onClose]);

  return (
    <Animated.View style={[styles.container, animatedStyle]} accessibilityViewIsModal={true}>
      <SafeAreaView style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Menu</Text>
          <Pressable
            onPress={onClose}
            style={styles.closeButton}
            accessibilityRole="button"
            accessibilityLabel="Close menu"
          >
            <X size={24} color="#000000" />
          </Pressable>
        </View>

        <View style={styles.menu}>
          {menuItems.map((item) => (
            <Link key={item.href} href={item.href as Href} asChild>
              <Pressable
                style={styles.menuItem}
                onPress={onClose}
                accessibilityRole="button"
                accessibilityLabel={`Go to ${item.label}`}
              >
                <item.icon size={24} color="#6B4EFF" />
                <Text style={styles.menuItemText}>{item.label}</Text>
              </Pressable>
            </Link>
          ))}
        </View>
      </SafeAreaView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: 300,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 1000,
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
  },
  closeButton: {
    padding: 8,
  },
  menu: {
    padding: 16,
    gap: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#F8F9FA',
  },
  menuItemText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    marginLeft: 16,
    color: '#1A1A1A',
  },
});