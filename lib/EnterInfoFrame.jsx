function calculateMpg(miles, gallons) {
    var mpg = 0;
    if (gallons > 0) {
        var mpg = (miles / gallons).toFixed(2);
    };
    return mpg;
} 

var EnterInfoFrame = React.createClass({

    getInitialState: function () {
        return {
            dateInfo:null, miles: '', gallons: '', mpgInfo: '', mileageList: []
        }
    },
    updateAmount:function(e){
        this.setState({ amount: e.target.value});
    },    
    updateDateInfo:function(e){
        this.setState({ dateInfo: e.target.value});
    },
    handleMileageChange: function (e) {
        this.setState({ miles: e.target.value });        
        var mpg = calculateMpg(e.target.value, this.state.gallons);
        this.setState({ mpgInfo: mpg });
    },
    handleGallonsChange: function (e) {
        this.setState({ gallons: e.target.value });        
        var mpg = calculateMpg(this.state.miles, e.target.value);
        this.setState({ mpgInfo: mpg });
    },
    addToMileageList(e) {
        var mpg = this.state.mpgInfo;
        if (mpg == 0) { return };

       var newMileage =
            {
                dateInfo: this.state.dateInfo,
                miles: this.state.miles,
                gallons: this.state.gallons,
                mpgInfo: this.state.mpgInfo,
                amount: this.state.amount

            }; 
        this.props.callbackParent(newMileage);
        if (ReactDOM.findDOMNode(this.refs.dateInfo)!=null)
            ReactDOM.findDOMNode(this.refs.dateInfo).focus();        
    },
    render: function () {
        return (
        
            <div>    
                <h1 style={{margin:12}}>Enter Mileage Information</h1>
                <br />                             
                <div className="form-group" style={{margin:0, marginBottom:5, marginLeft:10, padding: 0}}>
                    <label htmlFor="DateInfo" className="control-label">Date:</label>
                    <input type="text" className="form-control" tabIndex="1" id="DateInfo" ref="dateInfo"  value={this.state.dateInfo} onChange={this.updateDateInfo} autoFocus/>
                </div>

                <div className="form-group" style={{ margin: 0, marginBottom: 5, marginLeft:10, padding: 0 }}>
                    <label htmlFor="MilesInfo" className=" control-label">Miles:</label>
                    <input type="text" className="form-control" tabIndex="2" id="MilesInfo"  value={this.state.miles} onChange={this.handleMileageChange}/>
                </div>

                <div className="form-group" style={{ margin: 0, marginBottom: 5, marginLeft:10, padding: 0 }}>
                    <label htmlFor="GallonsInfo" className="control-label">Gallons:</label>
                    <input type="text"className="form-control"  tabIndex="3" id="GallonsInfo"  value={this.state.gallons} onChange={this.handleGallonsChange}/>
                </div>

                <div className="form-group" style={{ margin: 0, marginBottom: 5, marginLeft:10, padding: 0 }}>
                    <label htmlFor="AmountInfo" className="control-label">Amount:</label>
                    <input type="text"className="form-control"  tabIndex="3" id="AmountInfo"  value={this.state.amount} onChange={this.updateAmount} />
                </div>
                
                <div className="form-group" style={{ margin: 0, marginBottom: 5, marginLeft:10, padding: 0 }}>
                  <br/>
                    <label htmlFor="GallonsInfo" >MPG:</label>&nbsp;
                    <label style={{fontWeight: 'normal'}} >{this.state.mpgInfo}</label> 
                    <br/><br/>
                 </div>
                
                <div className="form-group" >
                    <button tabIndex="4" className="btn btn-primary bt-lg " style={{ marginLeft:12 }}  id="addButton" 
                          onClick={this.addToMileageList} >Add to mileage list</button>
                </div> 
            </div>
        )
    }
})
export default EnterInfoFrame