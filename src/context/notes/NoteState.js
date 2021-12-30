import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
    const notesinitial = [{
        "_id": "61cc51b8b805482d76e436dd",
        "user": "61cb3b03e906c57e7b86a482",
        "title": "My Title updated",
        "description": "Wake up early morning updated",
        "tag": "everyone updated",
        "date": "2021-12-29T12:16:56.259Z",
        "__v": 0
    },
    {
        "_id": "61cc51b8b805482d76e436dd",
        "user": "61cb3b03e906c57e7b86a482",
        "title": "My Title updated",
        "description": "Wake up early morning updated",
        "tag": "everyone updated",
        "date": "2021-12-29T12:16:56.259Z",
        "__v": 0
    },
    {
        "_id": "61cc51b8b805482d76e436dd",
        "user": "61cb3b03e906c57e7b86a482",
        "title": "My Title updated",
        "description": "Wake up early morning updated",
        "tag": "everyone updated",
        "date": "2021-12-29T12:16:56.259Z",
        "__v": 0
    },
    {
        "_id": "61cc51b8b805482d76e436dd",
        "user": "61cb3b03e906c57e7b86a482",
        "title": "My Title updated",
        "description": "Wake up early morning updated",
        "tag": "everyone updated",
        "date": "2021-12-29T12:16:56.259Z",
        "__v": 0
    },
    {
        "_id": "61cc51b8b805482d76e436dd",
        "user": "61cb3b03e906c57e7b86a482",
        "title": "My Title updated",
        "description": "Wake up early morning updated",
        "tag": "everyone updated",
        "date": "2021-12-29T12:16:56.259Z",
        "__v": 0
    }]

    const [notes, setNotes] = useState(notesinitial)
    return (
        <NoteContext.Provider value={{ notes, setNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;