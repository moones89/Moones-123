import { View, Text, ScrollView, StyleSheet, Pressable, TextInput, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, MapPin, Star } from 'lucide-react-native';

const properties = [
  {
    id: '1',
    title: '4 Room, 2 living room, 1 Bath',
    price: 5299,
    location: 'The Criterion, San Francisco',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=800&auto=format',
    description: 'Super Deluxe Super Deluxe Super Deluxe Super Deluxe Super Deluxe',
    rating: 5,
    type: 'Five Stars',
  },
  {
    id: '2',
    title: '3 Room, 2 living room, 2 Bath',
    price: 4986,
    location: 'The Criterion, San Francisco',
    image: 'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?q=80&w=800&auto=format',
    description: 'Super Deluxe Super Deluxe Super Deluxe Super Deluxe Super Deluxe',
    rating: 4,
    type: 'Four Stars',
  },
  {
    id: '3',
    title: '1 Bed, 1 Bath',
    price: 70855,
    location: 'The Criterion, San Francisco',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=800&auto=format',
    description: 'Super Deluxe Super Deluxe Super Deluxe Super Deluxe Super Deluxe',
    rating: 5,
    type: 'Five Stars',
  },
  {
    id: '4',
    title: '1 Bed, 1 Bath',
    price: 10800,
    location: 'The Criterion, San Francisco',
    image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?q=80&w=800&auto=format',
    description: 'Super Deluxe Super Deluxe Super Deluxe Super Deluxe Super Deluxe',
    rating: 4,
    type: 'Four Stars',
  },
];

const propertyTypes = ['Solo', 'Dual', 'Suite'];

export default function PropertiesScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <Search size={20} color="#8E8E93" style={styles.searchIcon} />
          <TextInput
            placeholder="Search properties..."
            style={styles.searchInput}
            placeholderTextColor="#8E8E93"
          />
        </View>
      </View>

      <View style={styles.filters}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {propertyTypes.map((type, index) => (
            <Pressable
              key={type}
              style={[styles.filterButton, index === 0 && styles.activeFilterButton]}>
              <Text style={[styles.filterText, index === 0 && styles.activeFilterText]}>{type}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      <ScrollView style={styles.content}>
        {['Five Stars', 'Four Stars', 'Three Stars'].map((category) => (
          <View key={category} style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>{category}</Text>
              <Pressable>
                <Text style={styles.viewAll}>View all</Text>
              </Pressable>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.propertyRow}>
                {properties
                  .filter((property) => property.type === category)
                  .map((property) => (
                    <Pressable key={property.id} style={styles.propertyCard}>
                      <Image source={{ uri: property.image }} style={styles.propertyImage} />
                      <View style={styles.propertyInfo}>
                        <View style={styles.priceRow}>
                          <Text style={styles.price}>${property.price.toLocaleString()}</Text>
                          <Star size={24} color="#FFD700" fill="#FFD700" />
                        </View>
                        <Text style={styles.propertyTitle}>{property.title}</Text>
                        <View style={styles.locationRow}>
                          <MapPin size={16} color="#8E8E93" />
                          <Text style={styles.location}>{property.location}</Text>
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
    padding: 16,
    backgroundColor: '#6B4EFF',
  },
  searchContainer: {
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
  filters: {
    backgroundColor: '#6B4EFF',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  filterButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginRight: 12,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  activeFilterButton: {
    backgroundColor: '#FFFFFF',
  },
  filterText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#FFFFFF',
  },
  activeFilterText: {
    color: '#6B4EFF',
  },
  content: {
    flex: 1,
    padding: 16,
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
  viewAll: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#6B4EFF',
  },
  propertyRow: {
    flexDirection: 'row',
    gap: 16,
  },
  propertyCard: {
    width: 280,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    marginRight: 16,
  },
  propertyImage: {
    width: '100%',
    height: 180,
  },
  propertyInfo: {
    padding: 12,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  price: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: '#6B4EFF',
  },
  propertyTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#000000',
    marginBottom: 8,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#8E8E93',
    marginLeft: 4,
  },
});