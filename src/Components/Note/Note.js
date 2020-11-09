import React, { useRef, useState, memo } from 'react';

import TextareaAutosize from '@material-ui/core/TextareaAutosize';

import './styles.css';

function Note({ data }) {
    const { title, description, _id, owner, place } = data;
    const noteId = useRef(_id);
    const [noteTitle, setNoteTitle] = useState(title);
    const [noteDescription, setNoteDescription] = useState(description);

    function handleDelete() {}

    function handleUpdate() {}

    function handleCreate() {}

    return (
        <div className='note-outer'>
            <button>
                <i className='far fa-trash-alt' title='Apagar nota'></i>
            </button>
            <button>
                <i className='far fa-save' title='Salvar modificações'></i>
            </button>
            <div className='note-inner'>
                <input
                    type='text'
                    placeholder='Título'
                    maxLength={50}
                    onChange={(e) => {
                        setNoteTitle(e.target.value);
                    }}
                    value={noteTitle}
                />
                <div className='title-counter'>
                    <Countdown limit={50} current={noteTitle.length} />
                </div>

                <textarea
                    rows='4'
                    maxLength={420}
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
    return (
        <span
            style={{
                color: `rgb(${Math.floor(
                    (255 * current) / limit
                )}, ${Math.floor((255 * (limit - current)) / limit)}, 0 )`
            }}>
            {limit - current}
        </span>
    );
}

export default Note;
