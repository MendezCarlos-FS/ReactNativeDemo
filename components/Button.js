import { Pressable, StyleSheet, Text } from "react-native";

export default function Button({children, onPressOut}) {
    return (
        <Pressable
            style={styles.container}
            onPressOut={onPressOut}>
            <Text style={styles.text}>{children}</Text>
        </Pressable>
    )
}
const styles = StyleSheet.create({
    container: {
        borderColor: "#282c34",
        borderWidth: 1,
    },
    text: {
        textAlign: "center"
    }
});