import { useState } from "react";
import "./App.css";
import initialColors from "../colors.json";
import Gallery from "./Gallery";

const defaultColor = "rgb(240, 240, 240)";
const divArr = new Array(400).fill(defaultColor);
function App() {
  // const [selectedId, setSelectedId] = useState(initialColors[0].id);
  const [selectedColor, setSelectedColor] = useState({
    id: initialColors[0].id,
    color: initialColors[0].color,
  });
  const [cellColors, setCellColors] = useState(divArr);
  const [savedDrawings, setSavedDrawings] = useState([]);
  const [isClicked, setIsClicked] = useState(false);

  function changeColor(cellId) {
    const newCellColors = [...cellColors];
    newCellColors[cellId] = selectedColor.color;
    setCellColors(newCellColors);
  }

  function reset() {
    setCellColors(divArr);
  }

  function save() {
    setSavedDrawings([...savedDrawings, [...cellColors]]);
  }

  return (
    <>
      <div className="color-palette">
        {initialColors.map((objColor) => {
          return (
            <button
              className="obj-color"
              key={objColor.id}
              style={{
                backgroundColor: objColor.color,
                border:
                  selectedColor.id === objColor.id ? "2px solid black" : "none",
              }}
              onClick={() => {
                setSelectedColor({ ...objColor });
              }}
            ></button>
          );
        })}
      </div>
      <div className="drawing-grid">
        {cellColors.map((cellColor, id) => {
          return (
            <div
              key={id}
              className="grid-cell"
              style={{ backgroundColor: cellColor }}
              onClick={() => changeColor(id)}
              onMouseDown={() => {
                changeColor(id);
                setIsClicked(true);
              }}
              onMouseEnter={() => {
                if (isClicked) {
                  changeColor(id);
                }
              }}
              onMouseUp={() => setIsClicked(false)}
            ></div>
          );
        })}
      </div>
      <div className="controls">
        <button onClick={save}>Save</button>
        <button onClick={reset}>Reset</button>
      </div>
      <Gallery
        savedDrawings={savedDrawings}
        onSaveDrawings={setSavedDrawings}
        onChangeCellColors={setCellColors}
      />
    </>
  );
}

export default App;
