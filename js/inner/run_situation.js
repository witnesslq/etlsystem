var myGrid;
$(function () {
    myGrid = new dhtmlXGridObject('gridbox');
    myGrid.setHeader("序号,步骤名称,复制的记录行数,读,写,输入,输出,更新,拒绝,错误,时间,速度（条记录/秒）")
    myGrid.setColumnIds(",stepname,line_number,read,write,entry,export,update,refuse,error,time,speed");
    myGrid.setColTypes("cntr,ro,ro,ro,ro,ro,ro,ro,ro,ro,ro,ro");
    myGrid.setInitWidths("50,*,130,80,80,80,80,80,80,80,80,150");
    myGrid.setColAlign("center,center,center,center,center,center,center,center,center,center,center,center");
    myGrid.enableTooltips("false,true,true,true,true,true,true,true,true,true,true,true");
    myGrid.enableResizing("false");
    myGrid.enableKeyboardSupport(false);
    myGrid.enableAutoHeight(true);
    myGrid.enableAutoWidth(true);
    myGrid.enableRowsHover(true, 'grid_hover');
    myGrid.init();

    //禁止选中
    myGrid.attachEvent("onBeforeSelect", function (new_row, old_row, new_col_index) {
        return false;
    });
    if (GLOBAL_DEBUG) {
        var data = GLOBAL_JSON.task_situation.data.data;
        myGrid.parse(data, "js");
    } else {
        _ajax({
            url: GLOBAL_AJAX_URL.task_situation,
            success: function (res) {
                if (res.status) {
                    myGrid.parse(res.data, "js");
                } else {
                    top.dhtmlx.alert({
                        text: res.messages,
                        title: '提示信息',
                        ok: '确定'
                    });
                }
            }
        });
    }
    //按钮事件
    $('#btn_search').on('click', function () {
        var data = {};
            data.name = $('#taskName').val(),
            data.user = $('#taskUser').val();
        //ajax加载数据，函数
        window.location.reload(true);
    });
})
    
    //删除任务
    function taskDel(id) {
        top.creatPop({
            caption: '删除用户',
            width: 360,
            height: 234,
            title: '您确定要删除该任务吗？删除后将无法找回',
            url: 'html/common/delpop.html'
        });
        top.myPop.callback = function () {
            if (GLOBAL_DEBUG) {
                window.location.reload(true);
            } else {
                _ajax({
                    url: GLOBAL_AJAX_URL.taskDel,
                    data: { id: id },
                    success: function (res) {
                        if (res.status) {
                            window.location.reload(true);
                        } else {
                            top.dhtmlx.alert({
                                text: res.data.msg,
                                title: '提示信息',
                                ok: '确定'
                            });
                        }
                    }
                });
            }
        }
    }