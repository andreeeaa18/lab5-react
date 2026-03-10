import { useState } from "react";
import "./App.css";
import initialColors from "../colors.json";

function App() {
  const defaultColor = "rgb(240, 240, 240)";
  const divArr = new Array(400).fill(defaultColor);

  const [count, setCount] = useState(0);
  const [colors, setColors] = useState(initialColors);
  const [selectedId, setSelectedId] = useState(initialColors[0].id);
  const [selectedColor, setSelectedColor] = useState(initialColors[0].color);
  const [cellColors, setCellColors] = useState(divArr);
  const [savedDrawings, setSavedDrawings] = useState([]);

  function changeColor(cellId) {
    const newCellColors = [...cellColors];
    newCellColors[cellId] = selectedColor;
    setCellColors(newCellColors);
  }

  function reset() {
    setCellColors(divArr);
  }

  function save() {
    setSavedDrawings([...savedDrawings, [...cellColors]]);
    setCount(count + 1);
  }

  function generateGallery() {
    return (
      <>
        <div className="gallery">
          <h2>Saved Drawings ({savedDrawings.length})</h2>
          {savedDrawings.map((drawing, index) => (
            <div key={index} className="gallery-item">
              <div className="gallery-thumbnail">
                {drawing.map((cellColor, id) => {
                  return (
                    <div
                      key={id}
                      className="grid-cell"
                      style={{ backgroundColor: cellColor }}
                    ></div>
                  );
                })}
              </div>
              <div>
                <button
                  onClick={() => {
                    setCellColors([...drawing]);
                  }}
                >
                  Load
                </button>
                <button
                  onClick={() => {
                    const newDrawings = savedDrawings.filter(
                      (_, i) => i !== index,
                    );
                    setSavedDrawings(newDrawings);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }
  return (
    <>
      <div className="color-palette">
        {colors.map((ObjColor, id) => {
          return (
            <button
              key={ObjColor.id}
              style={{
                backgroundColor: ObjColor.color,
                width: "50px",
                height: "50px",
                borderRadius: "50px",
                marginRight: "5px",
                border: selectedId === ObjColor.id ? "2px solid black" : "none",
              }}
              onClick={() => {
                setSelectedId(ObjColor.id);
                setSelectedColor(ObjColor.color);
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
            ></div>
          );
        })}
      </div>
      <div className="controls">
        <button onClick={save}>Save</button>
        <button onClick={reset}>Reset</button>
      </div>
      {generateGallery()}
    </>
  );
}

export default App;
