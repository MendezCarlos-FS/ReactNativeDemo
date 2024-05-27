import { SafeAreaView, StatusBar, StyleSheet, View } from "react-native";
import HeaderTag from "../components/HeaderTag";
import List from "../components/List";
import { useEffect, useState } from "react";
import PokemonForm from "../components/PokemonForm";

const apiUrl = "https://crud-api-demo-114594dfaedf.herokuapp.com/api/v1/pokemon";

export default function Home({navigation}) {
    const [pokemon, setPokemon] = useState(null);

    let ignore = false;
    useEffect(() => {
        if (!ignore) {
            getPokemon();
        }

        return () => {
            ignore = true;
        }
    }, []);

    const getPokemon = async() => {
        try {
            await fetch(apiUrl)
            .then(res => res.json())
            .then(json => {
                setPokemon(json);
            })
        } catch(err) {
            console.error(err);
        }
    }

    return (
        <SafeAreaView
            style={styles.container}>
            <HeaderTag number={1}>
                Pokemon List Homepage
            </HeaderTag>
            <View style={styles.body}>
                <HeaderTag number={2}>All Pokemon:</HeaderTag>
                <List data={pokemon} displayField={"name"} idField={"_id"} navigation={navigation}/>
                <HeaderTag number={2}>Create New Pokemon:</HeaderTag>
                <PokemonForm onSubmit={getPokemon}/>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#282c34',
        color: "white",
        minHeight: "100%",
    },
    body: {
        display: "flex",
        flexDirection: "column",
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'auto',
        color: "auto",
    }
});