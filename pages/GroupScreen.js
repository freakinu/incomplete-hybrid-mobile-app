import * as React from 'react';
import { Image, View, ImageBackground, Text, Button, TextInput, Alert, TouchableOpacity, StyleSheet} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler'
import * as Animatable from 'react-native-animatable'
import { rest } from '../include';
import { NavigationHelpersContext } from '@react-navigation/native';
import { Dropdown } from 'react-native-element-dropdown';
import EncryptedStorage from 'react-native-encrypted-storage';


/** 
 * POST request to rest/create_group 
 * 
 * @param {number} user_id
 * @param {number} match_id
 * @param {number} max
 * @param {string} name
 * @param {number} challenge_id
 * @param {number} team_id
 *
*/

async function addGroup(user_id, match_id, max , name, challenge_id , team_id, nav) {
    fetch(`${rest}rest/create_group`, {
        method:'post', 
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({user_id: user_id, match_id:match_id, max:max, name:name, challenge_id: challenge_id, team_id, team_id})
    }).then(response => response.json())
       .then( async(data) => {
            if(data.status == 'success'){
                nav.navigate('GroupChat', {group_id: data.id, match_id: match_id, user_id:user_id })
                return
            }

            Alert.alert(data.message)
            
       })
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      padding: 16,
    },
    dropdown: {
      height: 50,
      borderColor: 'gray',
      borderWidth: 0.5,
      borderRadius: 8,
      paddingHorizontal: 8,
    },
    icon: {
      marginRight: 5,
    },
    label: {
      position: 'absolute',
      backgroundColor: 'white',
      left: 22,
      top: 8,
      zIndex: 999,
      paddingHorizontal: 8,
      fontSize: 14,
      color:'black'
    },
    placeholderStyle: {
      fontSize: 16,
    },
    selectedTextStyle: {
      fontSize: 16,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
  });

class Choices extends React.Component{
 
    render() {
        
        var data = []
      
        let obj = {}
        let new_arr = []
        this.props.m.forEach( (match) => { 
            new_arr.push({label: match.m, value:match.id})
        })
   
        return (
            <DropdownComponent data={new_arr} />
        )
    }
}



class Groups extends React.Component {

    render() {

       let items = []

       this.props.groups.forEach( ( group) => {
            
                items.push(  
                    <TouchableOpacity onPress={ () => { this.props.nav.navigate('GroupChat', {group_id: group.id, match_id: group.match_id ,user_id: this.props.user_id})  }}  style={{ flexDirection:'row'}}>
                        <Text style={{color:'white', fontSize:20, marginRight:10}}>{group.name}</Text>
                        <Text style={{color:'white', fontSize:20}}>{group.team_1} vs {group.team_2}</Text>
                    </TouchableOpacity>
                )   
        })

        return (
                    <Animatable.View  animation="zoomInUp" style={{flexDirection:'column',height:200,  flexShrink:0 ,padding:10, justifyContent:'center', position:'absolute', bottom:0, zIndex:1000}}>
                     
                        <Text style={{color:'white', fontSize:15}}>My Groups</Text>
                        <ScrollView>
                            {items}
                        </ScrollView>
                       
                    </Animatable.View>  
        )
    }
}

const GroupScreen = ({route, navigation}) => {

    const [loading, setLoading] = React.useState(true)
    const [matches, setMatches] = React.useState([])
    const [groups, setGroups] = React.useState(null)
    const [max, setMax] = React.useState(2)
    const [matchesDropdownValue, setMatchesDropdownValue] = React.useState(null)
    const [matchesDropdownData, setMatchesDropdownData] = React.useState(null)
    const [challengesDropdownData, setChallengesDropdownData] = React.useState(null)
    const [challengesDropdownValue, setChallengesDropdownValue] = React.useState(null)
    const [groupName , setGroupName] = React.useState(null)
    const [userId, setUserId] = React.useState(null)

    const getUserId = async () => {
        try{
            let user_id = await EncryptedStorage.getItem('user_id')
            setUserId(user_id)

        } catch(e) {
            Alert.alert('please check for correct permissions')
        }
    }

    getUserId()
    
    const fetchMatches = async() => {
        const resp = await fetch(`${rest}rest/matches?simple`)
        const data = await resp.json() 
  
        let new_arr = []
        data.forEach( (match) => { 
            new_arr.push({label: match.m, value:match.id})
        })
  
        setMatchesDropdownData(new_arr)
      
      }

    const getGroups = async () => {
        const resp = await fetch(`${rest}rest/challenge_groups`)
        const data = await resp.json() 

        if(data.status !== 'success'){
            Alert.alert('an error has been occured, please try again later')
            return 
        }

        setGroups(data.data)
    }

    const fetchCallenges = async () => {
        const resp = await fetch(`${rest}rest/challenges`)
        const data = await resp.json() 

        let new_arr = []
        data.forEach( (challenge) => {
            new_arr.push({label: challenge.challenge_name, value: challenge.id})
        })

        setChallengesDropdownData(new_arr)

    }

    React.useEffect( () => { 

        setInterval( () => { getGroups() }, 5000)
        fetchMatches() 
        fetchCallenges()
       
    
    }, [])

    return (

       
        <ImageBackground resizeMode={loading == true ? 'cover' : 'cover'} style={{flex:1, height:'100%'}} source={(groups !== null) == false ? require('../img/loading.png') : require('../img/add_grp.png')}>
        
        {groups !== null ?(
        <View style={{flex:1, padding:15, flexDirection:'column'}} >
           
            <TextInput style={{backgroundColor:'white', marginBottom:5, color:'black'}}  onChangeText={setGroupName} value={groupName} placeholder='Group Name' /> 
             <Animatable.View animation="bounceIn" style={{flexDirection:'row'}}>
                <TouchableOpacity onPress ={ () => { setMax(2)}}>
                    <View style={{justifyContent:'center'}}>
                        <Image source={require('../img/yellow_btn.png')} style={{width:80, height:70}} resizeMode='stretch' />
                        <Text style={{color: (max == 2 ? 'red' : 'black'), fontFamily:'Kanit-Bold', fontSize:15, textAlign:'center', alignSelf:'center', position:'absolute'}}>2</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress ={ () => { setMax(4)}}>
                    <View style={{justifyContent:'center'}}>
                        <Image source={require('../img/yellow_btn.png')} style={{width:80, height:70}} resizeMode='stretch' />
                        <Text style={{color:max == 4 ? 'red' : 'black', fontFamily:'Kanit-Bold', fontSize:15, textAlign:'center', alignSelf:'center', position:'absolute'}}>4</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress ={ () => { setMax(6)}}>
                    <View style={{justifyContent:'center'}}>
                        <Image source={require('../img/yellow_btn.png')} style={{width:80, height:70}} resizeMode='stretch' />
                        <Text style={{color:max == 6 ? 'red' : 'black', fontFamily:'Kanit-Bold', fontSize:15, textAlign:'center', alignSelf:'center', position:'absolute'}}>6</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress ={ () => { setMax(8)}}>
                    <View style={{justifyContent:'center'}}>
                        <Image source={require('../img/yellow_btn.png')} style={{width:80, height:70}} resizeMode='stretch' />
                        <Text style={{color:max == 8 ? 'red' : 'black', fontFamily:'Kanit-Bold', fontSize:15, textAlign:'center', alignSelf:'center', position:'absolute'}}>8</Text>
                    </View>
                </TouchableOpacity>
             </Animatable.View>
              
             {matchesDropdownData !== null ? (
             <Animatable.View animation="bounceIn" style={styles.container}>

             <Dropdown
                style={[styles.dropdown]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={matchesDropdownData}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={'Select item'}
                searchPlaceholder="Search..."
                onChange={ (item) => { setMatchesDropdownValue(item.value)}}
                value={matchesDropdownValue}
        
            />

        </Animatable.View>
        ) : null}

{challengesDropdownData !== null ? (
             <Animatable.View animation="bounceIn" style={styles.container}>

             <Dropdown
                style={[styles.dropdown]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={challengesDropdownData}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={'Select item'}
                searchPlaceholder="Search..."
                onChange={ (item) => { setChallengesDropdownValue(item.value)}}
                value={challengesDropdownValue}
        
            />

        </Animatable.View>
        ) : null}
      
             
            {userId !== null ? <View style={{  width:'100%', alignSelf:'center'}}><Button color="#00ad22" onPress={ () => { addGroup(userId, matchesDropdownValue, max, groupName, challengesDropdownValue, 53, navigation)} }  title="Add Group" /></View> : null} 
            
           <Groups groups={groups} user_id={userId} nav={navigation}/> 
           
        
        </View>
           
       ): null }

      {groups !== null ? <View style={{position:'absolute', backgroundColor:'black', height:200, opacity:0.5, bottom:0, width:'100%'}} /> : null}


     </ImageBackground>


    )
}

export default GroupScreen;
