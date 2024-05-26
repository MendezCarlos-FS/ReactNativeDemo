import { FlatList } from "react-native";
import ListItem from "./ListItem";

export default function List({data, idField, displayField}) {
    return (
        <FlatList
            data={data}
            renderItem={({item}) => <ListItem item={item} displayField={displayField}/> }
            keyExtractor={item => idField ? item[idField] : item}
        />
    );
}