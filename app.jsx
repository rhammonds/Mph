
import EnterInfoFrame from './lib/EnterInfoFrame.jsx';
import MileageListFrame from './lib/MileageListFrame.jsx';
import StatisticsFrame from './lib/StatisticsFrame.jsx';
import VehicleFrame from './lib/VehicleFrame.jsx';


var App = React.createClass({
  getInitialState: function() {
        return { 
          //items: [] 
          items: []
        };
    },
    
  onChildChanged: function(newState) {
        let data = this.state.items.slice();
        data.push(
            {
                dateInfo: newState.dateInfo,
                miles: newState.miles,
                gallons: newState.gallons,
                mpgInfo: newState.mpgInfo,
                amount: newState.amount

            }); 
         
        this.setState({ items: data });  
         
  },    
  onClearList: function(){
    this.setState({ items: [] });  
  },
  render: function() { 
    return (
      <div>
        <div>
            <EnterInfoFrame callbackParent={(newState) => this.onChildChanged(newState) }/>
        </div>
        <div>
            <MileageListFrame items={this.state.items} callbackClearList={this.onClearList}/>
        </div>
        <div> 
          <StatisticsFrame items={this.state.items} />
        </div>
        <div> 
          <VehicleFrame items={this.state.items} />
        </div>        
        <br/><br/><br/>
      </div>
    );
  }
});    


ReactDOM.render(  <App />,  document.getElementById("enterInfoFrame"))


  