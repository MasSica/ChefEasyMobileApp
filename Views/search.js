import React from 'react';
import { View, Alert, Image, Text, Dimensions, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import styles from './Styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, SearchBar, CheckBox, Button, Slider } from 'react-native-elements';
import { DB_URL, id, chefinfo, chefIdToView, geo_coord, default_image, searchPreset, typeOfLoggedUser } from './constants';
import { ImageBackground } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Stars from 'react-native-stars';



const windowW = Dimensions.get('window').width;
const windowH = Dimensions.get('window').height;

var chefIdSet = [];
var chefName = [];
var chefLastname = [];
var chefScore = [];
var chefNumber = [];
var chefPhoto = [];
var chefType = [];

export default class Search extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      search: '',
      buttonColorA: "rgba(226, 226, 226, 1)",
      buttonColorE: "rgba(226, 226, 226, 1)",
      buttonColorNA: "rgba(226, 226, 226, 1)",
      buttonColorSA: "rgba(226, 226, 226, 1)",
      buttonColorAF: "rgba(226, 226, 226, 1)",
      buttonColorFUS: "rgba(226, 226, 226, 1)",
      as: false,
      eu: false,
      na: false,
      sa: false,
      af: false,
      fus: false,
      open: false,
      value: null,
      items: [{ label: 'Asian', value: 'Asian' },
      { label: 'European', value: 'European' },
      { label: 'North American', value: 'North American' },
      { label: 'South American', value: 'South American' },
      { label: 'African', value: 'African' },
      { label: 'Fusion', value: 'Fusion' },],
      sliderValue: 10
    };

    this.setValue = this.setValue.bind(this);
  }


  haversine_distance(lat_chef, lon_chef, lat_user, lon_user) {
    var R = 6371.0710 // Radius of the Earth in miles
    var rlat1 = lat_chef * (Math.PI / 180); // Convert degrees to radians
    var rlat2 = lat_user * (Math.PI / 180); // Convert degrees to radians
    var difflat = rlat2 - rlat1; // Radian difference (latitudes)
    var difflon = (lon_user - lon_chef) * (Math.PI / 180); // Radian difference (longitudes)

    var d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat / 2) * Math.sin(difflat / 2) + Math.cos(rlat1) * Math.cos(rlat2) * Math.sin(difflon / 2) * Math.sin(difflon / 2)));
    return d;
  }


  updateSearch = (search) => {

    this.setState({ search });
  }


  handleAsian = () => {
    this.state.buttonColorA == "rgba(226, 226, 226, 1)" ? this.state.buttonColorA = "rgba(255, 0, 0, 0.8)" : this.state.buttonColorA = "rgba(226, 226, 226, 1)";
    this.state.as == false ? this.state.as = true : this.state.as = false;
    this.forceUpdate()
  }
  handleEu = () => {
    this.state.buttonColorE == "rgba(226, 226, 226, 1)" ? this.state.buttonColorE = "rgba(255, 0, 0, 0.8)" : this.state.buttonColorE = "rgba(226, 226, 226, 1)";
    this.state.eu == false ? this.state.eu = true : this.state.eu = false;
    this.forceUpdate()
  }
  handleNa = () => {
    this.state.buttonColorNA == "rgba(226, 226, 226, 1)" ? this.state.buttonColorNA = "rgba(255, 0, 0, 0.8)" : this.state.buttonColorNA = "rgba(226, 226, 226, 1)";
    this.state.na == false ? this.state.na = true : this.state.na = false;
    this.forceUpdate()
  }
  handleSa = () => {
    this.state.buttonColorSA == "rgba(226, 226, 226, 1)" ? this.state.buttonColorSA = "rgba(255, 0, 0, 0.8)" : this.state.buttonColorSA = "rgba(226, 226, 226, 1)";
    this.state.sa == false ? this.state.sa = true : this.state.sa = false;
    this.forceUpdate()
  }
  handleAf = () => {
    this.state.buttonColorAF == "rgba(226, 226, 226, 1)" ? this.state.buttonColorAF = "rgba(255, 0, 0, 0.8)" : this.state.buttonColorAF = "rgba(226, 226, 226, 1)";
    this.state.af == false ? this.state.af = true : this.state.af = false;
    this.forceUpdate()
  }
  handleFus = () => {
    this.state.buttonColorFUS == "rgba(226, 226, 226, 1)" ? this.state.buttonColorFUS = "rgba(255, 0, 0, 0.8)" : this.state.buttonColorFUS = "rgba(226, 226, 226, 1)";
    this.state.fus == false ? this.state.fus = true : this.state.fus = false;
    this.forceUpdate()
  }

  setOpen = (open) => {
    this.setState({ open: open })
  }

  setValue(callback) {
    this.setState(state => ({
      value: callback(state.value)
    }));
  }

  setItems(callback) {
    this.setState(state => ({
      items: callback(state.items)
    }));
  }


  retrieveChef = async () => {
    var searchstring = '';
    if (this.state.as == true) { searchstring = searchstring + '&asia=true' }
    if (this.state.eu == true) { searchstring = searchstring + '&europe=true' }
    if (this.state.na == true) { searchstring = searchstring + '&northamerica=true' }
    if (this.state.sa == true) { searchstring = searchstring + '&southamerica=true' }
    if (this.state.af == true) { searchstring = searchstring + '&africa=true' }
    if (this.state.fus == true) { searchstring = searchstring + '&fusion=true' }

    if (this.state.search != '') {

      var splitted_list = this.state.search.split(' ')


      if (splitted_list[splitted_list.length - 1] == '') {
        splitted_list.pop()
      }

      searchstring = searchstring + '&name=' + splitted_list[0]


      if (splitted_list.length > 1) {
        searchstring = searchstring + '&last_name=' + splitted_list[1]
      }
    }


    const result = await fetch(`${DB_URL}/users?chef=true${searchstring}`);
    const raw_data = await result.json();
    const data = JSON.parse(JSON.stringify(raw_data));

    if (result.status === 200) {

      chefIdSet = [];
      chefName = [];
      chefLastname = [];
      chefScore = [];
      chefNumber = [];
      chefPhoto = [];
      chefType = [];

      var counter = 0;
      for (i = 0; i < data.length; i++) {
        //console.log(this.haversine_distance(parseFloat(data[i].latitude), parseFloat(data[i].longitude), parseFloat(geo_coord[1]), parseFloat(geo_coord[0])))

        if (this.haversine_distance(parseFloat(data[i].latitude), parseFloat(data[i].longitude), parseFloat(geo_coord[1]), parseFloat(geo_coord[0])) > this.state.sliderValue) {
          continue
        }
        chefIdSet[counter] = data[i].id;
        //console.log(chefIdSet[counter])
        chefName[counter] = data[i].name;
        chefLastname[counter] = data[i].last_name;
        chefScore[counter] = data[i].reviewScore;
        chefNumber[counter] = data[i].reviewNumber;
        chefPhoto[counter] = data[i].profile_image;
        chefType[counter] = '';
        if (data[i].asia == 'true') {
          chefType[counter] += 'Asian '
        }
        if (data[i].europe == 'true') {
          chefType[counter] += 'European '
        }
        if (data[i].northamerica == 'true') {
          chefType[counter] += 'North-American '
        }
        if (data[i].southamerica == 'true') {
          chefType[counter] += 'South-American '
        }
        if (data[i].africa == 'true') {
          chefType[counter] += 'African '
        }
        if (data[i].fusion == 'true') {
          chefType[counter] += 'Fusion '
        }

        counter += 1;
      }
      this.forceUpdate()
    }
    else {
      Alert.alert('Error')
    }
  }

  chefSelect = (index) => e => {
    chefIdToView[0] = chefIdSet[index];
    //console.log(index);
    this.props.history.push('/ChefPage')
  }

  componentDidMount() {
    if (searchPreset[0] == 'asia') {
      this.state.buttonColorA = "rgba(255, 0, 0, 0.8)";
      this.state.as = true;
      searchPreset[0] = null;
      this.retrieveChef();
    }
    if (searchPreset[0] == 'northamerica') {
      this.state.buttonColorNA = "rgba(255, 0, 0, 0.8)";
      this.state.na = true;
      searchPreset[0] = null;
      this.retrieveChef();
    }
    if (searchPreset[0] == 'southamerica') {
      this.state.buttonColorSA = "rgba(255, 0, 0, 0.8)";
      this.state.sa = true;
      searchPreset[0] = null;
      this.retrieveChef();
    }
    if (searchPreset[0] == 'europe') {
      this.state.buttonColorE = "rgba(255, 0, 0, 0.8)";
      this.state.eu = true;
      searchPreset[0] = null;
      this.retrieveChef();
    }
    if (searchPreset[0] == 'africa') {
      this.state.buttonColorAF = "rgba(255, 0, 0, 0.8)";
      this.state.af = true;
      searchPreset[0] = null;
      this.retrieveChef();
    }
    if (searchPreset[0] == 'fusion') {
      this.state.buttonColorFUS = "rgba(255, 0, 0, 0.8)";
      this.state.fus = true;
      searchPreset[0] = null;
      this.retrieveChef();
    }
  }

  render() {
    const Chefs = [];
    for (i = 0; i < chefIdSet.length; i++) {
      Chefs.push(
        <TouchableOpacity key={i} onPress={this.chefSelect(i)}>

          <View style={{ borderBottomWidth: 1, borderBottomColor: 'grey', borderRadius: 10, marginTop: 10, width: windowW }}>
            <View style={{ flexDirection: 'row', marginBottom: 5, marginLeft: '5%' }}>
              <View>
                <Image source={{ uri: chefPhoto[i] }} style={styles.logLogo,
                  [{ borderRadius: 1000, width: 0.30 * windowW, height: 0.30 * windowW, borderColor: 'rgba(217,217,217,1)', borderWidth: 2 }]} />
              </View>
              <View style={{ marginLeft: '5%', marginTop:'2%' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 0.045 * windowW }}> {chefName[i] + ' ' + chefLastname[i]}</Text>
                <View style={{ marginTop: '3%', alignItems: 'baseline' }}>
                  <Stars default={parseFloat(chefScore[i])} count={5} half={true} starSize={0}
                    fullStar={<Icon name={'star'} size={0.04 * windowW} color='red' />}
                    emptyStar={<Icon name={'star-o'} size={0.04 * windowW} color='red' />}
                    halfStar={<Icon name={'star-half-full'} size={0.04 * windowW} color='red' />}
                    spacing={5} disabled />
                </View>
                <Text style={{ fontSize: 0.032 * windowW }}> {chefNumber[i] + ' total reviews'}</Text>
                <Text adjustsFontSizeToFit={true} style={{ marginLeft: -2, marginTop: '2%', fontSize: 0.032 * windowW }}> {chefType[i]}</Text>
              </View>

            </View>

          </View>
        </TouchableOpacity>

      );

    }
    /*
          <ImageBackground source={require('./images/logoNero.png')} resizeMode="cover" style={{
          flex: 1, justifyContent: "center",
          alignItems: 'center', position: 'absolute', width: 0.9 * windowW, height: 0.9 * windowW, opacity: 0.12
        }} />
    */
    const { open, value, items } = this.state;
    const { search } = this.state;
    return (
      <SafeAreaView style={{ margin: 0, marginTop: 0, flex: 1, alignItems: 'center', justifyContent: 'center' }}>

        <View style={{ flex: 90, width: windowW, heigth: windowH * 1.0 }}>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgb(217,13,12)', height: windowH * 0.11 }}>
              <View style={{ alignItems: 'center' }}>
                <Image source={require('./images/logo.png')} style={styles.logLogo, [{ borderRadius: 40, width: 0.15 * windowW, height: 0.15 * windowW }]} />
              </View>
              <Text style={[styles.titleText, { marginLeft: windowW * 0.03, fontSize: 0.1 * windowW, color: 'white' }]}>Search</Text>
            </View>
            <View style={{ flexGrow: 7, alignItems: 'center', borderBottomWidth: 1, borderBottomColor: 'grey', borderRadius: 10, backgroundColor: 'rgba(217,217,217,0.1)' }}>
              <View style={{ flex: 2, width: 0.9 * windowW, alignSelf: 'center', marginTop: '2%' }}>
                <SearchBar placeholder="Search by name and last name" containerStyle={{ backgroundColor: 'transparent', borderTopWidth: 0, borderBottomWidth: 0 }}
                  inputContainerStyle={{ backgroundColor: 'rgba(226, 226, 226, 0.5)' }} inputStyle={{ fontSize: 0.038 * windowW }}
                  onChangeText={this.updateSearch} value={search} />
              </View>

              <View style={{ flex: 1, width: 0.85 * windowW }}>
                <Text style={[styles.greyText, { color: 'black', fontSize: 0.045 * windowW }]}>Filters:</Text>
              </View>

              <View style={{ flex: 10, width: windowW, alignItems: 'center', marginTop: '3%' }}>

                <View style={{ flexDirection: 'row', marginBottom: '2%' }}>
                  <Button title="Asian" titleStyle={{ fontFamily: 'Times New Roman', color: 'black', fontSize: 0.035 * windowW }}
                    buttonStyle={{ marginLeft: 10, backgroundColor: this.state.buttonColorA, borderRadius: 100 }} containerStyle={{ width: "40%" }}
                    onPress={() => this.handleAsian()} />
                  <Button title="European" titleStyle={{ fontFamily: 'Times New Roman', color: 'black', fontSize: 0.035 * windowW }}
                    buttonStyle={{ marginLeft: 10, backgroundColor: this.state.buttonColorE, borderRadius: 100 }} containerStyle={{ width: "40%" }}
                    onPress={() => this.handleEu()} />
                </View>

                <View style={{ flexDirection: 'row', marginBottom: '2%' }}>
                  <Button title="North American" titleStyle={{ fontFamily: 'Times New Roman', color: 'black', fontSize: 0.035 * windowW }}
                    buttonStyle={{ marginLeft: 10, backgroundColor: this.state.buttonColorNA, borderRadius: 100 }} containerStyle={{ width: "40%" }}
                    onPress={() => this.handleNa()} />
                  <Button title="South American" titleStyle={{ fontFamily: 'Times New Roman', color: 'black', fontSize: 0.035 * windowW }}
                    buttonStyle={{ marginLeft: 10, backgroundColor: this.state.buttonColorSA, borderRadius: 100 }} containerStyle={{ width: "40%" }}
                    onPress={() => this.handleSa()} />
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Button title="African" titleStyle={{ fontFamily: 'Times New Roman', color: 'black', fontSize: 0.035 * windowW }}
                    buttonStyle={{ marginLeft: 10, backgroundColor: this.state.buttonColorAF, borderRadius: 100 }} containerStyle={{ width: "40%" }}
                    onPress={() => this.handleAf()} />
                  <Button title="Fusion" titleStyle={{ fontFamily: 'Times New Roman', color: 'black', fontSize: 0.035 * windowW }}
                    buttonStyle={{ marginLeft: 10, backgroundColor: this.state.buttonColorFUS, borderRadius: 100 }} containerStyle={{ width: "40%" }}
                    onPress={() => this.handleFus()} />
                </View>

              </View>
              <View style={{ flex: 2, width: 0.85 * windowW, alignItems: 'stretch', justifyContent: 'center' }}>
                <Slider value={this.state.sliderValue} onValueChange={(sliderValue) => this.setState({ sliderValue })}
                  maximumValue={100} minimumValue={0} step={1} thumbTouchSize={{ width: 20, height: 20 }}
                  thumbStyle={{ width: 0.05 * windowW, height: 0.05 * windowW }} />
                <Text style={{ fontSize: 0.035 * windowW }}>Value: {this.state.sliderValue} km</Text>
              </View>
              <View style={{ flex: 6, alignItems: 'center', marginBottom: '2%' }}>
                <Button title="Search" titleStyle={{ fontFamily: 'Times New Roman', fontWeight: 'bold', fontSize: 0.04 * windowW }}
                  buttonStyle={{ backgroundColor: 'rgb(217,13,12)' }} containerStyle={{ marginTop: 1, width: 0.25 * windowW }}
                  onPress={() => this.retrieveChef()} />

              </View>
            </View>
            <View style={{ flexGrow: 100, alignItems: 'center' }}>
              {Chefs}
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

/*
<DropDownPicker open={open} value={value} items={items}
setOpen={this.setOpen} setValue={this.setValue} setItems={this.setItems}
multiple={true} min={0} max={6} placeholder="Select one or more cousine types"
dropDownContainerStyle={{ backgroundColor: 'white',zIndex: 1000, elevation: 1000 }}
/>

*/
