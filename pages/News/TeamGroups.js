import * as React from 'react';
import {View, Text,ImageBackground, SafeAreaView, Image, StyleSheet, ScrollView} from 'react-native';

import { rest, flags} from '../../include';

const Line = () => {
    return <View style={{
       marginVertical: 8,
       borderBottomColor: 'white',
       borderBottomWidth: StyleSheet.hairlineWidth,
   }} />
}


class Group extends React.Component{

    render() {

        let views = [] 

        this.props.countries.forEach( (country) => {

            let cc = country.split(':')[1]
            let name = country.split(':')[0]

            views.push(
                <View style={{flex:1, flexDirection:'row', width:'100%', flexGrow:1, marginTop:5, marginBottom:5}}>
                    <Image style={{width:60,height:40}} source={flags[cc]}></Image>
                    <Text style={{color:'white', fontSize:20, fontFamily:'Kanit-Regular', marginLeft:10, fontSize:15}}>{name}</Text>
                </View>)
            
        })

        views.push(<Line />)

        return(
            <View style={{flex:1, flexDirection:'column', padding:10}}>
                <Text style={{color:'white', fontSize:20, fontFamily:'Kanit-Regular', marginBottom:5}}>Group {this.props.letter}</Text>
                {views}
            </View>
        )
    }
}

class List extends React.Component{

    render() { 

        let all = []

        
        this.props.groups.forEach( (group) => {
            
          all.push(<Group countries={group.teams.split(',')} letter={group.lt} />)
        })

        return (
            <View style={{flexDirection:'column'}}>
              {all}
            </View>
        )
    }
}


const TeamGroups = () => {

    const [loading, setLoading] = React.useState(true) 
    const [data, setData] = React.useState([])


    let items = []
    const singleGroup = async() => {
        const resp = await fetch(`${rest}rest/groups`)
        const data = await resp.json()

        setData(<List groups={data} />)
        setLoading(false)
    }

    React.useEffect( () => {   singleGroup() }, [])

    return(
        <SafeAreaView style={{flex:1}}>
            <ImageBackground resizeMode={loading == true ? 'cover' : 'cover'} style={{flex:1, height:'100%'}} source={loading == true ? require('../../img/loading.png') : require('../../img/background.png')}>

            <ScrollView>
            {loading == true ? (
                    null
                ) : (
                    <View style={{padding: 0, flex:1, flexDirection:'column', justifyContent:'center', width:'100%'}}>
                    {data}
                   </View>
                )}

            </ScrollView>
  

            </ImageBackground>
        </SafeAreaView>
    );
}

export default TeamGroups;

