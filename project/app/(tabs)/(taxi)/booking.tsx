import { View, Text, StyleSheet, Pressable, Image, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Phone, Star } from 'lucide-react-native';
import GoogleMapReact from 'google-map-react';

const driverInfo = {
  name: 'James Wheeler',
  phone: '+88556-666544',
  rating: 4.8,
  car: {
    type: 'BMW',
    color: 'Black',
    plate: '8965-56',
  },
  avatar: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=200&auto=format',
};

const TaxiMarker = () => (
  <View style={styles.taxiMarker}>
    <View style={styles.taxiDot} />
  </View>
);

export default function BookingScreen() {
  const MapComponent = () => {
    if (Platform.OS === 'web') {
      return (
        <div style={{ height: '100%', width: '100%' }}>
          <GoogleMapReact
            defaultCenter={{
              lat: 48.8566,
              lng: 2.3522
            }}
            defaultZoom={14}
          >
            <TaxiMarker
              lat={48.8566}
              lng={2.3522}
            />
          </GoogleMapReact>
        </div>
      );
    }
    
    return (
      <View style={styles.mapPlaceholder}>
        <Text>Map is only available on web platform</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mapContainer}>
        <MapComponent />
      </View>

      <View style={styles.driverPanel}>
        <View style={styles.driverInfo}>
          <Image source={{ uri: driverInfo.avatar }} style={styles.avatar} />
          <View style={styles.details}>
            <Text style={styles.name}>{driverInfo.name}</Text>
            <View style={styles.ratingContainer}>
              <Star size={16} color="#FFD700" fill="#FFD700" />
              <Text style={styles.rating}>{driverInfo.rating}</Text>
            </View>
            <Text style={styles.phone}>{driverInfo.phone}</Text>
          </View>
          <Pressable style={styles.callButton}>
            <Phone size={20} color="#FFFFFF" />
            <Text style={styles.callText}>Call</Text>
          </Pressable>
        </View>

        <View style={styles.carInfo}>
          <View style={styles.carDetail}>
            <Text style={styles.label}>Type car</Text>
            <Text style={styles.value}>{driverInfo.car.type}</Text>
          </View>
          <View style={styles.carDetail}>
            <Text style={styles.label}>Color car</Text>
            <Text style={styles.value}>{driverInfo.car.color}</Text>
          </View>
          <View style={styles.carDetail}>
            <Text style={styles.label}>Plate Number</Text>
            <Text style={styles.value}>{driverInfo.car.plate}</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
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
  driverPanel: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
  },
  driverInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  details: {
    flex: 1,
    marginLeft: 12,
  },
  name: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  rating: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    marginLeft: 4,
  },
  phone: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#8E8E93',
  },
  callButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a237e',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 8,
  },
  callText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#FFFFFF',
  },
  carInfo: {
    marginTop: 16,
    gap: 12,
  },
  carDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#8E8E93',
  },
  value: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#000000',
  },
});