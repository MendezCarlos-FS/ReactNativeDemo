import { StyleSheet, Text } from "react-native";

export default function HeaderTag({children, number}) {
    let hNumber = number ? number : 5;
    hNumber = hNumber > 5 || hNumber < 1 ? 5 : hNumber

    const finalStyle = { ...styles.all, ...styles[`h${hNumber}`]};

    return (
        <Text
            style={finalStyle}
            role="heading">
                {children}
        </Text>
    );
}
const styles = StyleSheet.create({
    all: {
        color: "white",
        textAlign: "center",
    },
    h1: {
        fontSize: 34,
        fontWeight: "bold",
    },
    h2: {
        fontSize: 30,
        fontWeight: "bold"
    },
    h3: {
        fontSize: 26,
        fontWeight: "bold"
    },
    h4: {
        fontSize: 22,
        fontWeight: "bold"
    },
    h5: {
        fontSize: 18,
    },
});