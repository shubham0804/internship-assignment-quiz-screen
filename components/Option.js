import React from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { RadioButton } from "react-native-paper";
import { COLORS } from "../assets/theme";

const Option = ({ state, optionText, optionNo, questionIndex, answer }) => {
    const setCheckedOption = () => {
        let newState = [...state.checked];
        newState[questionIndex] = optionNo;
        state.setChecked(newState);
    };
    let backgroundColor;
    if (state.checked[questionIndex] !== 0 && optionText === answer) {
        backgroundColor = COLORS.lightGreen;
    } else if (state.checked[questionIndex] !== 0 && optionText !== answer) {
        backgroundColor = COLORS.lightRed;
    }

    return (
        <Pressable style={[styles.optionContainer, { backgroundColor }]} onPress={setCheckedOption}>
            <RadioButton
                value="first"
                status={state.checked[questionIndex] === optionNo ? "checked" : "unchecked"}
                onPress={setCheckedOption}
                color={optionText === answer ? "green" : "red"}
            />
            <Text style={styles.optionText}>{optionText}</Text>
        </Pressable>
    );
};

export default Option;

const styles = StyleSheet.create({
    optionText: {
        fontSize: 20,
        fontWeight: "bold",
        marginLeft: 5,
        color: COLORS.primary,
    },
    optionContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 5,
        paddingHorizontal: 20,
        paddingVertical: 3,
    },
});
