// src/navigation/StackNavigator.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { BottomTabNavigator } from './BottomTabNavigator';
import PostDetailsScreen from '../screens/PostDetailsScreen';
import AddPostScreen from '../screens/AddPostScreen';
import ReportPostScreen from '../screens/ReportPostScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#ffffff',
        },
        headerTintColor: '#4A8B57',
      }}
    >
      <Stack.Screen 
        name="Home" 
        component={BottomTabNavigator} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="PostDetails" 
        component={PostDetailsScreen}
        options={{ title: 'Post' }}
      />
      <Stack.Screen 
        name="AddPost" 
        component={AddPostScreen}
        options={{ title: 'Create Post' }}
      />
      <Stack.Screen 
        name="ReportPost" 
        component={ReportPostScreen}
        options={{ title: 'Report Post' }}
      />
    </Stack.Navigator>
  );
};