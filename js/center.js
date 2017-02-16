﻿$(function () {
    //------------------ETL管理工具中心开始------------------
    //初始化页面布局
    dhtmlx_myLayout = new dhtmlXLayoutObject({
        parent: $('.center-body')[0],
        pattern: '3T',
        offsets: {
            top: 0,
            left: 0,
            bottom: 0,
            right: 0
        },
        cells: [
            {
                id: 'a',
                header: false,
                height: 50
            },
            {
                id: 'b',
                header: false,
                width: 180
            },
            {
                id: 'c',
                header: false
            }
        ]
    });
    //设置布局间隙为0
    dhtmlx_myLayout.setSeparatorSize(0, 0);
    dhtmlx_myLayout.setSeparatorSize(1, 0);
    dhtmlx_myLayout.setSeparatorSize(2, 0);
    //初始化头部内容
    dhtmlx_myLayout.cells('a').attachHTMLString(
        '<header class="header">\
        <div class="options">\
            <div class="userinfo">\
                <img src="imgs/user_default.png" />\
                <span class="username">admin</span>\
                <ul>\
                    <li><a class="systemmsg"><i class="msgnums">12</i>系统消息</a></li>\
                    <li><a class="usermsg">个人信息</a></li>\
                    <li><a href="login.html" class="logout">退出</a></li>\
                </ul>\
            </div>\
        </div>\
    </header>'
        );
    //初始化左侧菜单内容
    dhtmlx_myLayout.cells('b').attachHTMLString('<div class="left-menu">\
                <div class="ctrl"><i></i></div>\
                <dl class="index-menu active selected"><dt>项目首页<i></i></dt><dd class="active" hrefurl="html/index/index.html">首页</dd></dl>\
                <dl class="task-manger"><dt>任务管理<i></i></dt><dd hrefurl="html/task/manage.html">任务管理</dd></dl>\
                <dl class="task-dispatch"><dt>任务调度<i></i></dt><dd hrefurl="html/control/control.html">任务调度</dd></dl>\
                <dl class="task-run"><dt>任务运行<i></i></dt><dd hrefurl="html/run/running.html">运行中的任务</dd><dd hrefurl="html/run/history.html">任务历史</dd></dl>\
                <dl class="system-manger"><dt>系统管理<i></i></dt><dd hrefurl="html/index/index.html">角色管理</dd><dd hrefurl="html/system/usermanage.html">用户管理</dd><dd hrefurl="html/index/index.html">权限管理</dd><dd hrefurl="html/system/userinfo.html">个人信息</dd></dl>\
                <div class="mouse-menu"></div>\
            </div>');
    //初始化右侧中间主体内容
    dhtmlx_myLayout.cells('c').attachURL('html/index/index.html');
    //设置页面缩放时，各布局间的伸缩规则
    dhtmlx_myLayout.setAutoSize("a;c", "b;c");
    leftMenuAttachClick();
    $('.left-menu').parent().parent().css('zIndex', 5);
    //控制左侧菜单展开收缩效果
    var lmmoveing = false;
    $('.left-menu .ctrl').on('click', 'i', function () {
        var $this = $(this);
        if (lmmoveing) {
            return;
        } else {
            lmmoveing = true;
            var layoutWidth = dhtmlx_myLayout.cells('b').getWidth();
            var width = layoutWidth == 180 ? 50 : 180;
            var time = null;
            if (width >= 180) {
                leftMenuDetachMouseover();
                leftMenuDetachMouseout();
                leftMenuAttachClick();
                time = setInterval(function () {
                    layoutWidth += 10;
                    dhtmlx_myLayout.cells('b').setWidth(layoutWidth);
                    if (layoutWidth >= 180) {
                        clearInterval(time);
                        time = null;
                        lmmoveing = false;
                        $this.removeClass('shou');
                    }
                }, 10);
            } else {
                leftMenurRtract()
                leftMenuDetachClick();
                leftMenuAttachMouseover();
                leftMenuAttachMouseout();
                time = setInterval(function () {
                    layoutWidth -= 10;
                    dhtmlx_myLayout.cells('b').setWidth(layoutWidth);
                    if (layoutWidth <= 50) {
                        clearInterval(time);
                        time = null;
                        lmmoveing = false;
                        $this.addClass('shou');
                    }
                }, 10);
            }

        }
    });
    //左侧菜单绑定点击事件
    function leftMenuAttachClick() {
        //点击左侧一级菜单动画效果
        $('.left-menu>dl').on('click', 'dt', function () {
            $(this).parent().toggleClass('active').siblings().removeClass('active');
        });
        //点击左侧二级菜单动画效果
        $('.left-menu>dl').on('click', 'dd', function () {
            $(this).addClass('active').siblings().removeClass('active');
            $(this).parent().addClass('selected').siblings().removeClass('selected');
            $(this).parent().siblings().find('dd').removeClass('active');
            dhtmlx_myLayout.cells('c').attachURL($(this).attr('hrefurl'));
        });
    }
    //左侧菜单解除点击事件
    function leftMenuDetachClick() {
        $('.left-menu>dl').off('click', 'dt');
        $('.left-menu>dl').off('click', 'dd');
    }
    //左侧菜单绑定鼠标移入效果
    function leftMenuAttachMouseover() {
        $('.left-menu>dl').on('mouseover', function () {
            var $this = $(this);
            var $mouseMenu = $('.left-menu .mouse-menu');
            if ($this.hasClass('selected')) {
                $mouseMenu.html('<h3 class="selected">' + $this.find('dt').text() + '</h3>');
            }
            else {
                $mouseMenu.html('<h3>' + $this.find('dt').text() + '</h3>');
            }
            $this.find('dd').each(function (index, item) {
                if ($(item).hasClass('active')) {
                    $mouseMenu.append('<p hrefurl=' + $(item).attr('hrefurl') + ' class="active">' + $(item).text() + '</p>');
                } else {
                    $mouseMenu.append('<p hrefurl=' + $(item).attr('hrefurl') + '>' + $(item).text() + '</p>');
                }
            });
            $mouseMenu.css('top', $this.offset().top-52).show().data('target', $this);
        })
    }
    //左侧菜单绑定鼠标移出效果
    function leftMenuAttachMouseout() {
        $('.left-menu>dl').on('mouseout', function () {
            $('.left-menu .mouse-menu').hide();
        })
    }
    //左侧菜单解除鼠标移入效果
    function leftMenuDetachMouseover() {
        $('.left-menu>dl').off('mouseover');
    }
    //左侧菜单解除鼠标移出效果
    function leftMenuDetachMouseout() {
        $('.left-menu>dl').off('mouseout');
    }
    //左侧菜单收起
    function leftMenurRtract() {
        $('.left-menu>dl').removeClass('active');
    }
    //收缩后移入移出菜单
    $('.left-menu .mouse-menu').hover(function () {
        $(this).data('target').find('dt').addClass('hover');
        $(this).show();
    }, function () {
        $(this).data('target').find('dt').removeClass('hover');
        $(this).hide();
    });
    //收缩后菜单点击事件
    $('.left-menu .mouse-menu').on('click', 'p', function () {
        var $this = $(this);
        $this.addClass('active').siblings().removeClass('active');
        $this.siblings('h3').addClass('selected');
        var $target = $this.parent().data('target');
        $target.addClass('selected').siblings().removeClass('selected');
        $target.find('dd').removeClass('active');
        $target.siblings().find('dd').removeClass('active');
        $target.find('dd:contains(' + $this.text() + ')').addClass('active');
        dhtmlx_myLayout.cells('c').attachURL($(this).attr('hrefurl'));
    });
    //头部历史订单集群相关操作结束
    //所有弹窗父类
    myWins = new dhtmlXWindows();
    myPop = null;
    window.creatPop = function (opt) {
        myPop = myWins.createWindow({
            id: 'pop',
            width: opt.width,
            height: opt.height,
            caption: opt.caption,
            modal: true,
            center: true,
            move: false,
            resize: false,
            park: false
        });
        myPop.button('park').hide();
        myPop.button('minmax').hide();
        //myPop.button('close').hide();
        if (opt.title) {
            myPop.attachURL(opt.url + '?title=' + encodeURI(encodeURI(opt.title)));
        } else {
            myPop.attachURL(opt.url);
        }
    }
    window.closePop = function () {
        if (myPop) {
            myPop.close();
        }
    }
    window.closePopCallBack = function (param) {
        if (myPop) {
            myPop.callback(param);
            myPop.close();
        }
    }
    //------------------用户中心结束------------------
})