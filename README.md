# react-touch-swiper
### 基于react的swipe插件-- for移动端
react swipe for mobile web

[demo](http://htmlpreview.github.io/?https://github.com/cococat/react-touch-swiper/blob/master/demo.html)

###props
key        | value类型| 说明(state)  |默认值(default)|备注(is necessary)
---------- |----------| -----|------|------
height | String | swipe高度,eg:"245px"，the height of the plugin | undefined |必须(must)
interval | Number  |swipe动画停留时间,time of animate stay |4000|可选(-)
speed | Number | 默认轮播速度,the speed of animate | 400 |可选(-)
now | Number | 从第几项开始轮播(第一项为1),which beginning | 1 |可选(-)


###用法举例(Example)
```javascript
ReactDOM.render(<Touchswipe interval="3000"  height="250px">
			<span style={{display:"inline-block",background:"black",color:"#fff",width:"100%",height:"100%"}}>1</span>
			<span style={{display:"inline-block",background:"red",color:"yellow",width:"100%",height:"100%"}}>2</span>
			<span style={{display:"inline-block",background:"green",color:"blue",width:"100%",height:"100%"}}>3</span>
			<span style={{display:"inline-block",background:"pink",color:"#fff",width:"100%",height:"100%"}}>4</span>
		</Touchswipe>,document.getElementById("swipe"));
```

