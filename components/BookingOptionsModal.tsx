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
}

export default function BookingOptionsModal({
  visible,
  onClose,
  onSelectOption,
  doctorName,
}: BookingOptionsModalProps) {
  const handleOptionSelect = (option: 'text' | 'audio' | 'video') => {
    onSelectOption(option);
    onClose();
  };

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
              style={styles.optionButton}
              onPress={() => handleOptionSelect('text')}
            >
              <View style={styles.optionIcon}>
                <FontAwesome name="comment" size={24} color="#4CAF50" />
              </View>
              <View style={styles.optionContent}>
                <Text style={styles.optionTitle}>Text Session</Text>
                <Text style={styles.optionDescription}>
                  Chat with the doctor via text messages
                </Text>
              </View>
              <FontAwesome name="chevron-right" size={16} color="#ccc" />
            </TouchableOpacity>

            {/* Audio Call Option */}
            <TouchableOpacity 
              style={styles.optionButton}
              onPress={() => handleOptionSelect('audio')}
            >
              <View style={styles.optionIcon}>
                <FontAwesome name="phone" size={24} color="#2196F3" />
              </View>
              <View style={styles.optionContent}>
                <Text style={styles.optionTitle}>Audio Call</Text>
                <Text style={styles.optionDescription}>
                  Voice call with the doctor
                </Text>
              </View>
              <FontAwesome name="chevron-right" size={16} color="#ccc" />
            </TouchableOpacity>

            {/* Video Call Option */}
            <TouchableOpacity 
              style={styles.optionButton}
              onPress={() => handleOptionSelect('video')}
            >
              <View style={styles.optionIcon}>
                <FontAwesome name="video-camera" size={24} color="#FF5722" />
              </View>
              <View style={styles.optionContent}>
                <Text style={styles.optionTitle}>Video Call</Text>
                <Text style={styles.optionDescription}>
                  Video call with the doctor
                </Text>
              </View>
              <FontAwesome name="chevron-right" size={16} color="#ccc" />
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
});
