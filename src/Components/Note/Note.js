import React, { useRef, useState, memo } from 'react';

import { createNote, updateNote, deleteNote } from '../../API/Requests';

import './styles.css';

function Note({ data, removeFromList, fixLastAdded, writable }) {
    const { title, description, _id, owner, place } = data;
    const noteId = useRef(_id);
    const [noteTitle, setNoteTitle] = useState(title || '');
    const [noteDescription, setNoteDescription] = useState(description || '');
    const [readOnly, setReadOnly] = useState(!writable);

    function handleDelete() {
        //
        if (!noteId.current) {
            // just remove blank card
            removeFromList();
        } else {
            // delete from db
            deleteNote(noteId.current).then((res) => {
                console.log(res);
                removeFromList(noteId.current);
            });
        }
        setReadOnly(true);
    }

    function handleSubmit() {
        //
        if (noteTitle !== title || noteDescription !== description) {
            console.log({ noteDescription, noteTitle });
            if (!noteId.current) {
                // create
                createNote(place, noteTitle, noteDescription).then(
                    (note_id) => {
                        console.log('create', note_id);
                        noteId.current = note_id;
                        fixLastAdded(note_id);
                    }
                );
            } else {
                // update
                updateNote(place, noteTitle, noteDescription).then(
                    (note_id) => {
                        console.log('update', note_id);
                    }
                );
            }
        }
        setReadOnly(true);
    }

    return (
        <div className='note-outer'>
            <div className='button-group'>
                {readOnly ? (
                    <button
                    title='Editar nota'
                        onClick={() => {
                            setReadOnly(false);
                        }}>
                        <i className='fas fa-pen'></i>
                    </button>
                ) : (
                    <>
                        <button
                            className='green'
                            title='Salvar modificações'
                            onClick={handleSubmit}>
                            <i className='far fa-save'></i>
                        </button>
                    </>
                )}
                <button
                    className='red'
                    title='Apagar nota'
                    onClick={handleDelete}>
                    <i className='far fa-trash-alt'></i>
                </button>
            </div>
            <div className='note-inner'>
                <input
                    type='text'
                    placeholder='Título (opcional)'
                    maxLength={50}
                    readOnly={readOnly}
                    onChange={(e) => {
                        setNoteTitle(e.target.value);
                    }}
                    defaultValue={noteTitle}
                />
                <div className='title-counter'>
                    <Countdown limit={50} current={noteTitle.length} />
                </div>

                <textarea
                    rows='4'
                    maxLength={420}
                    readOnly={readOnly}
                    placeholder='Descrição (obrigatório)'
                    onChange={(e) => {
                        setNoteDescription(e.target.value);
                    }}
                    value={noteDescription}
                />
                <div className='description-counter'>
                    <Countdown limit={420} current={noteDescription.length} />
                </div>
            </div>
        </div>
    );
}

function Countdown(props) {
    const { limit, current } = props;
    const color = `rgb(${Math.floor((255 * current) / limit)}, ${Math.floor(
        (255 * (limit - current)) / limit
    )}, 0 )`;

    return (
        <span
            style={{
                color: color
            }}>
            {limit - current}
        </span>
    );
}

export default Note;
