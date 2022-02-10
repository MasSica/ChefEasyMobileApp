import React from 'react';
import {View,Alert, Image, Text, Dimensions, SafeAreaView, ScrollView, TouchableOpacity} from 'react-native';
import styles from './Styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button } from 'react-native-elements';
import { DB_URL, id, chefinfo, chefIdToView, typeOfLoggedUser} from './constants';



const windowW= Dimensions.get('window').width;
const windowH= Dimensions.get('window').height;



export default class WelcomePage extends React.Component{

constructor(props){
  super(props);
  this.state={default:'Error'}
}

  handleEmail = (text) => {
    this.setState({ email: text })
  }
  handlePassword = (text) => {
    this.setState({ password: text })
  }


  handleLogin = async(mail,pass) => {
    //check if user is in the db if it is move to the next page 

    //const result = await fetch(`http://10.0.2.2:5000/${mail.toLowerCase()}`);
    const result = await fetch(`${DB_URL}/users/${mail.toLowerCase()}`);

    const raw_data = await result.json();  

    const data = JSON.parse(JSON.stringify(raw_data));

    if (result.status===200 && data.password === pass){

      id[0]=mail.toLowerCase();
      id[1]=data.password;
      id[2]=data.name;
      id[3]=data.last_name;
      id[4]=data.Phone_Number;
      id[5]=data.chef;
      id[6]=data.city;
      id[7]=data.profile_image;
      id[8]=data.dish1_image;
      id[9]=data.dish2_image;
      id[10]=data.dish3_image;
      id[11]=data.dish4_image;

      if (data.chef == true){
        chefinfo[0] = data.europe;
        chefinfo[1] = data.asia;
        chefinfo[2] = data.northamerica;
        chefinfo[3] = data.southamerica;
        chefinfo[4] = data.africa;
        chefinfo[5] = data.fusion;
        chefinfo[6] = data.description;
      }
      typeOfLoggedUser[0] = id[5] === true? 2 : 1;
      if(typeOfLoggedUser[0] == 1){ this.props.history.push('/UserPage') }
      else {chefIdToView[0] = id[0]; this.props.history.push('/ChefPage')}
       
      
      //chefIdToView[0] = 'lorenzolorenzo.it';
      //this.props.history.push('/ChefPage')
    }
  
    else{
      Alert.alert('No such mail/password in our system!')
    }
  }
  UNSAFE_componentWillMount(){
    if(typeOfLoggedUser[0] != 0){
      this.props.history.goBack();
    }
  }
  render(){
    return (
      <SafeAreaView style={{ flex:1, }}>
        <View style={{flex:90, marginLeft:10, marginRight:10}}>
        <ScrollView contentContainerStyle={{ flexGrow:1}}> 
        <View style={{flex:35, marginTop:'10%' ,alignItems:'center'}}>
            <Image style={styles.logLogo, [{width:0.40*windowW ,height:0.40*windowW}]} source={require('./images/logo.png')} />
            <Text style={[styles.titleText,{fontSize:0.1*windowW}]}>ChefEasy</Text>
        </View>

        <View style={{flex:5, marginTop:'5%', alignItems:'center'}}>
            <Text style={[styles.greyText, {fontSize:0.05*windowW}]}>Hi there! Nice to see you again</Text>
        </View>

         <View style={{flex:40, marginTop:'5%', justifyContent:'space-evenly', alignItems:'center'}}>
                <Input label='Email' labelStyle={{color:'red',fontFamily: 'Times New Roman',fontSize:0.045*windowW}} 
                placeholder="Email"  leftIcon= {<Icon name="envelope" size={35} color="#949494"/>}
                onChangeText={this.handleEmail} containerStyle={{maxWidth:450}} inputStyle={{fontSize:0.045*windowW}}/>
                
                <Input label='Password' labelStyle={{color:'red',fontFamily: 'Times New Roman',fontSize:0.045*windowW}} 
                placeholder="Password" secureTextEntry={true} leftIcon= {<Icon name="lock" size={35} color="#949494" />}
                onChangeText={this.handlePassword} containerStyle={{maxWidth:450}} inputStyle={{fontSize:0.045*windowW}}/>
        </View>

        <View style={{flex:10,alignItems:'center'}}>
              <Button title="Log In" titleStyle={{fontFamily: 'Times New Roman', fontWeight:'bold', fontSize:0.04*windowW}} 
               buttonStyle={{backgroundColor: 'rgb(217,13,12)'}} containerStyle={{ marginTop: 1, width: "35%" }} 
               onPress={()=> this.state.email && this.state.password? this.handleLogin(this.state.email, this.state.password) : Alert.alert('Enter required Data!')}/>

        </View>

        <View style={{flex: 10, marginTop:'3%',flexDirection:'row',marginBottom:10 }}>
              <Button title="Don't have an account? Sign Up!" titleStyle={{ color:'grey', fontSize:0.04*windowW}} 
              type="clear" containerStyle={{flex:1}} onPress={() => this.props.history.push('/SignUp')}/>        
        </View>
        </ScrollView>
        </View>



        <View style={{
          flex: 8,
          backgroundColor: 'rgba(255, 255, 255, 0.7)', alignItems: 'center', justifyContent: 'center',
          borderTopColor: 'grey', borderTopWidth: 2, width: windowW, height: 0.1 * windowH, borderStyle: 'solid',

        }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>

            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <TouchableOpacity onPress={() => this.props.history.push('/')} >
                <Icon name="home" size={0.09 * windowW} color="#000000" />
              </TouchableOpacity>
            </View>

            <View style={{ marginLeft: '20%', marginRight: '20%', alignItems: 'center', justifyContent: 'center' }}>
              <TouchableOpacity onPress={() => {
                if (typeOfLoggedUser[0]==0){ this.props.history.push('/welcome_page') }
                else if (typeOfLoggedUser[0]==1){this.props.history.push('/UserPage')}
                else {chefIdToView[0] = id[0]; this.props.history.push('/ChefPage')}
                }}>
                <Icon name="user-circle-o" size={0.09 * windowW} color="#000000" />
              </TouchableOpacity>
            </View>

            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <TouchableOpacity onPress={() => this.props.history.push('/search')} >
                <Icon name="search" size={0.09 * windowW} color="#000000" />
              </TouchableOpacity>
            </View>

          </View>


        </View>

      </SafeAreaView>
      
      
    );
  }
}

//<Button title="Forgot Password?" titleStyle={{fontFamily: 'Times New Roman', fontWeight:'bold', color:'grey'}} 
//type="clear" containerStyle={{flex:2}} onPress={() => this.state.email ? Alert.alert('An e-Mail has been sent to you, please check your inbox.'): Alert.alert('Please, insert your e-Mail address')}/>