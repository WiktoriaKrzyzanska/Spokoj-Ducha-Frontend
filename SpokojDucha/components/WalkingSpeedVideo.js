import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, Button, TextInput, ScrollView } from 'react-native';
import { Accelerometer } from 'expo-sensors';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

const ActivityLogger = () => {
  const [logging, setLogging] = useState(false);
  const [activityLabel, setActivityLabel] = useState('');
  const [logData, setLogData] = useState([]);
  const [sessionCount, setSessionCount] = useState(0);
  const [subscription, setSubscription] = useState(null);
  const [logHistory, setLogHistory] = useState([]);

  useEffect(() => {
    const calculateSpeed = ({ x, y, z }) => {
      const timestamp = new Date().toISOString();
      const acceleration = Math.sqrt(x * x + y * y + z * z);
      if (logging) {
        setLogData(prevData => [
          ...prevData,
          { timestamp, acceleration, activity: activityLabel }
        ]);
      }
    };

    Accelerometer.setUpdateInterval(100);
    const sub = Accelerometer.addListener(calculateSpeed);
    setSubscription(sub);

    return () => {
      sub && sub.remove();
    };
  }, [logging, activityLabel]);

  const startLogging = () => {
    setLogData([]);
    setLogging(true);
  };

  const stopLogging = () => {
    setLogging(false);
    setSessionCount(prevCount => prevCount + 1);
    setLogHistory(prevHistory => [
      ...prevHistory,
      { activity: activityLabel, data: logData }
    ]);
  };

  const saveLogData = async () => {
    const fileUri = FileSystem.documentDirectory + 'logData.json';
    await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(logHistory));
    alert('Log data saved to ' + fileUri);
  };

  const shareLogData = async () => {
    const fileUri = FileSystem.documentDirectory + 'logData.json';
    const fileExists = await FileSystem.getInfoAsync(fileUri);

    if (fileExists.exists) {
      await Sharing.shareAsync(fileUri);
    } else {
      alert('No log data file found to share');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Current Activity: {activityLabel}</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter activity label"
        value={activityLabel}
        onChangeText={setActivityLabel}
      />
      <Button title={logging ? "Stop Logging" : "Start Logging"} onPress={logging ? stopLogging : startLogging} />
      {!logging && logHistory.length > 0 && (
        <View style={styles.buttonContainer}>
          <Button title="Save Log Data" onPress={saveLogData} />
          <Button title="Share Log Data" onPress={shareLogData} />
        </View>
      )}
      <Text style={styles.text}>Session Count: {sessionCount}</Text>
      <Text style={styles.text}>Log Entries: {logData.length}</Text>
      <ScrollView style={styles.scrollView}>
        {logHistory.map((session, index) => (
          <View key={index} style={styles.session}>
            <Text style={styles.sessionText}>Activity: {session.activity}</Text>
            <Text style={styles.sessionText}>Entries: {session.data.length}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  scrollView: {
    marginTop: 20,
    width: '100%',
  },
  session: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  sessionText: {
    fontSize: 16,
  },
});

export default ActivityLogger;
