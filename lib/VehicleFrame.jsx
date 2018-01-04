import {xml2json} from './Helper.jsx'

 const divStyle = {
  color: 'blue',
  float: 'left', 
  width: '220' 
};

function remove(items,str){
      return items.filter(function( obj ) {
      return obj.text !== 'select';
    });
}

var VehicleFrame = React.createClass({
  getInitialState: function () {
    return {year:'', make:'', model:'', items: [], makes:[], models:[] }
  },
  
  componentWillMount(){
    fetch( 'http://www.fueleconomy.gov/ws/rest/vehicle/menu/year' )
      .then( response => response.text() )
      .then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
      .then(data => {
          let i = xml2json(data)
          i.menuItems.menuItem.unshift({text:'select',value:'select'})
           
          this.setState({items: i.menuItems.menuItem}) 
        }) 
      .catch((error) => {
          console.error(error);
      })
  },
    
  handleYearChange: function (e)  {  
    e.preventDefault()
    let year = e.target.value
    let years = remove(this.state.items,'select')
    this.setState({
      year: year, items:years, make:'', makes:[], model:'', models:[]})
    
    fetch( 'http://www.fueleconomy.gov/ws/rest/vehicle/menu/make?year=' + year )
      .then( response => response.text() )
      .then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
      .then(data => {
          let i = xml2json(data)
          i.menuItems.menuItem.unshift({text:'select',value:'select'})
          this.setState({makes: i.menuItems.menuItem}) 
        }) 
      .catch((error) => {
          console.error(error);
      })
      
  }, 
       
  handleMakeChange: function (e)  { 
    e.preventDefault()
    let make = e.target.value
    let makes = remove(this.state.makes,'select')
   
    this.setState({make:make, makes:makes, model:'', models:[]})
      
    fetch( 'http://www.fueleconomy.gov/ws/rest/vehicle/menu/model?year=' + 
        this.state.year +'&make=' + make )
      .then( response => response.text() )
      .then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
      .then(data => {
          let i = xml2json(data)
          i.menuItems.menuItem.unshift({text:'select',value:'select'})
          this.setState({models: i.menuItems.menuItem}) 
        }) 
      .catch((error) => {
          console.error(error);
      })
  },
  
    handleModelChange: function (e)  { 
        e.preventDefault()
        let model = e.target.value
        let models = remove(this.state.models,'select')
        this.setState({model:model, models:models})        
        
        let url = 'http://www.fueleconomy.gov/ws/rest/vehicle/menu/options?year=' + 
            this.state.year +'&make=' + this.state.make + '&model=' + model
        console.log(url)
        fetch(url)
          .then( response => response.text() )
          .then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
          .then(data => {
              let i = xml2json(data)
              //i.menuItems.menuItem.unshift({text:'select',value:'select'})
              //this.setState({models: i.menuItems.menuItem}) 
              console.log(i);
            }) 
          .catch((error) => {
              console.error(error);
          })        
  },
  
  render()     
    { 
        let makesVisible =  this.state.makes.length;
        let modelsVisible =  this.state.models.length;
        let items = this.state.items; 
        let makes = this.state.makes;
        let models = this.state.models; 
        return(
        <div className="form-group"  style={{ margin: 0, marginBottom: 5, marginLeft:10, padding: 0 }}>
          <h1>Vehicle Information</h1>
          <div style={divStyle}>
          <label htmlFor="yearDropDown" >Year:</label>&nbsp;
          <select id='yearDropDown' onChange={this.handleYearChange} >
            {items.map(item => <DropDownItem key={item.text} person={item} />)}
          </select>
          </div>
           
          { makesVisible ?
            <div style={divStyle}>
              <label htmlFor="makesDropDown" >Makes:</label>&nbsp;
              <select id='makesDropDown' onChange={this.handleMakeChange} >
                {makes.map(item => <DropDownItem key={item.text} person={item} />)}
              </select>  
            </div>:null
          }
           
          { modelsVisible ?
            <div style={divStyle}>
              <label htmlFor="modelsDropDown" >Models:</label>&nbsp;
              <select id='modelsDropDown' onChange={this.handleModelChange} >
                {models.map(item => <DropDownItem key={item.text} person={item} />)}
              </select>  
            </div>:null
          }          
        </div> 
    )}
})

const Person = (props) => <h4>{props.person.text}</h4>
const DropDownItem = (props) => <option value={props.person.text}>{props.person.text}</option> 

export default VehicleFrame


