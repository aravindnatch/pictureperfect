import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AppParamList } from './AppParamList';
import { Profile } from './ProfileTab/Profile';
import { Locations } from './LocationsTab/Locations';

interface AppTabsProps {}

const Tabs = createBottomTabNavigator<AppParamList>();

export const AppTabs: React.FC<AppTabsProps> = ({}) => {
    return (
      <Tabs.Navigator 
        screenOptions={({ route }) => ({
          // tabBarIcon: ({ color, size }) => {
          //   switch (route.name) {
          //     case 'Poker':
          //       return <MaterialCommunityIcons name="poker-chip" size={size} color={color} />;
          //     case 'Profile':
          //       return <MaterialCommunityIcons name="account" size={size} color={color} />;
          //   }
          // },
          tabBarStyle: {borderTopWidth: 0},
          headerStyle: {borderBottomWidth: 0},
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tabs.Screen name='Locations' options={{headerStyle: {shadowColor: 'transparent'}}} component={Locations} />
        <Tabs.Screen name='Profile' options={{headerStyle: {shadowColor: 'transparent'}}} component={Profile} />
      </Tabs.Navigator>
    );
}