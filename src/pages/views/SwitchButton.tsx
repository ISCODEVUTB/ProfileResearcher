import { Grid } from '@mui/material'
import React from 'react'

type SwitchButtonProps = {
  handleChangeSwitch: () => void;
};

function SwitchButton({ handleChangeSwitch }: SwitchButtonProps) {
  return (
    <Grid item style={{ marginRight: "23%", marginLeft: "124px" }}>
    <Grid container direction="row" alignItems="center">
      <div className="toggle-button">
        <input
          type="checkbox"
          id="toggle"
          onClick={handleChangeSwitch}
        />
        <label htmlFor="toggle">
          <span className="toggle-text">Articulos</span>
          <span className="toggle-track"></span>
          <span className="toggle-thumb"></span>
          <span className="toggle-highlight"></span>
          <span className="toggle-knob"></span>
          <span className="toggle-keywords">Keywords</span>
        </label>
      </div>
    </Grid>
  </Grid>
  )
}

export default SwitchButton