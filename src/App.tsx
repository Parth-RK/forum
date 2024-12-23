// src/App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './redux/store';
import { RootNavigator } from './navigation/StackNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';

const App: React.FC = () => {
  return (
    <ReduxProvider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
          <StatusBar barStyle="dark-content" backgroundColor="#fff" />
          <RootNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </ReduxProvider>
  );
};

export default App;