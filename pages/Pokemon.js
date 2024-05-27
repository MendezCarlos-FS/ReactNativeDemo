import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import PokemonForm from "../components/PokemonForm";
import HeaderTag from "../components/HeaderTag";
import Paragraph from "../components/Paragraph";

const apiUrl = "https://crud-api-demo-114594dfaedf.herokuapp.com/api/v1/pokemon";

export default function Pokemon({navigation, route}) {
    const [pokemon, setPokemon] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [values, setValues] = useState({
        name: "",
        level: 1,
        moves: []
    });

    const { id } = route.params;

    let ignore = false;
    useEffect(() => {
        if (!ignore) {
            getPokemon();
        }

        return () => {
            ignore = true;
        }
    }, []);

    const getPokemon = async () => {
        setLoading(true);
        try {
            await fetch(`${apiUrl}/${id}`)
            .then(res => res.json())
            .then(json => {
                setPokemon(json);
                setValues({
                    name: json.name,
                    level: json.level,
                    moves: json.moves
                });
            });
        } catch(error) {
            setError(error.message || "Unexpected Error");
        } finally {
            setLoading(false);
        }
    }

    const onSubmit = () => {
        navigation.popToTop();
    } 

    const onDelete = () => {
        navigation.popToTop();
    }

    return (
        <View style={styles.container}>
            <View>
                <HeaderTag number={2}>{values?.name}</HeaderTag>
                <Paragraph>Level: {values?.level}</Paragraph>
            </View>

            <PokemonForm pokemon={pokemon} onChange={setValues} onSubmit={onSubmit} onDelete={onDelete}/>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#282c34',
        color: "white",
        minHeight: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: 'center',
    }
});