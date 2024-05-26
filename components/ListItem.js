import { StyleSheet, Text } from "react-native";

export default function ListItem({item, displayField}) {
    return (
        <Text style={styles}>{item[displayField]}</Text>
    )
}
const styles = StyleSheet.create({
    color: "auto"
});