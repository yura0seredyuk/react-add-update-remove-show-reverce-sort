import React from 'react';
import { FriendsList } from './Components/FriendsList';
import "./style.css";

class App extends React.Component {
  state={
    friends: [
      {id: 1, name: 'Yura', age: '24'},
      {id: 2, name: 'Lesya', age: '21'},
      {id: 3, name: 'Oleg', age: '19'},
      {id: 4, name: 'Denis', age: '25'},
    ],
    ageLimit: 0, 
    isReversed: false,
    sortBy: 'id',
  }

  addFriend = () => {
    const newFriend = {
      id: 5, 
      name: 'Tanya',
      age: 24,
    }

    // this.setState(state => ({
    //   friends: [
    //     ...state.friends.slice(0, 2),
    //     newFriend,
    //     ...state.friends.slice(2),
    //   ]
    // }));

    this.setState(state => {
      const copyFriends = [...state.friends]; 
      
      copyFriends.splice(2, 0, newFriend)
      
      return {
        friends: copyFriends, 
      }
    })
  }


  // removeFriend = () => {
  //   const friendId = 1;

  //   this.setState(state => {
  //     const newFriend = [...state.friends];
  //     const index = newFriend.findIndex(friend => friend.id === friendId);

  //     if (index > -1) {
  //       newFriend.splice(index, 1);
  //     }

  //     return {
  //       friends: newFriend, 
  //     };
  //   })
  // }
  
  removeFriend = () => {
    const friendId = 1;

    this.setState(state => ({
      friends: state.friends.filter(
        friend => friend.id !== friendId
      ),
    }));
  }

  // updateFriend = () => {
  //   const friendId = 1;
  //   const friendAge = 99;

  //   this.setState(state => {
  //     const newFriends = [...state.friends];
  //     const index = newFriends.findIndex(friend => friendId === friend.id);

  //     if (index > -1) {
  //       const updatedFriend = {
  //         ...newFriends[index],
  //         age: friendAge,
  //       }

  //       newFriends.splice(index, 1, updatedFriend);
  //     }


  //     return {
  //       friends: newFriends,
  //     }
  //   })
  // }

  show20Plus = () => {
    this.setState({ageLimit: 20})
  }

  show24Plus = () => {
    this.setState({ageLimit: 24})
  }

  showAll = () => {
    this.setState({ageLimit: 0})
  }

  updateFriend = () => {
    const friendId = 1;
    const friendAge = 99;

    this.setState(state => ({
      friends: state.friends.map(friend => {
        if (friend.id !== friendId) {
          return friend;
        }

        return {
          ...friend,
          age: friendAge,
        }
      })
    }));
  }

  reverce = () => {
    this.setState(state => ({
      isReversed: !state.isReversed,
    }))
  }

  sortByID = () => {
    this.setState({sortBy: 'id'})
  }

  sortByName = () => { 
    this.setState({sortBy: 'name'})
  }

  sortByAge = () => {
    this.setState({sortBy: 'age'})
  }

  render() {
    const {friends, ageLimit, isReversed, sortBy} = this.state;

    const visibleFriends = friends.filter(
      friend => friend.age >= ageLimit 
    )

    visibleFriends.sort((f1, f2) => {
      switch (sortBy) {
        case 'id':
        case 'age':
          return f1[sortBy] - f2[sortBy];

        case 'name':
          return f1[sortBy].localeCompare(f2[sortBy]);

        default:
          return 0;
      }
    });

    if (isReversed) {
      visibleFriends.reverse();
    }

    return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>

      <button type="button" onClick={this.addFriend}>Add friend</button>

      <button type="button" onClick={this.removeFriend}>Remove friend</button>

      <button type="button" onClick={this.updateFriend}>Update friend</button>

      <br />

      <button type="button" onClick={this.show20Plus}>Show 20+</button>

      <button type="button" onClick={this.show24Plus}>Show 24+</button>

      <button type="button" onClick={this.showAll}>Show All</button>

      <br />
      <br />

      <button type="button" onClick={this.reverce}>Reverce</button>

      <br />
      <br />

      Sort by: 
      <button type="button" onClick={this.sortByID}>id</button>
      <button type="button" onClick={this.sortByName}>Name</button>
      <button type="button" onClick={this.sortByAge}>Age</button>

      <FriendsList friends={visibleFriends} />
    </div>
    )
  }
}

export default App;