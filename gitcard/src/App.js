import './App.css';
import React from 'react';
import axios from 'axios';

class App extends React.Component {

  state = {
    users:[],
    userCard: ""
  }

  componentDidMount() {
    this.fetchUser("reesharper");
}

  fetchUser = (user) => {
    axios.get(`https://api.github.com/users/${user}`)
        .then(resp=>{
            this.setState({
                users:resp.data
            });
        })
        .catch(err => console.log(err))
}

handleChange = (e) => {
    this.setState({ userCard:e.target.value});
}

handleSearch = (e) => {
    e.preventDefault();
    this.fetchUser(this.state.userCard);
    this.setState({ userCard:""});
}


  render() {
    return(
        <div className="App">
            <h1>Search Github User by Username</h1>
            <form onSubmit={this.handleSearch}>
                <input value={this.state.userCard} onChange={this.handleChange} type="text"/>
                <button>Fetch User</button>
            </form>
            <div className="userContainer">
                <img src={this.state.users.avatar_url} alt={this.state.users.name} />
                <h2>{this.state.users.name}</h2>
                <p>{this.state.users.location}</p>
                <p>{this.state.users.bio}</p>
                <p>Username: {this.state.users.login}</p>
                <p>Followers: {this.state.users.followers}</p>
                <p>Following: {this.state.users.following}</p>
            </div>
        </div>
    )
  }
}

export default App;
