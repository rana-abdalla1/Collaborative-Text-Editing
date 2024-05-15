import React from 'react';
import TextEditor from './quill';
import {useLocation} from 'react-router-dom';


// eslint-disable-next-line require-jsdoc
function Texteditor() {
    const {state} = useLocation();
    const documentid = state && state.documentId;
    const userid = state && state.userid;
    const role = state && state.role;
    console.log(documentid);
    console.log(userid);
    console.log(role);
    return (
        <div>
            <h1></h1>

            <TextEditor documentId={documentid} userid={userid} role={role} />
        </div>
    );
}

export {Texteditor};
