import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import HeaderTag from "./HeaderTag";
import NumberInput from "./NumberInput";
import List from "./List";
import Button from "./Button";

const apiUrl = "https://crud-api-demo-114594dfaedf.herokuapp.com/api/v1/pokemon";

export default function PokemonForm({pokemon, onSubmit, onChange, onDelete}) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currMove, setCurrMove] = useState("");
    const [initLoad, setInitLoad] = useState(false);

    const [values, setValues] = useState({
        name: pokemon ? pokemon.name : "",
        level: pokemon ? pokemon.level : 1,
        moves: pokemon ? pokemon.moves : []
    });

    // Prop could take time to load from other component fetching,
    // so we set the value here once it's been fetched, and only once.
    if (pokemon && !initLoad) {
        setInitLoad(true);
        setValues({
            name: pokemon ? pokemon.name : "",
            level: pokemon ? pokemon.level : 1,
            moves: pokemon ? pokemon.moves : []
        });
    }

    const savePokemon = async() => {
        console.log(values);
        setLoading(true);
        try {
            const url = `${apiUrl}${pokemon ? `/${pokemon._id}` : ''}`;
            await fetch(url, {
            method: pokemon ? "PATCH" : "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(values)
        })
        .then(res => res.json())
        .then(json => {
            if (onSubmit) onSubmit();
        });
        } catch(error) {
            setError(error.message || "Unexpected Error");
        } finally {
            setLoading(false);
        }
    }

    const handleSubmit = ($event) => {
        $event.preventDefault();
        savePokemon();
    }

    const handleInputChanges = ($event, field) => {
        const newValues = {
            ...values,
            [field]: $event
        }
        setValues(newValues);
        if (onChange) onChange(newValues);
    }

    const deletePokemon = async() => {
        setLoading(true);
        try {
            await fetch(`${apiUrl}/${pokemon._id}`, {
                method: "DELETE"
            })
            .then(res => res.json())
            .then(json => {
                if (onDelete) onDelete();
            });
        } catch(error) {
            setError(error.message || "Unexpected Error");
        } finally {
            setLoading(false);
        }
    }

    const displayMoves = () => {
        return (
            <List
                data={values.moves}
                onDeleteEntry={removeMove}
                entryColor={"#282c34"}/>
        )
    }

    const addMove = () => {
        const existingMove = values.moves.find(otherMove => otherMove === currMove);
        if (!existingMove && currMove) {
            const newValues = {
                ...values,
                moves: [...values.moves, currMove]
            }
            setValues(newValues);
        }
    }

    const removeMove = (move) => {
        const index = values.moves.findIndex(otherMove => otherMove === move);
        values.moves.splice(index, 1);
        const newValues = {
            ...values,
            moves: [...values.moves]
        }
        setValues(newValues);
    }

    return (
        <View role="form" style={styles.container}
            onSubmit={($event) => handleSubmit($event)}>
            <View style={styles.inputs}>
                <View style={styles.inputFields}>
                    <View style={styles.label}>
                        <HeaderTag number={5} color={"#282c34"}>Name:</HeaderTag>
                        <TextInput
                            placeholder="Enter Name"
                            onChangeText={($event) => handleInputChanges($event, "name")}
                            value={values.name}/>
                    </View>
                    <View style={styles.label}>
                        <HeaderTag number={5} color={"#282c34"}>Level:</HeaderTag>
                        <NumberInput
                            placeholder="Enter Level"
                            onChangeText={($event) => handleInputChanges($event, "level")}
                            value={values.level}/>
                    </View>
                </View>
                <View style={styles.moveList}>
                    <HeaderTag number={5} color={"#282c34"}>List of Moves:</HeaderTag>
                    { displayMoves() }
                    <View style={styles.label}>
                        <TextInput
                            placeholder="Enter Move Name"
                            onChangeText={setCurrMove}/>
                        <Button
                            onPressOut={addMove}>
                            Add
                        </Button>
                    </View>
                </View>
            </View>
            <View style={styles.buttons}>
                <Button
                    onPressOut={handleSubmit}>
                    Submit
                </Button>
                {
                    pokemon
                    ? <Button
                        onPressOut={deletePokemon}>
                        Delete
                    </Button>
                    : <></>
                }
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        backgroundColor: "white",
        color: "#282c34",
        padding: 5,
        borderRadius: 5
    },
    inputs: {
        display: "flex",
        alignItems: "center",
    },
    inputFields: {
        display: "flex",
        flexDirection: "column",
    },
    moveList: {
        display: "flex",
        flexDirection: "column",
        borderWidth: 1,
        borderColor: "#282c34",
        padding: 5,
        maxHeight: 300
    },
    buttons: {
        display: "flex",
        justifyContent: "space-evenly",
    },
    label: {
        display: "flex",
        justifyContent: "space-between",
    }
});