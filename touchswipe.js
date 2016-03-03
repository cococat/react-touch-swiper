require("./touchswipe.css");
Touchswipe = (function(){
		var data={};
		var buttonClick =function(event){
			var target = event.target;
			var id = Number(target.getAttribute("data-b-id"));
			this.animateStop();
			this.setState({now:id})
			animate.pos.call(this,(id-1)*data.width);
			data._initState =true;
			this.animateStart();
		}
		var clear = function(ani,poll){
			clearTimeout(poll[ani]);
			clearInterval(poll[ani]);
			poll[ani] = "";

		}
		var dragEvent = {
				touchstart : function(e){
					data.touchstate = "start";//touch事件状态，start，move，end
					data.touchmode = {
						x :e.changedTouches[0].pageX,
						y:e.changedTouches[0].pageY,
						xs : data.x
					}
					e.preventDefault();
				},
				touchmove:function(e){
					if(data.touchstate != "move"){
						var moveY = data.touchmode.y - e.changedTouches[0].pageY;
						var moveX = data.touchmode.x - e.changedTouches[0].pageX;
						if(moveY<3&&moveY>-3&&(moveX>2||moveX<-2)) {
							data.touchstate="move";
							this.animateStop();
						}
					}
					if(data.touchstate == "move"){

						data.x = data.touchmode.xs-(e.changedTouches[0].pageX-data.touchmode.x);
						if(data.x<0){
							data.x = data.config.length*data.width+data.x;
						}
						this.pos(data.x);
						this.setState({now:this.getNow()})
					}
				},
				touchend:function(e){
					
					if(data.touchstate == "move"){
						data.touchstate = "end";//touch事件状态，start，move，end
						var xd = data.touchmode.xs-data.x;
						if(xd>10||xd<-(data.width*(data.config.length-1))){
							this.animatePre(true);
						}else{
							this.animateNext(true);
						}
						data._initState = true;
					}
					
				}
			}
		var animate ={ 
			getNow : function(){
				now = Math.ceil((data.x+1)/data.width);
				if(now>data.config.length){now=1}
				if(data.x<0){now = data.config.length}
				return now;
			},
			
			stop : function(){//console.log("stop");
				var me = this;
				for(var key in data.poll){
					clear(key,data.poll);
				}


			},
			
			pos:function(x){
				data.x=x;
				this.setState({translateText : "translateX(-"+x+"px)"});
			},
			next : function(nostop){
					var me=this,now;
					data._initState = false;
					data._animateS = new Date;
					now = me.state.now;
					
					data.poll.nextInterval = setInterval(function(){
						if(data.x+data.perD>now*data.width||new Date-data._animateS>data.config.speed){
							if(me.state.now==data.config.length){
								me.setState({now:1});
								data.x = 0;

							}else{
								me.setState({now:me.state.now+1});
								data.x = now*data.width;
							}
							clear("nextInterval",data.poll);
							if(nostop) {me.animateStart();}
						}else{
							data.x += data.perD;
						}
						
						me.pos(data.x);
					},25)	
					return false;
					
			},
			pre : function(nostop){
				var now = this.state.now,me = this,data = S.get(this.props.dataid);
				animate.stop.call(this);
				data._animateS = new Date;
				if(data.x == (now-1)*data.width){
						if(now == 1){
							now = data.config.length+1;
							data.x = data.config.length*data.width;
							me.pos(data.x);
							data._output = true;
						}
					data.poll.preInterval = setInterval(function(){
					
					if(data.x-data.perD<(now-2)*data.width||new Date-data._animateS>data.config.speed){
						data.x = (now-2)*data.width;

						me.setState({now:now-1});

						clear("preInterval",data.poll);
						if(nostop) {me.animateStart();}
					}else{

						data.x -= data.perD;
						
					}
						me.pos(data.x);
					},25)
				}else{
					data.poll.preInterval = setInterval(function(){
					if(data.x-data.perD<(now-1)*data.width||new Date-data._animateS>data.config.speed){
						data.x = (now-1)*data.width;
						clear("preInterval",data.poll);
						if(nostop) {me.animateStart();}
					}else{
						data.x -= data.perD;
					}
						me.pos(data.x);
					},25)
				}
			},
			start : function(){//console.log("start");
				var me = this;
				var interval = Number(data.config.interval)+Number(data.config.speed),initInterval;
				animate.stop.call(this);
				if(data._initState){
					data._initState = false;
					initInterval = data.config.interval;
				}else{
					initInterval = 0;
				}
				data.poll.start = setTimeout(function(){
					//me.setState({transformText:"transform "+data.config.speed+"ms linear"});
					animate.next.call(me);

					data.poll.interval = setInterval(function(){
						clear("nextInterval",data.poll);
						animate.next.call(me);
					},interval)
				},initInterval);
			}
		}
		return  React.createClass({
			config : {//组件默认参数
				now : 1,//从第几项开始轮播
				speed : 400 ,//默认轮播速度
				interval:4000//默认停留时间
			},
			initData : function(){
				var obj = new Object();
				return obj = {
					touchstate : "end",//touch状态，start,end,moving
					_initState: true,//计数器
					_num1:0,//计数器
					_num2:0,//计数器
					config : {
						interval : this.props.interval?this.props.interval:this.config.interval,
						now : this.props.now?this.props.now:this.config.now,
						speed : this.props.speed?this.props.speed:this.config.speed,
						length :this.props.children.length
					},
					poll :{}
				}
			},
			getInitialState : function(){
					data = this.initData();
					window.addEventListener("resize",this.resize);
					return {
						//transformText : "",
						translateText : "translateX(0px)",
						speed :data.config.speed,
						now : data.config.now,
						interval : data.config.interval
					};
			},
			animatePre:animate.pre,
			animateStop:animate.stop,
			animateNext:animate.next,
			animateStart:animate.start,
			pos : animate.pos,
			getNow : animate.getNow,
			componentWillUpdate : function(){
				data.config.interval = this.state.interval;
				data._num1=0;
				data._num2=0;
			},
			componentDidMount:function(){
				this.animateStart.call(this);
				this.resize();
				this.pos(data.x);
			},
			resize:function(){
				if(!data.x) data.x = 0;
				data.trans = data.width?this.refs.touchswipe.offsetWidth/data.width:1;
				data.width= this.refs.touchswipe.offsetWidth;
				data.perD= data.width*(25+3)/data.config.speed;//每次位移,矫正速度
				data.x = data.width*(this.state.now-1)+data.x*data.trans;
			},
			render : function(){
				//React.initializeTouchEvents(true);
				return (<div className="touchswipe">
				<div  className="touchswipe-main" 
				onTouchStart={dragEvent.touchstart.bind(this)}
				onTouchMove={dragEvent.touchmove.bind(this)}
				onTouchEnd={dragEvent.touchend.bind(this)}
				onResize= {this.resize}
				>
					<div className="touchswipe-body" ref="touchswipe" style={{
					height:this.props.height,
					WebkitTransform:this.state.translateText
					}}>
						{
							React.Children.map(this.props.children,(function(child){
								data._num1++;
								return  <div className="touchswipe-box"   data-b-id={data._num1} >{child}</div>
							}).bind(this))

						}
						{
							React.Children.map(this.props.children,(function(child){
								data._num1++;
								return  <div className="touchswipe-box"  data-b-id={data._num1}>{child}</div>
							}).bind(this))
						}
					</div>

				</div>
				<div className="touchswipe-op" >
					{
						 React.Children.map(this.props.children,(function(child){
							var className ;
							data._num2++;
							if(this.state.now==data._num2||this.state.now-data.config.length==data._num2){
									className = "touchswipe-button touchswipe-button-cur";
								}else{
									className = "touchswipe-button"
								}
							return  <div className={className}  data-b-id={data._num2} onTouchEnd={buttonClick.bind(this)}></div>
						}).bind(this))
					}
				</div>
				</div>);
			} 
		})
		
})();

module.exports =Touchswipe;
