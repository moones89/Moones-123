import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, User, Calendar, Phone } from 'lucide-react-native';

import { useState } from 'react';
import { Alert } from 'react-native';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function SignUpScreen() {
  const [username, setUsername] = useState('');
  const [nickname, setNickname] = useState('');
  const [age, setAge] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async () => {
    // Validate required fields
    if (!username || !nickname || !age || !phone || !email || !password || !confirmPassword) {
      Alert.alert('Missing Fields', 'Please fill in all fields.');
      return;
    }
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }
    // Validate age
    if (isNaN(Number(age)) || Number(age) < 13) {
      Alert.alert('Invalid Age', 'You must be at least 13 years old.');
      return;
    }
    // Validate phone (basic)
    if (phone.length < 7) {
      Alert.alert('Invalid Phone', 'Please enter a valid phone number.');
      return;
    }
    // Validate password
    if (password.length < 6) {
      Alert.alert('Weak Password', 'Password must be at least 6 characters.');
      return;
    }
    // Confirm password match
    if (password !== confirmPassword) {
      Alert.alert('Password Mismatch', 'Passwords do not match.');
      return;
    }
    setIsLoading(true);
    try {
      // Simulate registration (replace with real API call)
      await new Promise(res => setTimeout(res, 1200)); // Simulate network delay
      Alert.alert('Registration Successful', 'You can now sign in.', [
        { text: 'OK', onPress: () => router.replace('/auth/sign-in') }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {isLoading && <LoadingSpinner />}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#FFFFFF" />
        </Pressable>
        <Text style={styles.headerTitle}>BACK</Text>
      </View>

      <View style={styles.tabs}>
        <Pressable style={[styles.tab]}>
          <Text style={[styles.tabText]}>USER</Text>
        </Pressable>
        <Pressable style={[styles.tab, styles.activeTab]}>
          <Text style={[styles.tabText, styles.activeTabText]}>SHOP OWNER</Text>
        </Pressable>
        <Pressable style={[styles.tab]}>
          <Text style={[styles.tabText]}>DRIVER</Text>
        </Pressable>
      </View>

      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <User size={20} color="#8E8E93" />
          <TextInput
            placeholder="User Name"
            style={styles.input}
            placeholderTextColor="#8E8E93"
            value={username}
            onChangeText={setUsername}
          />
        </View>

        <View style={styles.inputContainer}>
          <User size={20} color="#8E8E93" />
          <TextInput
            placeholder="Nickname"
            style={styles.input}
            placeholderTextColor="#8E8E93"
            value={nickname}
            onChangeText={setNickname}
          />
        </View>

        <View style={styles.inputContainer}>
          <Calendar size={20} color="#8E8E93" />
          <TextInput
            placeholder="Age"
            style={styles.input}
            keyboardType="numeric"
            placeholderTextColor="#8E8E93"
            value={age}
            onChangeText={setAge}
          />
        </View>

        <View style={styles.inputContainer}>
          <Phone size={20} color="#8E8E93" />
          <TextInput
            placeholder="Phone Number"
            style={styles.input}
            keyboardType="phone-pad"
            placeholderTextColor="#8E8E93"
            value={phone}
            onChangeText={setPhone}
          />
        </View>

        <View style={styles.inputContainer}>
          <User size={20} color="#8E8E93" />
          <TextInput
            placeholder="Email"
            style={styles.input}
            placeholderTextColor="#8E8E93"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.inputContainer}>
          <User size={20} color="#8E8E93" />
          <TextInput
            placeholder="Password"
            style={styles.input}
            placeholderTextColor="#8E8E93"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <View style={styles.inputContainer}>
          <User size={20} color="#8E8E93" />
          <TextInput
            placeholder="Confirm Password"
            style={styles.input}
            placeholderTextColor="#8E8E93"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        </View>

        <Pressable style={styles.signUpButton} onPress={handleSignUp} disabled={isLoading}>
          <Text style={styles.signUpButtonText}>Sign Up</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6B4EFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  backButton: {
    marginRight: 8,
  },
  headerTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
  tabs: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 4,
    margin: 16,
    borderRadius: 8,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#6B4EFF',
    borderRadius: 4,
  },
  tabText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#8E8E93',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  form: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    gap: 24,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
    paddingVertical: 8,
  },
  input: {
    flex: 1,
    marginLeft: 12,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
  },
  signUpButton: {
    backgroundColor: '#6B4EFF',
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
  },
  signUpButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
});