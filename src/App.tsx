import React, { Component } from 'react';
import DataStreamer, { ServerRespond } from './DataStreamer';
import Graph from './Graph';
import './App.css';

//Global variable to store the update interval's ID.
let update: NodeJS.Timeout;

let i = 0;

/**
 * State declaration for <App />
 */
interface IState {
  data: ServerRespond[],

  //Boolean that displays or hides graph.
  showGraph: boolean,
}

/**
 * The parent element of the react app.
 * It renders title, button and Graph react element.
 */
class App extends Component<{}, IState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      // data saves the server responds.
      // We use this state to parse data down to the child element (Graph) as element property
      data: [],

      //Graph is hidden at the beginning.
      showGraph: false,
    };
  }

  /**
   * Render Graph react component with state.data parse as property data
   */
  renderGraph() {

    //Graph renders when the graph is shown, ie after start streaming is pressed.
    if (this.state.showGraph) {
      return (<Graph data={this.state.data}/>)
    }
  }

  /**
   * Get new data from server and update the state with the new data
   */
  getDataFromServer() {

    //Interval to update graph every 100 milliseconds using graphUpdate subroutine.
    update = setInterval(()=> this.graphUpdate(), 100);
  }

  //Gets data from the server and sets the state of App using the data.
  graphUpdate() {
    DataStreamer.getData((serverResponds: ServerRespond[]) => {
      this.setState({data: serverResponds, showGraph: true});
    });

    //Stops the updates after 10,000 iterations.
    i = i + 1;
    if (i > 1000) {
      clearInterval(update);
    }
  }

  /**
   * Render the App react component
   */
  render() {
    return (
      <div className="App">
        <header className="App-header">
          Bank & Merge Co Task 2
        </header>
        <div className="App-content">
          <button className="btn btn-primary Stream-button"
            // when button is click, our react app tries to request
            // new data from the server.
            // As part of your task, update the getDataFromServer() function
            // to keep requesting the data every 100ms until the app is closed
            // or the server does not return anymore data.
            onClick={() => {this.getDataFromServer()}}>
            Start Streaming Data
          </button>
          <div className="Graph">
            {this.renderGraph()}
          </div>
        </div>
      </div>
    )
  }
}

export default App;
