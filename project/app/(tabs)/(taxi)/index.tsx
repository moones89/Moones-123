import { 
  View, Text, StyleSheet, TextInput, Pressable, Platform 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Search, MapPin, Navigation } from 'lucide-react-native';
import GoogleMapReact from 'google-map-react';

const taxis = [
  { id: '1', latitude: 48.8566, longitude: 2.3522, type: 'taxi' },
  { id: '2', latitude: 48.8576, longitude: 2.3532, type: 'taxi' },
  { id: '3', latitude: 48.8586, longitude: 2.3512, type: 'taxi' },
];

const TaxiMarker = ({ lat, lng }: { lat: number; lng: number }) => (
  <View style={styles.taxiMarker}>
    <View style={styles.taxiDot} />
  </View>
);

export default function TaxiScreen() {
  const MapComponent = () => {
    if (Platform.OS === 'web') {
      return (
        <div style={{ height: '100%', width: '100%' }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: 'YOUR_GOOGLE_MAPS_API_KEY' }} // Ensure API Key is provided
            defaultCenter={{ lat: 48.8566, lng: 2.3522 }}
            defaultZoom={14}
          >
            {taxis.map((taxi) => (
              <TaxiMarker key={taxi.id} lat={taxi.latitude} lng={taxi.longitude} />
            ))}
          </GoogleMapReact>
        </div>
      );
    }

    return (
      <View style={styles.mapPlaceholder}>
        <Text>Map is only available on the web platform</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchBar}>
        <View style={styles.locationInputs}>
          <View style={styles.inputContainer}>
            <MapPin size={20} color="#8E8E93" />
            <TextInput
              placeholder="Your location"
              style={styles.input}
              placeholderTextColor="#8E8E93"
            />
          </View>
          <View style={styles.inputDivider} />
          <View style={styles.inputContainer}>
            <Navigation size={20} color="#8E8E93" />
            <TextInput
              placeholder="Where to?"
              style={styles.input}
              placeholderTextColor="#8E8E93"
            />
          </View>
        </View>
      </View>

      <View style={styles.mapContainer}>
        <MapComponent />
      </View>

      <View style={styles.bookingPanel}>
        <View style={styles.tripInfo}>
          <View style={styles.priceDistance}>
            <Text style={styles.price}>$150 - 200</Text>
            <Text style={styles.distance}>2.7 Km</Text>
          </View>

          <View style={styles.bookingOptions}>
            <Pressable style={styles.optionButton}>
              <Text style={styles.optionLabel}>Number of people</Text>
              <View style={styles.optionValue}>
                <Text style={styles.optionText}>1 - 4</Text>
                <Text style={styles.optionArrow}>▼</Text>
              </View>
            </Pressable>

            <Pressable style={styles.optionButton}>
              <Text style={styles.optionLabel}>Payment method</Text>
              <View style={styles.optionValue}>
                <Text style={styles.optionText}>Card</Text>
                <Text style={styles.optionArrow}>▼</Text>
              </View>
            </Pressable>

            <Pressable style={styles.optionButton}>
              <Text style={styles.optionLabel}>Select type car</Text>
              <View style={styles.optionValue}>
                <Text style={styles.optionText}>Small</Text>
                <Text style={styles.optionArrow}>▼</Text>
              </View>
            </Pressable>

            <Pressable 
              style={styles.confirmButton}
              onPress={() => router.push('/booking')}>
              <Text style={styles.confirmText}>Confirm</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  searchBar: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  locationInputs: {
    backgroundColor: '#F2F2F7',
    borderRadius: 12,
    padding: 12,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  input: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
  },
  inputDivider: {
    height: 1,
    backgroundColor: '#E5E5EA',
    marginVertical: 8,
  },
  mapContainer: {
    flex: 1,
  },
  mapPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F2F2F7',
  },
  taxiMarker: {
    width: 40,
    height: 40,
    backgroundColor: '#FFD700',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  taxiDot: {
    width: 24,
    height: 24,
    backgroundColor: '#000000',
    borderRadius: 12,
  },
  bookingPanel: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    elevation: 5, // Replacing deprecated shadow* styles
  },
  tripInfo: {
    gap: 16,
  },
  priceDistance: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
  },
  distance: {
    fontSize: 16,
    color: '#8E8E93',
  },
  bookingOptions: {
    gap: 12,
  },
  optionButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F2F2F7',
    borderRadius: 8,
    padding: 12,
  },
  optionLabel: {
    fontSize: 14,
    color: '#8E8E93',
  },
  optionValue: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  optionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
  },
  optionArrow: {
    fontSize: 12,
    color: '#8E8E93',
  },
  confirmButton: {
    backgroundColor: '#1a237e',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  confirmText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
