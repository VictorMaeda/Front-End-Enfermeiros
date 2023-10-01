import React, { useEffect } from 'react';
import ColorSchemesExample from '../Components/ColorSchemesExample';
import './DashBoard.css'
import { sessionValidate } from '../services/UserService';
import Grafico from '../DashBoardComponents/Grafico';
import GraficoPizza from '../DashBoardComponents/GraficoPizza';


const DashBoard = () => {
  //sessionValidate();



  return (
    <>
      <ColorSchemesExample />
      <div className='DashBoardBody'>
            <Grafico />
            <GraficoPizza />
      </div>
    </>
  );
}

export default DashBoard;
