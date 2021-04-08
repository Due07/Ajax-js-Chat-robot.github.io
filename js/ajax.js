/**
 * @param {Object} options 
 * @desc 封装一个ajax函数  使所有的网络请求都用该函数
 * 参数：   
    1. method: 请求方式
    2. url: 请求地址
    3. data: 请求参数（数据）
    4. isAsync: 是否异步
    5. success: 成功拿到数据之后做的功能
    6. error: 失败的回调函数 

    当前函数有局限性： data必须为字符串， method只能是GET和POST
 */

function ajax(options) {
    var method = options.method || "GET";
    var url = options.url || '';
    var data = options.data || '';
    var isAsync = options.isAsync !== undefined ? options.isAsync : true;
    var success = options.success || function(data) {};
    var error = options.error || function(data) {};

    var xhr = null;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        xhr = window.ActiveXObject("Microsoft.XMLHTTP");
    } else {
        alert("此浏览器无法发送请求，请更换浏览器！");
    }
    console.log(xhr);
    //监听发送请求
    // 当readystate属性变化的时候才会触发
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                //接受到数据之后的处理
                success(JSON.parse(xhr.responseText));
            }
        }
    }

    //统一将用户传递过来的请求方式转换为大写  
    method = method.toUpperCase();

    if (method == "GET") {
        //判断？的位置是否在最后，如果是直接拼接，否则用&拼接在已有的数据后面
        if (url.indexOf("?") > -1) {
            if (url.indexOf('?') === url.length - 1) {
                url += data;
            } else {
                url += '&' + data;
            }
        } else {
            url += '?' + data;
        }
        console.log(method, url, isAsync);
        xhr.open(method, url, isAsync);
        xhr.send();
    } else {
        //请求头为post 那么请求的数据要放在发送里面去发送
        xhr.open(method, url, isAsync);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(data);

    }
}