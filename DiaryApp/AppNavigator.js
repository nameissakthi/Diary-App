// AppNavigator.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DiaryListScreen from './screens/DiaryListScreen';
import DiaryFormScreen from './screens/DiaryFormScreen';
import DiaryDetailScreen from './screens/DiaryDetailScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="DiaryList">
        <Stack.Screen name="DiaryList" component={DiaryListScreen} options={{ title: 'My Diary' }} />
        <Stack.Screen name="DiaryForm" component={DiaryFormScreen} options={{ title: 'Add Entry' }} />
        <Stack.Screen name="DiaryDetail" component={DiaryDetailScreen} options={{ title: 'Entry Details' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}