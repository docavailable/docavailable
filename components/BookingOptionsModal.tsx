import { FontAwesome } from '@expo/vector-icons';
import {
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

interface BookingOptionsModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectOption: (option: 'text' | 'audio' | 'video') => void;
  doctorName: string;
  subscription?: {
    textSessionsRemaining?: number;
    voiceCallsRemaining?: number;
    videoCallsRemaining?: number;
  } | null;
}

export default function BookingOptionsModal({
  visible,
  onClose,
  onSelectOption,
  doctorName,
  subscription,
}: BookingOptionsModalProps) {
  const handleOptionSelect = (option: 'text' | 'audio' | 'video') => {
    onSelectOption(option);
    onClose();
  };

  // Check if user has remaining sessions for each type
  const hasTextSessions = !subscription || (subscription.textSessionsRemaining || 0) > 0;
  const hasAudioCalls = !subscription || (subscription.voiceCallsRemaining || 0) > 0;
  const hasVideoCalls = !subscription || (subscription.videoCallsRemaining || 0) > 0;

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.dialog}>
          <View style={styles.iconContainer}>
            <FontAwesome name="calendar" size={32} color="#4CAF50" />
          </View>
          
          <Text style={styles.title}>Choose Session Type</Text>
          
          <Text style={styles.subtitle}>
            Select how you'd like to connect with Dr. {doctorName}
          </Text>

          <View style={styles.optionsContainer}>
            {/* Text Session Option */}
            <TouchableOpacity 
              style={[
                styles.optionButton,
                !hasTextSessions && styles.optionButtonDisabled
              ]}
              onPress={() => hasTextSessions && handleOptionSelect('text')}
              disabled={!hasTextSessions}
            >
              <View style={[
                styles.optionIcon,
                !hasTextSessions && styles.optionIconDisabled
              ]}>
                <FontAwesome 
                  name="comment" 
                  size={24} 
                  color={hasTextSessions ? "#4CAF50" : "#ccc"} 
                />
              </View>
              <View style={styles.optionContent}>
                <Text style={[
                  styles.optionTitle,
                  !hasTextSessions && styles.optionTitleDisabled
                ]}>
                  Text Session
                  {!hasTextSessions && ' (No sessions remaining)'}
                </Text>
                <Text style={[
                  styles.optionDescription,
                  !hasTextSessions && styles.optionDescriptionDisabled
                ]}>
                  Chat with the doctor via text messages
                </Text>
              </View>
              {hasTextSessions && (
                <FontAwesome name="chevron-right" size={16} color="#ccc" />
              )}
            </TouchableOpacity>

            {/* Audio Call Option */}
            <TouchableOpacity 
              style={[
                styles.optionButton,
                !hasAudioCalls && styles.optionButtonDisabled
              ]}
              onPress={() => hasAudioCalls && handleOptionSelect('audio')}
              disabled={!hasAudioCalls}
            >
              <View style={[
                styles.optionIcon,
                !hasAudioCalls && styles.optionIconDisabled
              ]}>
                <FontAwesome 
                  name="phone" 
                  size={24} 
                  color={hasAudioCalls ? "#2196F3" : "#ccc"} 
                />
              </View>
              <View style={styles.optionContent}>
                <Text style={[
                  styles.optionTitle,
                  !hasAudioCalls && styles.optionTitleDisabled
                ]}>
                  Audio Call
                  {!hasAudioCalls && ' (No calls remaining)'}
                </Text>
                <Text style={[
                  styles.optionDescription,
                  !hasAudioCalls && styles.optionDescriptionDisabled
                ]}>
                  Voice call with the doctor
                </Text>
              </View>
              {hasAudioCalls && (
                <FontAwesome name="chevron-right" size={16} color="#ccc" />
              )}
            </TouchableOpacity>

            {/* Video Call Option */}
            <TouchableOpacity 
              style={[
                styles.optionButton,
                !hasVideoCalls && styles.optionButtonDisabled
              ]}
              onPress={() => hasVideoCalls && handleOptionSelect('video')}
              disabled={!hasVideoCalls}
            >
              <View style={[
                styles.optionIcon,
                !hasVideoCalls && styles.optionIconDisabled
              ]}>
                <FontAwesome 
                  name="video-camera" 
                  size={24} 
                  color={hasVideoCalls ? "#FF5722" : "#ccc"} 
                />
              </View>
              <View style={styles.optionContent}>
                <Text style={[
                  styles.optionTitle,
                  !hasVideoCalls && styles.optionTitleDisabled
                ]}>
                  Video Call
                  {!hasVideoCalls && ' (No calls remaining)'}
                </Text>
                <Text style={[
                  styles.optionDescription,
                  !hasVideoCalls && styles.optionDescriptionDisabled
                ]}>
                  Video call with the doctor
                </Text>
              </View>
              {hasVideoCalls && (
                <FontAwesome name="chevron-right" size={16} color="#ccc" />
              )}
            </TouchableOpacity>
          </View>
          
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={styles.cancelButton} 
              onPress={onClose}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  dialog: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 400,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginBottom: 24,
  },
  optionsContainer: {
    marginBottom: 24,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: '#f8f9fa',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  optionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  optionContent: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: 14,
    color: '#666',
  },
  buttonContainer: {
    marginTop: 8,
  },
  cancelButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: 'white',
  },
  cancelButtonText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  // Disabled styles
  optionButtonDisabled: {
    backgroundColor: '#f5f5f5',
    borderColor: '#e0e0e0',
    opacity: 0.6,
  },
  optionIconDisabled: {
    backgroundColor: '#f0f0f0',
  },
  optionTitleDisabled: {
    color: '#999',
  },
  optionDescriptionDisabled: {
    color: '#bbb',
  },
});
