import * as React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faNewspaper } from '@fortawesome/free-solid-svg-icons/faNewspaper'
import { faUserGroup } from "@fortawesome/free-solid-svg-icons/faUserGroup"
import { faUser } from "@fortawesome/free-solid-svg-icons/faUser"
import { faAward, faBold, faFootball, faFutbol } from '@fortawesome/free-solid-svg-icons';
import { SafeAreaView,View,TextInput,Text, Alert, Image } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import ProfileScreen from './pages/ProfileScreen';
import NewsScreen from './pages/NewsScreen';
import PrizesScreen from './pages/Prizes';
import GroupScreen from './pages/GroupScreen';
import NewGroupForm from './pages/Group/NewGroupForm';
import Live from './pages/News/Live';
import Matches from './pages/News/Matches';
import TeamGroups from './pages/News/TeamGroups';
import LoginRegisterScreen from './pages/LoginRegisterScreen';
import LoginScreen from './pages/LoginScreen';
import ScorersScreen from './pages/ScorersScreen';

import EncryptedStorage from 'react-native-encrypted-storage';
import VerifyScreen from './pages/VerifyScreen';
import { rest} from './include';
import YoutubeWebView from './pages/YoutubeWebView';
import LatestNews from './pages/News/LatestNews';
import GroupChat from './pages/GroupChat';
import { I18nManager} from 'react-native';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
 
function GroupStack() {
  return (
      <Stack.Navigator initialRouteName='GroupScreen' screenOptions={{headerShown:false}}>

        <Stack.Screen 
          name="GroupScreen"
          component={GroupScreen}
          />
    
        <Stack.Screen
          name="GroupChat"
          component={GroupChat}
          />

      </Stack.Navigator>
  );
}

function NewsStack(){
  return(
    <Stack.Navigator
      initialRouteName='NewsScreen' 
      screenOptions={{ headerShown:false }}>

      <Stack.Screen name="NewsScreen"component={NewsScreen} />
      <Stack.Screen name="TeamGroups" component={TeamGroups} />
      <Stack.Screen name="Matches" component={Matches}/>
      <Stack.Screen name="Live" component={Live}/>
      <Stack.Screen name="ScorersScreen" component={ScorersScreen}/>
      <Stack.Screen name="LatestNews" component={LatestNews} />
      </Stack.Navigator>
  );
}

export function PrizesStack(){

  return (
    <Stack.Navigator initialRouteName='Prizes' screenOptions={{headerShown:false}}>
      <Stack.Screen name="Prizes"  component={PrizesScreen}/>
      <Stack.Screen name="Youtube" component={YoutubeWebView} />
    </Stack.Navigator>
  )
}

function MainScreen(){
  return (
   
      <Tab.Navigator
        initialRouteName="News"
   
        screenOptions={{
        "tabBarActiveTintColor": "#3a43fc",
        headerShown:false,
        "tabBarStyle": [
          {
            "display": "flex"
          },
          null
        ]}}
        >

        <Tab.Screen
          name="News"
          component={NewsStack}
          options={{
            tabBarLabel: 'News',
            tabBarIcon: ({ color, size }) => (
             <FontAwesomeIcon icon={faNewspaper} />
            ),
          }} />

        <Tab.Screen
          name="Prizes"
          component={PrizesStack}
          options={{
            tabBarLabel: 'Prizes',
            tabBarIcon: ({ color, size }) => (
             <FontAwesomeIcon icon={faAward} />
            ),
          }} />

      <Tab.Screen
          name="GroupStack"
          component={GroupStack}
          options={{
            tabBarLabel: 'Group',
            tabBarIcon: ({ color, size }) => (
             <FontAwesomeIcon icon={faUserGroup} />
            ),
         }} />

      <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({ color, size }) => (
             <FontAwesomeIcon icon={faUser} />
            ),
         }} />
      </Tab.Navigator>)
}


function LoginRegister(){
  return (
  <Stack.Navigator initialRouteName='LoginRegister' screenOptions={{headerShown:false, animationEnabled:false}}>
    <Stack.Screen name="LoginRegister" component={LoginRegisterScreen} />
    <Stack.Screen name="LoginScreen" component={LoginScreen} />
  </Stack.Navigator>);
}

class Header extends React.Component {
      render() {
        return(
        <View style={{flexDirection:'row', justifyContent:'flex-end', backgroundColor:'#243c3c'}}>
          <Text style={{fontSize:16, color:'black', margin:7, color:'#fedf21'}}>{this.props.points}</Text>
          <FontAwesomeIcon icon={faFutbol} style={{alignSelf:'center', marginEnd:5, color:'white', width:20, height:20}}/>
          <Text style={{fontSize:16, color:'black', margin:7, color:'#fedf21'}}>{this.props.name}</Text>
          <FontAwesomeIcon icon={faUser} style={{alignSelf:'center', marginEnd:5, color:'white', width:20, height:20}}/>
          </View>
      
      )
    }

}

export const AuthContext = React.createContext();
function App({navigation}) {
  const [verify, setVerify] = React.useState(false)
  const [userInfo, setUserInfo] = React.useState({})

  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch(action.type){
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            token: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            token: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            token: null,
          };
        case 'SET_EMAIL':
          return {
            ...prevState,
            email: action.email
          };

        case 'SET_INFO':
          return {
            ...prevState,
            info: action.info
          };
        }
       },
      {
       isLoading: true,
       isSignout: false,
       token: null,
      }
   );



  
   const authContext = React.useMemo(
    () => ({
      verifyFunc : async(verify_data) => {
   
        fetch(`${rest}rest/verify`, {
          method:'post',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            email: verify_data.email,
            code: verify_data.code 
          }),

        }).then(response => response.json())
          .then( async(data) => {
            if(data.status !== 'success'){
              Alert.alert(data.message)
              return
            }

            try{

              await EncryptedStorage.setItem('token', data.token)
              await EncryptedStorage.setItem('user_id', String(data.user_id))
              
              dispatch({ type: 'SIGN_IN', token: data.token });
            } catch(e){
              Alert.alert('Please recheck the permissions');
            }
          })
      },

      

      signIn: async (login_data) => {

        fetch(`${rest}rest/login`, {
          method:'post',
          headers:{'Content-Type': 'application/json'},
          body: JSON.stringify({
            email: login_data.email,
            password: login_data.password
          })
        }).then(response => response.json())
          .then( async(data) => {

            if(data.status !== 'success'){
              Alert.alert(data.message)
              return 
            }

            try{
              await EncryptedStorage.setItem('token', data.token)
              await EncryptedStorage.setItem('user_id', String(data.user_id))
              dispatch({ type: 'SIGN_IN', token: data.token });
            } catch{
              Alert.alert('Please recheck the permissions');
            }
           
          })

       
        
      },

      signOut: () => { 

        try{
          EncryptedStorage.clear() 
        } catch {
          Alert.alert('please reacheck your permissions')
        }

        dispatch({ type: 'SIGN_OUT' })
      },

      signUp: async (register_data) => {

        fetch(`${rest}rest/register`, {
          method:'post',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            email: register_data.email,
            password: register_data.password
          }),
          
        })
        
        .then(response => response.json())
        .then( (data) => {
        
          try{
    
            if(data.status !== 'success'){
              Alert.alert(data.message)
              return
            }


            dispatch({type:'SET_EMAIL', email: register_data.email})
           // dispatch('RESTORE_TOKEN',)
            setVerify(true)
           
          } catch(err){
            Alert.alert('please check your internet connection')
            Alert.alert(err.message)
          }
        })


        dispatch({ type: 'SIGN_IN', token: data.token });
      
      },
    }),
    []
  );
  

  React.useEffect( () => {

    const getUserInfo = async(token) => {
      const resp = await fetch(`${rest}rest/get_user_info?token=${token}`)
      const data = await resp.json() 

      if(data.status !== 'success'){
        Alert.alert('an error have been occured, please try again')
        dispatch({type:"SIGN_OUT"})
        authContext.signOut() 
        return 
      }

      setUserInfo(data.data)
      
    }

    const getToken = async () => {
      let token = null;

      try{
        token = await EncryptedStorage.getItem('token');
        dispatch({type: 'RESTORE_TOKEN', token: token});
        if(token !== null)
          getUserInfo(token)
      } catch (e){
        Alert.alert('please recheck the permissions')
      }

     
    }

    getToken();
   
   }, []);


  I18nManager.allowRTL(false);
  return(

  <AuthContext.Provider value={authContext}>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{header: () => { return <Header points={userInfo.points} name={userInfo.full_name}/>}}}>

        {state.token == null ? (

          verify == true ? (
            <Stack.Screen name="VerifyScreen" component={VerifyScreen} initialParams={{email:state.email}} />
          ) : (
            <Stack.Screen name="LoginRegister" component={LoginRegister} />
          )
         
        ) : (
          <Stack.Screen name="MainScreen" component={MainScreen} />
        )}
      </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>

  );
  

  
}
export default App;
