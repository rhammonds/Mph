function getDateDiff (date1, date2) {
  
  var dt1 = new Date(date1);
  var dt2 = new Date(date2);
  
  return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()) ) /(1000 * 60 * 60 * 24));
}


class StatisticsFrame extends React.Component{
  constructor(){
    super()
  }
 
  render(){
      var maxMpg = 0;
      var minMpg = 0;
      var numDays = 0;
      var maxDate = '';
      var minDate = '';
      var milesPerWeek = 0;

      if (this.props.items.length>0) {
          
          var mapMpg = this.props.items.map(function(a) {return a.mpgInfo;})	
          maxMpg = Math.max.apply(Math, mapMpg);
          minMpg = Math.min.apply(Math, mapMpg);
          
          
          var mapDate = this.props.items.map(function(a) {return a.dateInfo;});
          
          var dateString = mapDate.sort(function(a,b){
              a = new Date(a);
              b = new Date(b);
              return a-b;
          });

          minDate = dateString[0];
          maxDate = dateString[dateString.length -1];
          
          numDays = getDateDiff(dateString[0], dateString[dateString.length -1]);
          
          var sumMiles = this.props.items.reduce(function(a, b) {  return a + Number(b.miles);}, 0);
          milesPerWeek = sumMiles/(numDays/7);
          

      } 
        
      return(
        <div>
              <div className="form-group" >
                  <hr/>
                  <h1 style={{ marginLeft:12 }}>Statistics</h1>                                                        
              </div>         
            <div className="form-group" style={{ margin: 0, marginBottom: 5, marginLeft:10, padding: 0 }}>
             
                <label htmlFor="minMpg" >Max MPG:</label>&nbsp;
                <label id='maxMpg' style={{fontWeight: 'normal'}} >{maxMpg}</label> 
             </div>
            <div className="form-group" style={{ margin: 0, marginBottom: 5, marginLeft:10, padding: 0 }}>
                <label htmlFor="minMpg" >Min MPG:</label>&nbsp;
                <label id='minMpg' style={{fontWeight: 'normal'}} >{minMpg}</label> 
             </div>  
             <br/>
            <div className="form-group" style={{ margin: 0, marginBottom: 5, marginLeft:10, padding: 0 }}>
                <label htmlFor="numDays" >Days Span:</label>&nbsp;
                <label id='numDays' style={{fontWeight: 'normal'}}>{numDays}</label> 
           </div> 
            <div className="form-group" style={{ margin: 0, marginBottom: 5, marginLeft:10, padding: 0 }}>
                <label htmlFor="minDate" >Min Date:</label>&nbsp;
                <label id='minDate' style={{fontWeight: 'normal'}}>{minDate}</label> 
           </div>
            <div className="form-group" style={{ margin: 0, marginBottom: 5, marginLeft:10, padding: 0 }}>
                <label htmlFor="maxDate" >Min Date:</label>&nbsp;
                <label id='maxDate' style={{fontWeight: 'normal'}}>{maxDate}</label> 
           </div>  
            <div className="form-group" style={{ margin: 0, marginBottom: 5, marginLeft:10, padding: 0 }}>
                <label htmlFor="milesPerWeek" >Avg Miles/Week:</label>&nbsp;
                <label id='milesPerWeek' style={{fontWeight: 'normal'}}>{milesPerWeek}</label> 
           </div>             
        </div>
      )
  }
}


export default StatisticsFrame