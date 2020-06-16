// rn gesture handler needed, as per reactnavigation docs: https://reactnavigation.org/docs/getting-started
import 'react-native-gesture-handler';
import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer, ParamListBase } from '@react-navigation/native';
import {
  createStackNavigator,
  StackScreenProps,
} from '@react-navigation/stack';

function HomeScreen({ navigation }: StackScreenProps<ParamListBase>) {
  console.log(navigation);
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Overview"
        onPress={() =>
          navigation.navigate('Overview', {
            itemId: 21,
            otherParam: 'boop',
          })
        }
      />
    </View>
  );
}

function Overview({ navigation }: StackScreenProps<ParamListBase>) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Overview Screen</Text>
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
    </View>
  );
}

function ManageMyShops() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Manage My Shops</Text>
    </View>
  );
}
function AddShop() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Add a Shop</Text>
    </View>
  );
}

const Stack = createStackNavigator();

export function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Overview" component={Overview} />
        <Stack.Screen name="Manage My Shops" component={ManageMyShops} />
        <Stack.Screen name="Add a Shop" component={AddShop} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
