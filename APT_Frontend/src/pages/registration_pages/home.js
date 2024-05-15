/*eslint-disable*/
import zIndex from '@mui/material/styles/zIndex';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Namepopup } from './documentname';

import {axiosInstance as axios} from '../../requests/axios';
import {API_ROUTES} from '../../requests/routes';
import { useEffect } from 'react';

import {Sharepopupup} from './sharepopup';
import { Share } from '@mui/icons-material';

import {useNavigate} from 'react-router-dom';

function Home() {
    // State to manage the open/close state of each document's settings dropdown
    const [dropdownState, setDropdownState] = useState(null);
    const { state } = useLocation();
    const userid = state && state.userid;
    const navigate = useNavigate();
    const [showNamePopup, setShowNamePopup] = useState(false);
    const [sharePopup, setSharePopup] = useState(false);
    const [documents, setdocuments] = useState([]);
    const [isowner, setisowner] = useState(false);
    console.log(userid);
    
  const handleClicknavigate = (document) => {
    let temp= document.role==='editor'?true:false;
   
    navigate('/texteditor', { state: { documentId: document.documentId ,userid:userid,role:temp} });
    }

  
  /**
     * @return {void}
     */
 async function getalldocuments() {
    try {
        const response = await axios.get(`/documents/getAllDocuments?userID=${userid}`);
        setdocuments(response.data);
      
        console.log(response);
        //setMockDocuments(response.data);
    } catch (e) {
        console.log(e);
    }
}
useEffect(() => {
    // Call the Getmoderators function once when the component mounts
    getalldocuments();
}, []);

const handlebanClick = () => {
    setShowNamePopup(true);
};

const handlexclick = () => {
    setShowNamePopup(false);
};
const handlebanClickshare = () => {
    setSharePopup(true);
};

const handlexclickshare = () => {
    setSharePopup(false);
};
    
    const refreshImage = 'https://ssl.gstatic.com/docs/templates/thumbnails/docs-blank-googlecolors.png';
    const refreshImageStyle = {
        top:'57px',
        left: '0px',
        position: 'absolute',
        backgroundSize: 'contain',
        width: '200px',
        height: '200px',
        display: 'inline-block',
        marginLeft: '8px',
        color: '#24a0ed',
        verticalAlign: 'text-top',
        zIndex: '10000',
        border: '3px solid grey',
        
    };

    // State to store the document currently being renamed
    const [renamingDocument, setRenamingDocument] = useState(null);
    const [sharingDocument, setSharingDocument] = useState(null);
    // State to store the input field value for renaming
    const [newName, setNewName] = useState('');
    const [mockDocuments, setMockDocuments] = useState([
        { id: 1, name: "weather report", owner: "sherif hatem", role: "editor", icon: "https://res.cdn.office.net/files/fabric-cdn-prod_20240129.001/assets/item-types/32_1.5x/docx.svg" },
        { id: 2, name: "final statistics", owner: "Hussein khaled", role: "viewer", icon: "https://res.cdn.office.net/files/fabric-cdn-prod_20240129.001/assets/item-types/32_1.5x/docx.svg" },
        { id: 3, name: "research paper", owner: "Emma Smith", role: "editor", icon: "https://res.cdn.office.net/files/fabric-cdn-prod_20240129.001/assets/item-types/32_1.5x/docx.svg" },
        { id: 4, name: "presentation slides", owner: "John Doe", role: "viewer", icon: "https://res.cdn.office.net/files/fabric-cdn-prod_20240129.001/assets/item-types/32_1.5x/docx.svg" },
        { id: 5, name: "project proposal", owner: "Alice Johnson", role: "editor", icon: "https://res.cdn.office.net/files/fabric-cdn-prod_20240129.001/assets/item-types/32_1.5x/docx.svg" },
        { id: 6, name: "meeting minutes", owner: "Michael Brown", role: "viewer", icon: "https://res.cdn.office.net/files/fabric-cdn-prod_20240129.001/assets/item-types/32_1.5x/docx.svg" },
        { id: 7, name: "annual report", owner: "Emily Wilson", role: "editor", icon: "https://res.cdn.office.net/files/fabric-cdn-prod_20240129.001/assets/item-types/32_1.5x/docx.svg" },
        { id: 8, name: "business plan", owner: "David Lee", role: "viewer", icon: "https://res.cdn.office.net/files/fabric-cdn-prod_20240129.001/assets/item-types/32_1.5x/docx.svg" },
        { id: 9, name: "product catalog", owner: "Sarah Garcia", role: "editor", icon: "https://res.cdn.office.net/files/fabric-cdn-prod_20240129.001/assets/item-types/32_1.5x/docx.svg" },
        { id: 10, name: "financial statement", owner: "Ryan Martinez", role: "viewer", icon: "https://res.cdn.office.net/files/fabric-cdn-prod_20240129.001/assets/item-types/32_1.5x/docx.svg" },
        { id: 11, name: "project timeline", owner: "Jessica Taylor", role: "editor", icon: "https://res.cdn.office.net/files/fabric-cdn-prod_20240129.001/assets/item-types/32_1.5x/docx.svg" },
        { id: 12, name: "training manual", owner: "Daniel Rodriguez", role: "viewer", icon: "https://res.cdn.office.net/files/fabric-cdn-prod_20240129.001/assets/item-types/32_1.5x/docx.svg" },
        { id: 13, name: "marketing brochure", owner: "Sophia Hernandez", role: "editor", icon: "https://res.cdn.office.net/files/fabric-cdn-prod_20240129.001/assets/item-types/32_1.5x/docx.svg" },
        { id: 14, name: "user manual", owner: "Ethan Gonzales", role: "viewer", icon: "https://res.cdn.office.net/files/fabric-cdn-prod_20240129.001/assets/item-types/32_1.5x/docx.svg" },
        { id: 15, name: "policy document", owner: "Olivia Martinez", role: "editor", icon: "https://res.cdn.office.net/files/fabric-cdn-prod_20240129.001/assets/item-types/32_1.5x/docx.svg" },
        // Your mock documents array goes here...
    ]);
   

    const disabledInteractionClass = 'disabled-interaction';

    // Function to toggle the dropdown state for a specific document
    const toggleDropdown = (id) => {
        setDropdownState((prevState) => (prevState === id ? null : id));
        console.log(userid)
        console.log(documents);
    };

    // Function to handle starting the renaming process for a document
    const startRename = (document) => {
        setRenamingDocument(document);
        setNewName(document.documentName); // Set the input field value to the current document name
        
    };
  
    

    // Function to handle renaming a document
    async function renameDocument ()  {
        try {
            const response = await axios.put(`/documents/rename?newName=${newName}`, {

                documentId: renamingDocument.documentId,
            });
            console.log(response);
            getalldocuments();
            setRenamingDocument(null);
        }
        catch (e) {
            console.log(e);
            
        console.log(newName);
       
        }
    };
const handleshareclick = () => {
    setSharePopup(true);
};
    // Function to delete a document
    // Function to delete a document
async function deleteDocument  (document) {
    console.log(document.documentId);
    console.log(userid);
   try {
    const response = await axios.delete(`/documents/delete?documentId=${document.documentId}&userId=${userid}`);
    console.log(response);
    getalldocuments();
   }
    catch (e) {
        console.log(e);
    }
    const updatedDocuments = mockDocuments.filter((doc) => doc.documentId !== document.documentId);
    
    setMockDocuments(updatedDocuments);
};

    // Function to share a document
    const shareDocument = (document) => {
        setSharingDocument(document);
        if (document.role === 'editor') {
            setisowner(true);
        }
        else {
            setisowner(false);
        }
        setSharePopup(true);
        handlebanClickshare();
        // Implement document sharing logic here
        console.log('Sharing document:', document.documentId);
    };

    // Mock documents data
   

    return (
        <>
        {(showNamePopup) && <Namepopup onxclick={handlexclick} userid={userid} />}
        {(sharePopup) && <Sharepopupup onxclick={handlexclickshare} isowner={isowner} userid={userid} documentId={sharingDocument.documentId}  />}
               
            
          { !showNamePopup  && !sharePopup &&
          <div>
           <header className="fixed inset-x-0 top-0 z-[4] h-14 border-x-0 border-b border-t-0 border-solid border-[#0000001a] bg-white px-4">
                <div className="flex px-4 py-3">
                    <span className="flex items-center pr-0">
                        <img width="32" height="32" src="https://www.gstatic.com/images/branding/product/1x/docs_2020q4_48dp.png" alt="React Logo" />
                        Concurrent Text Editor
                    </span>
                </div>
            </header>
            <p className="mb-2.5 mt-0 block text-sm font-normal
                            leading-[21px]" style={{fontFamily: '"Noto Sans", sans-serif'}}>
                                Here are some username suggestions
                                <button  onClick={handlebanClick}>
                                    <img src={refreshImage} alt="Image" style={refreshImageStyle} />
                                </button>

                            </p>



            <div className="flex h-[calc(100vh_-56px-_1px)] w-screen flex-col">
                <div className="h-[calc(100vh_-56px-_1px)] w-screen grow bg-[#f8f8f8] dark:bg-[#090F11]" style={{
                    maskImage: 'url(\'https://www.redditstatic.com/shreddit/assets/account/standalone-auth-bg.svg\')',
                    maskSize: 'cover',
                    maskType: 'alpha',
                }}>
                </div>
            </div>
            {/* Document entries */}
            <div className="pointer-events-auto fixed flex max-w-full basis-full flex-col rounded-xl bg-white font-sans shadow-none lg:shadow-sm" style={{
                width: '1200px',
                height: '644px',
                top: '40px',
                left: '300px',
                paddingBottom: '0px',
                zIndex: '100',
                boxShadow: '0 0 #0000, 0 0 #0000, 0 0.0625rem 0.25rem #00000026, 0 0.25rem 0.25rem #00000026',
                overflowY: 'auto', // Enable vertical scrolling
            }}>
                {/* Document entries */}
                <div className='mb-[5px] block bg-[#f8f8f8] '>
                    <div className='relative z-[1] flex h-14 w-full border-b border-solid border-b-[color:var(--colorNeutralStroke2,#e0e0e0)] pb-2'>
                        <div className='text flex grow items-center border-[none] pl-4'>
                            Name
                        </div>
                        <div className='flex min-w-[25%] max-w-[25%] items-center border-[none]'>
                            Owner
                        </div>
                        <div className='flex min-w-[25%] max-w-[25%] items-center border-[none]'>
                            Role
                        </div>
                        <div className='flex min-w-[25%] max-w-[25%] items-center border-[none]'>
                            Options
                        </div>
                    </div>
                </div>
                {documents.map((document) => (
                    <div key={document.documentId} className={`mb-[5px] block hover:bg-slate-100 ${dropdownState === document.documentId ? disabledInteractionClass : ''}`}> {/* Conditionally apply class */}
                        <div className='relative z-[1] flex h-14 w-full border-b border-solid border-b-[color:var(--colorNeutralStroke2,#e0e0e0)] pb-2'>
                        <div className='text flex grow items-center border-[none] pl-4'>
    <img src={"https://res.cdn.office.net/files/fabric-cdn-prod_20240129.001/assets/item-types/32_1.5x/docx.svg"} className=' size-8 overflow-hidden font-[normal] not-italic' />
    {renamingDocument && renamingDocument.documentId === document.documentId ? (
        <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onBlur={renameDocument}
            autoFocus
            className="border-b border-black"
        />
    ) : (
        <>
           <button onClick={() => handleClicknavigate(document)}>
                {document.documentName}
           </button>
        </>
    )}
</div>

                            <div className='flex min-w-[25%] max-w-[25%] items-center border-[none]'>
                                {document.ownerName}
                            </div>
                            <div className='flex min-w-[25%] max-w-[25%] items-center border-[none]'>
                                {document.role}
                            </div>
                            <div className='flex min-w-[25%] max-w-[25%] items-center border-[none]'>
                                <div className='relative'>
                                    <svg className="size-10 fill-current text-gray-500 transition-colors duration-300 hover:text-red-500" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" onClick={() => toggleDropdown(document.documentId)}>
                                        <path d="M6.25 10a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0Zm5 0a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0ZM15 11.25a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5Z" fill="currentColor"></path>
                                    </svg>
                                    {dropdownState === document.documentId && (
                                        <div className="fixed z-[9999] mt-2 w-48 rounded-md bg-white shadow-lg" style={{ pointerEvents: 'auto', zIndex: 10000, right: '235px', top: '80px' }}>
                                            <div className="z-[9999] py-1">
                                                {document.role === 'editor' && (
                                                    <>
                                                        <button  className="z-[9999] flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100" onClick={() => startRename(document)}>
                                                            <svg className="z-[9999] mr-2 size-4 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M13.41 13H6a1 1 0 0 1 0-2h7.41l-1.7-1.71a1 1 0 0 1 1.42-1.42l3.5 3.5a1 1 0 0 1 0 1.42l-3.5 3.5a1 1 0 0 1-1.42-1.42l1.7-1.71Z"></path>
                                                            </svg>
                                                            Rename
                                                        </button>
                                                        <button className="z-[9999] flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100" onClick={() => deleteDocument(document)}>
                                                            <svg className="text-red-500" fill="currentColor" aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M8.5 4h3a1.5 1.5 0 0 0-3 0Zm-1 0a2.5 2.5 0 0 1 5 0h5a.5.5 0 0 1 0 1h-1.05l-1.2 10.34A3 3 0 0 1 12.27 18H7.73a3 3 0 0 1-2.98-2.66L3.55 5H2.5a.5.5 0 0 1 0-1h5ZM5.74 15.23A2 2 0 0 0 7.73 17h4.54a2 2 0 0 0 1.99-1.77L15.44 5H4.56l1.18 10.23ZM8.5 7.5c.28 0 .5.22.5.5v6a.5.5 0 0 1-1 0V8c0-.28.22-.5.5-.5ZM12 8a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V8Z" fill="currentColor"></path></svg>
                                                            Delete
                                                        </button>
                                                        <button className="z-[9999] flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100" onClick={() => shareDocument(document)}>
                                                    <svg className="text-blue-500" fill="currentColor" aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="m13.33 12.84 4.5-4.42.05-.07a.59.59 0 0 0-.05-.77l-4.5-4.42-.06-.05c-.36-.27-.9-.01-.9.47V5.7l-.22.01C8.6 6.01 6.5 8.26 6 12.35c-.06.53.54.85.93.5a9.64 9.64 0 0 1 4.45-2.38c.24-.06.5-.1.74-.12l.26-.02v2.17c.06.46.61.67.95.34Zm-1.1-6.12 1.15-.08V4.61L16.82 8l-3.44 3.39V9.23l-1.36.12c-1.7.19-3.32.87-4.83 2 .3-1.33.8-2.34 1.47-3.06a5.2 5.2 0 0 1 3.57-1.57ZM5.5 4A2.5 2.5 0 0 0 3 6.5v8A2.5 2.5 0 0 0 5.5 17h8a2.5 2.5 0 0 0 2.5-2.5v-1a.5.5 0 0 0-1 0v1c0 .83-.67 1.5-1.5 1.5h-8A1.5 1.5 0 0 1 4 14.5v-8C4 5.67 4.67 5 5.5 5h3a.5.5 0 0 0 0-1h-3Z" fill="currentColor"></path></svg>
                                                    Share
                                                </button>
                                                    </>
                                                )}
                                                 {document.role === 'viewer' && (
                                                    <>
                                                        
                                                        <button className="z-[9999] flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100" onClick={() => deleteDocument(document)}>
                                                            <svg className="text-red-500" fill="currentColor" aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M8.5 4h3a1.5 1.5 0 0 0-3 0Zm-1 0a2.5 2.5 0 0 1 5 0h5a.5.5 0 0 1 0 1h-1.05l-1.2 10.34A3 3 0 0 1 12.27 18H7.73a3 3 0 0 1-2.98-2.66L3.55 5H2.5a.5.5 0 0 1 0-1h5ZM5.74 15.23A2 2 0 0 0 7.73 17h4.54a2 2 0 0 0 1.99-1.77L15.44 5H4.56l1.18 10.23ZM8.5 7.5c.28 0 .5.22.5.5v6a.5.5 0 0 1-1 0V8c0-.28.22-.5.5-.5ZM12 8a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V8Z" fill="currentColor"></path></svg>
                                                            Delete
                                                        </button>
                                                        <button className="z-[9999] flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100" onClick={() => shareDocument(document)}>
                                                    <svg className="text-blue-500" fill="currentColor" aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="m13.33 12.84 4.5-4.42.05-.07a.59.59 0 0 0-.05-.77l-4.5-4.42-.06-.05c-.36-.27-.9-.01-.9.47V5.7l-.22.01C8.6 6.01 6.5 8.26 6 12.35c-.06.53.54.85.93.5a9.64 9.64 0 0 1 4.45-2.38c.24-.06.5-.1.74-.12l.26-.02v2.17c.06.46.61.67.95.34Zm-1.1-6.12 1.15-.08V4.61L16.82 8l-3.44 3.39V9.23l-1.36.12c-1.7.19-3.32.87-4.83 2 .3-1.33.8-2.34 1.47-3.06a5.2 5.2 0 0 1 3.57-1.57ZM5.5 4A2.5 2.5 0 0 0 3 6.5v8A2.5 2.5 0 0 0 5.5 17h8a2.5 2.5 0 0 0 2.5-2.5v-1a.5.5 0 0 0-1 0v1c0 .83-.67 1.5-1.5 1.5h-8A1.5 1.5 0 0 1 4 14.5v-8C4 5.67 4.67 5 5.5 5h3a.5.5 0 0 0 0-1h-3Z" fill="currentColor"></path></svg>
                                                    Share
                                                </button>
                                                    </>
                                                )}
                                               
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            </div>
          }
        </>
            
    );
}

export { Home };
