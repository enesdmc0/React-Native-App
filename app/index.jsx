import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { Link } from 'expo-router'

export default function App() {
  return (
    <View className="bg-red-400 border flex items-center">
      <Text className="text-3xl">Hello world dd</Text>
      <StatusBar style="auto" />
      <Link className='bg-blue font-pblack' href='/profile'>dwdwd</Link>
    </View>
  );
}
