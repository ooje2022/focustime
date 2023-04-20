import React, { useState, useEffect, useRef } from "react";
import { Text, View, StyleSheet } from "react-native";
import { fontSizes, spacingSizes } from "../utils/sizes";
import { colors } from "../utils/colors";

//setInterval() //use for repetitive task

const minutesToMillis = (min) => min * 1000 * 60;
const formatTime = (time) => (time < 10 ? `0${time}` : time);

export const CountDown = ({ minutes = 0.1, isPaused, onProgress, onEnd }) => {
	const [millis, setMillis] = useState(null);

	const minute = Math.floor(millis / 1000 / 60) % 60;
	const seconds = Math.floor(millis / 1000) % 60;

	const interval = useRef(null);

	const countDown = () => {
		setMillis((time) => {
			if (time === 0) {
				//cleanup to stop countdown
				clearInterval(interval.current);
				//
				return time;
			}
			const timeLeft = time - 1000;
			// Don't change state of object while another state change is ongoing. Instead use useEffect e.g for onProgress below
			return timeLeft;
		});
	};

	//reset timer on change of minutes variable
	useEffect(() => {
		setMillis(minutesToMillis(minutes));
	}, [minutes]);

	//onProgress is a function not state
	useEffect(() => {
		onProgress(millis / minutesToMillis(minutes));
		if (millis === 0) {
			onEnd();
		}
	}, [millis]);

	useEffect(() => {
		if (isPaused) {
			//cleanup on pause
			if (interval.current) clearInterval(interval.current);
			return;
		}
		interval.current = setInterval(countDown, 1000);

		return () => clearInterval(interval.current);
	}, [isPaused]);
	return (
		<Text style={styles.text}>
			{formatTime(minute)} : {formatTime(seconds)}
		</Text>
	);
};

const styles = StyleSheet.create({
	text: {
		fontSize: fontSizes.xxl,
		fontWeight: "bold",
		color: colors.white,
		padding: spacingSizes.lg,
		backgroundColor: "rgba(94,132,226,0.3)",
	},
});
