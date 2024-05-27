import { TextInput } from "react-native";

export default function NumberInput({placeholder, value, onChangeText}) {
    const initValue = "" + value;
    return (
        <TextInput
            inputMode="decimal"
            placeholder={placeholder}
            value={initValue}
            onChangeText={onChangeText}
        />
    )
}