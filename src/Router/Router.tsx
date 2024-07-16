import { Home } from '../Pages/Home/Home';
import { routesMap } from '../Utils/routes/routesMap';
import { Navigate, Route, Routes } from 'react-router-dom';

export const Router = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="*" element={<Navigate to={routesMap.home.route} />} />
  </Routes>
);
