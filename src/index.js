import React from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay';
import Spinner from './Spinner';

class App extends React.Component{
    
    //non required method
    // constructor(props){
    //     super(props);
    //     this.state = { lat: null, errorMessage: '' };      
    // }

    state = { lat: null, errorMessage: '' };
    
    componentDidMount(){
        console.log("componentDidMount");
        window.navigator.geolocation.getCurrentPosition(
            position => {
                this.setState({lat: position.coords.latitude});
            },
            err  =>{
                this.setState({errorMessage: err.message});
            }
        );
    }

    componentDidUpdate(){
        console.log("componentDidUpdate");
    }

    renderContent(){
        if(this.state.errorMessage && !this.state.lat){
            return <div>  Error:{this.state.errorMessage} </div>;
        }

        if(!this.state.errorMessage && this.state.lat){
            return <SeasonDisplay lat={this.state.lat}/>;
        }

         return <Spinner message="Please accept location request" />;
    }

    //required method
    render(){ 
        return(
      <div style={{border:'10px solid', borderColor:'red'}}>
          {this.renderContent()}
      </div>);
    }
}

ReactDOM.render(<App />,document.querySelector("#root"));