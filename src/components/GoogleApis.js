import React, { Component } from 'react';

class GoogleApis extends Component {
    state = {
        isSignedIn: null
    }
    componentDidMount = () => {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: "1031542362334-j5sobbh87osg7r5ulc8do8vjefo02320.apps.googleusercontent.com",
                scope: "email"
            }).then(()=> {
                this.auth=window.gapi.auth2.getAuthInstance();
                this.setState({isSignedIn: this.auth.isSignedIn.get()});
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });
    };

    onAuthChange = () => {
        this.setState({isSignedIn: this.auth.isSignedIn.get()});
    }
    onSignInClick = () => {
        this.auth.signIn();
    }
    onSignOutClick = () => {
        this.auth.signOut();
    }
    renderAuthButton = () => {
        if(this.state.isSignedIn===null) {
            return null
        }
        else if(this.state.isSignedIn) {
            return (
                <button onClick={this.onSignOutClick} className="ui red google button">
                    <i className="google icon"/>
                    Sign Out
                </button>
            )
        }
        else {
            return (
                <button onClick={this.onSignInClick} className="ui red google button">
                    <i className="google icon"/>
                    Sign In With Google
                </button>
            )
        }
    }
    render() {
        return (
            <div>
                {this.renderAuthButton()}
            </div>
        );
    };
};

export default GoogleApis;