import React, { createContext, useState, useContext, useEffect } from 'react';
import FixedModel from '../../World/FixedModel';
import { Line } from '@react-three/drei';
import axios from 'axios';

const DrawingContext = createContext();

export const useDrawing = () => {
  return useContext(DrawingContext);
};

export const DrawingProvider = ({ children }) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawing, setDrawing] = useState([])
  const [postIts, setPostIts] = useState([])

  function scaleCoordinates(coordinates, scaleFactor, pointOfInterest) {
    let translatedCoordinates = coordinates.map(coord => [
        coord[0] - pointOfInterest[0],
        coord[1] - pointOfInterest[1],
        coord[2] - pointOfInterest[2]
    ]);

    let scaledCoordinates = translatedCoordinates.map(coord => [
        coord[0] * scaleFactor,
        coord[1] * scaleFactor,
        coord[2] * scaleFactor
    ]);

    let finalCoordinates = scaledCoordinates.map(coord => [
        coord[0] + pointOfInterest[0],
        coord[1] + pointOfInterest[1],
        coord[2] + pointOfInterest[2]
    ]);

    return finalCoordinates;
  }

  const setDrawingsCallback = (res) => {
      let yIndex = 0
      let xIndex = 0
      if (res.status === 200) {
        const vectors = res.data.map((el, i) => {
          let scaleFactor = 0.15;
          let pointOfInterest = [-47.5, 174, 9];
          if (i !== 0) {
            xIndex += 1
          }
          if (i % 3 === 0 && i !== 0) {
            yIndex += 22
            xIndex = 0
          }
          if (el.length === 0) {
            return (
              <mesh position={[-10, 40 - yIndex, -68 - ((xIndex * 20) + Math.random() * 2)]}>
                <FixedModel scale={[10,10,10]} size={[7, 12, 7]} position={[-50, 174, 9]} fixed model={'/models/postit.gltf'} />
              </mesh>
            )
          }
          const scaledCoordinates = scaleCoordinates(el, scaleFactor, pointOfInterest)
          return (
            <mesh position={[-10, 40 - yIndex, -68 - ((xIndex * 20) + Math.random() * 2)]}>
              <Line points={scaledCoordinates} color="red" />
              <FixedModel scale={[10,10,10]} size={[7, 12, 7]} position={[-50, 174, 9]} fixed model={'/models/postit.gltf'} />
            </mesh>
          )
        })
        setPostIts(vectors)
      }
    }

  const convertCoords = (coords) => {
    const returnValue = coords.map((el) => [el.x, el.y, el.z])
    return returnValue
  }

  const submitDrawing = () => {
    const convertedCoords = convertCoords(drawing)
    axios.post('/drawings', {data: convertedCoords}).then((res) => {
      if (res.status === 200) {
        axios.get('/drawings').then((res) => setDrawingsCallback(res))
        setDrawing([])
      }
    })
  }

  useEffect(() => {
    axios.get('/drawings').then((res) => setDrawingsCallback(res))
    /* eslint-disable-next-line*/
  }, [])

  return (
    <DrawingContext.Provider value={{ isDrawing, setIsDrawing, submitDrawing, drawing, postIts, setDrawing }}>
      {children}
    </DrawingContext.Provider>
  );
};