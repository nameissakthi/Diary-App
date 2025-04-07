// screens/DiaryListScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, TouchableOpacity, StyleSheet } from 'react-native';
import { listDiaryRecords } from '../api';
import { BACKEND_URL } from "@env"
import { DevSettings } from 'react-native';

export default function DiaryListScreen({ navigation }) {
  const [diaries, setDiaries] = useState([]);

  const fetchDiaries = async () => {
    try {
      const data = await listDiaryRecords(BACKEND_URL);
      if (data.success) {
        setDiaries(data.Messages);
      } else {
        console.error('API returned success: false');
      }
    } catch (error) {
      console.error('Error fetching diary records:', error);
    }
  };

  useEffect(() => {
    fetchDiaries();
  }, [navigation]);

  const reloadApp = () => {
    DevSettings.reload();
  }

  const renderItem = ({ item }) => {
    // Destructure the array: [id, date, time, message]
    const [id, date, time, message] = item;
    return (
      <TouchableOpacity onPress={() => navigation.navigate('DiaryDetail', { id })}>
        <View style={styles.itemContainer}>
          <Text style={styles.itemTitle}>Message ID: {id}</Text>
          <Text>Date: {date}   Time: {time}</Text>
          <Text numberOfLines={1}>Message: {message}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button title="Add New Entry" onPress={() => navigation.navigate('DiaryForm')} />
        <Button title="Reload" onPress={reloadApp} />
      </View>
      <FlatList
        data={diaries}
        keyExtractor={(item) => item[0].toString()}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 5,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  }
});