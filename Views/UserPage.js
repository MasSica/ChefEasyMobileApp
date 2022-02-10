import React from 'react';
import { View, Image, Text, Dimensions, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { Input, Button } from 'react-native-elements';
import styles from './Styles';
import ImageButton from './ImageButton';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Entypo';
import { DB_URL, id, typeOfLoggedUser } from './constants';
import { Alert } from 'react-native';



const windowW = Dimensions.get('window').width;
const windowH = Dimensions.get('window').height;


export default class UserPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = { default: 'Error' }
  }

  handleEmail = (text) => {
    this.setState({ email: text })
  }
  handlePassword = (text) => {
    this.setState({ password: text })
  }

  handlename = (text) => {
    this.setState({ name: text })
  }

  handlelastname = (text) => {
    this.setState({ lastname: text })
  }

  handlephonenumber = (text) => {
    this.setState({ phonenumber: text })
  }


  update = (email, password, name, lastname, phonenumber) => {

    const update = {
      "id": `${email.toLowerCase()}`,
      "name": `${name}`,
      "last_name": `${lastname}`,
      "Phone_Number": `${phonenumber}`,
      "email": `${email.toLowerCase()}`,
      "password": `${password}`
    }
    const requestOptions = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(update)
    };

    fetch(`${DB_URL}/users/${id[0]}`, requestOptions)
      .then(async response => {
        const data = await response.json();

        // check for error response
        if (!response.ok) {
          // get error message from body or default to response status
          const error = (data && data.message) || response.status;
          return Promise.reject(error);
        }

        this.setState({ postId: data.identifier })
      })
      .catch(error => {
        this.setState({ errorMessage: error.toString() });
        console.error('There was an error!', error);
      });


    id[0] = email;
    id[1] = password;
    id[2] = name;
    id[3] = lastname;
    id[4] = phonenumber;

  }

  delete = () => {

    fetch(`${DB_URL}/users/${id[0]}`, { method: 'DELETE' })
      .then(() => { typeOfLoggedUser[0] = 0; this.props.history.push('/') });
  }

  logOut = () => {
    typeOfLoggedUser[0] = 0;
    for (var j = 0; j < id.length; j++) {
      id[j] = null;
    }
    this.props.history.replace('/');
  }

  componentDidMount() {
    //console.log('did')
    this.handleEmail(id[0]);
    this.handlePassword(id[1]);
    this.handlename(id[2]);
    this.handlelastname(id[3]);
    this.handlephonenumber(id[4]);

  };
  UNSAFE_componentWillMount() {
    if (typeOfLoggedUser[0] != 1) {
      this.props.history.goBack();
    }
    //console.log('will')
  }


  //<Text style={{flex:10, color:'red', textAlign:'center'}}> ──────────────────────────────────────── </Text>

  render() {

    //<View style={{ flex: 2, alignItems: 'center' }}>
    //          <ImageButton> </ImageButton>
    //        </View>
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 90, width: windowW }}>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgb(217,13,12)', height: windowH * 0.11 }}>
              <View style={{ alignItems: 'center' }}>
                <Image source={require('./images/logo.png')} style={styles.logLogo, [{ borderRadius: 40, width: 0.15 * windowW, height: 0.15 * windowW }]} />
              </View>
              <Text style={[styles.titleText, { marginLeft: windowW * 0.03, fontSize: 0.1 * windowW, color: 'white' }]}>Profile</Text>
            </View>



            <View style={{ flex: 100, margin: 10 }}>
              <View style={{ justifyContent: 'space-evenly', alignItems: 'center' }}>

                <Input label='Name' labelStyle={{ color: 'red', fontFamily: 'Times New Roman', fontSize: 0.036 * windowW }}
                  value={this.state.name} leftIcon={<Icon2 name="pencil" size={windowW * 0.055} color="#949494" />}
                  onChangeText={this.handlename} containerStyle={{ width: windowW * 0.95, maxWidth: 500, marginTop: '1%' }}
                  inputStyle={{ fontSize: 0.04 * windowW }} />

                <Input label='Last Name' labelStyle={{ color: 'red', fontFamily: 'Times New Roman', fontSize: 0.036 * windowW }}
                  value={this.state.lastname} leftIcon={<Icon2 name="pencil" size={windowW * 0.055} color="#949494" />}
                  onChangeText={this.handlelastname} containerStyle={{ width: windowW * 0.95, maxWidth: 500, marginTop: '1%' }}
                  inputStyle={{ fontSize: 0.04 * windowW }} />

                <Input label='Phone Number' labelStyle={{ color: 'red', fontFamily: 'Times New Roman', fontSize: 0.036 * windowW }}
                  value={this.state.phonenumber} leftIcon={<Icon name="phone" size={windowW * 0.055} color="#949494" />}
                  onChangeText={this.handlephonenumber} containerStyle={{ width: windowW * 0.95, maxWidth: 500, marginTop: '1%' }}
                  inputStyle={{ fontSize: 0.04 * windowW }} />

                <Input label='Email' labelStyle={{ color: 'red', fontFamily: 'Times New Roman', fontSize: 0.036 * windowW }}
                  value={this.state.email} leftIcon={<Icon name="envelope" size={windowW * 0.055} color="#949494" />}
                  onChangeText={this.handleEmail} containerStyle={{ width: windowW * 0.95, maxWidth: 500, marginTop: '1%' }}
                  inputStyle={{ fontSize: 0.04 * windowW }} />

                <Input label='Password' labelStyle={{ color: 'red', fontFamily: 'Times New Roman', fontSize: 0.036 * windowW }}
                  value={this.state.password} secureTextEntry={true} leftIcon={<Icon name="lock" size={windowW * 0.055} color="#949494" />}
                  onChangeText={this.handlePassword} containerStyle={{ width: windowW * 0.95, maxWidth: 500, marginTop: '1%' }}
                  inputStyle={{ fontSize: 0.04 * windowW }} />
              </View>

              <View style={{ flex: 20, flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ flex: 6, alignItems: 'center' }}>
                  <Button title="Become Chef" titleStyle={{ fontFamily: 'Times New Roman', fontWeight: 'bold', fontSize: 0.038 * windowW }}
                    buttonStyle={{ backgroundColor: 'rgb(217,13,12)' }} containerStyle={{ marginTop: 1, width: "80%", maxWidth: 0.33 * windowW }}
                    onPress={() => this.props.history.push('/SignUpChef')} />

                </View>

                <View style={{ flex: 6, alignItems: 'center' }}>
                  <Button title="Update" titleStyle={{ fontFamily: 'Times New Roman', fontWeight: 'bold', fontSize: 0.038 * windowW }}
                    buttonStyle={{ backgroundColor: 'rgb(217,13,12)' }} containerStyle={{ marginTop: 1, width: "80%", maxWidth: 0.33 * windowW }}
                    onPress={() => this.update(this.state.email, this.state.password, this.state.name, this.state.lastname, this.state.phonenumber)} />

                </View>

              </View>

              <View style={{ flex: 20, flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
                <View style={{ flex: 6, alignItems: 'center' }}>
                  <Button title="Log Out" titleStyle={{ fontFamily: 'Times New Roman', fontWeight: 'bold', color: 'gray', fontSize: 0.038 * windowW }}
                    containerStyle={{ width: "80%",maxWidth: 0.33 * windowW }} type="clear" onPress={() => this.logOut()} />
                </View>
                <View style={{ flex: 6, alignItems: 'center' }}>
                  <Button title="Delete Profile :(" titleStyle={{ fontFamily: 'Times New Roman', fontWeight: 'bold', color: 'gray', fontSize: 0.038 * windowW }}
                    containerStyle={{ width: "80%",  maxWidth: 0.33 * windowW }} type="clear" onPress={() => this.delete()} />
                </View>

              </View>

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
                if (typeOfLoggedUser[0] == 0) { this.props.history.push('/welcome_page') }
                else if (typeOfLoggedUser[0] == 1) { this.props.history.push('/UserPage') }
                else { chefIdToView[0] = id[0]; this.props.history.push('/ChefPage') }
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