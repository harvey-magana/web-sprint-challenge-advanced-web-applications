import React, { useState } from "react";
import axiosWithAuth from '../utils/axioxWithAuth';

const initialColor = [{
  color: "",
  code: { hex: "" }
}];

const ColorList = ({ props, colors, updateColors }) => {
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    
    const hex = colorToEdit && colorToEdit.color ? colorToEdit.color.hex : null;
    console.dir(e.target)
    const newColor = {
      id: colorToEdit.id, 
      color: colorToEdit.color, 
      code: hex
    }

    axiosWithAuth().put(`http://localhost:5000/api/colors/${colorToEdit.id}`, newColor)
    .then(res => {
      const colorReturned = [res.data].find(item => item.id == newColor.id)
      setColorToEdit([colorToEdit].map(item => {
          if(item.id === colorReturned.id) {
          return colorReturned
          }
          return item
      }))
      props.history.push('/bubble-page')
      })
      .catch(err => console.error(err))
    };

  const deleteColor = color => {
    // make a delete request to delete this color
  };

  const handleHexChange = (e) => {
    console.log(e)
  }

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e => {
                setColorToEdit({ ...colorToEdit, color: e.target.value })
                console.log(colorToEdit)
              }
                
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e => {
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
                /*console.log(Object.values[2](colorToEdit))*/
              }
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
    </div>
  );
};

export default ColorList;
