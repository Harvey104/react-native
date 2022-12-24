// React Native Video Library to Play Video in Android and IOS
// https://aboutreact.com/react-native-video/
 
// import React in our code
import React, {useState, useRef, useLayoutEffect, useEffect} from 'react';
 
// import all the components we are going to use
import {SafeAreaView, StyleSheet, View, ImageBackground} from 'react-native';
 
//Import React Native Video to play video
import Video from 'react-native-video';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
 
//Media Controls to control Play/Pause/Seek and full screen
import
  MediaControls, {PLAYER_STATES}
from 'react-native-media-controls';
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

import { BASE_URL } from '../../config';
 
const QuizVideoScreen = ({navigation}) => {
  const videoPlayer = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [paused, setPaused] = useState(false);
  const [mount, setMount] = useState(0);
  const [playerState, setPlayerState] = useState(PLAYER_STATES.PLAYING);
  const [screenType, setScreenType] = useState('content');
  const [videoUrl, setVideoUrl] = useState('');
  const [imgUrl, setImgUrl] = useState('');

  const competition = useSelector((store) => store.competition.competition.competition);
  const auth = useSelector((store) => store.auth.auth);

  useLayoutEffect(() => {
    if (!mount) {
      setMount(1);
      getTopic();
    }
  });
  useEffect(() => {
    console.log(imgUrl)
  }, [imgUrl]);

  const getTopic = () => {
    var config = {
      method: 'post',
      url: BASE_URL + '/api/game/topic',
      // crossdomain: true,
      headers: { 
        'Content-Type': 'application/json',
        'x-access-token': auth.accessToken
      },
      data: {
        competitionId: competition.id
      }
    };console.log(config)

    axios(config)
      .then(function (response) {
        var topic = response.data.topic
        console.log(topic.imgUrl, ">>>>>>>>>>>>>")
        setVideoUrl(topic.videoUrl)
        setImgUrl(topic.imgUrl)
        console.log(topic)
      })
      .catch(function (error) {
        console.log(error);
      });
  }
 
  const onSeek = (seek) => {
    //Handler for change in seekbar
    videoPlayer.current.seek(seek);
  };
 
  const onPaused = (playerState) => {
    //Handler for Video Pause
    setPaused(!paused);
    setPlayerState(playerState);
  };
 
  const onReplay = () => {
    //Handler for Replay
    setPlayerState(PLAYER_STATES.PLAYING);
    videoPlayer.current.seek(0);
  };
 
  const onProgress = (data) => {
    // Video Player will progress continue even if it ends
    if (!isLoading && playerState !== PLAYER_STATES.ENDED) {
      setCurrentTime(data.currentTime);
    }
  };
 
  const onLoad = (data) => {
    setDuration(data.duration);
    setIsLoading(false);
  };
 
  const onLoadStart = (data) => setIsLoading(true);
 
  const onEnd = () => setPlayerState(PLAYER_STATES.ENDED);
 
  const onError = () => alert('Oh! ', error);
 
  const exitFullScreen = () => {
    alert('Exit full screen');
  };
 
  const enterFullScreen = () => {};
 
  const onFullScreen = () => {
    setIsFullScreen(isFullScreen);
    if (screenType == 'content') setScreenType('cover');
    else setScreenType('content');
  };
 
  const renderToolbar = () => (
    <View>
      <Text style={styles.toolbar}> toolbar </Text>
    </View>
  );
 
  const onSeeking = (currentTime) => setCurrentTime(currentTime);
 
  return (
    <SafeAreaView>
      <ImageBackground source={require('../../../assets/img/purple_bg.png')} resizeMode = {'stretch'} style = {{ height: '100%', width: '100%'}} >
        <Box h={'full'} w = {'full'} justifyContent = {'center'} alignItems = {'center'}>
          <Box w={'5/6'} h = {'5/6'} bg = {'white'} borderRadius = {'2xl'}>
            <VStack justifyContent={'center'} m = {'10'} alignContent = {'center'}>
              <VStack h={'1/5'} space = {'2'}>
                <Text fontSize={'xl'} lineHeight = {'xl'} fontWeight = {'semibold'} color= {'purple.50'}>Desafío preguntas sobre vídeo</Text>
                <Text fontSize={'xs'} lineHeight = {'2xs'} fontWeight = {'normal'} color = {'purple.50'}>A continuación verás un vídeo, puedes adelantar, retroceder, pero una vez que procedas a contestar las preguntas, no podrás devolverte a esta sección.</Text>
              </VStack>
              <Box h={'2/5'} justifyContent = {'flex-end'} alignItems = {'center'}>
                {
                  videoUrl ?
                  <>
                    <Video
                      onEnd={onEnd}
                      onLoad={onLoad}
                      onLoadStart={onLoadStart}
                      onProgress={onProgress}
                      paused={paused}
                      ref={videoPlayer}
                      resizeMode={screenType}
                      onFullScreen={isFullScreen}
                      // source = {require('../../../assets/video/mixkit-countryside-meadow-4075.mp4')}
                      // source={{
                      //   uri:
                      //     BASE_URL + '/api/video/download/template.mp4',
                      // }}
                      source={{
                        uri: videoUrl
                      }}
                      style={styles.mediaPlayer}
                      volume={10}
                    />
                    <MediaControls
                      duration={duration}
                      isLoading={isLoading}
                      mainColor="#333"
                      onFullScreen={onFullScreen}
                      onPaused={onPaused}
                      onReplay={onReplay}
                      onSeek={onSeek}
                      onSeeking={onSeeking}
                      playerState={playerState}
                      progress={currentTime}
                      toolbar={renderToolbar()}
                    />
                  </>
                  :
                  ""
                }
                {
                  !videoUrl && !imgUrl ?
                  <Image 
                    source={require('../../../assets/img/Beewise_Bee1.png')}
                    alt = "beewise_bee1" 
                  />
                  :
                  ""
                }
                {
                  !videoUrl && imgUrl ?
                  <Image 
                    // source={require('../../../assets/img/gold_star.png')}
                    source={{
                      uri: BASE_URL + '/api/video/download/' + imgUrl,
                    }}
                    alt = "beewise_bee1" 
                    size="2xl"
                  />
                  :
                  ""
                }
              </Box>
              <VStack h={'2/5'} space = {'3'} justifyContent = {'flex-end'}>
                <Button
                  w={'full'}
                  borderRadius = {'md'}
                  bg = {'yellow.50'}
                  _text = {{
                    color: '#000000',
                    fontSize: 'lg',
                    lineHeight: 'xl'
                  }}
                  isDisabled = {(!isLoading && playerState !== PLAYER_STATES.ENDED) ? true : false}
                  onPress = {() => {
                    navigation.navigate('GameScreen');
                    navigation.getParent()?.setOptions({
                      tabBarStyle: { display: 'none'},
                    });
                  }}
                >
                  Iniciar
                </Button>
                <Button w={'full'} borderRadius = {'md'} variant = {'outline'} _text = {{ color: '#8684D6', fontSize: 'lg', lineHeight: 'xl' }} onPress = {() => {
                    navigation.navigate('ManualGameScreen');
                    navigation.getParent()?.setOptions({
                      tabBarStyle: { display: 'flex', height: 84 },
                    });
                }}>
                  Volver
                </Button>
              </VStack>
            </VStack>
          </Box>
        </Box>
      </ImageBackground>
    </SafeAreaView>
  );
};
 
export default QuizVideoScreen;
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  toolbar: {
    marginTop: 30,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  mediaPlayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems : 'center',
    borderRadius: 20
  },
});