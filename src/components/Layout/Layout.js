import React from 'react'

// create an HOC Aux to immediately output adjacent elements
import Aux from '../../hoc/Aux';

// css modules
import classes from './Layout.css';

const layout = props => (
  <Aux>
    <div>
      Toolbar, SideDrawer, Backdrop
    </div>
    <main className={classes.Content}>
      {props.children}
    </main>
  </Aux>
);

export default layout;