import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, } from 'react-router-dom';
import SkeletonLoader from './components/SkeletonLoader';

const ImagesPage = lazy(() => import('./pages/ImagesPage'));
const AllPage = lazy(() => import('./pages/AllPage'));
const ErrorPage = lazy(() => import('./pages/ErrorPage'));


const App: React.FC = () => {
  return (
    <div>
      <BrowserRouter>
        <Suspense fallback={<div className="p-4">
          <SkeletonLoader height="120px" />
          <SkeletonLoader height="40px" count={2}/>
          <SkeletonLoader height="120px" />
          <SkeletonLoader height="40px" count={6}/>
        </div>}>
          <Routes>
            <Route index element={<AllPage />} />
            <Route path="All" element={<AllPage />} />
            <Route path="Images" element={<ImagesPage />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );};

export default App;