import React, { useState } from "react";
import { View, StyleSheet, Text, Vibration, Platform } from "react-native";
import { ProgressBar } from "react-native-paper";
import { useKeepAwake } from "expo-keep-awake";

import { colors } from "../../utils/colors";
import { spacingSizes, fontSizes } from "../../utils/sizes";
import { CountDown } from "../../components/CountDown";
import { RoundedButton } from "../../components/RoundedButton";
import { Timing } from "./Timing";

const DEFAULT_TIME = 0.1;

export const Timer = ({ focusSub, onTimerEnd, clearSub }) => {
	useKeepAwake();
	const [isStarted, setIsStarted] = useState(false);
	const [progress, setProgress] = useState(1);
	const [minutes, setMinutes] = useState(DEFAULT_TIME);
	const onProgress = (progress) => {
		setProgress(progress);
	};

	const vibrate = () => {
		if (Platform.OS === "ios") {
			//vibrate for 1 second
			const interval = setInterval(() => Vibration.vibrate(), 1000);
			//vibrate for full 10 senconds @ 1 sec interval
			setTimeout(() => clearInterval(interval), 10000);
		} else {
			Vibration.vibrate(10000); //10sec
		}
	};

	const onEnd = () => {
		vibrate();
		setMinutes(DEFAULT_TIME);
		setProgress(1);
		setIsStarted(false);
		onTimerEnd();
	};
	const changeTime = (min) => {
		setMinutes(min);
		setProgress(1);
		setIsStarted(false);
	};
	return (
		<View style={styles.container}>
			<View style={styles.countdown}>
				<CountDown
					minutes={minutes}
					isPaused={!isStarted}
					onProgress={onProgress} //function that is used to set state (progress)
					onEnd={onEnd}
				/>
			</View>
			<View style={{ paddingTop: spacingSizes.xxl }}>
				<Text style={styles.title}>Focusing on: </Text>
				<Text style={styles.task}>{focusSub}</Text>
			</View>
			<View style={{ paddingTop: spacingSizes.md }}>
				<ProgressBar
					progress={progress}
					color="#5E84E2"
					style={{ height: 10 }}
				/>
			</View>
			<View style={styles.buttonWrapper}>
				<Timing onChangeTime={changeTime} />
			</View>
			<View style={styles.buttonWrapper}>
				{!isStarted ? (
					<RoundedButton title="start" onPress={() => setIsStarted(true)} />
				) : (
					<RoundedButton title="pause" onPress={() => setIsStarted(false)} />
				)}
			</View>
			<View style={styles.clearSubButton}>
				<RoundedButton size={50} title={"-"} onPress={() => clearSub()} />
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	title: {
		color: colors.white,
		textAlign: "center",
	},
	task: {
		color: colors.white,
		fontWeight: "bold",
		textAlign: "center",
	},
	countdown: {
		flex: 0.5,
		alignItems: "center",
		justifyContent: "center",
	},
	buttonWrapper: {
		flex: 0.3,
		padding: 15,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
	clearSubButton: {
		paddingBotton: 25,
		paddingLeft: 25,
	},
});
