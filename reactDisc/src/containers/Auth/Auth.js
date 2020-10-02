import React, { Component } from 'react';
import { connect } from 'react-redux';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.module.css';
import * as actions from '../../store/actions/auth';
import formValidityCheck from '../../util/formValidityCheck';
import _ from 'lodash';

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'e-mail address'
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
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 8
                },
                valid: false,
                touched: false
            },
        },
        isSignIn: true
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
        };
        this.setState({ controls: updatedControls});
    }

    submitHandler = (event) => {
        event.preventDefault();
        if (!this.state.isSignIn) {
            this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.controls.name.value);
            let newFormValues = _.cloneDeep(this.state.controls);
            // for (const field in newFormValues) {
            //     for (const key in newFormValues[field]) {
            //         if (key === 'value') {
            //             newFormValues[field][key] = '';
            //         }
            //     };
            // }
            this.setState({ controls: newFormValues });
            this.props.history.push('/');
            
        } else {
            this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value);
            this.props.history.push('/');
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
                        placeholder: 'Fullname'
                    },
                    value: '',
                    validation: {
                        required: true,
                        minLength: 5
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
                changed={(event) => this.inputChangedHandler(event, formElement.id)} />

        ));

        if (this.props.loading) {
            form = <Spinner />
        }

        // let errorMessage = null;
        // if (this.props.error) {
        //     errorMessage = (
        //         <p>{this.props.error}</p>
        //     );
        // }

        return (
            <div className={classes.Auth}>
                {/* {errorMessage} */}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType="Success">Submit</Button>
                </form>
                <Button 
                    clicked={this.switchAuthModeHandler}
                    btnType="Danger">SWITCH TO {this.state.isSignIn ? 'REGISTER' : 'LOGIN'}</Button>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.loading,
        error: state.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, name) => dispatch(actions.auth(email, password, name))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);