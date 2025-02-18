import React, { useState } from "react";  
import "../styles/Note.css";  
import deleteIcon from "../assets/delete.svg";  
import editIcon from "../assets/edit.svg";  
import saveIcon from "../assets/save.svg"; // Assuming you have a save icon

function Note({ note, onDelete }) {  
    const [title, setTitle] = useState(note.title);  
    const [content, setContent] = useState(note.content);  
    const [isEditing, setIsEditing] = useState(false); // Track if editing mode is active  

    const formattedDate = new Date(note.created_at).toLocaleDateString("en-US");  

    const toggleEdit = () => {  
        setIsEditing((prev) => !prev);  
    };  

    return (  
        <div className="note-container">  
            <div className="tit">  
                <input  
                    type="text"  
                    className="note-title"  
                    value={title}  
                    onChange={(e) => setTitle(e.target.value)}  
                    readOnly={!isEditing}  
                />  
                <div className="btns">  
                    <button className="delete-btn" onClick={toggleEdit}>  
                        <img src={isEditing ? saveIcon : editIcon} alt={isEditing ? "Save" : "Edit"} />  
                    </button>  
                    <button className="delete-btn" onClick={() => onDelete(note.id)}>  
                        <img src={deleteIcon} alt="Delete" />  
                    </button>  
                </div>  
            </div>  
            <input  
                type="text"  
                className="note-content"  
                value={content}  
                onChange={(e) => setContent(e.target.value)}  
                readOnly={!isEditing}  
            />  
            <p className="note-date">{formattedDate}</p>  
        </div>  
    );  
}  

export default Note;
