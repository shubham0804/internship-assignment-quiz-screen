import { StatusBar } from "expo-status-bar";
import React, { useState, useRef } from "react";
import Constants from "expo-constants";
import { StyleSheet, Text, View, Pressable, Image, Animated } from "react-native";
import Option from "./components/Option";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AnimatedCircularProgress } from "react-native-circular-progress";

import { COLORS } from "./assets/theme";
import questions from "./constants/questions.js";

const statusBarHeight = Constants.statusBarHeight;

export default function App() {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [checked, setChecked] = useState(Array(questions.length).fill(0));
    const fadeAnim = useRef(new Animated.Value(1)).current;

    const fadeIn = () => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };

    const fadeOut = (callback) => {
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start(() => {
            callback();
            fadeIn();
        });
    };

    const currentQuestion = questions[currentQuestionIndex];
    let questionPercentage = Math.round(((currentQuestionIndex + 1) / questions.length) * 100);
    currentQuestionIndex === 0
        ? (questionPercentage = 0)
        : (questionPercentage = questionPercentage);

    const navigate = (direction) => {
        if (direction === "next") {
            if (currentQuestionIndex < questions.length - 1) {
                fadeOut(() => setCurrentQuestionIndex(currentQuestionIndex + 1));
            }
        } else if (direction === "previous") {
            if (currentQuestionIndex > 0) {
                fadeOut(() => setCurrentQuestionIndex(currentQuestionIndex - 1));
            }
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar translucent backgroundColor={COLORS.secondary} />
            {/* Heading */}

            <View style={styles.progressNextButtonContainer}>
                {/* Previous Button */}
                <Pressable
                    style={styles.navigationButton}
                    onPress={() => navigate("previous")}
                    android_ripple={{
                        radius: 33,
                    }}
                >
                    <MaterialCommunityIcons name="chevron-double-left" size={25} color="white" />
                </Pressable>

                {/* Progress Indicator */}
                <AnimatedCircularProgress
                    size={80}
                    width={8}
                    fill={questionPercentage}
                    tintColor="#00e0ff"
                    // tintColor={COLORS.secondary}
                    tintColor={questionPercentage < 100 ? COLORS.secondary : COLORS.lightGreen}
                    children={() => (
                        <Animated.Text style={[styles.percentageText, { opacity: fadeAnim }]}>
                            {questionPercentage}%
                        </Animated.Text>
                    )}
                />

                {/* Next Button */}
                <Pressable
                    style={styles.navigationButton}
                    onPress={() => navigate("next")}
                    android_ripple={{
                        rippleColor: "#ffffff",
                        radius: 33,
                    }}
                >
                    <MaterialCommunityIcons name="chevron-double-right" size={25} color="white" />
                </Pressable>
            </View>

            <Animated.View style={[{ opacity: fadeAnim, alignItems: "center" }]}>
                {/* Question */}
                <View style={{ flexDirection: "row" }}>
                    <Text style={styles.questionTextIndex}>{currentQuestionIndex + 1}. </Text>
                    <Text style={[styles.questionText]}>{currentQuestion.question}</Text>
                </View>

                {/* Image */}
                <Image source={currentQuestion.image} style={styles.image} />

                {/* Options */}
                <View style={[styles.optionsContainer]}>
                    {currentQuestion.options.map((option, index) => (
                        <Option
                            key={index.toString()}
                            optionNo={index + 1}
                            questionIndex={currentQuestionIndex}
                            state={{ checked, setChecked }}
                            optionText={option}
                            answer={currentQuestion.answer}
                        />
                    ))}
                </View>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        marginHorizontal: 20,
        marginTop: statusBarHeight + 50,
    },
    image: {
        width: 200,
        height: 200,
        marginVertical: 15,
    },
    navigationButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 15,
        width: 70,
        height: 40,
        marginBottom: 30,
        backgroundColor: COLORS.lightSecondary,
        backgroundColor: "#ff6b6c",
    },
    navigationText: {
        fontSize: 17,
        fontWeight: "bold",
        color: "white",
    },
    optionsContainer: {
        // marginTop: 10,
    },
    percentageText: {
        fontSize: 18,
        color: COLORS.primary,
        fontWeight: "bold",
    },
    progressNextButtonContainer: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
        marginBottom: 20,
    },
    questionText: {
        fontSize: 28,
        textAlign: "center",
        color: COLORS.primary,
    },
    questionTextIndex: {
        fontSize: 28,
        textAlign: "center",
        color: COLORS.secondary,
        fontWeight: "bold",
        marginRight: -10,
    },
});
