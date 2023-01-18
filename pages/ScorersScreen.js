import * as React from 'react';
import { Image, View, SafeAreaView , ImageBackground, Text} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { rest} from '../include';


class Scorer extends React.Component{

    render() {

        return(
         
        <View style={{ alignItems:'center', marginLeft:20, marginRight:20}}>
        <Text style={{fontFamily:'Kanit-Regular',  color:'#ffdc24', fontSize:20, marginRight:12}}>{this.props.name}</Text>
        <Image style={{alignSelf:'center', width:120, height:150}} resizeMode={'stretch'} source={{uri:`${rest}${this.props.pp}`}} />
            <View style={{width:'100%', flex:1, alignItems:'center'}}>
               <Image style={{width:'100%', height:60}} resizeMode={'stretch'} source={require('../img/44.png')} />  
               <Text style={{fontFamily:'Kanit-Regular', position:'absolute', color:'#ffdc24', fontSize:20, marginTop:12}}>{this.props.points} Goals</Text>
            </View>
        </View>
        )
    }
}


const ScorersScreen = () => {

    const [loading, setLoading] = React.useState(true) 
    const [data, setData] = React.useState([])
    const fetchScorers = async() => {

        const resp = await fetch(`${rest}rest/scorers`)
        const data = await resp.json()

        let items = []
        data.forEach( (item) => {
           items.push(<Scorer name={item.name} points={item.points} pp={item.pp} />)
        })

        setLoading(false)
       setData(items)

    }


    React.useEffect( () => {   fetchScorers() }, [])
    return(
        <SafeAreaView style={{flex:1}}>
            <ImageBackground resizeMode={loading == true ? 'cover' : 'cover'} style={{flex:1, height:'100%'}} source={loading == true ? require('../img/loading.png') : require('../img/background.png')}>

            <ScrollView>
            {loading == true ? (
                    null
                ) : (
                    <View style={{padding: 16, flex:1, flexDirection:'row', alignContent:'space-between', flexWrap:'wrap', justifyContent:'center'}}>
                    {data}
                   </View>
                )}

            </ScrollView>
  

            </ImageBackground>
        </SafeAreaView>
    );
}

export default ScorersScreen;