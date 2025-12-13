import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack
        screenOptions={{
          // Default animation for all screens - even slower for smooth feel
          animation: 'slide_from_right',
          animationDuration: 700, // Increased from 500ms to 700ms for smoother transitions
        }}
      >
        {/* Main Tabs - No header */}
        <Stack.Screen 
          name="(tabs)" 
          options={{ 
            headerShown: false,
            animation: 'fade',
          }} 
        />
        
        {/* Login/Index Screen - No animation on first load */}
        <Stack.Screen 
          name="index" 
          options={{ 
            headerShown: false,
            animation: 'none',
          }} 
        />
        
        {/* Create Assignment Screen */}
        <Stack.Screen 
          name="create-assignment" 
          options={{ 
            title: 'Create Assignment',
            headerShown: true,
            animation: 'slide_from_bottom',
            presentation: 'card',
          }} 
        />
        
        {/* Student Details Screen */}
        <Stack.Screen 
          name="student-details" 
          options={{ 
            title: 'Student Details',
            headerShown: true,
            animation: 'slide_from_right',
          }} 
        />
        
        {/* Modal Screen */}
        <Stack.Screen 
          name="modal" 
          options={{ 
            presentation: 'modal', 
            title: 'Modal',
            animation: 'fade_from_bottom',
          }} 
        />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
