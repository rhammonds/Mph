var MileageListFrame = React.createClass({

    componentDidUpdate: function () {
        if (ReactDOM.findDOMNode(this.refs.dateInfo)!=null)
            ReactDOM.findDOMNode(this.refs.dateInfo).focus();
    },
    clearItems: function(e){
      this.props.callbackClearList();
    },
    
    render: function () {
      var milesSumCalc = 0;
      var gallonsSumCalc = 0;
      var mpgAvgCalc = 0;
      var amountSum = 0;
      
        if (this.props.items.length>0) {
            milesSumCalc = this.props.items.reduce(function (a, b) { return +a + +b.miles; }, 0).toFixed(2);
            gallonsSumCalc = this.props.items.reduce(function (a, b) { return +a + +b.gallons; }, 0).toFixed(2);
            mpgAvgCalc = (milesSumCalc / gallonsSumCalc).toFixed(2);
            amountSum = this.props.items.reduce(function (a, b) { return +a + +b.amount; }, 0).toFixed(2);
        }    
        
        return (
            <div>
                <div className="form-group" >
                  <hr/>
                    <h1 style={{ marginLeft:12 }}>Mileage History</h1>                                                        
                </div>            
                <table className="table table-bordered" style={{ marginBottom: 10, marginLeft:12 }}>
                    <thead>
                        <tr>
                            <td style={{ minWidth: 60 }}><label className="control-label">Date</label></td>
                            <td style={{ minWidth: 30 }}><label className="control-label">Miles</label></td>
                            <td style={{ minWidth: 30 }}><label className="control-label">Gallons</label></td>
                            <td style={{ minWidth: 30 }}><label className="control-label">MPG</label></td>
                            <td style={{ minWidth: 30 }}><label className="control-label">Amount</label></td>
                        </tr>
                    </thead>
                    <tbody>
                    { 
                        this.props.items.map((i, index) =>(
                              <tr key={index}>
                                  <td style={{ minWidth: 60, paddingLeft: 12 } }><label style={{fontWeight: 'normal'}}>{i.dateInfo}</label></td>
                                  <td style={{ minWidth: 30, paddingLeft: 12 } }><label style={{fontWeight: 'normal'}}>{i.miles}</label></td>
                                  <td style={{ minWidth: 30, paddingLeft: 12 } }><label style={{fontWeight: 'normal'}}>{i.gallons}</label></td>
                                  <td style={{ minWidth: 30, paddingLeft: 12 } }><label style={{fontWeight: 'normal'}}>{i.mpgInfo}</label></td>
                                  <td style={{ minWidth: 30, paddingLeft: 12 } }><label style={{fontWeight: 'normal'}}>{i.amount}</label></td>
                              </tr>
                                 
                        ))
                    }
                    <tr>
                        <td style={{ minWidth: 60, paddingLeft: 12 } }><label >Total</label></td>
                        <td style={{ minWidth: 30, paddingLeft: 12 } }><label style={{fontWeight: 'normal'}}>{milesSumCalc}</label></td>
                        <td style={{ minWidth: 30, paddingLeft: 12 } }><label style={{fontWeight: 'normal'}}>{gallonsSumCalc}</label></td>
                        <td style={{ minWidth: 30, paddingLeft: 12 } }><label style={{fontWeight: 'normal'}}>{mpgAvgCalc}</label></td>
                        <td style={{ minWidth: 30, paddingLeft: 12 } }><label style={{fontWeight: 'normal'}}>{amountSum}</label></td>
                    </tr>
                    </tbody>
                </table>
                <div className="form-group" >
                    <button tabIndex="4" className="btn btn-primary bt-lg " style={{ marginLeft:12 }}  id="addButton" 
                          onClick={this.clearItems} >Clear</button>
                </div> 
                              
            </div>
          )
        }  
    });
    
export default MileageListFrame