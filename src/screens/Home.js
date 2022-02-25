import React, {useState, useEffect} from 'react';
import { Alert, Image, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import {FontAwesome5} from '@expo/vector-icons';
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios';
import { useFonts, DancingScript_600SemiBold } from '@expo-google-fonts/dancing-script';
import AppLoading from 'expo-app-loading';
import {REACT_APP_WEATHER_API_KEY} from '@env';
const kelvin = 272.15;

export default function Home(props){
    const [loading, setLoading] = useState(false);
    const [cityObj, setCityObj] = useState(null);
    const [daysList, setDaysList] = useState([]);
    const [currentDay, setCurrentDay] = useState(null);
    const [city, setCity] = useState("");
    let [fontsLoaded] = useFonts({
        DancingScript_600SemiBold,
      });
      const windowHeight = useWindowDimensions().height;
      const windowWidth = useWindowDimensions().width;
      const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      const weatherIcons = {
          'Thunderstorm': <FontAwesome5 style={{paddingLeft: 10}} name="thunderstorm" size={30} color='#c4b402'/>,
          'Drizzle' : <FontAwesome5 style={{paddingLeft: 10}} name="cloud-drizzle" size={30} color='#05a0ab'/>,
          'Rain' : <FontAwesome5 style={{paddingLeft: 10}} name="cloud-rain" size={30} color='#05a0ab'/>,
          'Snow' : <FontAwesome5 style={{paddingLeft: 10}} name="snowflake" size={30} color='#65e2eb'/>,
          'Mist' : <FontAwesome5 style={{paddingLeft: 10}} name="fog" size={30} color='#8b8f8c'/>,
          'Clear' : <FontAwesome5 style={{paddingLeft: 10}} name="sun" size={30} color='#f29b29'/>,
          'Clouds' : <FontAwesome5 style={{paddingLeft: 10}} name="cloud" size={30} color='#8b8f8c'/>,
          'Smoke' : <FontAwesome5 style={{paddingLeft: 10}} name="smoke" size={30} color='#8b8f8c'/>,
          'Haze' : <FontAwesome5 style={{paddingLeft: 10}} name="sun-haze" size={30} color='#f29b29'/>,
          'Dust' : <FontAwesome5 style={{paddingLeft: 10}} name="sun-dust" size={30} color='#cf8f3c'/>,
          'Fog' : <FontAwesome5 style={{paddingLeft: 10}} name="fog" size={30} color='#8b8f8c'/>,
          'Sand' : <FontAwesome5 style={{paddingLeft: 10}} name="cactus" size={30} color='#cf8f3c'/>,
          'Ash' : <FontAwesome5 style={{paddingLeft: 10}} name="volcano" size={30} color='#8b8f8c'/>,
          'Squall' : <FontAwesome5 style={{paddingLeft: 10}} name="hurricane" size={30} color='#002674'/>,
          'Tornado' : <FontAwesome5 style={{paddingLeft: 10}} name="tornado" size={30} color='#8b8f8c'/>,
      }

      useEffect(() => {
        let date = new Date();
        setCurrentDay(date.getDay());
        console.log(date.getDay());
      }, []);

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

    const DaysMap = () => {
        let nextDay = currentDay + 1;
        return <ScrollView>
            {daysList.map((day, dayKey) => {
            console.log(day);
            if((nextDay + 1) > 6){
                nextDay = 0;
            } else {
                nextDay++;
            }
            return <View key={dayKey} style={styles.daysItem}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={{fontSize : 18, fontWeight: 'bold'}}>{nextDay != 0 ? weekDays[nextDay - 1] : weekDays[6]}</Text>
                    {weatherIcons[day.weather[0].main]}
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-around', marginTop: 5}}>
                    <View style={{alignItems: 'center'}}>
                        <Text style={{fontSize: 16, fontWeight: 'bold'}}>{`${Math.round(day.temp.max - kelvin)}°`}</Text>
                        <Text style={{fontSize: 14, fontStyle: 'italic'}}>Max.</Text>
                    </View>
                    <View style={{alignItems: 'center'}}>
                        <Text style={{fontSize: 16, fontWeight: 'bold'}}>{`${Math.round(day.temp.min - kelvin)}°`}</Text>
                        <Text style={{fontSize: 14, fontStyle: 'italic'}}>Min.</Text>
                    </View>
                </View>
            </View>
        }
        )}
        </ScrollView>;
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
                                flexDirection: 'column',
                                justifyContent: 'space-around',
                                alignItems: 'center'
                            }
                            }>
                                <Text style={{fontFamily: 'Roboto', fontWeight: 'bold', fontSize: 30, 
                                    color: '#002674'}}>
                                    {cityObj.city_name}
                                </Text>
                                <View style={{flex: 1, marginVertical: 15, width: '90%'}}>
                                    <DaysMap/>
                                </View>
                                
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
    daysItem: {
        height: '90%',
        borderColor: '#8b8f8c',
        borderWidth: 1,
        borderRadius: 10,
        flexDirection: 'column',
        flex: 1,
        marginVertical: 10,
        padding: 10
    }
  });