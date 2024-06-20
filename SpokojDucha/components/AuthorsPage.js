import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontSizeContext } from '../contexts/FontSizeContext';

const AuthorsPage = () => {
  const { fontSizeDelta } = React.useContext(FontSizeContext);

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { fontSize: 24 + fontSizeDelta }]}>Autorzy</Text>
      <Text style={[styles.author, { fontSize: 16 + fontSizeDelta }]}>Wiktoria Krzyżańska</Text>
      <Text style={[styles.author, { fontSize: 16 + fontSizeDelta }]}>Przemysław Podemski</Text>
      <Text style={[styles.author, { fontSize: 16 + fontSizeDelta }]}>Julia Trzebuchowska</Text>
      <Text style={[styles.author, { fontSize: 16 + fontSizeDelta }]}>Michał Wolańczyk</Text>
      <Text style={[styles.author, { fontSize: 16 + fontSizeDelta }]}>Krzysztof Kopczyński</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 20,
  },
  author: {
    marginBottom: 10,
  },
});

export default AuthorsPage;
