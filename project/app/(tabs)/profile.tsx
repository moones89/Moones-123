import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, Href } from 'expo-router';
import { ChevronRight } from 'lucide-react-native';

const menuItems: Array<{ title: string; href: Href }> = [
  { title: 'My account', href: '/profile/account' as Href },
  { title: 'Payments', href: '/profile/payments' as Href },
  { title: 'Occasions', href: '/profile/occasions' as Href },
  { title: 'My occasions', href: '/profile/my-occasions' as Href },
  { title: 'My Order', href: '/profile/orders' as Href },
  { title: 'Shopping', href: '/shop' as Href },
  { title: 'Upgrade', href: '/profile/upgrade' as Href },
  { title: 'Language', href: '/profile/language' as Href },
  { title: 'About app', href: '/profile/about' as Href },
];

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.profile}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=200&auto=format' }}
            style={styles.avatar}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.name}>David Spade</Text>
            <Text style={styles.email}>iamdavid@gmail.com</Text>
          </View>
        </View>
        <View style={styles.stats}>
          <View style={styles.stat}>
            <Text style={styles.statLabel}>Wallet</Text>
            <Text style={styles.statValue}>$ 500</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statLabel}>Points</Text>
            <Text style={styles.statValue}>10000</Text>
          </View>
        </View>
      </View>

      <View style={styles.menu}>
        {menuItems.map((item, index) => (
          <Link key={item.title} href={item.href} asChild>
            <Pressable style={styles.menuItem}>
              <Text style={styles.menuItemText}>{item.title}</Text>
              <ChevronRight size={20} color="#8E8E93" />
            </Pressable>
          </Link>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  header: {
    backgroundColor: '#6B4EFF',
    padding: 24,
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#FFFFFF',
  },
  profileInfo: {
    marginLeft: 16,
  },
  name: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 20,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  email: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.8,
  },
  stats: {
    flexDirection: 'row',
    gap: 24,
  },
  stat: {
    flex: 1,
  },
  statLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.8,
    marginBottom: 4,
  },
  statValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#FFFFFF',
  },
  menu: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  menuItemText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#000000',
  },
});