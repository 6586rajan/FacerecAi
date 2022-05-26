import React from "react";
import './SignIn.css';

class SignIn extends React.Component {
    // two things that are required for signing in
    constructor(props) {
        super();
        this.state = {
            signInEamil: '',
            signInPassword: ''
        }
    }

    // setting state on change event
    onEmailChange = (event) => {
        this.setState({signInEamil: event.target.value});
    }

    onPasswordChange = (event) => {
        this.setState({signInPassword: event.target.value});
    }

    onSubmitSignIn = () => {
        // once the signin button is clicked, 
        // we make a call to the server to verify the email and password
        fetch('https://cryptic-temple-74555.herokuapp.com/signin', { 
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ 
                "email": this.state.signInEamil,
                "password": this.state.signInPassword
            }),
        })
        .then(response => response.json())
        // if the response has user data, we load that data  into the state.
        // and we go to home page.
        .then(user => {
            if (user.id){
                this.props.loadUser(user);
                this.props.onRouteChange('Home');
            }
        })
        
    }

    render() {
        const { onRouteChange} = this.props;
        return (
            <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 center shadow-5">
                <main className="pa4 white-80">
                    <div className="measure center">
                        <fieldset
                            id="sign_up"
                            className="ba b--transparent ph0 mh0">
                            <legend className="f4 fw6 ph0 mh0">
                                Sign In
                            </legend>
                            <div className="mt3">
                                <label
                                    className="db fw6 lh-copy f6"
                                    htmlFor="email-address">
                                    Email
                                </label>
                                <input
                                    className="pa2 input-reset ba bg-transparent hover-bg-white hover-black w-100"
                                    type="email"
                                    name="email-address"
                                    id="email-address"
                                    onChange = {this.onEmailChange}/>
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">
                                    Password
                                </label>
                                <input
                                    className="b pa2 input-reset ba bg-transparent hover-bg-white hover-black w-100"
                                    type="password"
                                    name="password"
                                    id="password"
                                    onChange = {this.onPasswordChange}/>
                            </div>
                        </fieldset>
                        <div className="">
                            {/* <input
                            onClick={() => onRouteChange('Home')}
                            className="b ph3 pv2 input-reset ba b--white bg-transparent grow pointer f6 dib"
                            type="submit"
                            value="Sign in"/> */}
                            <button
                            onClick={this.onSubmitSignIn}
                            className="btn btn-fill-bottom btn-fill-bottom--green f3 pointer"
                            type="submit">SignIn</button>
                        </div>
                        <div>
                            <button onClick={() => onRouteChange('register')} className="btn btn-fill-bottom btn-fill-bottom--green f3 pointer">Register</button>
                        </div>
                    </div>
                </main>
            </article>
        );
    }
}

export default SignIn;