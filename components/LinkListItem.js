import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { faClose } from '@fortawesome/free-solid-svg-icons/faClose';

export default function LinkListItem({item, displayField, onDelete, entryColor, navigation, id}) {
    const value = displayField ? item[displayField] : item;

    const textStyle = { ...styles.text };
    if (entryColor) {
        textStyle.color = entryColor
    }

    function pressed() {
        navigation.navigate("Pokemon", {id});
    }

    return (
        <View style={styles.container}>
            <Text style={textStyle} onPress={pressed}>{value}</Text>
            {
                onDelete
                ? <Pressable
                    onPressOut={() => onDelete(item)}>
                    <FontAwesomeIcon icon={faClose}/>
                </Pressable>
                : <></>
            }
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between"
    },
    text: {
        color: "#61dafb",
        textDecorationLine: "underline"
    }
});