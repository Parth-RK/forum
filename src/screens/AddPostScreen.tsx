// src/screens/AddPostScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { addPost } from '../redux/slices/postsSlice';
import { RootState } from '../redux/store';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

export const AddPostScreen: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.user.currentUser);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<'question' | 'thought'>('question');
  const [images, setImages] = useState<string[]>([]);

  const handleImagePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets[0]) {
      setImages([...images, result.assets[0].uri]);
    }
  };

  const handleSubmit = () => {
    if (!title.trim() || !content.trim() || !currentUser) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    const newPost = {
      id: `post-${Date.now()}`,
      title: title.trim(),
      content: content.trim(),
      category,
      user: currentUser,
      createdAt: new Date().toISOString(),
      likes: 0,
      comments: [],
      images: images.length > 0 ? images : undefined,
    };

    dispatch(addPost(newPost));
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.categoryButtons}>
        <TouchableOpacity
          style={[
            styles.categoryButton,
            category === 'question' && styles.categoryButtonActive,
          ]}
          onPress={() => setCategory('question')}
        >
          <Text
            style={[
              styles.categoryButtonText,
              category === 'question' && styles.categoryButtonTextActive,
            ]}
          >
            Question
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.categoryButton,
            category === 'thought' && styles.categoryButtonActive,
          ]}
          onPress={() => setCategory('thought')}
        >
          <Text
            style={[
              styles.categoryButtonText,
              category === 'thought' && styles.categoryButtonTextActive,
            ]}
          >
            Thought
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.titleInput}
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
          maxLength={100}
        />
        <TextInput
          style={styles.contentInput}
          placeholder="Share your thoughts..."
          value={content}
          onChangeText={setContent}
          multiline
          textAlignVertical="top"
        />
      </View>

      {images.length > 0 && (
        <ScrollView 
          horizontal 
          style={styles.imagePreviewContainer}
          showsHorizontalScrollIndicator={false}
        >
          {images.map((uri, index) => (
            <View key={index} style={styles.imagePreview}>
              <Image source={{ uri }} style={styles.previewImage} />
              <TouchableOpacity
                style={styles.removeImageButton}
                onPress={() => setImages(images.filter((_, i) => i !== index))}
              >
                <MaterialCommunityIcons name="close-circle" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      )}

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.imageButton}
          onPress={handleImagePick}
        >
          <MaterialCommunityIcons name="image-plus" size={24} color="#4A8B57" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmit}
        >
          <Text style={styles.submitButtonText}>Post</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  categoryButtons: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  categoryButton: {
    flex: 1,
    paddingVertical: 8,
    marginHorizontal: 4,
    borderRadius: 20,
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  categoryButtonActive: {
    backgroundColor: '#4A8B57',
  },
  categoryButtonText: {
    color: '#666',
    fontWeight: '600',
  },
  categoryButtonTextActive: {
    color: '#fff',
  },
  inputContainer: {
    padding: 16,
  },
  titleInput: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  contentInput: {
    fontSize: 16,
    minHeight: 150,
    lineHeight: 24,
  },
  imagePreviewContainer: {
    padding: 16,
  },
  imagePreview: {
    marginRight: 8,
  },
  previewImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  removeImageButton: {
    position: 'absolute',
    top: -8,
    right: -8,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  imageButton: {
    padding: 8,
  },
  submitButton: {
    flex: 1,
    backgroundColor: '#4A8B57',
    paddingVertical: 12,
    borderRadius: 24,
    marginLeft: 16,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default AddPostScreen;