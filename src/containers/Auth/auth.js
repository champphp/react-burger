import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import styles from './auth.module.css' 
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import Spinner from '../../components/UI/Spinner/Spinner'
import * as actions from '../../store/actions/index'
import {updateObject, checkValidity} from '../../shared/utility'

class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authForm: {
        email: {
          elementType: "input",
          elementConfig: {
            type: "email",
            placeholder: "Mail Address"
          },
          value: "",
          validation: {
            required: true,
            isEmail: true
          },
          valid: false,
          touched: false,
          errorMessage: ""
        },
        password: {
          elementType: "input",
          elementConfig: {
            type: "password",
            placeholder: "Password"
          },
          value: "",
          validation: {
            required: true,
            minLength: 6
          },
          valid: false,
          touched: false,
          errorMessage: ""
        },
      },
      isSignup: true
    }
  }

  componentDidMount() {
    if(!this.props.buildingBurger && this.props.authRedirectPath !== '/'){
      this.props.onSetAuthRedirectPath()
    }
  }

  InputChangeText = (e, inputIdKey) => {
    const [isValid, errorMessage] = checkValidity(e.target.value, 
      this.state.authForm[inputIdKey].validation)
    
    const updatedAuthForm = updateObject(this.state.authForm, {
      [inputIdKey]: updateObject(this.state.authForm[inputIdKey], {
        value: e.target.value,
        valid: isValid,
        errorMessage: errorMessage,
        touched: true
      })
    })
    this.setState({authForm: updatedAuthForm})
  }

  submitHandler = (e) => {
    e.preventDefault();
    this.props.onAuth(
      this.state.authForm.email.value, 
      this.state.authForm.password.value,
      this.state.isSignup)
  }

  switchAuthModeHandler = () => {
    this.setState(prevState => {
      return {isSignup: !prevState.isSignup}
    })
  }

  render() {
    const formElementArray = [];
    for (let key in this.state.authForm) {
      formElementArray.push({
        id: key,
        config: this.state.authForm[key]
      });
    }
    let form = formElementArray.map((formElement, index) => (
      <Input
        key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        invalid={!formElement.config.valid}
        shouldValidate={formElement.config.validation}
        touched={formElement.config.touched}
        errorMessage={formElement.config.errorMessage}
        changed={e => {
          this.InputChangeText(e, formElement.id);
        }}
      />
    ))

    if(this.props.loading) {
      form = <Spinner />
    }
    let errorMessage
    if(this.props.error) {
      errorMessage = (<p>{this.props.error.message}</p>)
    }
    let authRedirect = null
    if(this.props.isAuthenticated) {
      authRedirect = <Redirect to={this.props.authRedirectPath} />
    }

    return (
      <div className={styles.Auth}>
        {authRedirect}
        {errorMessage}
        <form onSubmit={this.submitHandler}>
          {form}
          <Button btnType="Success" >SUBMIT</Button>
        </form>
        <Button 
          clicked={this.switchAuthModeHandler}
          btnType="Danger">SWITCH TO {this.state.isSignup ? 'SIGNIN' : 'SIGNUP' }
        </Button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    buildingBurger: state.bugerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath

  }
} 

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(Auth)