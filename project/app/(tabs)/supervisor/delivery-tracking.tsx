import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, MapPin, Phone, MessageSquare, Clock, TriangleAlert as AlertTriangle, Bell } from 'lucide-react-native';
import GoogleMapReact from 'google-map-react';

const deliveryPersonnel = [
  {
    id: '1',
    name: 'John Smith',
    status: 'Active',
    location: { lat: 48.8566, lng: 2.3522 },
    currentOrder: '#ORD-001',
    phone: '+1 234-567-8900',
    expectedDelivery: '14:30',
    estimatedArrival: '14:45',
    isDelayed: true,
    delayTime: '15 mins',
    notificationSent: false,
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    status: 'Active',
    location: { lat: 48.8576, lng: 2.3532 },
    currentOrder: '#ORD-002',
    phone: '+1 234-567-8901',
    expectedDelivery: '14:15',
    estimatedArrival: '14:10',
    isDelayed: false,
    notificationSent: false,
  },
  {
    id: '3',
    name: 'Mike Wilson',
    status: 'Break',
    location: { lat: 48.8586, lng: 2.3512 },
    currentOrder: '#ORD-003',
    phone: '+1 234-567-8902',
    expectedDelivery: '14:45',
    estimatedArrival: '14:40',
    isDelayed: false,
    notificationSent: false,
  },
];

const DeliveryMarker = ({ name, isDelayed }: { name: string; isDelayed: boolean }) => (
  <View style={styles.marker}>
    <View style={[styles.markerDot, isDelayed && styles.delayedMarkerDot]} />
    <Text style={styles.markerText}>{name}</Text>
  </View>
);

const NotificationBadge = ({ count }: { count: number }) => (
  count > 0 ? (
    <View style={styles.notificationBadge}>
      <Text style={styles.notificationText}>{count}</Text>
    </View>
  ) : null
);

export default function DeliveryTrackingScreen() {
  const [selectedPerson, setSelectedPerson] = useState(deliveryPersonnel[0]);
  const [notifications, setNotifications] = useState<string[]>([]);
  const [personnel, setPersonnel] = useState(deliveryPersonnel);

  // Monitor deliveries and send alerts for delays
  useEffect(() => {
    const interval = setInterval(() => {
      setPersonnel(currentPersonnel => {
        return currentPersonnel.map(person => {
          if (person.isDelayed && !person.notificationSent) {
            // Add notification for delayed delivery
            setNotifications(prev => [
              ...prev,
              `⚠️ Order ${person.currentOrder} is delayed by ${person.delayTime}. Driver: ${person.name}`
            ]);
            
            // TODO: Integrate with real SMS alert service in production
            // Example: sendSmsAlert(person.currentOrder, person.delayTime, person.name);
            
            return { ...person, notificationSent: true };
          }
          return person;
        });
      });
    }, 5000); // Check every 5 seconds

    return () => clearInterval(interval);
  }, []);

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
            {personnel.map((person) => (
              <DeliveryMarker
                key={person.id}
                lat={person.location.lat}
                lng={person.location.lng}
                name={person.name}
                isDelayed={person.isDelayed}
              />
            ))}
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
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#000000" />
        </Pressable>
        <Text style={styles.title}>Delivery Tracking</Text>
        <View style={styles.notificationContainer}>
          <Bell size={24} color="#000000" />
          <NotificationBadge count={notifications.length} />
        </View>
      </View>

      {notifications.length > 0 && (
        <ScrollView style={styles.notificationList}>
          {notifications.map((notification, index) => (
            <View key={index} style={styles.notificationItem}>
              <Text style={styles.notificationMessage}>{notification}</Text>
            </View>
          ))}
        </ScrollView>
      )}

      <View style={styles.mapContainer}>
        <MapComponent />
      </View>

      <ScrollView style={styles.personnelList}>
        {personnel.map((person) => (
          <Pressable
            key={person.id}
            style={[
              styles.personnelCard,
              selectedPerson.id === person.id && styles.selectedCard,
              person.isDelayed && styles.delayedCard,
            ]}
            onPress={() => setSelectedPerson(person)}>
            <View style={styles.personnelInfo}>
              <View style={styles.nameContainer}>
                <Text style={styles.personnelName}>{person.name}</Text>
                <View style={[
                  styles.statusBadge,
                  { backgroundColor: person.status === 'Active' ? '#D1FAE5' : '#FEF3C7' }
                ]}>
                  <Text style={[
                    styles.statusText,
                    { color: person.status === 'Active' ? '#059669' : '#D97706' }
                  ]}>{person.status}</Text>
                </View>
              </View>
              
              <View style={styles.orderInfo}>
                <MapPin size={16} color="#6B7280" />
                <Text style={styles.orderText}>Order {person.currentOrder}</Text>
              </View>

              <View style={styles.deliveryTimes}>
                <View style={styles.timeRow}>
                  <Clock size={16} color="#6B7280" />
                  <Text style={styles.timeLabel}>Expected:</Text>
                  <Text style={styles.timeValue}>{person.expectedDelivery}</Text>
                </View>
                <View style={styles.timeRow}>
                  <Clock size={16} color={person.isDelayed ? '#DC2626' : '#059669'} />
                  <Text style={styles.timeLabel}>ETA:</Text>
                  <Text style={[
                    styles.timeValue,
                    person.isDelayed && styles.delayedTime
                  ]}>{person.estimatedArrival}</Text>
                </View>
              </View>

              {person.isDelayed && (
                <View style={styles.delayAlert}>
                  <AlertTriangle size={16} color="#DC2626" />
                  <Text style={styles.delayText}>Delayed by {person.delayTime}</Text>
                </View>
              )}
            </View>

            <View style={styles.actions}>
              <Pressable style={styles.actionButton}>
                <Phone size={20} color="#6366F1" />
              </Pressable>
              <Pressable style={styles.actionButton}>
                <MessageSquare size={20} color="#6366F1" />
              </Pressable>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
  },
  notificationContainer: {
    position: 'relative',
    padding: 8,
  },
  notificationBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: '#EF4444',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: 'Inter-Bold',
  },
  notificationList: {
    maxHeight: 100,
    backgroundColor: '#FEF2F2',
  },
  notificationItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#FEE2E2',
  },
  notificationMessage: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#991B1B',
  },
  mapContainer: {
    height: 300,
    backgroundColor: '#E5E7EB',
  },
  mapPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  marker: {
    alignItems: 'center',
  },
  markerDot: {
    width: 16,
    height: 16,
    backgroundColor: '#6366F1',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  delayedMarkerDot: {
    backgroundColor: '#DC2626',
  },
  markerText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 4,
  },
  personnelList: {
    flex: 1,
    padding: 16,
  },
  personnelCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  selectedCard: {
    borderColor: '#6366F1',
    borderWidth: 2,
  },
  delayedCard: {
    borderColor: '#DC2626',
    borderWidth: 1,
  },
  personnelInfo: {
    flex: 1,
    gap: 8,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  personnelName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginRight: 8,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
  },
  orderInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  orderText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginLeft: 8,
  },
  deliveryTimes: {
    gap: 4,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  timeLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  timeValue: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
  },
  delayedTime: {
    color: '#DC2626',
  },
  delayAlert: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#FEE2E2',
    padding: 8,
    borderRadius: 8,
  },
  delayText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#DC2626',
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
});