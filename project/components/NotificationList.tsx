import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable, Modal } from 'react-native';
import { NotificationContext } from '@/context/NotificationContext';

interface NotificationListProps {
  visible: boolean;
  onClose: () => void;
}

export default function NotificationList({ visible, onClose }: NotificationListProps) {
  const { notifications, markAsRead, clearNotifications } = useContext(NotificationContext);

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Notifications</Text>
          <FlatList
            data={notifications}
            keyExtractor={item => item.id}
            ListEmptyComponent={<Text style={styles.empty}>No notifications</Text>}
            renderItem={({ item }) => (
              <Pressable
                style={[styles.notification, item.read && styles.read]}
                onPress={() => markAsRead(item.id)}
                accessibilityRole="button"
                accessibilityLabel={`Mark notification as read: ${item.message}`}
                disabled={item.read}
              >
                <Text style={styles.message}>{item.message}</Text>
              </Pressable>
            )}
          />
          <View style={styles.actions}>
            <Pressable onPress={clearNotifications} style={styles.clearButton} accessibilityRole="button" accessibilityLabel="Clear all notifications">
              <Text style={styles.clearText}>Clear All</Text>
            </Pressable>
            <Pressable onPress={onClose} style={styles.closeButton} accessibilityRole="button" accessibilityLabel="Close notifications list">
              <Text style={styles.closeText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '90%',
    maxHeight: '80%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  notification: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  read: {
    backgroundColor: '#F3F4F6',
  },
  message: {
    fontSize: 16,
    color: '#222',
  },
  empty: {
    textAlign: 'center',
    color: '#888',
    marginVertical: 20,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  clearButton: {
    padding: 10,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
  },
  clearText: {
    color: '#6B7280',
    fontFamily: 'Inter-SemiBold',
  },
  closeButton: {
    padding: 10,
    backgroundColor: '#6B4EFF',
    borderRadius: 8,
  },
  closeText: {
    color: '#fff',
    fontFamily: 'Inter-SemiBold',
  },
});
