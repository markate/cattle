module.exports = {
	user:{
		name:{
			len:"",
			checked:"",
			required:""
		},
		regTime:{
			len:"",
			checked:true,
			required:true
		},
		password:{
			len:"",
			checked:"这里是个正则",
			required:true
		},
		/*在用户提交之前的动作钩子*/
		beforeAddHook:function([],func){
			
		},
		/*在用户提交之后的动作钩子*/
		afterAddHook:function([],func){

		},
		/*在用户提交之后的动作钩子*/
		afterModifyHook:function([],func){

		},
		/*在用户提交修改之前的动作钩子*/
		beforeModifyHook:function([],func){

		},
		/*在用户提交删除之前的钩子*/
		beforeDeleteHook:function([],func){

		},
		/*在用户提交删除之后的钩子*/
		afterDeleteHook:function([],func){

		}
	},
	article:{
		title:{
			len:"",
			checked:"",
			required:""
		},
		publicTime:{
			len:"",
			checked:"",
			required:""
		},
		/*在用户提交之前的动作钩子*/
		beforeAddHook:function([],func){
			
		},
		/*在用户提交之后的动作钩子*/
		afterAddHook:function([],func){

		},
		/*在用户提交之后的动作钩子*/
		afterModifyHook:function([],func){

		},
		/*在用户提交修改之前的动作钩子*/
		beforeModifyHook:function([],func){

		},
		/*在用户提交删除之前的钩子*/
		beforeDeleteHook:function([],func){

		},
		/*在用户提交删除之后的钩子*/
		afterDeleteHook:function([],func){

		}
	}

};





