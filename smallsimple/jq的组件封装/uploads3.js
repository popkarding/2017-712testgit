class Uploads {
	constructor(that){
		/*
			btn:点击按钮
			readFile:用户选择的图片
		*/
		this.settings = {
			readFile:null,
			btn:null,
			drag:null,
			view:function(){},
			actionMount:function(){},
			uploadEndMount:function(){},
			progressMount:function(){},
			bong:function(){},
			ondrog:function(){},
			dragleave:function(){}
		};
		this.arr = []; //每次选中图片的时候，把不重复的图片push到这个数组中
		//当点击确定按钮的时候，一次性把数组中的数据全部上传。
		this.num = 0;
	}
	
	
	init(opt){
		let _this = this;
		$.extend(this.settings,opt);
		
		//选择图片
		if(this.settings.readFile){
			
			
			this.settings.readFile.change(function(ev){//这个ev就是type是file的上传input的ev   参数自己可以console.dir看看
				_this.addPic(this.files[0]);//file  ev的参数之一
				
	
				ev.target.value = '';
			});
		}
		
		if(this.settings.btn){
			//点击的时候去上传
			this.settings.btn.click(function(){
				_this.send();   //面向对象标准写法之转this
				_this.settings.actionMount(_this.arr);//加深对钩子函数的理解，ps：感觉还是react里面的钩子更加高大上
			});
		}
		
		
		/*
			拖拽 
			
			小技巧，如果ev下没有封装需要的属性，那么使用ev.originalEvent，可以找到原生的事件对象。
		*/
		$(document).on('dragover',function(){return false})
		if(this.settings.drag){
			//拖拽抬起
			this.settings.drag.on('drop',function(ev){
				
				//console.log();
				
				_this.addPic(ev.originalEvent.dataTransfer.files[0]);
				_this.settings.ondrog();
				return false;
			});
			
			//拖拽移入
			this.settings.drag.on('dragenter',function(ev){
				_this.settings.bong();
			});
			
			
			this.settings.drag.on('dragleave',function(ev){
				_this.settings.dragleave();
			});
			
			
			
			
		}
		
	}
	
	//添加不重复的数据。
	addPic(data){
		if(!this.arr.some(e=>e.name == data.name)){
			this.arr.push(data);
			
			//不重复才显示选中的图片。
			this.settings.view(data);
		}
	}
	
	send(){
		let _this = this;
		this.arr.forEach(e=>{
			let fromData = new FormData;//???? 参考过去课件例子
			fromData.append('file',e);
			
			$.ajax({
				url:'php/post_file.php',
				method:'post',
				data:fromData,
				processData:false,//processData:false,contentType:false,这两条这种情况必须写
				contentType:false,
				success:function(data){
					_this.num ++;//有点不懂了？？为什么它会加不是点击后只进send一次么
					
					//上传进度(每次传成功的数字,总数字)
					_this.settings.progressMount(_this.num,_this.arr.length);
					
					if(_this.num == _this.arr.length){
						//全部上传成功
						_this.settings.uploadEndMount();
						_this.arr.length = 0;
						_this.num = 0;
					}
					
					//console.log(111);
				}
			});
		});
	}
	
	changeData(data,callback){
		/*
			FileReader就是将二进制数据转成图片源码。 
			readAsDataURL(二进制数据)
		*/
		var fr = new FileReader;
		fr.onload = function(){
			/*
				当二进制数据转码成功之后，将成功的代码传给使用者。
				callback(处理好的数据)
			*/
			callback(fr.result);
			//console.log(fr.result);
		};
		fr.readAsDataURL(data);//这是干什么的？？？？
		
	}
	
	//删除被选中的数据。
	removeData(name){
		this.arr = this.arr.filter(e=>e.name != name);
		
		console.log(this.arr);
	}
	
	
}



/*
	$.fn.插件名也可以创建插件。
	
	个人推荐使用:$.fn.extend({}),方便管理插件。
*/


//$.fn.uploads = function(opt){
//	let uploads = new Uploads(this);
//		
//	uploads.init(opt);
//		
//	return this;
//}
//
//$.fn.xxx = function(){
//	
//}


$.fn.extend({
	
	uploads(opt){
		//console.log(1232132);
		let uploads = new Uploads(this);
		
		uploads.init(opt);
		
		return {that:this,up:uploads};//链式操作要.that
	},
	
	msk(val){
		
		this.html(val);
		
		this.animate({
			top:0
		});
		
		this.delay(800).animate({
			top:-20
		});
	}
	
	
});

