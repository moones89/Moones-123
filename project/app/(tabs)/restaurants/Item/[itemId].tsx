import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { ArrowLeft, Bell, ShoppingCart, Search } from 'lucide-react-native';
import { useRouter } from 'expo-router';

const defaultIngredients = ['Chicken', 'Garlic', 'Spices', 'Onions', 'Lemon'];

export default function MenuItemDetailScreen() {
  const router = useRouter();
  const [selectedIngredients, setSelectedIngredients] = useState([...defaultIngredients]);
  const [notes, setNotes] = useState('');

  const toggleIngredient = (item: string) => {
    if (selectedIngredients.includes(item)) {
      setSelectedIngredients(selectedIngredients.filter(i => i !== item));
    } else {
      setSelectedIngredients([...selectedIngredients, item]);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <ArrowLeft size={24} color="#fff" onPress={() => router.back()} />
        <View style={styles.searchBox}>
          <Search size={18} color="#8E8E93" />
          <TextInput
            placeholder="Search..."
            placeholderTextColor="#8E8E93"
            style={styles.searchInput}
          />
        </View>
        <Bell size={22} color="#fff" style={styles.headerIcon} />
        <ShoppingCart size={22} color="#fff" />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Dish image */}
        <Image
          source="https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=800"
          style={styles.image}
          contentFit="cover"
        />

        {/* Item details */}
        <View style={styles.details}>
          <Text style={styles.name}>Grilled Chicken</Text>
          <Text style={styles.price}>$50.00</Text>
          <Text style={styles.description}>
            Delicious grilled chicken with garlic, lemon, and secret spices. Served hot.
          </Text>

          {/* Ingredients */}
          <Text style={styles.sectionTitle}>Ingredients</Text>
          <View style={styles.ingredientsList}>
            {defaultIngredients.map(item => {
              const selected = selectedIngredients.includes(item);
              return (
                <Pressable
                  key={item}
                  onPress={() => toggleIngredient(item)}
                  style={[styles.ingredientChip, !selected && styles.ingredientChipUnselected]}>
                  <Text
                    style={[styles.ingredientText, !selected && styles.ingredientTextUnselected]}>
                    {item}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          {/* Notes */}
          <Text style={styles.sectionTitle}>Special Request</Text>
          <TextInput
            placeholder="Extra sauce, no onions, etc..."
            placeholderTextColor="#8E8E93"
            style={styles.notesInput}
            multiline
            value={notes}
            onChangeText={setNotes}
          />

          {/* Button */}
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Add to Cart</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6B4EFF',
    padding: 16,
    gap: 12,
  },
  searchBox: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 8,
    height: 36,
  },
  searchInput: {
    flex: 1,
    marginLeft: 6,
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  headerIcon: {
    marginLeft: 8,
  },

  content: {
    paddingBottom: 48,
  },
  image: {
    width: '100%',
    height: 200,
  },
  details: {
    padding: 16,
    gap: 12,
  },
  name: {
    fontSize: 22,
    fontFamily: 'Inter-Bold',
  },
  price: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#6B4EFF',
  },
  description: {
    fontSize: 14,
    color: '#6B7280',
    fontFamily: 'Inter-Regular',
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    marginTop: 12,
  },
  ingredientsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 4,
  },
  ingredientChip: {
    backgroundColor: '#F2F2F7',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  ingredientChipUnselected: {
    backgroundColor: '#E5E5EA',
  },
  ingredientText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
  },
  ingredientTextUnselected: {
    textDecorationLine: 'line-through',
    color: '#8E8E93',
  },
  notesInput: {
    backgroundColor: '#F9F9FB',
    borderRadius: 12,
    padding: 12,
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    borderColor: '#E5E7EB',
    borderWidth: 1,
    minHeight: 60,
  },
  button: {
    marginTop: 24,
    backgroundColor: '#2B4EFF',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontFamily: 'Inter-Bold',
    fontSize: 16,
  },
});
