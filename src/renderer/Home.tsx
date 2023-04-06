/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import { useNavigate } from 'react-router-dom';
import React from 'react';
import './App.css';

export default function Home() {
  // drag state
  const [dragActive, setDragActive] = React.useState(false);
  // ref
  const inputRef = React.useRef(null);
  const navigate = useNavigate();
  // handle drag events
  function handleDrag(e: any) {
    console.log('handleDrag');
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }

  // triggers when file is dropped
  async function handleDrop(e: any) {
    const { files } = e.dataTransfer;
    const paths: string[] = [];
    for (let i = 0; i < files.length; i += 1) {
      paths.push(files[i].path);
    }

    const rval = await window.electron.captureDroppedFiles(paths);

    console.log('handleDrop: ', rval);
    navigate('/form', { state: { metadata: rval } });
  }

  return (
    <div>
      <div
        style={{
          height: '40vh',
          width: '70vw',
          borderStyle: 'dashed',
          borderWidth: '2px',
          borderColor: 'black',
        }}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <p>Drag and drop your file here or</p>
      </div>
    </div>
  );

  // return (
  //   <form
  //     id="form-file-upload"
  //     onDragEnter={handleDrag}
  //     onSubmit={(e) => e.preventDefault()}
  //   >
  //     <label
  //       id="label-file-upload"
  //       htmlFor="input-file-upload"
  //       className={dragActive ? 'drag-active' : ''}
  //     >
  //       {' '}
  //       <input
  //         ref={inputRef}
  //         type="file"
  //         id="input-file-upload"
  //         multiple
  //         onChange={handleChange}
  //       />
  //       <div>
  //         <p>Drag and drop your file here or</p>
  //         <button
  //           type="button"
  //           className="upload-button"
  //           onClick={onButtonClick}
  //         >
  //           Upload a file
  //         </button>
  //       </div>
  //     </label>
  //     {dragActive && (
  //       <div
  //         id="drag-file-element"
  //         onDragEnter={handleDrag}
  //         onDragLeave={handleDrag}
  //         onDragOver={handleDrag}
  //         onDrop={handleDrop}
  //       />
  //     )}
  //   </form>
  // );
}
