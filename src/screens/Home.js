import React, {useState} from 'react';
import { Alert, Image, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import {FontAwesome5} from '@expo/vector-icons';
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios';
import { useFonts, DancingScript_600SemiBold } from '@expo-google-fonts/dancing-script';
import AppLoading from 'expo-app-loading';
import {REACT_APP_WEATHER_API_KEY} from '@env';

export default function Home(props){
    const [loading, setLoading] = useState(false);
    const [cityObj, setCityObj] = useState(null);
    const [daysList, setDaysList] = useState([]);
    const [city, setCity] = useState("");
    let [fontsLoaded] = useFonts({
        DancingScript_600SemiBold,
      });
      const windowHeight = useWindowDimensions().height;
      const windowWidth = useWindowDimensions().width;

      const searchCity = async () => {
          if(city != ""){
            await setLoading(true);
            await axios.get(`https://search.reservamos.mx/api/v2/places`, { params: { q : city} })
            .then(json => {
                console.log(json.data[0]);
                if(json.data.length > 0){

                    searchForecast(json.data[0]);
                    
                } else {
                    Alert.alert('Ups', 'No cities found. Try with another one...');
                    setCityObj(null);
                    setLoading(false);
                }
            })
            .catch((error) => {
                console.log(error);
                Alert.alert('ERROR', 'An error occurred. Please try again...');
                setLoading(false);
            }
            );
          } else {
            Alert.alert('Ups!', 'Please type a city on the search bar...');
          }
      }

      const searchForecast = cityData => {
        axios.get(`https://api.openweathermap.org/data/2.5/onecall`, { 
            params: { lat : cityData.lat, lon: cityData.long, appid: REACT_APP_WEATHER_API_KEY} 
        })
        .then(json => {
            console.log(json.data);
            if(json.data){

               setCityObj(cityData);
               setDaysList(json.data.daily.slice(0, 7));
               setLoading(false);
                
            } else {
                Alert.alert('Ups', 'No cities found. Try with another one...');
                setCityobj(null);
                setLoading(false);
            }
        })
        .catch((error) => {
            console.log(error);
            Alert.alert('ERROR', 'An error occurred. Please try again...');
            setLoading(false);
        }
        );
    }

      if (!fontsLoaded) {
        return <AppLoading />;
      }

    return (
                <View style={{flex: 1, backgroundColor: '#FFF', minHeight: Math.round(windowHeight)}}>
                    <View style={styles.header}>
                        <View style={{justifyContent: 'center', alignItems: 'center'}}>
                            <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
                                <Image source={require('../../assets/reservamos_icon.png')} style={styles.reservamosIcon} />
                                <Image source={require('../../assets/reservamos_white.png')} style={styles.reservamosLogo} />
                            </View>
                            <Text style={{fontFamily: 'DancingScript_600SemiBold', color: '#FFF', fontSize: 35, marginTop: -20, marginLeft: 15}}>
                                WEATHER
                            </Text>
                        </View>
                        <View style={styles.inputView}>
                            <TextInput
                                style={styles.textinput}
                                placeholder="Search for a city..."
                                placeholderTextColor="#999594"
                                keyboardType="default"
                                onChange={val => setCity(val.nativeEvent.text)}
                            />
                            <TouchableOpacity onPress={searchCity}>
                                <FontAwesome5 style={{paddingLeft: 10}} name="search-location" size={30} color='#002674'/>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.container}>
                        
                        {cityObj ? 
                        <View>
                            <View style={{
                                width: Math.round(windowWidth) - 75, 
                                height: '90%',
                                borderColor: '#002674',
                                borderWidth: 2,
                                borderRadius: 10,
                                flexDirection: 'column'}
                            }>
                                <Text>{cityObj.city_name}</Text>
                            </View>
                        </View>
                        : 
                        <View>
                            <Text style={{fontSize: 20, color: '#002674'}}>No cities found yet...</Text>
                        </View>
                        }
                        
                    </View>
                </View>
    );
}

let styles = StyleSheet.create({
    header: {
      flex: 3,
      backgroundColor: '#002674',
      height: '100%',
      flexDirection: 'column',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      shadowColor: "#000",
      shadowColor: '#000',
      shadowOffset: { width: 1, height: 1 },
      shadowOpacity:  0.4,
      shadowRadius: 3,
      elevation: 5,
      paddingBottom:10
    },
    container : {
        backgroundColor: '#FFF',
        width: '90%',
        flex: 10,
        alignItems: 'center',
        justifyContent: 'space-around',
        alignSelf: 'center',
        padding: 4
    },
    textinput:{
        width : '80%',
        height: 40,
        color: '#002674',
        fontWeight: 'bold',
    },
    inputView:{
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center',
        borderColor: '#ce348b',
        borderWidth: 2,
        borderRadius: 20,
        padding: 10,
        backgroundColor: '#FFF',
        width: '90%',
        height: '35%'
    },
    boton:{
        backgroundColor: '#adc867',
        padding: 5,
        borderRadius: 5,
        color: '#FFF',
        fontSize: 20
    },
    label: {
        alignSelf: 'flex-start',
        fontWeight: 'bold',
        marginLeft: 10,
        marginBottom: -25
    },
    reservamosLogo: {
        width: 150,
        height: 60,
        resizeMode: 'contain',
        marginLeft: -10
    },
    reservamosIcon: {
        width: 60,
        height: 30,
        resizeMode: 'contain'
    },
    cityItem: {
        height: '90%',
        borderColor: '#002674',
        borderWidth: 2,
        borderRadius: 10,
        flexDirection: 'column'
    }
  });