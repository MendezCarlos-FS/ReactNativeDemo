import { FlatList } from "react-native";
import ListItem from "./ListItem";
import LinkListItem from "./LinkListItem";

export default function List({data, idField, displayField, onDeleteEntry, entryColor, navigation}) {
    const renderItem = navigation
    ? ({item}) => <LinkListItem item={item} displayField={displayField} onDelete={onDeleteEntry} entryColor={entryColor} id={item[idField]} navigation={navigation}/>
    : ({item}) => <ListItem item={item} displayField={displayField} onDelete={onDeleteEntry} entryColor={entryColor}/>

    return (
        <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={item => idField ? item[idField] : item}
        />
    );
}