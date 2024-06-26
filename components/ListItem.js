import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { faClose } from '@fortawesome/free-solid-svg-icons/faClose';

export default function ListItem({item, displayField, onDelete, entryColor}) {
    const value = displayField ? item[displayField] : item;

    const textStyle = { ...styles.text };
    if (entryColor) {
        textStyle.color = entryColor
    }

    return (
        <View style={styles.container}>
            <Text style={textStyle}>{value}</Text>
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
        color: "white",
    }
});