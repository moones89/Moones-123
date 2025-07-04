import { View, Text, StyleSheet, Pressable, TextInput, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, Bell, Search, ChevronDown, Download, ShoppingCart } from 'lucide-react-native';

const transactions = [
  {
    id: 1,
    date: '02/02/2019',
    outletName: 'Supermarket 1',
    itemGroup: 'Meat & poultry',
    amount: 2,
    walletBalance: 500,
    paymentMethod: 'Wallet',
  },
  {
    id: 2,
    date: '02/02/2019',
    outletName: 'Supermarket 1',
    itemGroup: 'Frozen Food',
    amount: 2,
    walletBalance: 500,
    paymentMethod: 'Visa card',
  },
  {
    id: 3,
    date: '02/02/2019',
    outletName: 'Supermarket 1',
    itemGroup: 'Food Cupboard',
    amount: 2,
    walletBalance: 500,
    paymentMethod: 'Master card',
  },
  {
    id: 4,
    date: '02/02/2019',
    outletName: 'Supermarket 1',
    itemGroup: 'Frozen Food',
    amount: 2,
    walletBalance: 500,
    paymentMethod: 'Master card',
  },
  {
    id: 5,
    date: '02/02/2019',
    outletName: 'Supermarket 1',
    itemGroup: 'Frozen Food',
    amount: 2,
    walletBalance: 500,
    paymentMethod: 'Master card',
  },
  {
    id: 6,
    date: '02/02/2019',
    outletName: 'Supermarket 1',
    itemGroup: 'Frozen Food',
    amount: 2,
    walletBalance: 500,
    paymentMethod: 'Master card',
  },
  {
    id: 7,
    date: '02/02/2019',
    outletName: 'Supermarket 1',
    itemGroup: 'Frozen Food',
    amount: 2,
    walletBalance: 500,
    paymentMethod: 'Master card',
  },
  {
    id: 8,
    date: '02/03/2019',
    outletName: 'Supermarket 1',
    itemGroup: 'Frozen Food',
    amount: 2,
    walletBalance: 500,
    paymentMethod: 'Master card',
  },
];

export default function TransactionsScreen() {
  const handleExport = () => {
    // Convert transactions to CSV
    const headers = ['ID', 'Date', 'Outlet Name', 'Item Group', 'Amount', 'Wallet Balance', 'Payment Method'];
    const rows = transactions.map(t => [
      t.id,
      t.date,
      t.outletName,
      t.itemGroup,
      t.amount,
      t.walletBalance,
      t.paymentMethod
    ]);
    const csv = [headers, ...rows]
      .map(row => row.map(String).map(s => '"' + s.replace(/"/g, '""') + '"').join(','))
      .join('\n');

    if (typeof window !== 'undefined' && window.document) {
      // Web: trigger download
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'transactions.csv';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } else {
      // Native: show alert (implement file system save with expo-file-system if needed)
      alert('Export is only supported on web in this demo.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Pressable onPress={() => router.back()} style={styles.menuButton}>
            <ArrowLeft size={24} color="#FFFFFF" />
          </Pressable>
          <Text style={styles.headerTitle}>Trans Action</Text>
          <View style={styles.headerRight}>
            <Bell size={24} color="#FFFFFF" style={styles.icon} />
            <ShoppingCart size={24} color="#FFFFFF" style={styles.icon} />
            <View style={styles.walletInfo}>
              <Text style={styles.walletAmount}>$1000</Text>
            </View>
          </View>
        </View>

        <View style={styles.filters}>
          <View style={styles.dateFilter}>
            <Pressable style={styles.dateButton}>
              <Text style={styles.dateText}>02/02/2019</Text>
              <Text style={styles.dateText}>TO</Text>
              <Text style={styles.dateText}>02/03/2019</Text>
              <ChevronDown size={20} color="#000000" />
            </Pressable>
            <View style={styles.searchContainer}>
              <TextInput
                placeholder="Name"
                style={styles.searchInput}
                placeholderTextColor="#8E8E93"
              />
              <Search size={20} color="#8E8E93" />
            </View>
          </View>

          <View style={styles.subFilters}>
            <Pressable style={styles.filterButton}>
              <Text style={styles.filterText}>Least to most</Text>
              <ChevronDown size={16} color="#8E8E93" />
            </Pressable>
            <Pressable style={styles.filterButton}>
              <Text style={styles.filterText}>Through history</Text>
              <ChevronDown size={16} color="#8E8E93" />
            </Pressable>
          </View>

          <View style={styles.arrangeFilters}>
            <Text style={styles.arrangeText}>Arrange through</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.arrangeButtons}>
              <Pressable style={styles.arrangeButton}>
                <Text style={styles.arrangeButtonText}>Payment Method</Text>
                <ChevronDown size={16} color="#8E8E93" />
              </Pressable>
              <Pressable style={styles.arrangeButton}>
                <Text style={styles.arrangeButtonText}>Type List</Text>
                <ChevronDown size={16} color="#8E8E93" />
              </Pressable>
              <Pressable style={styles.arrangeButton}>
                <Text style={styles.arrangeButtonText}>Item group</Text>
                <ChevronDown size={16} color="#8E8E93" />
              </Pressable>
              <View style={styles.searchContainer}>
                <TextInput
                  placeholder="Name"
                  style={styles.searchInput}
                  placeholderTextColor="#8E8E93"
                />
                <Search size={20} color="#8E8E93" />
              </View>
            </ScrollView>
          </View>
        </View>
      </View>

      <View style={styles.tableHeader}>
        <Text style={[styles.columnHeader, styles.numberColumn]}>N</Text>
        <Text style={[styles.columnHeader, styles.dateColumn]}>Date</Text>
        <Text style={[styles.columnHeader, styles.outletColumn]}>Outlet Name</Text>
        <Text style={[styles.columnHeader, styles.itemGroupColumn]}>Item Group</Text>
        <Text style={[styles.columnHeader, styles.amountColumn]}>Amount</Text>
        <Text style={[styles.columnHeader, styles.balanceColumn]}>Wallet Balance</Text>
        <Text style={[styles.columnHeader, styles.paymentColumn]}>Payment Method</Text>
      </View>

      <ScrollView style={styles.tableContent}>
        {transactions.map((transaction, index) => (
          <View key={transaction.id} style={[styles.tableRow, index % 2 === 0 ? styles.evenRow : styles.oddRow]}>
            <Text style={[styles.cellText, styles.numberColumn]}>{transaction.id}</Text>
            <Text style={[styles.cellText, styles.dateColumn]}>{transaction.date}</Text>
            <Text style={[styles.cellText, styles.outletColumn]}>{transaction.outletName}</Text>
            <Text style={[styles.cellText, styles.itemGroupColumn]}>{transaction.itemGroup}</Text>
            <Text style={[styles.cellText, styles.amountColumn]}>${transaction.amount}</Text>
            <Text style={[styles.cellText, styles.balanceColumn]}>${transaction.walletBalance}</Text>
            <Text style={[styles.cellText, styles.paymentColumn]}>{transaction.paymentMethod}</Text>
          </View>
        ))}
      </ScrollView>

      <Pressable style={styles.exportButton} onPress={handleExport}>
        <Text style={styles.exportButtonText}>Export</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    backgroundColor: '#6B4EFF',
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  menuButton: {
    padding: 8,
  },
  headerTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 20,
    color: '#FFFFFF',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginLeft: 16,
  },
  walletInfo: {
    marginLeft: 16,
  },
  walletAmount: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#FFFFFF',
  },
  filters: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  dateFilter: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  dateButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F2F2F7',
    borderRadius: 8,
    padding: 12,
  },
  dateText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F7',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontFamily: 'Inter-Regular',
    fontSize: 14,
  },
  subFilters: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F7',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 8,
  },
  filterText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#8E8E93',
  },
  arrangeFilters: {
    gap: 8,
  },
  arrangeText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#8E8E93',
  },
  arrangeButtons: {
    flexDirection: 'row',
  },
  arrangeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F7',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
    gap: 8,
  },
  arrangeButtonText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#8E8E93',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#1a237e',
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  columnHeader: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#FFFFFF',
  },
  tableContent: {
    flex: 1,
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  evenRow: {
    backgroundColor: '#F8F9FA',
  },
  oddRow: {
    backgroundColor: '#FFFFFF',
  },
  cellText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#000000',
  },
  numberColumn: {
    width: '5%',
  },
  dateColumn: {
    width: '12%',
  },
  outletColumn: {
    width: '20%',
  },
  itemGroupColumn: {
    width: '20%',
  },
  amountColumn: {
    width: '10%',
  },
  balanceColumn: {
    width: '15%',
  },
  paymentColumn: {
    width: '18%',
  },
  exportButton: {
    backgroundColor: '#1a237e',
    margin: 16,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  exportButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
});