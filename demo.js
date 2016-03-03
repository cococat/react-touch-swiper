var React = require('react');
var ReactDOM = require('react-dom');
var Touchswipe = require('./touchswipe.js');
a = ReactDOM.render(<Touchswipe interval="3000"  height="250px">
			<span style={{display:"inline-block",background:"black",color:"#fff",width:"100%",height:"100%"}}>1</span>
			<span style={{display:"inline-block",background:"red",color:"yellow",width:"100%",height:"100%"}}>2</span>
			<span style={{display:"inline-block",background:"green",color:"blue",width:"100%",height:"100%"}}>3</span>
			<span style={{display:"inline-block",background:"pink",color:"#fff",width:"100%",height:"100%"}}>4</span>
		</Touchswipe>,document.getElementById("swipe"));