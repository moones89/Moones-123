import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, ShoppingBag, CreditCard, Building2, Calendar } from 'lucide-react-native';

const recentTransactions = [
  { 
    id: 1,
    date: '02/02/2019',
    type: 'Shopping',
    icon: ShoppingBag,
    outlet: 'Supermarket 1',
    amount: -50,
    color: '#FF3B30'
  },
  {
    id: 2,
    date: '02/02/2019',
    type: 'Payment',
    icon: CreditCard,
    outlet: 'Monthly Rent',
    amount: -500,
    color: '#FF9500'
  },
  {
    id: 3,
    date: '02/02/2019',
    type: 'Property',
    icon: Building2,
    outlet: 'Property Deposit',
    amount: -1000,
    color: '#5856D6'
  },
  {
    id: 4,
    date: '02/02/2019',
    type: 'Event',
    icon: Calendar,
    outlet: 'Concert Tickets',
    amount: -120,
    color: '#FF2D55'
  }
];

export default function WalletScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#FFFFFF" />
        </Pressable>
        <Text style={styles.headerTitle}>My Wallet</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>My Wallet</Text>
          
          <View style={styles.advertSection}>
            <Text style={styles.sectionTitle}>Advert</Text>
          </View>

          <View style={styles.balanceSection}>
            <View style={styles.balanceRow}>
              <Text style={styles.label}>Balance:</Text>
              <Text style={styles.value}>$1,000.00</Text>
            </View>
            <View style={styles.balanceRow}>
              <Text style={styles.label}>Monthly Money Paid:</Text>
              <Text style={styles.value}>$500.00</Text>
            </View>
            <View style={styles.balanceRow}>
              <Text style={styles.label}>Yearly Money Paid:</Text>
              <Text style={styles.value}>$6,000.00</Text>
            </View>
          </View>

          <View style={styles.amountSection}>
            <Text style={styles.label}>Amount:</Text>
            <View style={styles.amountRow}>
              <Text style={styles.value}>$100.00</Text>
              <Pressable style={styles.payButton}>
                <Text style={styles.payButtonText}>Pay</Text>
              </Pressable>
            </View>
          </View>

          <View style={styles.recentTransactions}>
            <View style={styles.recentHeader}>
              <Text style={styles.recentTitle}>Recent Transactions</Text>
              <Pressable 
                onPress={() => router.push('/profile/transactions')}
                style={styles.viewAllButton}>
                <Text style={styles.viewAllText}>View All</Text>
              </Pressable>
            </View>

            {recentTransactions.map((transaction) => (
              <View key={transaction.id} style={styles.transactionItem}>
                <View style={[styles.iconContainer, { backgroundColor: transaction.color }]}>
                  <transaction.icon size={20} color="#FFFFFF" />
                </View>
                <View style={styles.transactionInfo}>
                  <Text style={styles.transactionTitle}>{transaction.type}</Text>
                  <Text style={styles.transactionOutlet}>{transaction.outlet}</Text>
                </View>
                <View style={styles.transactionAmount}>
                  <Text style={[styles.amount, { color: transaction.amount < 0 ? '#FF3B30' : '#34C759' }]}>
                    {transaction.amount < 0 ? '-' : '+'}${Math.abs(transaction.amount)}
                  </Text>
                  <Text style={styles.transactionDate}>{transaction.date}</Text>
                </View>
              </View>
            ))}
          </View>

          <Pressable 
            style={styles.transactionsButton}
            onPress={() => router.push('/profile/transactions')}>
            <Text style={styles.transactionsButtonText}>All Transactions</Text>
          </Pressable>

          <View style={styles.advertBottom}>
            <Text style={styles.advertText}>Advert</Text>
          </View>
        </View>
      </ScrollView>
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
    marginRight: 16,
  },
  headerTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 20,
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
    backgroundColor: '#F2F2F7',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    margin: 16,
    elevation: 2,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    marginBottom: 16,
    color: '#000000',
  },
  advertSection: {
    backgroundColor: '#F2F2F7',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
  },
  balanceSection: {
    marginBottom: 24,
  },
  balanceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  amountSection: {
    marginBottom: 24,
  },
  amountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  label: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#8E8E93',
  },
  value: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#000000',
  },
  payButton: {
    backgroundColor: '#6B4EFF',
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 8,
  },
  payButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#FFFFFF',
  },
  recentTransactions: {
    marginBottom: 24,
  },
  recentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  recentTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#000000',
  },
  viewAllButton: {
    padding: 8,
  },
  viewAllText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#6B4EFF',
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  transactionInfo: {
    flex: 1,
    marginLeft: 12,
  },
  transactionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#000000',
    marginBottom: 4,
  },
  transactionOutlet: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#8E8E93',
  },
  transactionAmount: {
    alignItems: 'flex-end',
  },
  amount: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    marginBottom: 4,
  },
  transactionDate: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#8E8E93',
  },
  transactionsButton: {
    backgroundColor: '#6B4EFF',
    borderRadius: 12,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  transactionsButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
  advertBottom: {
    backgroundColor: '#F2F2F7',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  advertText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#8E8E93',
  },
});