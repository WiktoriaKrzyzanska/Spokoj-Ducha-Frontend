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
import SettingsPage from "./components/SettingsPage";
import { FontSizeProvider } from "./contexts/FontSizeContext";
import SearchDecedent from "./components/SearchDecedent";
import UploadVideo from "./components/UploadVideoPage";
import NavigatePage from "./components/NavigationPage";
import AuthorsPage from "./components/AuthorsPage";
const Stack = createNativeStackNavigator();


const App = () => {
  return (
    <FontSizeProvider>
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
          <Stack.Screen
            name="Search"
            component={SearchDecedent}
            options={({ navigation }) => ({
              title: "Wyszukaj zmarłego",
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
            name="Settings"
            component={SettingsPage}
            options={{ title: "Settings" }}
          />
          <Stack.Screen
            name="UploadVideo"
            component={UploadVideo}
            options={{ title: "Dodaj video" }}
          />
          <Stack.Screen
            name="NavigatePage"
            component={NavigatePage}
            options={{ title: "Navigate" }}
          />
           <Stack.Screen
            name="Authors"
            component={AuthorsPage}
            options={{ title: "O autorach" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </FontSizeProvider>
  );
};

export default App;