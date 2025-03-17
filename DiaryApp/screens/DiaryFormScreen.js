// screens/DiaryFormScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { addDiaryRecord } from '../api';

export default function DiaryFormScreen({ navigation }) {
  const [message, setMessage] = useState('');

  const handleSubmit = async () => {
    if (!message.trim()) {
      Alert.alert('Validation', 'Please enter a message.');
      return;
    }
    try {
      const newEntry = { message };
      await addDiaryRecord(newEntry);
      Alert.alert('Success', 'Diary entry added successfully.');
      navigation.goBack();
    } catch (error) {
      console.error('Error adding diary entry:', error);
      Alert.alert('Error', 'Failed to add diary entry.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Message</Text>
      <TextInput
        style={styles.textArea}
        multiline
        numberOfLines={10}
        placeholder="Enter your diary message here..."
        value={message}
        onChangeText={setMessage}
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  textArea: {
    height: 150,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    textAlignVertical: 'top', // ensures text starts at the top for Android
    marginBottom: 20,
  },
});
