import React, { useState } from 'react';
import {
	Dimensions,
	SafeAreaView,
	ScrollView,
	StatusBar,
	Text,
	useColorScheme,
	View,
	TextInput,
	Button,
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { VLCPlayer } from 'react-native-vlc-media-player';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

function App(): React.JSX.Element {
	const DEFAULT_RTSP_URL = 'rtsp://fake.kerberos.io/stream';

	const [urlInput, setUrlInput] = useState(DEFAULT_RTSP_URL);
	const [newUrl, setNewUrl] = useState('');
	const [noAudio, setNoAudio] = useState(false);

	const initOptions = [
		noAudio ? '--no-audio' : null,
		'--rtsp-tcp',
		'--no-stats',
		// '--network-caching=150',
		// '--rtsp-caching=150',
		// '--tcp-caching=150',
		// '--realrtsp-caching=150',
		
		'--network-caching=50',  // Reduced caching time
		'--rtsp-caching=50',     // Reduced caching time
		'--tcp-caching=50',      // Reduced caching time
		'--realrtsp-caching=50', // Reduced caching time (poc-2 +^^^)
		'--clock-jitter=0', // poc-3
		'--clock-synchro=0', // poc-3
	].filter(Boolean);

	const isDarkMode = useColorScheme() === 'dark';

	const calcVLCPlayerHeight = (windowWidth: number, aspetRatio: number) => {
		return windowWidth * aspetRatio;
	};

	const handleUpdateUrl = () => {
		setUrlInput(newUrl);
	};

	const handleCheckboxChange = () => {
		setNoAudio(!noAudio);
	};

	const backgroundStyle = {
		backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
		padding: 20
	};

	return (
		<SafeAreaView style={backgroundStyle}>
			<StatusBar
				barStyle={isDarkMode ? 'light-content' : 'dark-content'}
				backgroundColor={backgroundStyle.backgroundColor}
			/>
			<ScrollView contentInsetAdjustmentBehavior="automatic">
				<Text style={{ marginBottom: 10, fontWeight: 'bold', fontSize: 18 }}>Dogstreamer</Text>
				<View style={{ height: 400 }}>

					<VLCPlayer
						source={{
							initType: 2,
							hwDecoderEnabled: 1,
							hwDecoderForced: 1,
							uri: urlInput ?? DEFAULT_RTSP_URL,
							initOptions: initOptions
						}}
						autoplay={true}
						autoAspectRatio={true}
						resizeMode="cover"
						isLive={true}
						autoReloadLive={true}
						playInBackground={true}
						style={{
							height: calcVLCPlayerHeight(Dimensions.get('window').width, 3 / 4),
							marginTop: 30
						}}
					/>
				</View>

				<View style={{ marginTop: 10 }}>
					<TextInput
						style={{
							height: 40,
							borderColor: 'gray',
							borderWidth: 1,
							paddingHorizontal: 10,
							marginBottom: 10,
						}}
						onChangeText={setNewUrl}
						value={newUrl}
						placeholder="Enter RTSP URL"
					/>
					<Button title="Play" onPress={handleUpdateUrl} />

					<View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
						<BouncyCheckbox
							isChecked={noAudio}
							onPress={handleCheckboxChange}
							text="Disable Audio"
						/>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

export default App;
