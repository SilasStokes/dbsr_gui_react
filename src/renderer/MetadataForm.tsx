/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
// export default function MetadataForm({ metadata }: any) {
//   return <h1>hello world!</h1>;
// }

type Inputs = {
  example: string;
  exampleRequired: string;
};

interface Metadata {
  artist: string | null;
  title: string | null;
  acoustid: string | null;
  album: string | null;
  album_artist: string | null;
}
interface AudioFile {
  filename: string;
  type: string;
  potentialMetadata: Metadata[];
}

function MetadataSubForm(props: any) {
  const inputcss =
    'shadow appearance-none border rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline';
  const labelcss = 'text-gray-700 text-sm font-bold mb-2 flex flex-row mr-2 ';
  const columns = ['title', 'artist', 'album', 'album_artist'];

  return (
    <div className="ml-2 flex flex-col">
      <h2 className="text-md text-black font-bold">Filename: {props.file}</h2>
      <div className="flex flex-row items-center">
        {columns.map((column) => {
          return (
            <label htmlFor={column} className={labelcss}>
              {column}:
              <div className="flex flex-col items-start ml-2">
                <input
                  className={inputcss}
                  value={props.metadataState[props.index][column]}
                  // defaultValue={props.potentialMetadata[0].title}
                  type="text"
                  name={column}
                  onChange={(e) => props.handleChange(e, props.index)}
                />
                {props.potentialMetadata.map((pMetadata, pmIndex) => {
                  return (
                    <button
                      type="button"
                      className="text-xs text-black bg-slate-300 rounded-md hover:bg-slate-200 p-1 m-1"
                      onClick={(e) =>
                        props.handlePotentialMetadataChosen(
                          e,
                          pMetadata,
                          props.index,
                          pmIndex,
                          column
                        )
                      }
                    >
                      {pMetadata[column]}
                    </button>
                  );
                })}
              </div>
            </label>
          );
        })}
      </div>
    </div>
  );
}

// going to try to implement it using the native lib first:
export default function MetadataForm() {
  const { state } = useLocation();
  console.log(state.metadata);
  const {metadata} = state

  const [metadataState, setMetadataState] = React.useState(
    Array(metadata.length).fill({
      title: '',
      artist: '',
      album: '',
      album_artist: '',
      acoustid: ''
    })
  );

  useEffect(() => {
    setMetadataState((prevState) => {
      const newState = [...prevState];
      metadata.forEach((file, index) => {
        newState[index] = { ...file.potentialMetadata[0] };
      });
      return newState;
    });
  }, []);

  const handleOnSubmit = (e: any) => {
    e.preventDefault();
    console.log('submitted - metadata: ', metadataState);
  };

  const handleChange = (e: any, index: number) => {
    setMetadataState((prevState) => {
      const newState = [...prevState];
      newState[index] = { ...newState[index], [e.target.name]: e.target.value };
      return newState;
    });
  };

  const handlePotentialMetadataChosen = (
    event: any,
    newmetadata: any,
    index: any,
    potentialIndex: number,
    key: string
  ) => {
    setMetadataState((prevState) => {
      const newState = [...prevState];
      newState[index] = { ...newState[index], [key]: newmetadata[key] };
      return newState;
    });
  };

  // console.log('metadataState: ', metadataState);

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleOnSubmit} className="flex flex-col">
      {metadata.map((file, index) => {
        return (
          <div className="flex flex-col">
            <MetadataSubForm
              key={index}
              index={index}
              file={file.filename}
              metadataState={metadataState}
              potentialMetadata={file.potentialMetadata}
              handleChange={handleChange}
              handlePotentialMetadataChosen={handlePotentialMetadataChosen}
            />
          </div>
        );
      })}

      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline self-center"
      >
        Submit
      </button>
    </form>
  );
}
