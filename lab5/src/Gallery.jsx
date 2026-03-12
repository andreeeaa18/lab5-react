function Gallery({ savedDrawings, onSaveDrawings, onChangeCellColors }) {
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
                onChangeCellColors([...drawing]);
              }}
            >
              Load
            </button>
            <button
              onClick={() => {
                const newDrawings = savedDrawings.filter((_, i) => i !== index);
                onSaveDrawings(newDrawings);
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

export default Gallery;
