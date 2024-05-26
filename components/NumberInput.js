import { TextInput } from "react-native";

export default function NumberInput({placeholder, value, onChangeText}) {
    return (
        <TextInput
            inputMode="decimal"
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
        />
    )
}