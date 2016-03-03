# react-touch-swiper
### 基于react的swipe插件

[demo](http://htmlpreview.github.io/?https://github.com/cococat/react-touch-swiper/blob/master/demo.html)

###api说明
key        | value类型| 说明  |默认值|备注
---------- |----------| -----|------|------
height | String | swipe高度,eg:"245px" | 无 ｜必须
interval | Number  |swipe动画停留时间 |4000|可选
speed | Number | 默认轮播速度 | 400 |可选
now | Number | 从第几项开始轮播(第一项为1) | 1 ｜可选


###用法举例
```javascript
ReactDOM.render(<Touchswipe interval="3000"  height="250px">
			<span style={{display:"inline-block",background:"black",color:"#fff",width:"100%",height:"100%"}}>1</span>
			<span style={{display:"inline-block",background:"red",color:"yellow",width:"100%",height:"100%"}}>2</span>
			<span style={{display:"inline-block",background:"green",color:"blue",width:"100%",height:"100%"}}>3</span>
			<span style={{display:"inline-block",background:"pink",color:"#fff",width:"100%",height:"100%"}}>4</span>
		</Touchswipe>,document.getElementById("swipe"));
```

