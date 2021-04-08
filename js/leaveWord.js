//记录下显示打开的时间
function time() {
    var today = new Date(); /*获取时间*/
    var hh = today.getHours(); /*获取小时*/
    var mm = today.getMinutes(); /*获取分钟*/
    var ss = today.getSeconds(); /*获取秒*/
    document.querySelector(".Time").innerHTML = "今天" + hh + ":" + mm + ":" + ss;
}
time();
$(document).ready(function() {
        //右下角悬浮图标
        // $(".personage").click(function() {
        //     $(".personage img").css("transform", "translateX(70%)");
        //     $(".personage img").fadeOut("slow"); //点击按钮淡出！
        //     $("#personage-1 ").fadeIn("slow");
        // })
        $(".chatbotton-1 a").click(function() {
            alert("现在服务正忙，请稍后再试。");
        })
        $(".history").click(function() {
                $(".history").html("没有更多了");
            })
            //底部点击
        $(".footer-nav dl dd").click(function() {
            alert("功能正完善当中，敬请期待！");
        })
    })
    //右下角图标
const personage = document.querySelector('.personage');
const personage_1 = document.querySelector('#personage-1');
const close = document.querySelector('#personage-1 i');
let clock = true;
personage.onclick = () => {
    // console.log(e);
    per('block', 'y', '1200')
}
close.onclick = () => {
    per('none', 'n', '500');
}

function per(res, e, s) {
    if (clock) {
        e === 'y' ? personage.classList.toggle('personage-img') : personage_1.style.display = res;
        clock = false;
    }
    setTimeout(() => {
        clock = true;
        e === 'n' ? personage.classList.toggle('personage-img') : personage_1.style.display = res;
        personage_1.style.display = res;
    }, s)
}

const chatTop = document.querySelector(".chatTop");
const btn = document.querySelector(".chat-btn");
const val = document.querySelector(".chatbotton-content"); //输入框
let creatMess = document.querySelector(".chatMain .chatTop .message");

//输入框里按下键盘监控
val.onkeydown = (e) => {
    //console.log(e);
    if (e.keyCode == 13) {
        e.returnValue = false; /*解决textarea标签回车键换行*/
        vals();
    }
}

function vals() {
    var value = val.value;
    if (value) {
        creatDom("me", value);
        val.value = '';
        sendMess(value);
    }
}
btn.onclick = () => {
    vals();
}

function sendMess(text) {
    ajax({
        method: 'get',
        url: "https://developer.duyiedu.com/edu/turing/chat",
        data: text = "text=" + text,
        success: (data) => {
            console.log(data);
            creatDom("robot", data.text);
        }
    })
}
//渲染聊天记录 谁 内容
function creatDom(who, text) {
    let creatDom = document.createElement("li");
    creatDom.className = "message-" + who;
    let creatText = document.createElement("text");
    creatText.className = "text-content";
    creatText.innerHTML = text;
    creatDom.appendChild(creatText);
    creatMess.appendChild(creatDom);

    // 让聊天记录实时滚动到当前位置
    // scrollHeight: 代表的是当前内容区在没有滚动条的时候 ----> 里面元素撑开的大小， 
    // clientHeight： 代表的是当前内容区视口的高度
    chatTop.scrollTo(0, chatTop.scrollHeight - chatTop.clientHeight);
}


// ajax({
//     method: 'get',
//     url: "https://developer.duyiedu.com/edu/turing/chat",
//     data: text = "text=你妹啊",
//     success: (data) => {
//         console.log(data);
//     }
// })