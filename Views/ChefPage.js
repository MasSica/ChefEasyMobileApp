import React from 'react';
import { View, Image, Text, Dimensions, SafeAreaView, ScrollView, TouchableOpacity, Linking} from 'react-native';
import { Input, Button, SocialIcon } from 'react-native-elements';
import styles from './Styles';
import ImageButton from './ImageButton';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Entypo';
import { chefinfo, DB_URL, id, chefIdToView, default_image, typeOfLoggedUser } from './constants';
import { Alert } from 'react-native';
import Stars from 'react-native-stars';
import DialogInput from 'react-native-dialog-input';

const windowW = Dimensions.get('window').width;
const windowH= Dimensions.get('window').height;

export default class ChefPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      default: 'Error',
      autList: ['']
    }
  };
  aux = [];
  handleDatas = (datas) => {
    this.setState({ name: datas.name })
    this.setState({ lastname: datas.last_name })
    this.setState({ description: datas.description })
    this.setState({ profileImage: datas.profile_image })
    this.setState({ phoneNumber: datas.Phone_Number })
    this.setState({ city: datas.city })

    this.setState({ european: datas.europe })
    this.setState({ asian: datas.asia })
    this.setState({ northamerican: datas.northamerica })
    this.setState({ southamerican: datas.southamerica })
    this.setState({ african: datas.africa })
    this.setState({ fusion: datas.fusion })

    this.setState({ dish1: datas.dish1_image })
    this.setState({ dish2: datas.dish2_image })
    this.setState({ dish3: datas.dish3_image })
    this.setState({ dish4: datas.dish4_image })

    this.setState({ instagram: datas.instagram })
    this.setState({ youtube: datas.youtube })
    this.setState({ twitter: datas.twitter })

    this.setState({ authorization: datas.authorization })
    this.setState({ reviewScore: parseFloat(datas.reviewScore) })
    this.setState({ reviewNumber: parseFloat(datas.reviewNumber) })

    //console.log(this.state.authorization)
    //console.log(id[0])
    //console.log(this.state.autList)
    //console.log(this.state.autList.indexOf(id[0]))
  }

  handleView = async (chefID) => {

    const result = await fetch(`${DB_URL}/users/${chefID}`);
    const raw_data = await result.json();
    const data = JSON.parse(JSON.stringify(raw_data));

    if (result.status === 200) {
      this.handleDatas(data);
      this.splittedAut(this.state.authorization.split(' '));
      this.state.loaded = true;
      //console.log(this.state.loaded)
      this.forceUpdate();
    }
    else {
      Alert.alert('Error')
    }
  }

  splittedAut = (vector) => {
    this.setState({ autList: vector })
    //console.log(vector)
  }

  revert_to_user = () => {

    const update = {
      "id": `${id[0]}`,
      "name": `${id[2]}`,
      "last_name": `${id[3]}`,
      "Phone_Number": `${id[4]}`,
      "email": `${id[0]}`,
      "password": `${id[1]}`,
      "chef": false,
      "city": `${id[6]}`,
      "profile_image": `${id[7]}`,
      "dish1_image": `${default_image}`,
      "dish2_image": `${default_image}`,
      "dish3_image": `${default_image}`,
      "dish4_image": `${default_image}`
    }

    const requestOptionsUpdate = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(update)
    };

    fetch(`${DB_URL}/users/${id[0]}`, requestOptionsUpdate)
      .then(async response => {
        const data = await response.json();

        // check for error response
        if (!response.ok) {
          // get error message from body or default to response status
          const error = (data && data.message) || response.status;
          return Promise.reject(error);
        }

        this.setState({ postId: data.id })
        id[5] = false;
        chefinfo[0] = '';
        chefinfo[1] = '';
        chefinfo[2] = '';
        chefinfo[3] = '';
        chefinfo[4] = '';
        chefinfo[5] = '';
        chefinfo[6] = '';

        //rimanda su USERPAGE
        chefIdToView[0] = id[0];
        typeOfLoggedUser[0] = 1;
        this.props.history.replace('/UserPage')

      })
      .catch(error => {
        this.setState({ errorMessage: error.toString() });
        console.error('There was an error!', error);
      })
  }

  showPopUp = (boolean) => {
    this.setState({ show: boolean })
  }

  sendInput = (text) => {
    var identifier = id[0];
    var autVector = this.state.authorization + ' ' + text;

    const update = {
      "id": `${identifier}`,
      "authorization": `${autVector}`
    }
    const requestOptions = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(update)
    };

    fetch(`${DB_URL}/users/${identifier}`, requestOptions)
      .then(async response => {
        const data = await response.json();

        // check for error response
        if (!response.ok) {
          // get error message from body or default to response status
          const error = (data && data.message) || response.status;
          return Promise.reject(error);
        }

        this.setState({ authorization: autVector })
        this.showPopUp(false);
      })
      .catch(error => {
        this.setState({ errorMessage: error.toString() });
        console.error('There was an error!', error);
      });
  }

  submitReview = (value) => {
    //console.log('asdasdoasadljksfahngoc')
    var identifier = chefIdToView[0];
    var autVector = this.state.authorization.replace(" " + id[0], "");

    var totalScore = this.state.reviewScore * this.state.reviewNumber;
    totalScore = totalScore + value;
    var totalReview = this.state.reviewNumber + 1;
    totalScore = totalScore / totalReview;
    //console.log(totalScore)
    const update = {
      "id": `${identifier}`,
      "reviewScore": `${totalScore.toString()}`,
      "reviewNumber": `${totalReview.toString()}`,
      "authorization": `${autVector}`
    }
    const requestOptions = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(update)
    };

    fetch(`${DB_URL}/users/${identifier}`, requestOptions)
      .then(async response => {
        const data = await response.json();

        // check for error response
        if (!response.ok) {
          // get error message from body or default to response status
          const error = (data && data.message) || response.status;
          return Promise.reject(error);
        }

        this.setState({ reviewNumber: this.state.reviewNumber + 1 })
        this.setState({ reviewScore: totalScore })
        this.setState({ authorization: autVector })
        this.splittedAut(this.state.authorization.split(' '))

      })
      .catch(error => {
        this.setState({ errorMessage: error.toString() });
        console.error('There was an error!', error);
      });
  }

  logOut = () => {
    typeOfLoggedUser[0] = 0;
    for(var j=0; j<id.length;j++){
      id[j] = null;
    }
    this.props.history.replace('/');
  }

  UNSAFE_componentWillMount() {
    this.handleView(chefIdToView[0]);
    this.showPopUp(false);
  };




  //{(id[2].concat(" ")).concat(id[3])}
  //{((reqChefInfo.name).concat(" ")).concat(reqChefInfo.lastname)}
  render() {
    return (
      
      <SafeAreaView style={{ flex: 1,  marginLeft: 0, marginRight: 0, marginBottom: 0 }}>
        {this.state.loaded && (
        <View style={{ flex: 90, width:windowW}}> 
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent:'center', backgroundColor: 'rgb(217,13,12)', height: windowH*0.11 }}>
              <Text style={[styles.titleText, { fontSize: 0.1*windowW, color: 'white'}]}>{this.state.name + ' ' + this.state.lastname}</Text>
            </View>


          <View style={{ flex: 20, alignItems: 'center', flexDirection: 'row', backgroundColor: 'rgba(217,217,217,0.5)'}}>
           
            <View style={{ marginTop:'6%', marginBottom:'6%',flex: 2, alignItems: 'center', marginLeft:"5%" }}>
              <Image style={styles.logLogo, [{ borderRadius: 1000, width: 0.40 * windowW, height: 0.40 * windowW, borderWidth:2, borderColor:'rgba(0,0,0,0.3)' }]} 
              source={{ uri: this.state.profileImage }} />
            </View>

            <View style={{ flexDirection: 'column', flex: 2, alignItems: 'flex-start', marginLeft: '5%', marginTop:'6%', marginBottom:'6%',}}>
              <View style={{ flexDirection: 'row'}}>
                <Icon name={'phone-square'} size={0.05*windowW} color='grey' />
                <Text style={{ fontWeight: 'bold', marginLeft:'5%', fontSize:0.035*windowW }}>{this.state.phoneNumber}</Text>
              </View>
              <View style={{ flexDirection: 'row' , marginTop:'3%'}}>
                <Icon name={'home'} size={0.05*windowW} color='grey' />
                <Text style={{ fontWeight: 'bold' , marginLeft:'5%', fontSize:0.035*windowW  }}>{this.state.city}</Text>
              </View>
              <Text></Text>
              <View style={{ flexDirection: 'row', marginTop:'-3%'}}>
                <Icon name={'cutlery'} size={0.05*windowW} color='grey' style={{marginRight:'5%', marginTop:'3%' }} />
                <Text style={{ fontSize:0.035*windowW  }}>{this.state.european == 'true' ? '• European\n' : ''}{this.state.asian == 'true' ? '• Asian\n' : ''}
                  {this.state.northamerican == 'true' ? '• North American\n' : ''}{this.state.southamerican == 'true' ? '• South American\n' : ''}
                  {this.state.african == 'true' ? '• African\n' : ''}{this.state.fusion == 'true' ? '• Fusion\n' : ''}</Text>
              </View>
              
            </View>

          </View>


          <View style={{ marginTop: '2%', flex: 20, alignItems: 'center', }}>

            <View style={{ flex: 10, marginBottom: '3%' }}>
              {this.state.autList.includes(id[0]) && (
                <Text style={{ fontSize: 0.045 * windowW, color: 'gray', fontWeight: 'bold' }}>You can leave a review for this chef!</Text>
              )}
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>

              {!this.state.autList.includes(id[0]) && (
                <View>
                  <Stars default={this.state.reviewScore} count={5} half={true} starSize={50}
                    fullStar={<Icon name={'star'} size={0.067*windowW} color='rgb(217,13,12)' />}
                    emptyStar={<Icon name={'star-o'} size={0.067*windowW} color='rgb(217,13,12)' />}
                    halfStar={<Icon name={'star-half-full'} size={0.067*windowW} color='rgb(217,13,12)' />}
                    spacing={7} disabled />
                  <Text style={{ fontSize: 0.045 * windowW, color: 'gray'}}>{'  out of ' + this.state.reviewNumber + ' reviews'}</Text>
                </View>
              )}

              {this.state.autList.includes(id[0]) && (
                <View>
                <Stars default={this.state.reviewScore} count={5} half={true} starSize={50}
                  fullStar={<Icon name={'star'} size={0.067*windowW} color='rgb(217,13,12)' />}
                  emptyStar={<Icon name={'star-o'} size={0.067*windowW} color='rgb(217,13,12)' />}
                  halfStar={<Icon name={'star-half-full'} size={0.067*windowW} color='rgb(217,13,12)' />}
                  spacing={7}
                  update={(val) => {
                    setTimeout(() => {
                      Alert.alert(
                        "Leave Feedback",
                        "Are you sure you want to leave a review with " + val + " stars?",
                        [

                          { text: "Cancel", style: "cancel", },
                          { text: "Submit", onPress: () => this.submitReview(val), style: "cancel" },
                        ])
                    }, 700)
                  }} />
                  <Text style={{ fontSize: 0.045 * windowW, color: 'gray', fontWeight: 'bold' }}>{'  out of ' + this.state.reviewNumber + ' reviews'}</Text>
                  </View>
              )}

              {chefIdToView[0] == id[0] && (
                <Button title="Authorize" titleStyle={{ fontFamily: 'Times New Roman', fontWeight: 'bold', fontSize:0.04*windowW }}
                  buttonStyle={{ backgroundColor:'rgb(217,13,12)', marginLeft:'10%' }} containerStyle={{ marginTop: 1, width: "30%" }}
                  onPress={() => this.showPopUp(true)} />
              )}

              {this.state.show == true && (
                <DialogInput isDialogVisible={this.state.isDialogVisible}
                  title={"Customer Authorization"}
                  message={"Insert the e-mail of customer you want to authorize to leave you a feedback."}
                  hintInput={"E-mail"}
                  submitInput={(inputText) => { this.sendInput(inputText) }}
                  closeDialog={() => { this.showPopUp(false) }}>
                </DialogInput>
              )}

            </View>

          </View>



          <View style={{ margin: '6%', flex: 60, justifyContent: 'space-evenly', alignItems: 'center', 
            borderBottomColor:'grey', borderBottomWidth:1, borderTopWidth:1, borderRadius:5}}>
            <Text style={[{ color: 'black', fontSize: 0.038*windowW, margin:'2%' }]} > {this.state.description} </Text>
          </View>

          <View style={{ alignItems: 'center', marginTop:5 }}>
            <View style={{ flexDirection: 'row' }}>
              {this.state.youtube != "undefined" && (
                <TouchableOpacity onPress={() => { Linking.openURL('vnd.youtube://channel/' + this.state.youtube); }} style={{marginLeft:'2%'}}>
                  <SocialIcon type='youtube' iconSize={0.07*windowW} style={{width:0.13*windowW, height:0.13*windowW, borderRadius:100}} />
                </TouchableOpacity>
              )}

              {this.state.instagram != "undefined" && (
                <TouchableOpacity onPress={() => { Linking.openURL('instagram://user?username=' + this.state.instagram); }} style={{marginLeft:'2%'}}>
                  <SocialIcon type='instagram' iconSize={0.07*windowW} style={{width:0.13*windowW, height:0.13*windowW, borderRadius:100}} />
                </TouchableOpacity>

              )}

              {(this.state.twitter != "undefined" &&
                <TouchableOpacity onPress={() => { Linking.openURL('twitter://user?screen_name=' + this.state.twitter); }}  style={{marginLeft:'2%'}}>
                  <SocialIcon type='twitter' iconSize={0.07*windowW} style={{width:0.13*windowW, height:0.13*windowW, borderRadius:100}}/>
                </TouchableOpacity>

              )}

              {(this.state.phoneNumber != "undefined" &&
                <TouchableOpacity onPress={() => { Linking.openURL('whatsapp://send?phone=' + this.state.phoneNumber); }}  style={{marginLeft:'2%'}}>
                  <SocialIcon type='whatsapp' iconSize={0.07*windowW} style={{width:0.13*windowW, height:0.13*windowW, borderRadius:100}}/>
                </TouchableOpacity>

              )}
            </View>
          </View>

          <View style={{ flex: 5, alignItems: 'center', marginTop: '6%', marginBottom: '2%', width:windowW*0.95, alignSelf:'center' }}>
              <Text style={[styles.greyText, { fontSize: 0.04*windowW }]}>Here there are some of my creations!</Text>
          </View>


          <View style={{ marginTop: '3%', marginBottom: '6%', alignItems: 'center', marginLeft:'6%' }}>
            <View style={{ flexDirection: 'row' }}>

              {this.state.dish1 != default_image && (
                <Image style={styles.logLogo, [{ borderRadius: 10, marginRight: '6%', width: 0.40 * windowW, height: 0.40 * windowW }]} source={{ uri: this.state.dish1 }} />
                
              )}

              {this.state.dish2 != default_image && (
                <Image style={styles.logLogo, [{ borderRadius: 10, marginRight: '6%', width: 0.40 * windowW, height: 0.40 * windowW }]} source={{ uri: this.state.dish2 }} />
              )}
            </View>

            <View style={{ marginTop: '6%', flexDirection: 'row' }}>

              {this.state.dish3 != default_image && (
                <Image style={styles.logLogo, [{ borderRadius: 10, marginRight: '6%', width: 0.40 * windowW, height: 0.40 * windowW }]} source={{ uri: this.state.dish3 }} />
              )}


              {this.state.dish4 != default_image && (
                <Image style={styles.logLogo, [{ borderRadius: 10, marginRight: '6%', width: 0.40 * windowW, height: 0.40 * windowW }]} source={{ uri: this.state.dish4 }} />
              )}

            </View>
          </View>

          <View style={{ flex: 20, flexDirection: 'row', alignItems: 'center' }}>

            <View style={{ flex: 6, alignItems: 'center' }}>

              {chefIdToView[0] == id[0] && (
                <Button title="Update profile" titleStyle={{ fontFamily: 'Times New Roman', fontWeight: 'bold', fontSize:0.04*windowW }}
                  buttonStyle={{ backgroundColor: 'rgb(217,13,12)' }} containerStyle={{ marginTop: 1, width: "40%" }}
                  onPress={() => this.props.history.replace('/ChefPageUpdate')} />
              )}

            </View>


          </View>

          <View style={{ flex: 6, flexDirection:'row', alignItems: 'center', justifyContent:'center', marginTop:'3%', marginBottom:'3%' }}>
            {chefIdToView[0] == id[0] && (
              <Button title="Log Out" titleStyle={{ fontFamily: 'Times New Roman', fontWeight: 'bold', color: 'gray', fontSize:0.04*windowW }}
                containerStyle={{ width: "40%" }} type="clear" onPress={() => this.logOut()} />
            )}
            {chefIdToView[0] == id[0] && (
              <Button title="Revert to User" titleStyle={{ fontFamily: 'Times New Roman', fontWeight: 'bold', color: 'gray', fontSize:0.04*windowW }}
                containerStyle={{ width: "40%" }} type="clear" onPress={() => this.revert_to_user()} />
            )}
          </View>

        </ScrollView>
        </View>
        
        )}
        <View style={{
          flex: 8,
          backgroundColor: 'rgba(255, 255, 255, 0.7)', alignItems: 'center', justifyContent: 'center',
          borderTopColor: 'grey', borderTopWidth: 2, width: windowW, height: 0.1 * windowH, borderStyle: 'solid',

        }}>
        {this.state.loaded && (
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
          )}

        </View>
      </SafeAreaView>
      
    );
  }
}

