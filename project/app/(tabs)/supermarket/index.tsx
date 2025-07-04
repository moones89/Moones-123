import { View, Text, StyleSheet, FlatList, TextInput, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { ChevronDown } from 'lucide-react-native';

const supermarkets = [
  {
    id: '1',
    name: 'Supermarket 1',
    description: 'This is pizza which is made by spark pick',
    image: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092',
    rating: 4.0,
  },
  {
    id: '2',
    name: 'Supermarket 2',
    description: 'This is pizza which is made by spark pick',
    image: 'https://images.unsplash.com/photo-1576866209830-654d63fcfab1',
    rating: 4.0,
  },
  {
    id: '3',
    name: 'Supermarket 3',
    description: 'This is pizza which is made by spark pick',
    image: 'https://images.unsplash.com/photo-1576866211947-e0adf9537f2e',
    rating: 4.0,
  },
];

export default function SupermarketListScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      {/* Filter Row */}
      <View style={styles.searchRow}>
        <TextInput placeholder="Search filter" style={styles.searchInput} placeholderTextColor="#888" />
        <Pressable style={styles.dropdown}><Text>Country</Text><ChevronDown size={16} /></Pressable>
        <Pressable style={styles.dropdown}><Text>ONLINE</Text><ChevronDown size={16} /></Pressable>
      </View>

      {/* Supermarket Cards */}
      <FlatList
        data={supermarkets}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => router.push(`/supermarket/${item.id}`)}
            style={styles.card}
          >
            <Image source={item.image} style={styles.image} contentFit="cover" />
            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.desc}>{item.description}</Text>
              <Text style={styles.rating}>⭐ {item.rating.toFixed(1)}</Text>
            </View>
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  searchRow: {
    flexDirection: 'row',
    padding: 12,
    gap: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#F2F2F7',
    paddingHorizontal: 12,
    height: 40,
    borderRadius: 8,
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#F2F2F7',
    borderRadius: 8,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 2,
  },
  image: {
    width: 120,
    height: 120,
  },
  info: {
    flex: 1,
    padding: 12,
  },
  name: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    marginBottom: 4,
  },
  desc: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginBottom: 8,
  },
  rating: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#f59e0b',
  },
});
