import { StyleSheet, Text } from "react-native";

export default function ListItem({item, displayField}) {
    const value = displayField ? item[displayField] : item;
    return (
        <Text style={styles}>{value}</Text>
    )
}
const styles = StyleSheet.create({
    color: "auto"
});