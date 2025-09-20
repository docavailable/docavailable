import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

interface ListSkeletonProps {
  itemCount?: number;
  showHeader?: boolean;
  itemHeight?: number;
}

export default function ListSkeleton({ 
  itemCount = 5, 
  showHeader = true, 
  itemHeight = 80 
}: ListSkeletonProps) {
  const shimmerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const shimmerAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(shimmerAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );
    shimmerAnimation.start();

    return () => shimmerAnimation.stop();
  }, [shimmerAnim]);

  const shimmerOpacity = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });

  const renderListItem = (index: number) => (
    <View key={index} style={[styles.listItem, { height: itemHeight }]}>
      <Animated.View style={[styles.avatar, { opacity: shimmerOpacity }]} />
      <View style={styles.content}>
        <Animated.View style={[styles.title, { opacity: shimmerOpacity }]} />
        <Animated.View style={[styles.subtitle, { opacity: shimmerOpacity }]} />
        <Animated.View style={[styles.description, { opacity: shimmerOpacity }]} />
      </View>
      <Animated.View style={[styles.action, { opacity: shimmerOpacity }]} />
    </View>
  );

  return (
    <View style={styles.container}>
      {showHeader && (
        <View style={styles.header}>
          <Animated.View style={[styles.headerTitle, { opacity: shimmerOpacity }]} />
          <Animated.View style={[styles.headerSubtitle, { opacity: shimmerOpacity }]} />
        </View>
      )}
      
      <View style={styles.listContainer}>
        {Array.from({ length: itemCount }, (_, index) => renderListItem(index))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  headerTitle: {
    height: 24,
    backgroundColor: '#E0E0E0',
    borderRadius: 12,
    marginBottom: 8,
    width: '60%',
  },
  headerSubtitle: {
    height: 16,
    backgroundColor: '#E0E0E0',
    borderRadius: 8,
    width: '40%',
  },
  listContainer: {
    flex: 1,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E0E0E0',
    marginRight: 16,
  },
  content: {
    flex: 1,
  },
  title: {
    height: 18,
    backgroundColor: '#E0E0E0',
    borderRadius: 9,
    marginBottom: 8,
    width: '70%',
  },
  subtitle: {
    height: 14,
    backgroundColor: '#E0E0E0',
    borderRadius: 7,
    marginBottom: 6,
    width: '50%',
  },
  description: {
    height: 12,
    backgroundColor: '#E0E0E0',
    borderRadius: 6,
    width: '85%',
  },
  action: {
    width: 24,
    height: 24,
    backgroundColor: '#E0E0E0',
    borderRadius: 12,
    marginLeft: 16,
  },
});
