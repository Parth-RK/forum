// src/navigation/BottomTabNavigator.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomTabParamList } from '../types';
import ForumScreen from '../screens/ForumScreen';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator<BottomTabParamList>();

export const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#4A8B57',
        tabBarInactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen
        name="Questions"
        component={ForumScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="frequently-asked-questions" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Thoughts"
        component={ForumScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="thought-bubble" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

