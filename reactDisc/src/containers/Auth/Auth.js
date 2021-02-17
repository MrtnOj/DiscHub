import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.module.css';
import * as actions from '../../store/actions/auth';
import formValidityCheck from '../../util/formValidityCheck';

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'e-mail address',
                    name: 'email'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password',
                    name: 'password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            },
        },
        isSignIn: true,
        regSuccessMsg: null,
        errorMessage: null
    }

    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: formValidityCheck(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        }
        this.setState({ controls: updatedControls });
    }

    submitHandler = (event) => {
        event.preventDefault();
        if (!this.state.isSignIn) {
            this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.controls.name.value);
            setTimeout(() => {
                const newControls = {
                    ...this.state.controls,
                    email: {
                        ...this.state.controls.email,
                        value: ''
                    },
                    password: {
                        ...this.state.controls.password,
                        value: ''
                    }
                };
                delete newControls.name;
                this.setState({ regSuccessMsg: this.props.signUpMessage, controls: newControls, isSignIn: true, errorMessage: this.props.error })
            }, 500)
        } else {
            this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value)
            this.setState({ errorMessage: this.props.error });
        }
    }

    switchAuthModeHandler = () => {
        if (!this.state.isSignIn) {
            const updatedControls = {...this.state.controls};
            delete updatedControls.name;
            this.setState({ controls: updatedControls, isSignIn: true });
        } else {
            const updatedControls = {
                ...this.state.controls,
                name: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'name',
                        placeholder: 'Username',
                        name: 'username'
                    },
                    value: '',
                    validation: {
                        required: true,
                        minLength: 3,
                        maxLength: 12
                    },
                    valid: false,
                    touched: false
                }
            };
            this.setState({ controls: updatedControls, isSignIn: false });
        }
    }

    render () {
        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }

        let form = formElementsArray.map(formElement => (
            <Input 
                key={formElement.id}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                label={formElement.config.elementConfig.type}
                name={formElement.config.elementConfig.name}
                changed={(event) => this.inputChangedHandler(event, formElement.id)}
            />
        ));

        if (this.props.loading) {
            form = <Spinner />
        }

        let authRedirect = null;
        if ( this.props.isAuthenticated ) {
            authRedirect = <Redirect to="/" />
        }

        return (
            <article className={classes.Auth}>
                {this.state.errorMessage && !this.props.loading ? <p>{this.state.errorMessage}</p> : null}
                {authRedirect}
                {this.state.regSuccessMsg && !this.props.loading ? <p>{this.state.regSuccessMsg}</p> : null}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button type="submit" 
                        name="Submit form"
                        btnType="Success">
                        {this.state.isSignIn ? 'LOG IN' : 'REGISTER'}
                    </Button>
                </form>
                <Button 
                    clicked={this.switchAuthModeHandler}
                    type="button"
                    name="Switch between register and login"
                    btnType="Danger">
                    {this.state.isSignIn ? 'Switch to register' : 'Switch to login'}
                </Button>
            </article>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.loading,
        error: state.error,
        isAuthenticated: state.token !== null,
        signUpMessage: state.signUpMessage
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, name) => dispatch(actions.auth(email, password, name))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
