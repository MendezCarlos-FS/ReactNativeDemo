import { StyleSheet, Text } from "react-native";

export default function Paragraph({children}){
    return (
        <Text
            style={styles.text}>
                {children}
        </Text>
    )
}
const styles = StyleSheet.create({
    text: {
        color: "white"
    }
});