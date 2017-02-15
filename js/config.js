var GLOBAL_DEBUG = true;//是否本地调试，true本地调试,false生产环境
var GLOBAL_IMGS_URL = '/images/';//图片路径
//项目跳转地址管理
var GLOBAL_ADDR_URL = {
    index:'/index.html'//登录成功后，跳转的后台首页
}
//后台ajax请求地址
var GLOBAL_AJAX_URL = {
    login: '/metallurgy/login/isMatching',//登录
   
	user_list: '/metallurgy/user/query',//用户管理-用户列表
	user_add: '/metallurgy/user/addUser',//用户管理-用户添加
	users_del: '/metallurgy/user/deleteUsers',//用户管理-用户批量删除
	user_del: '/metallurgy/user/deleteById',//用户管理-单个用户删除
	user_edit: '/metallurgy/user/updateUser',//用户管理-用户编辑
	user_status_edit: '/metallurgy/user/updateStatusById',//用户管理-用户状态更改
	user_info: '',//个人信息管理-获取个人详细信息
	user_info_edit: '/metallurgy/user/updateInfo',//个人信息管理-修改个人信息
};
//模拟的JSON数据
var GLOBAL_JSON = {
    //登录
    login: {
        username: 'admin',
        password: 'admin'
    },
    
    //用户列表
	user_list: {
	    "status": true,
	    "httpstatus": 200,
	    "error_code": 0,
	    "data": {
	        "msg": "",
	        "users": [
                {
                    "id": "122",
                    "username": "admin",
                    "name": "平台管理者",
                    "phoneNumber": 15200801269,
                    "role": "Administrator",
                    "status": "Enable"
                },
                {
                    "id": "133",
                    "username": "zhangda",
                    "name": "张达",
                    "phoneNumber": 18684775632,
                    "role": "User",
                    "status": "Enable"
                },
                {
                    "id": "144",
                    "username": "liuwang",
                    "name": "刘望",
                    "phoneNumber": 13773410749,
                    "role": "User",
                    "status": "Disable"
                }
	        ]
	    }
	},
    //个人信息
	user: {
	    "status": true,
	    "data": {
	        "msg": "",
	        "user": {
	            "id": "1",
	            "username": "echmin",
	            "name": "达芬奇斯蒂夫",
	            "phoneNumber":'18974009833',
	            "password": "1436864169"
	        }
	    }
	},
};