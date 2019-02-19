import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { checkValidity, trimByPattern, updateObject } from '../../utils/index';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import Alert from '../../components/UI/Alert/Alert';

import classes from './Auth.module.scss';

import * as actions from '../../store/actions/index';

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Mail Address',
        },
        value: '',
        valueType: 'Email Address.',
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        touched: false,
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password',
        },
        value: '',
        valueType: 'Password. Should be at least 6 characters.',
        validation: {
          required: true,
          minLength: 6,
        },
        valid: false,
        touched: false,
      },
    },
    isSignUp: true, // Initial
    showAlert: true,
  };

  componentDidMount() {
    const { buildingBurger, authRedirectPath, onSetAuthRedirectPath } = this.props;
    // Whenever we reach the auth page:
    // check if buildingBurger is !false(true) & authRedirectPath('/checkout') !== '/' (true) then reset
    if (!buildingBurger && authRedirectPath !== '/') {
      // reset redirect path to '/'
      onSetAuthRedirectPath();
    }
    // otherwise redirect to /checkout page after user has been authenticated
  }

  // TODO -- Handle Input onChange --
  inputChangeHandler = (event, controlName) => {
    const { controls } = this.state;
    const updatedControls = updateObject(controls, {
      [controlName]: updateObject(controls[controlName], {
        value: event.target.value,
        valid: checkValidity(event.target.value, controls[controlName].validation),
        touched: true,
      }),
    });

    this.setState({ controls: updatedControls });
  };

  // TODO -- Submit Handler --
  submitHandler = event => {
    event.preventDefault();
    const {
      controls: { email, password },
      isSignUp,
    } = this.state;
    const { onAuth } = this.props;
    onAuth(email.value, password.value, isSignUp);
  };

  switchAuthModeHandler = () => {
    this.setState(prevState => ({ isSignUp: !prevState.isSignUp }));
  };

  render() {
    const { controls, isSignUp, showAlert } = this.state;
    const { loading, error, isAuthenticated, authRedirectPath, onAuthNetwork } = this.props;

    const formElementsArray = [];

    // TODO - structure orderForm with id & config for formElementArray
    /* eslint-disable-next-line */
    for (const key in controls) {
      formElementsArray.push({
        id: key, // email, password etc...
        config: controls[key], // email & password Configs etc...
      });
    }

    let form = formElementsArray.map(({ id, config }, index) => (
      <Input
        key={id}
        position={index}
        elementType={config.elementType}
        elementConfig={config.elementConfig}
        value={config.value}
        valueType={config.valueType}
        invalid={!config.valid} // if not valid set to true, vice-versa
        shouldValidate={config.validation}
        touched={config.touched}
        changed={event => this.inputChangeHandler(event, id)}
      />
    ));

    if (loading) {
      form = <Spinner />;
    }

    let alertMessage = null;

    if (error) {
      alertMessage = <Alert type="Error">{trimByPattern(error.message, /_/)}</Alert>;
    }

    // TODO: Add close button to alert and assign toggleHandler to handle showAlert state
    return (
      <div className={classes.Auth}>
        {isAuthenticated && <Redirect to={authRedirectPath} />}
        <div className={classes.Auth__login}>
          {showAlert ? alertMessage : ''}
          <form onSubmit={this.submitHandler}>
            {form}
            <Button btnType="Success">SUBMIT</Button>
          </form>
          <Button btnType="Danger" clicked={this.switchAuthModeHandler}>
            SWITCH TO {isSignUp ? 'SIGN-IN' : 'SIGN-UP'}
          </Button>
        </div>
        <div className={classes.Auth__socialLogin}>
          <div className={classes.Auth__socialLogin__socialHead}>Sign In using other Network</div>
          <button type="button" className={classes.Auth__google} onClick={() => onAuthNetwork('GoogleAuth')}>
            GOOGLE
          </button>
          <button type="button" className={classes.Auth__facebook}>
            FACEBOOK
          </button>
          <button type="button" className={classes.Auth__twitter}>
            TWITTER
          </button>
          <button type="button" className={classes.Auth__github}>
            GITHUB
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.auth.loading,
  error: state.auth.error,
  isAuthenticated: !!state.auth.userId,
  buildingBurger: state.burgerBuilder.building,
  authRedirectPath: state.auth.authRedirectPath,
});

const mapDispatchToProps = dispatch => ({
  onAuthNetwork: name => dispatch(actions.authNetwork(name)),
  onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
  onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/')),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);
