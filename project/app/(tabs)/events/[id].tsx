import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { useLocalSearchParams, router } from 'expo-router';
import { ArrowLeft, MapPin, Calendar, Clock } from 'lucide-react-native';

const eventDetails = {
  id: '1',
  title: 'Rock Night',
  image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&auto=format',
  description: 'Join us for an amazing night of rock music featuring local bands and special guests.',
  date: 'SAT, JUN 15',
  endDate: 'TUE, JUN 25',
  time: '7:30 PM - 11:00 PM',
  location: 'The Criterion, San Francisco',
  distance: '1.7 KM',
  going: '1.2K',
  levels: [
    { id: 1, name: 'Level 1', price: 200, description: 'Standard admission with general seating' },
    { id: 2, name: 'Level 2', price: 150, description: 'Balcony seating with great views' },
    { id: 3, name: 'Level 3', price: 300, description: 'VIP access with premium seating and perks' },
  ],
};

export default function EventDetailsScreen() {
  const { id } = useLocalSearchParams();
  const [selectedLevel, setSelectedLevel] = React.useState<number | null>(null);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Image source={eventDetails.image} style={styles.coverImage} contentFit="cover" />
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft size={24} color="#FFFFFF" />
        </Pressable>

        <View style={styles.content}>
          <Text style={styles.title}>{eventDetails.title}</Text>

          <View style={styles.infoRow}>
            <Calendar size={20} color="#8E8E93" />
            <Text style={styles.infoText}>
              {eventDetails.date} - {eventDetails.endDate}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Clock size={20} color="#8E8E93" />
            <Text style={styles.infoText}>{eventDetails.time}</Text>
          </View>

          <View style={styles.infoRow}>
            <MapPin size={20} color="#8E8E93" />
            <Text style={styles.infoText}>{eventDetails.location}</Text>
          </View>

          <Text style={styles.sectionTitle}>Choose your level</Text>

          {eventDetails.levels.map((level) => (
            <Pressable
              key={level.id}
              style={[styles.levelCard, selectedLevel === level.id && styles.selectedLevel]}
              onPress={() => setSelectedLevel(level.id)}>
              <View style={styles.radioButton}>
                {selectedLevel === level.id && <View style={styles.radioButtonSelected} />}
              </View>
              <View style={styles.levelInfo}>
                <Text style={styles.levelName}>{level.name}</Text>
                <Text style={styles.levelDescription}>{level.description}</Text>
              </View>
              <Text style={styles.levelPrice}>${level.price}</Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Pressable
          style={[styles.addButton, !selectedLevel && styles.addButtonDisabled]}
          disabled={!selectedLevel}>
          <Text style={styles.addButtonText}>ADD</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  coverImage: {
    width: '100%',
    height: 300,
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    padding: 16,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#8E8E93',
    marginLeft: 8,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 20,
    marginTop: 24,
    marginBottom: 16,
  },
  levelCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  selectedLevel: {
    borderColor: '#6B4EFF',
    borderWidth: 2,
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#6B4EFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonSelected: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#6B4EFF',
  },
  levelInfo: {
    flex: 1,
    marginLeft: 12,
  },
  levelName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    marginBottom: 4,
  },
  levelDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#8E8E93',
  },
  levelPrice: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#6B4EFF',
    marginLeft: 12,
  },
  footer: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
  },
  addButton: {
    backgroundColor: '#6B4EFF',
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonDisabled: {
    backgroundColor: '#E5E5EA',
  },
  addButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
});