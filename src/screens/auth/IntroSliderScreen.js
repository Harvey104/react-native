import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  ImageBackground
} from 'react-native';

import {
    Box,
    Text,
    VStack,
    Image,
    FormControl,
    Input,
    Pressable,
    Icon,
    HStack,
    Button
  } from "native-base";
 
//import AppIntroSlider to use it
import AppIntroSlider from 'react-native-app-intro-slider';
 
export default function IntroSliderScreen({ navigation }) {
  const [showRealApp, setShowRealApp] = useState(false);
 
  const onDone = () => {
    setShowRealApp(true);
  };
  const onSkip = () => {
    setShowRealApp(true);
  };
 
  const RenderItem = ({item}) => {
    return (
        <SafeAreaView>
            <ImageBackground source={require('../../../assets/img/purple_bg.png')} resizeMode = {'stretch'} style = {{ height: '100%', width: '100%'}} >
            <Box h={'full'} w = {'full'} justifyContent = {'center'} alignItems = {'center'}>
                <Box w={'5/6'} h = {'5/6'} bg = {'white'} borderRadius = {'2xl'}>
                    <VStack space={'2'} m = {'10'} justifyContent = {'center'} alignItems = {'center'}>
                        <Image source={require('../../../assets/img/Beewise_Bee1.png')} alt = "beewise_bee1" />
                        <Text textAlign={ 'center' } fontSize = {'2xl'} lineHeight = {'4xl'} fontWeight = {'semibold'} color = {'purple.50'}>{ item.title }</Text>
                        <Text textAlign={'center'} fontSize = {'md'} lineHeight = {'lg'} fontWeight = {'normal'} color = {'purple.100'}>carlos.venegas@blanco.cl para validar tu cuenta</Text>
                        <Button w={'full'} mt="5" borderRadius = {'md'} bg = {'purple.50'} color = {'white'} onPress = {() => {
                            navigation.navigate('DataInputScreen');
                        }} >
                            ¡Empecemos!
                        </Button>
                        
                    </VStack>
                </Box>
            </Box>
            </ImageBackground>
        </SafeAreaView>
    );
  };
 
  return (
    <>
      {showRealApp ? (
        <SafeAreaView style={styles.container}>
          <View style={styles.container}>
            <Text style={styles.titleStyle}>
              React Native App Intro Slider using AppIntroSlider
            </Text>
            <Text style={styles.paragraphStyle}>
              This will be your screen when you click Skip
              from any slide or Done button at last
            </Text>
            <Button
              title="Show Intro Slider again"
              onPress={() => setShowRealApp(false)}
            />
          </View>
        </SafeAreaView>
      ) : (
        <AppIntroSlider
          data={slides}
          renderItem={RenderItem}
          onDone={onDone}
          dotStyle={{marginBottom: 200, backgroundColor: '#BDBDBD' }}
          activeDotStyle={{marginBottom: 200, backgroundColor: '#6A67CE' }}
        />
      )}
    </>
  );
};
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 10,
    justifyContent: 'center',
  },
  titleStyle: {
    padding: 10,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  paragraphStyle: {
    padding: 20,
    textAlign: 'center',
    fontSize: 16,
  },
  introImageStyle: {
    width: 200,
    height: 200,
  },
  introTextStyle: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    paddingVertical: 30,
  },
  introTitleStyle: {
    fontSize: 25,
    color: 'white',
    textAlign: 'center',
    marginBottom: 16,
    fontWeight: 'bold',
  },
});
 
const slides = [
  {
    key: 's1',
    title: 'Revisa tu email',
    text: 'carlos.venegas@blanco.cl para validar tu cuenta',
  },
  {
    key: 's2',
    title: 'Juego colaborativo',
    text: 'BeeWise despertará tu interés por aprender mediante juegos',
  },
];