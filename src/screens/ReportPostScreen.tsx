// src/screens/ReportPostScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Header } from '../components/Header';

type ReportPostRouteProp = RouteProp<RootStackParamList, 'ReportPost'>;

const REPORT_REASONS = [
  {
    id: 'inappropriate',
    label: 'Inappropriate content',
    description: 'Content that violates community guidelines'
  },
  {
    id: 'spam',
    label: 'Spam',
    description: 'Repeated, unwanted, or promotional content'
  },
  {
    id: 'harassment',
    label: 'Harassment',
    description: 'Bullying or targeted harassment of others'
  },
  {
    id: 'misinformation',
    label: 'Misinformation',
    description: 'False or misleading information'
  },
  {
    id: 'other',
    label: 'Other',
    description: 'Other issues not listed above'
  }
];

export const ReportPostScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<ReportPostRouteProp>();
  const [selectedReason, setSelectedReason] = useState<string | null>(null);
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const post = useSelector((state: RootState) => 
    state.posts.posts.find(p => p.id === route.params.postId)
  );

  if (!post) {
    navigation.goBack();
    return null;
  }

  const handleSubmitReport = async () => {
    if (!selectedReason) {
      Alert.alert('Error', 'Please select a reason for reporting');
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      Alert.alert(
        'Report Submitted',
        'Thank you for helping keep our community safe. We will review your report.',
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } catch (error) {
      Alert.alert(
        'Error',
        'Failed to submit report. Please try again later.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderReasonItem = (reason: typeof REPORT_REASONS[0]) => (
    <TouchableOpacity
      key={reason.id}
      style={[
        styles.reasonItem,
        selectedReason === reason.id && styles.reasonItemSelected,
      ]}
      onPress={() => setSelectedReason(reason.id)}
    >
      <View style={styles.reasonHeader}>
        <Text style={[
          styles.reasonLabel,
          selectedReason === reason.id && styles.reasonLabelSelected,
        ]}>
          {reason.label}
        </Text>
        <View style={[
          styles.radioButton,
          selectedReason === reason.id && styles.radioButtonSelected,
        ]}>
          {selectedReason === reason.id && (
            <View style={styles.radioButtonInner} />
          )}
        </View>
      </View>
      <Text style={[
        styles.reasonDescription,
        selectedReason === reason.id && styles.reasonDescriptionSelected,
      ]}>
        {reason.description}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Header 
        title="Report Post" 
        showBack 
      />
      
      <ScrollView style={styles.content}>
        <View style={styles.postPreview}>
          <Text style={styles.previewLabel}>Reporting post:</Text>
          <Text style={styles.postTitle} numberOfLines={2}>
            {post.title}
          </Text>
        </View>

        <Text style={styles.sectionTitle}>
          Why are you reporting this post?
        </Text>

        <View style={styles.reasonsContainer}>
          {REPORT_REASONS.map(renderReasonItem)}
        </View>

        <View style={styles.additionalInfoContainer}>
          <Text style={styles.additionalInfoLabel}>
            Additional Information (Optional)
          </Text>
          <TextInput
            style={styles.additionalInfoInput}
            multiline
            placeholder="Please provide any additional details that will help us understand the issue..."
            value={additionalInfo}
            onChangeText={setAdditionalInfo}
            textAlignVertical="top"
            maxLength={500}
          />
          <Text style={styles.characterCount}>
            {additionalInfo.length}/500
          </Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.submitButton,
            (!selectedReason || isSubmitting) && styles.submitButtonDisabled,
          ]}
          onPress={handleSubmitReport}
          disabled={!selectedReason || isSubmitting}
        >
          {isSubmitting ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.submitButtonText}>Submit Report</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  content: {
    flex: 1,
  },
  postPreview: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 8,
  },
  previewLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  postTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    margin: 16,
  },
  reasonsContainer: {
    backgroundColor: '#fff',
    paddingVertical: 8,
  },
  reasonItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  reasonItemSelected: {
    backgroundColor: '#E8F5E9',
  },
  reasonHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  reasonLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    flex: 1,
  },
  reasonLabelSelected: {
    color: '#4A8B57',
  },
  reasonDescription: {
    fontSize: 14,
    color: '#666',
  },
  reasonDescriptionSelected: {
    color: '#4A8B57',
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#666',
    marginLeft: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonSelected: {
    borderColor: '#4A8B57',
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#4A8B57',
  },
  additionalInfoContainer: {
    backgroundColor: '#fff',
    padding: 16,
    marginTop: 8,
  },
  additionalInfoLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
  },
  additionalInfoInput: {
    height: 100,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#333',
  },
  characterCount: {
    fontSize: 12,
    color: '#666',
    alignSelf: 'flex-end',
    marginTop: 4,
  },
  footer: {
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  submitButton: {
    backgroundColor: '#4A8B57',
    padding: 16,
    borderRadius: 24,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    backgroundColor: '#ccc',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ReportPostScreen;