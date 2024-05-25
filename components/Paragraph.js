import { StyleSheet, Text } from "react-native";

export default function Paragraph({children}){
    return (
        <Text
            style={styles}>
                {children}
        </Text>
    )
}
const styles = StyleSheet.create({
    color: "white"
});