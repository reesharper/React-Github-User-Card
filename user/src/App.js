import './App.css';
import React from 'react'
import axios from 'axios'

class App extends React.Component {

  state = {
    user:{},
    userFollowers:[],
    input:""
  }

  componentDidMount() {
    this.fetchUser();
    this.fetchUserFollowers();
  }

  fetchUser = (newUser) => {
    axios.get(`https://api.github.com/users/${newUser}`)
      .then(res => {
        this.setState({
          user:res.data
        });
      })
      .catch(err => {
        console.log(err)
      })
  }

  fetchUserFollowers = (newUser) => {
    axios.get(`https://api.github.com/users/${newUser}/followers`)
      .then(res => {
        this.setState({
          userFollowers:res.data
        });
      })
      .catch(err => {
        console.log(err)
      })
  }

  onChange = (e) => {
    this.setState({input: e.target.value});
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.fetchUser(this.state.input);
    this.fetchUserFollowers(this.state.input);
    this.setState({input: ''});
  }

  render() {
    return (
      <div className="App">
        <form onSubmit={this.onSubmit}>
          <input
          value={this.state.input}
          onChange={this.onChange}
          type="text"
          />
          <button>Find User</button>
        </form>
        <div className="userCard">
          <img width="400" src={this.state.user.avatar_url} alt={this.state.user.name} />
          <h2>{this.state.user.name}</h2>
          <p>Username: {this.state.user.login}</p>
          <p>Location: {this.state.user.location}</p>
          <p>Email: {this.state.user.email}</p>
          <p>Bio: {this.state.user.bio}</p>
          <p>Twitter: {this.state.user.twitter_username}</p>
          <p>Following: {this.state.user.following}</p>
          <p>Followers: {this.state.user.followers}</p>
        </div>
        <div className="followers">
          {
            this.state.userFollowers.map(item => (
              <div className="follower">
              <img width="200" key={item} src={item.avatar_url} alt={item.login} />
              <h3>{item.login}</h3>
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}

export default App;
