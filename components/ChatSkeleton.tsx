import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

interface ChatSkeletonProps {
  messageCount?: number;
}

export default function ChatSkeleton({ messageCount = 5 }: ChatSkeletonProps) {
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

  const renderMessageSkeleton = (isOwn: boolean, index: number) => (
    <View key={index} style={[styles.messageContainer, isOwn ? styles.ownMessage : styles.otherMessage]}>
      {!isOwn && (
        <View style={styles.avatarContainer}>
          <Animated.View style={[styles.avatar, { opacity: shimmerOpacity }]} />
        </View>
      )}
      
      <View style={[styles.messageBubble, isOwn ? styles.ownBubble : styles.otherBubble]}>
        <Animated.View style={[styles.messageLine, { opacity: shimmerOpacity }]} />
        <Animated.View style={[styles.messageLine, styles.shortLine, { opacity: shimmerOpacity }]} />
        {index % 3 === 0 && (
          <Animated.View style={[styles.messageLine, styles.mediumLine, { opacity: shimmerOpacity }]} />
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header skeleton */}
      <View style={styles.header}>
        <Animated.View style={[styles.headerBackButton, { opacity: shimmerOpacity }]} />
        <View style={styles.headerContent}>
          <Animated.View style={[styles.headerAvatar, { opacity: shimmerOpacity }]} />
          <View style={styles.headerTextContainer}>
            <Animated.View style={[styles.headerName, { opacity: shimmerOpacity }]} />
            <Animated.View style={[styles.headerStatus, { opacity: shimmerOpacity }]} />
          </View>
        </View>
        <Animated.View style={[styles.headerAction, { opacity: shimmerOpacity }]} />
      </View>

      {/* Messages skeleton */}
      <View style={styles.messagesContainer}>
        {Array.from({ length: messageCount }, (_, index) => 
          renderMessageSkeleton(index % 2 === 0, index)
        )}
      </View>

      {/* Input area skeleton */}
      <View style={styles.inputContainer}>
        <Animated.View style={[styles.inputField, { opacity: shimmerOpacity }]} />
        <Animated.View style={[styles.sendButton, { opacity: shimmerOpacity }]} />
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
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    backgroundColor: '#fff',
  },
  headerBackButton: {
    width: 24,
    height: 24,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    marginRight: 12,
  },
  headerContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E0E0E0',
    marginRight: 12,
  },
  headerTextContainer: {
    flex: 1,
  },
  headerName: {
    height: 16,
    backgroundColor: '#E0E0E0',
    borderRadius: 8,
    marginBottom: 4,
    width: '60%',
  },
  headerStatus: {
    height: 12,
    backgroundColor: '#E0E0E0',
    borderRadius: 6,
    width: '40%',
  },
  headerAction: {
    width: 24,
    height: 24,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
  },
  messagesContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'flex-end',
  },
  ownMessage: {
    justifyContent: 'flex-end',
  },
  otherMessage: {
    justifyContent: 'flex-start',
  },
  avatarContainer: {
    marginRight: 8,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E0E0E0',
  },
  messageBubble: {
    maxWidth: '75%',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 18,
  },
  ownBubble: {
    backgroundColor: '#E0E0E0',
    borderBottomRightRadius: 4,
  },
  otherBubble: {
    backgroundColor: '#E0E0E0',
    borderBottomLeftRadius: 4,
  },
  messageLine: {
    height: 12,
    backgroundColor: '#C0C0C0',
    borderRadius: 6,
    marginBottom: 4,
  },
  shortLine: {
    width: '60%',
  },
  mediumLine: {
    width: '80%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    backgroundColor: '#fff',
  },
  inputField: {
    flex: 1,
    height: 40,
    backgroundColor: '#E0E0E0',
    borderRadius: 20,
    marginRight: 8,
  },
  sendButton: {
    width: 40,
    height: 40,
    backgroundColor: '#E0E0E0',
    borderRadius: 20,
  },
});
