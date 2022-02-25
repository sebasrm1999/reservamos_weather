import React, {useState, useEffect} from 'react';
import { Alert, Image, Text, View, useWindowDimensions } from 'react-native';
import {FontAwesome5} from '@expo/vector-icons';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios';
import { useFonts, DancingScript_600SemiBold } from '@expo-google-fonts/dancing-script';
import AppLoading from 'expo-app-loading';
import { home as styles } from '../utils/styles';
import Loader from '../components/Loader';
import CityComponent from '../components/City';
import {REACT_APP_WEATHER_API_KEY} from '@env';

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

      useEffect(() => {
        let date = new Date();
        setCurrentDay(date.getDay());
      }, []);

      const searchCity = async () => {
          if(city != ""){
            await setLoading(true);
            await axios.get(`https://search.reservamos.mx/api/v2/places`, { params: { q : city} })
            .then(json => {
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
                        
                        {loading ? <Loader message="Searching cities..." /> :
                        cityObj ? 
                        <CityComponent styles={styles} currentDay={currentDay} daysList={daysList} cityObj={cityObj} />
                        : 
                        <View>
                            <Text style={{fontSize: 20, color: '#002674'}}>No cities found yet...</Text>
                        </View>
                        }
                        
                    </View>
                </View>
    );
}