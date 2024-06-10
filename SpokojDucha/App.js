import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainPage from "./components/MainPage";
import WelcomePage from "./components/WelcomePage";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import AddCementeryPage from "./components/AddCementeryPage";
import DecedentForm from "./components/DecedentForm";
import { TouchableOpacity, Image } from 'react-native';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={MainPage}
          options={({ navigation }) => ({
            title: "",
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
                <Image
                  style={{ width: 25, height: 25 }}
                  source={require('./assets/settings.png')}
                />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="Profile"
          component={LoginPage}
          options={({ navigation }) => ({
            title: "Logowanie",
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
                <Image
                  style={{ width: 25, height: 25 }}
                  source={require('./assets/settings.png')}
                />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="Register"
          component={RegisterPage}
          options={({ navigation }) => ({
            title: "Rejestracja",
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
                <Image
                  style={{ width: 25, height: 25 }}
                  source={require('./assets/settings.png')}
                />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="Welcome"
          component={WelcomePage}
          options={({ navigation }) => ({
            title: "Strona główna",
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
                <Image
                  style={{ width: 25, height: 25 }}
                  source={require('./assets/settings.png')}
                />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="Add cementery"
          component={AddCementeryPage}
          options={({ navigation }) => ({
            title: "Dodaj cmentarz",
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
                <Image
                  style={{ width: 25, height: 25 }}
                  source={require('./assets/settings.png')}
                />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="Add decedent"
          component={DecedentForm}
          options={({ navigation }) => ({
            title: "Dodaj grób",
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
                <Image
                  style={{ width: 25, height: 25 }}
                  source={require('./assets/settings.png')}
                />
              </TouchableOpacity>
            ),
          })}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
