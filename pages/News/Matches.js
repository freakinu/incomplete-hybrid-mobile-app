import * as React from 'react';
import {View, Image,Text, SafeAreaView, StyleSheet, ImageBackground, ScrollView} from 'react-native';
import { useState } from 'react';
import { rest, flags} from '../../include';

const Line = () => {
     return <View style={{
        marginVertical: 8,
        borderBottomColor: 'white',
        borderBottomWidth: StyleSheet.hairlineWidth,
    }} />
}

export class Match extends React.Component{

    render(){ 

        return(
            <View style={{ height:80, marginTop:10, marginBottom:10, alignItems:'center', flexDirection:'column', padding:10}}>
                 <Text style={{color:'white', textAlign:'center', width:200, marginTop:3, alignItems:'center',flexGrow: 1, color:'white', fontSize:15}}>{this.props.due}</Text>
                <View style={{flex: 1, flexDirection: 'row', flexGrow:1}}>
                   
                    <Image style={{width:60, height:40, alignItems:'flex-start'}} source={flags[this.props.cc1]} />
                    {this.props.done == true ?(
                    <Text style={{height:200 ,color:'white', textAlign:'center', width:200, marginTop:3, alignItems:'center',flexGrow: 1, color:'white', fontSize:30}}>{this.props.score_1} - {this.props.score_2}</Text>
                    ) : (
                        <Text style={{height:200, color:'white', textAlign:'center', width:200, marginTop:3, alignItems:'center',flexGrow: 1, color:'white', fontSize:30}}>VS</Text>
                    )
                    }
                    <Image style={{width:60, height:40, alignItems:'flex-end'}} source={flags[this.props.cc2]}  />
                </View>
            </View>
        );
    }
}


const Matches = () => {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)


    const fetchData = async () => {
        const resp = await fetch(`${rest}rest/matches`);
        const data = await resp.json();

        let items = []

        data.forEach( (item) => {
            let done = true
            if(item.score_1 == -1)
                done = false 
           
            items.push(<Match due={item.due_fr} done={done} score_1={item.score_1} score_2={item.score_2} cc1={item.cc1} cc2={item.cc2} />)
            items.push(<Line />)
        })

        setData(items);
        setLoading(false);
    };

    React.useEffect(() => {
        fetchData();
    }, []);


    React.useEffect(() => {
        fetchData();
     }, []);


    return (
       
        <SafeAreaView style={{flex : 1, flexDirection:'column', alignItems:'stretch'}} >
           
             <ImageBackground resizeMode={loading == true ? 'cover' : 'cover'} style={{flex:1, height:'100%'}} source={loading == true ? require('../../img/loading.png') : require('../../img/background.png')}>
                <ScrollView>
                {data.length !== 0 && (
                    data 
                )}
                </ScrollView>
              
            </ImageBackground>
           
           
           
        
            
        </SafeAreaView>
    )
}

export default Matches;