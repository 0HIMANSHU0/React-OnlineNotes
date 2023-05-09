import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props)  => {
 const noteInitial = [
  {
    "_id": "645871bfb95e3cf649702dbd",
    "user": "644f7d47c484ac6e28fd2115",
    "title": "for YOUTUBE",
    "description": "Subscribe my channel",
    "tag": "business",
    "date": "2023-05-08T03:51:27.907Z",
    "__v": 0
  },
  {
    "_id": "645a16912ee53bef1d21c5be",
    "user": "644f7d47c484ac6e28fd2115",
    "title": "for YOUTUBE",
    "description": "Subscribe my channel",
    "tag": "business",
    "date": "2023-05-09T09:46:57.340Z",
    "__v": 0
  },
  {
    "_id": "645a16b62ee53bef1d21c5c0",
    "user": "644f7d47c484ac6e28fd2115",
    "title": "for FaceBook",
    "description": "Follow me on facebook",
    "tag": "parmotion",
    "date": "2023-05-09T09:47:34.760Z",
    "__v": 0
  },
  {
    "_id": "645871bfb95e3cf649702dbd",
    "user": "644f7d47c484ac6e28fd2115",
    "title": "for YOUTUBE",
    "description": "Subscribe my channel",
    "tag": "business",
    "date": "2023-05-08T03:51:27.907Z",
    "__v": 0
  },
  {
    "_id": "645a16912ee53bef1d21c5be",
    "user": "644f7d47c484ac6e28fd2115",
    "title": "for YOUTUBE",
    "description": "Subscribe my channel",
    "tag": "business",
    "date": "2023-05-09T09:46:57.340Z",
    "__v": 0
  },
  {
    "_id": "645a16b62ee53bef1d21c5c0",
    "user": "644f7d47c484ac6e28fd2115",
    "title": "for FaceBook",
    "description": "Follow me on facebook",
    "tag": "parmotion",
    "date": "2023-05-09T09:47:34.760Z",
    "__v": 0
  },
  {
    "_id": "645871bfb95e3cf649702dbd",
    "user": "644f7d47c484ac6e28fd2115",
    "title": "for YOUTUBE",
    "description": "Subscribe my channel",
    "tag": "business",
    "date": "2023-05-08T03:51:27.907Z",
    "__v": 0
  },
  {
    "_id": "645a16912ee53bef1d21c5be",
    "user": "644f7d47c484ac6e28fd2115",
    "title": "for YOUTUBE",
    "description": "Subscribe my channel",
    "tag": "business",
    "date": "2023-05-09T09:46:57.340Z",
    "__v": 0
  },
  {
    "_id": "645a16b62ee53bef1d21c5c0",
    "user": "644f7d47c484ac6e28fd2115",
    "title": "for FaceBook",
    "description": "Follow me on facebook",
    "tag": "parmotion",
    "date": "2023-05-09T09:47:34.760Z",
    "__v": 0
  },
];
const [notes, setNotes] = useState(noteInitial);
return(
 <NoteContext.Provider value={{notes, setNotes}}>
  {props.children}
 </NoteContext.Provider>
)
}
export default NoteState;