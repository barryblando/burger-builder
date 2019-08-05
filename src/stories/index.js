import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

// import { Button, Welcome } from '@storybook/react/demo';
import Button from '../components/UI/Button/Button';
import Modal from '../components/UI/Modal/Modal';

// storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

// storiesOf('Button', module)
//   .add('with Success', () => <Button btnType="Success" clicked={action('clicked')}>Hello Button</Button>)
//   .add('with Error', () => <Button btnType="Danger" clicked={action('clicked')}>Hello Button</Button>)
//   .add('with some emoji', () => <Button btnType="Success" clicked={action('clicked')}><span role="img" aria-label="Image">😀 😎 👍 💯</span></Button>);

storiesOf('Button', module)
  .add('with Success', () => (
    <Button btnType="Success" clicked={action('clicked')}>
      Submit
    </Button>
  ))
  .add('with Error', () => (
    <Button btnType="Danger" clicked={action('clicked')}>
      Cancel
    </Button>
  ));

storiesOf('Modal', module)
  .add('with Data', () => <Modal show>Hello World</Modal>)
  .add('with Button', () => (
    <Modal show>
      <Button btnType="Success" clicked={action('clicked')}>
        Submit
      </Button>
      <Button btnType="Danger" clicked={action('clicked')}>
        Danger
      </Button>
    </Modal>
  ));
