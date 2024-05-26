import { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import HeaderTag from "./HeaderTag";
import NumberInput from "./NumberInput";

const apiUrl = "https://crud-api-demo-114594dfaedf.herokuapp.com/api/v1/pokemon";

export default function PokemonForm({pokemon, onSubmit, onChange}) {
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

    const moveChange = ($event) => {
        setCurrMove($event.target.value);
    }

    const deletePokemon = async() => {
        setLoading(true);
        try {
            await fetch(`${apiUrl}/${pokemon._id}`, {
                method: "DELETE"
            })
            .then(res => res.json())
            .then(json => {
                // TODO: Replace with React Native equivalent
                // navigate("/", { replace: true });
            });
        } catch(error) {
            setError(error.message || "Unexpected Error");
        } finally {
            setLoading(false);
        }
    }

    const displayMoves = () => {
        const moves = values.moves.map(move => {
            return (
                <li className="flex justify-content-between" key={move} value={move}>
                    <h5>{move}</h5>
                    <button type="button" onClick={() => removeMove(move)}>Delete</button>
                </li>
            );
        });

        return (
            <ul className="flex-col no-bullets">
                {
                    moves?.length
                    ? moves
                    : "No moves"
                }
            </ul>
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
                        <HeaderTag number={5}>Name:</HeaderTag>
                        <TextInput
                            placeholder="Enter Name"
                            onChangeText={($event) => handleInputChanges($event, "name")}
                            value={values.name}/>
                    </View>
                    <View style={styles.label}>
                        <HeaderTag number={5}>Level:</HeaderTag>
                        <NumberInput
                            placeholder="Enter Level"
                            onChangeText={($event) => handleInputChanges($event, "level")}
                            value={values.level}/>
                    </View>
                </View>
                <View className="flex-col move-list">
                    {/* <h5>List of Moves:</h5>
                    {
                        displayMoves()
                    }
                    <label>
                        <h5>Move:</h5>
                        <input id="move" type="text" onChange={moveChange}/>
                        <input type="button" value="Add" onClick={() => addMove()}/>
                    </label> */}
                </View>
            </View>
            <View className="flex justify-content-evenly">
                {/* <input type='submit' value="Submit"/>
                {
                    pokemon
                    ? <input type="button" value="Delete" onClick={deletePokemon}/>
                    : <></>
                } */}
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
    buttons: {

    },
    label: {
        display: "flex",
        justifyContent: "space-between",
    }
});