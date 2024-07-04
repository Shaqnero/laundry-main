import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";

const NoteInput = ({ setNote, note }) => {
	return (
		<TextInput
			editable
			multiline
			numberOfLines={4}
			maxLength={60}
			onChangeText={(text) => setNote(text)}
			value={note}
			placeholder="Enter note for pickup"
			style={styles.textInput}
		/>
	);
};

export default NoteInput;

const styles = StyleSheet.create({
	textInput: {
		borderWidth: 1,
		borderColor: "black",
		borderStyle: "solid",
		padding: 10,
		borderRadius: 14,
	},
});
