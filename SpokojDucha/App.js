import React from 'react'; // Import React
import { StyleSheet, Text, View, TextInput, Button } from 'react-native'; // Import necessary components

export default function App() {
  const doLoginStuff = () => {
    console.log('Login button pressed');
  };

  return (
    <View style={styles.container}>
      <View style={styles.loginTextSection}>
        <TextInput placeholder='UserName' style={styles.inputText} />
        <TextInput placeholder='Password' style={styles.inputText} secureTextEntry={true}/>
      </View>
     
      <View style={styles.loginButtonSection}>
        <Button onPress={() => doLoginStuff()} 
                title="Login"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginTextSection: {
    marginBottom: 20,
  },
  inputText: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 10, 
    width: 200, 
  },
  loginButtonSection: {
    width: '100%',
    height: '30%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButton: {
    backgroundColor: 'blue',
    color: 'white'
  },
});
