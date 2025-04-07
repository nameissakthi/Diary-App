// screens/DiaryDetailScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Alert, TouchableOpacity, Button } from 'react-native';
import { getDiaryRecord, deleteDiaryRecord } from '../api';
import { BACKEND_URL } from "@env"

export default function DiaryDetailScreen({ route, navigation }) {
  // Retrieve the record ID from navigation parameters
  const { id } = route.params;
  
  // State to hold the fetched record and loading status
  const [record, setRecord] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecord = async () => {
      try {
        const data = await getDiaryRecord(id, BACKEND_URL);
        const [recordId, date, time, message] = data.data;
        setRecord({
            recordId,
            date,
            time,
            message
        });
      } catch (error) {
        console.error('Error fetching diary record:', error);
        Alert.alert('Error', 'Failed to fetch diary record.');
      } finally {
        setLoading(false);
      }
    };

    fetchRecord();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!record) {
    return (
      <View style={styles.container}>
        <Text>No record found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Date:</Text>
      <Text style={styles.value}>{record.date}</Text>
      
      <Text style={styles.label}>Time:</Text>
      <Text style={styles.value}>{record.time}</Text>
      
      <Text style={styles.label}>Message:</Text>
      <Text style={styles.value}>{record.message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    marginBottom: 10,
  }
});