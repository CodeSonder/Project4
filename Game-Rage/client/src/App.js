import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import axios from "axios";

import './App.css';

class App extends Component {
    state = {
      reviews: [],
      selectedReview: null
    }
  

  async componentDidMount() {
     await axios.get('http://localhost:3000/reviews')
    .then((response) => {
      this.setState({
        reviews: response.data
      })
      
    })  
  } 

  selectreview = (review) => {
    this.setState({
      selectedReview: review
    })
  }

  reviews = () => {
    return this.state.reviews.map(review => (
      <div key={review.id}>
        <Link to={`/reviews/${review.id}`} onClick={() => this.selectreview(review)}>{review.id}</Link>
        <hr />
      </div>
    ))
  }

  review = () => {
    const review = this.state.selectedReview
    return (
      <div>
       
        
        <p>{review.comment}</p>
        
      </div>
    )
  }

  render() {
    return (
      <Router>
        <div>
          <Link exact="true" to='/'>Reviews</Link>
        <Switch>
          <Route
            exact path="/"
            render={this.reviews}
          />
          <Route
            exact path="/reviews/:id"
            render={this.review}
          />
        </Switch>
        </div>
      </Router>
    );
  }
}

export default App;