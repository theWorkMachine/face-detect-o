import React, { Component } from 'react';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email1: '',
            password1: '',
            name1: ''
        }
    }

    onNameChange = (event) => {
        this.setState({ name1: event.target.value })
    }


    onEmailChange = (event) => {
        this.setState({ email1: event.target.value })
    }

    onPasswordChange = (event) => {
        this.setState({ password1: event.target.value })
    }

    // onSubmitRegister = () => {
    //     fetch('http://localhost:3002/register', {
    //         method: 'post',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify({
    //             email: this.state.email1,
    //             password: this.state.password1,
    //             name: this.state.name1
    //         })
    //     })
    //         .then(response => response.json())
    //         .then(user => {
    //             if (user) {
    //                 this.props.loadUser(user)
    //                 this.props.onRouteChange('home')
    //             }
    //         })
    // }

    onRegisterSubmitSignIn = () =>{
        if (this.state.email1.length && this.state.password1.length) {
            fetch('https://safe-atoll-94150.herokuapp.com/register', {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    email: this.state.email1,
                    password: this.state.password1,
                    name: this.state.name1
                })
            }).then(response => response.json()).then(user => {
                if (user.id) {
                    this.props.loadUser(user);
                    this.props.onRouteChange('home')
                } else{
                    alert('error logging in')
                }
            })
        }
            else{
                alert('Please enter the values correctly')
            }
    }

  


    render() { 
        const {onRouteChange} = this.props;
        return (
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-2 center">
            <main className="pa4 black-80">
                <div className="measure ">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f1 fw6 ph0 mh0">Register</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f4" htmlFor="name">Name</label>
                            <input 
                            style={{border: '1px solid black'}}
                            className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 f5" 
                            type="text" 
                            name="person-name" 
                            id="person-name"
                            onChange={this.onNameChange}
                            />
                        </div>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f4" htmlFor="email-address">Email</label>
                            <input 
                            style={{border: '1px solid black'}}
                            className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 f5" 
                            type="email" 
                            name="email-address" 
                            id="email-address"
                            onChange={this.onEmailChange}
                            />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f4" htmlFor="password">Password</label>
                            <input 
                            style={{border: '1px solid black'}}
                            className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 f5" 
                            type="password" 
                            name="password" 
                            id="password"
                            onChange={this.onPasswordChange}
                            />
                        </div>
                    </fieldset>
                    <div className="">
                        <input onClick={this.onRegisterSubmitSignIn} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f4 dib" type="submit" value="Register" />
                    </div>
                    <div className="lh-copy mt3">
                        <p onClick={() => onRouteChange('signIn')} className=" pointer f4 link dim black db">Sign In</p>
                    </div>
                </div>
            </main>
            </article>
        );





        // return (
        //     <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-2 center">
        //         <main className="pa4 black-80">
        //             <form className="measure ">
        //                 <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
        //                     <legend className="f1 fw6 ph0 mh0">Register</legend>
        //                     <div className="mt3">
        //                         <label className="db fw6 lh-copy f5" htmlFor="name">Name</label>
        //                         <input
        //                             className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
        //                             type="text"
        //                             name="name"
        //                             id="name"
        //                             onChange={this.onNameChange}
        //                         />
        //                     </div>
        //                     <div className="mt3">
        //                         <label className="db fw6 lh-copy f5" htmlFor="email-address">Email</label>
        //                         <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
        //                             type="email"
        //                             name="email-address"
        //                             id="email-address"
        //                             onChange={this.onEmailChange}
        //                         />
        //                     </div>
        //                     <div className="mv3">
        //                         <label className="db fw6 lh-copy f5" htmlFor="password">Password</label>
        //                         <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
        //                             type="password"
        //                             name="password"
        //                             id="password"
        //                             onChange={this.onPasswordChange}
        //                         />
        //                     </div>
        //                 </fieldset>
        //                 <div className="">
        //                     <input onClick={this.onRegisterSubmitSignIn}
        //                         className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
        //                         type="submit"
        //                         value="Register"
        //                     />
        //                 </div>
        //                 <div className="lh-copy mt3">
        //                     <p
        //                         onClick={() =>
        //                         onRouteChange('signIn')}
        //                         className="pointer f6 link dim black db">
        //                         Sign In
        //                     </p>
        //                 </div>
        //             </form>
        //         </main>
        //     </article>
        // )
    }
}

export default Register;
