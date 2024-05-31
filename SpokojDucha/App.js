import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainPage from "./components/MainPage";
import WelcomePage from "./components/WelcomePage"; 
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import AddCementeryPage from "./components/AddCementeryPage";
import DecedentForm from "./components/DecedentForm";
import WalkingSpeedVideo from "./components/WalkingSpeedVideo";
import ActivityLogger from "./components/WalkingSpeedVideo";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={MainPage}
          options={{ title: "Welcome" }}
        />
        <Stack.Screen
          name="Profile"
          component={LoginPage}
          options={{ title: "Login" }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterPage}
          options={{ title: "Register" }}
        />
        <Stack.Screen
          name="Welcome"
          component={WelcomePage}
          options={{ title: "Welcome!" }}
        />
        <Stack.Screen
          name="Add cementery"
          component={AddCementeryPage}
          options={{ title: "Add cementery" }}
        />
        <Stack.Screen
          name="Add decedent"
          component={DecedentForm}
          options={{ title: "Add decedent" }}
        />
        <Stack.Screen
          name="Watch video"
          component={ActivityLogger}
          options={{ title: "Watch" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
