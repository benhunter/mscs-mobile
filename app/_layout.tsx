import {Stack} from 'expo-router/stack';

export default function Layout() {
  return <Stack
    screenOptions={{
      // headerShown: false,
      // headerStyle: {
      //   backgroundColor: '#fff',
      // },
      // headerTintColor: '#000',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}
  />;
}
