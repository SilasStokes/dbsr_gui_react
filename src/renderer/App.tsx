/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useEffect } from 'react';
import './App.css';
import 'tailwindcss/tailwind.css';
import MetadataForm from './MetadataForm';
import { exampleInput } from './dummydata';
import Home from './Home';


export default function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        {/* <Route path="/form" element={<MetadataForm metadata={exampleInput.metadata} />} /> */}
        <Route path="/form" element={<MetadataForm />} />
      </Routes>
    </Router>
  );
}

