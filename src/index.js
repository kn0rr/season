import React from 'react';
import ReactDOM from 'react-dom';

import SeasonDisplay from './SeasonDisplay';
import Spinner from './Spinner';

/* Old version with Function component

const App=()=>{
    window.navigator.geolocation.getCurrentPosition(
        (position)=> console.log(position),
        (err)=>console.log(err)
    );

return (
    <div>Latitude: </div>
)
}; */

// Must have: extend React component
class App extends React.Component{

    state={lat:null, errorMessage:''};

    componentDidMount(){
        console.log('My component was rendered to the screen');

        window.navigator.geolocation.getCurrentPosition(
            (position)=>{
                this.setState({lat:position.coords.latitude});
            },
            (err)=>{
                this.setState({errorMessage:'Cannot show the Geolocation'})
            }
        );
    }
    componentDidUpdate(){
        console.log('My component was updated');
    }
    
    renderContent(){
        if(this.state.errorMessage && !this.state.lat){
            return  <div>
            Error:{this.state.errorMessage}
            </div>
        }
        if (!this.state.errorMessage && this.state.lat){
            return  <SeasonDisplay lat={this.state.lat}/>
        }
   return <Spinner message="Please accept location request"/>
    }

    // Must Have: Define Render method to return jsx
    render() {    
        return( 
      <div className="border red">
          {this.renderContent()}
      </div>
      )
    }
}


ReactDOM.render(<App/>,document.querySelector('#root'))