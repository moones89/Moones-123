import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, Alert, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { Link, router } from 'expo-router';
import { User, Lock, Zap } from 'lucide-react-native';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function SignInScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Autofill email if saved
    if (Platform.OS === 'web') {
      // Use localStorage for web
      const savedEmail = localStorage.getItem('saved_email');
      if (savedEmail) setEmail(savedEmail);
    } else {
      // For mobile, we would normally use AsyncStorage or SecureStore
      // But since we don't have those packages installed, we'll skip this for now
      // You can add them back once you install the required packages
    }
  }, []);

  const handleSignIn = async () => {
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }
    // Validate password (at least 6 characters for demo)
    if (password.length < 6) {
      Alert.alert('Invalid Password', 'Password must be at least 6 characters.');
      return;
    }

    setIsLoading(true);
    try {
      // Save email for next time
      if (Platform.OS === 'web') {
        // Use localStorage for web
        localStorage.setItem('saved_email', email);
      } else {
        // For mobile, you can use AsyncStorage or SecureStore here
        // Example (uncomment after installing @react-native-async-storage/async-storage):
        // await AsyncStorage.setItem('saved_email', email);
      }

      // Simulate authentication (replace with real API call)
      await new Promise(res => setTimeout(res, 1200)); // Simulate network delay
      if (email === 'user@example.com' && password === 'password123') {
        router.replace('/(tabs)');
      } else {
        Alert.alert('Login Failed', 'Incorrect email or password.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {isLoading && <LoadingSpinner />}
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Zap size={48} color="#6B4EFF" />
        </View>
        <Text style={styles.title}>Sign in</Text>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <User size={20} color="#8E8E93" />
            <TextInput
              placeholder="Email address"
              style={styles.input}
              placeholderTextColor="#8E8E93"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View style={styles.inputContainer}>
            <Lock size={20} color="#8E8E93" />
            <TextInput
              placeholder="Password"
              secureTextEntry={!showPassword}
              style={styles.input}
              placeholderTextColor="#8E8E93"
              value={password}
              onChangeText={setPassword}
            />
            <Pressable onPress={() => setShowPassword(!showPassword)}>
              <Text style={{ color: '#6B4EFF', marginLeft: 8 }}>
                {showPassword ? 'Hide' : 'Show'}
              </Text>
            </Pressable>
          </View>

          <Link href="/auth/forgot-password" asChild>
            <Pressable>
              <Text style={styles.forgotPassword}>Forgot Password?</Text>
            </Pressable>
          </Link>

          <Pressable style={styles.signInButton} onPress={handleSignIn} disabled={isLoading}>
            <Text style={styles.signInButtonText}>SIGN IN</Text>
          </Pressable>

          <View style={styles.signUpContainer}>
            <Text style={styles.signUpText}>Don't Have an Account? </Text>
            <Link href="/auth/sign-up" asChild>
              <Pressable>
                <Text style={styles.signUpLink}>Sign Up</Text>
              </Pressable>
            </Link>
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
  content: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    width: 120,
    height: 120,
    backgroundColor: '#F2F2F7',
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 32,
    marginBottom: 32,
  },
  form: {
    width: '100%',
    gap: 16,
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
  forgotPassword: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B4EFF',
    textAlign: 'right',
  },
  signInButton: {
    backgroundColor: '#6B4EFF',
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
  },
  signInButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  signUpText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#8E8E93',
  },
  signUpLink: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#6B4EFF',
  },
});
