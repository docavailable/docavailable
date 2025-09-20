import { StyleSheet, Text, View } from 'react-native';
import ChatSkeleton from './ChatSkeleton';
import ListSkeleton from './ListSkeleton';

export default function SkeletonTest() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Skeleton Loading Components Test</Text>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Chat Skeleton</Text>
        <View style={styles.skeletonContainer}>
          <ChatSkeleton messageCount={4} />
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>List Skeleton</Text>
        <View style={styles.skeletonContainer}>
          <ListSkeleton itemCount={3} showHeader={true} itemHeight={80} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  skeletonContainer: {
    height: 300,
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
  },
});
