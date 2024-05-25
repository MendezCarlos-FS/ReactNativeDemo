import { SafeAreaView, StatusBar, StyleSheet } from "react-native";
import HeaderTag from "../components/HeaderTag";

export default function Home() {
    return (
        <SafeAreaView
            style={styles.container}>
            <HeaderTag number={1}>
                Pokemon List Homepage
            </HeaderTag>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#282c34',
        color: "white",
        alignItems: 'center',
        justifyContent: 'center',
    },
});