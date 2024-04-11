# Spokoj-Ducha-Frontend
Introduction
This guide will help you set up and run the Spokoj Ducha frontend application on your local machine. The app is designed to work in conjunction with its corresponding backend, allowing for a complete experience.

Prerequisites
Before you start, ensure you have the following installed:
Git
Node.js (latest version)
Expo CLI
Setup Instructions
Clone the Repository

1. Begin by cloning the Spokoj Ducha Frontend repository from GitHub:

git clone https://github.com/WiktoriaKrzyzanska/Spokoj-Ducha-Frontend.git

2. Update Node.js

Make sure Node.js is updated to the newest version to avoid compatibility issues. You can update Node.js from the official Node.js website.

3. Set Up Expo Environment

If you haven't already, install the Expo CLI globally on your machine:

npm install -g expo-cli

This is required to run and build Expo applications.

4. Start the App

Navigate to the SpokojDucha folder within the cloned repository, then start the application using Expo:

cd SpokojDucha
npx expo start
A QR code will be displayed in your terminal. You can scan this QR code with the Expo Go app (available on iOS and Android) to view the application on your device.

5. Connect to the Backend (Optional)

To run the app with the corresponding backend, follow these additional steps:

a. Open a Command Prompt and type ipconfig to find your IP address.

b. Navigate to microservices/auth/Auth.js and replace the 'x's in the URL with your IP address. This step ensures your frontend app can communicate with the backend services.

6. Restarting the App

For major updates or changes, stop the app by pressing CTRL+C in your terminal, then rerun it with npx expo start.
For minor updates, you can simply shake your device slightly to open the Expo Developer menu and use the reload function.

Additional Information
Ensure your mobile device is connected to the same network as your computer to allow for seamless communication with the backend services when running the app locally.
Consult the Expo documentation for more detailed instructions on using Expo and troubleshooting common issues.