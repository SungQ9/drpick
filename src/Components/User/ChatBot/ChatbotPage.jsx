import React, { useEffect } from 'react';
import $ from 'jquery';
import './chatbot.css'; // 추후 삭제


// 변수
let userName = null;
let state = 'SUCCESS';

// Javascript 함수
function Message(arg) {
    this.text = arg.text;
    this.message_side = arg.message_side;

    this.draw = function (_this) {
        return function () {
            let $message;
            $message = $($('.message_template').clone().html());
            $message.addClass(_this.message_side).find('.text').html(_this.text);
            $('.messages').append($message);

            return setTimeout(function () {
                return $message.addClass('appeared');
            }, 0);
        };
    }(this);
    return this;
}

function getMessageText() {
    let $message_input;
    $message_input = $('.message_input');
    return $message_input.val();
}

function sendMessage(text, message_side) {
    let $messages, message;
    $('.message_input').val('');
    $messages = $('.messages');
    message = new Message({
        text: text,
        message_side: message_side
    });
    message.draw();
    $messages.animate({scrollTop: $messages.prop('scrollHeight')}, 300);
}

function greet() {
    setTimeout(function () {
        return sendMessage("사용할 닉네임을 알려주세요.", 'left');
    }, 2000);
}

function onClickAsEnter(e) {
    if (e && e.keyCode === 13) {
        onSendButtonClicked()
    }
}

function setUserName(username) {
    if (username != null && username.replace(" ", "" !== "")) {
        setTimeout(function () {
            return sendMessage("반갑습니다." + username + "님. 닉네임이 설정되었습니다.", 'left');
        }, 1000);
        setTimeout(function () {
            return sendMessage("저는 Dr.Pick챗봇입니다.", 'left');
        }, 2000);
        setTimeout(function () {
            return sendMessage("어디가 아프신가요", 'left');
        }, 3000);

        return username;
    } else {
        setTimeout(function () {
            return sendMessage("올바른 닉네임을 이용해주세요.", 'left');
        }, 1000);

        return null;
    }
}

function requestChat(messageText, url_pattern) {
    console.log("AJAX요청 전송: " + "http://118.217.203.47:5000/" + url_pattern + '/' + userName + '/' + messageText);
    $.ajax({
        url: "http://118.217.203.47:5000/" + url_pattern + '/' + userName + '/' + messageText,
        type: "GET",
        dataType: "json",
        success: function (data) {
            console.log("받은 JSON Data: " + JSON.stringify(data));
            const entities = data['entity'];
            const input = data['input'];

            if (entities.includes('B-APPOINTMENT_INTENT')) {
                return sendMessage("예약 관련 도움이 필요하시군요. 병원 예약을 도와드리겠습니다.?", 'left');
            } else if (entities.includes('S-SYMPTOM') || entities.includes('S-SEVERITY') || entities.includes('S-SYMPTOM')) {
                const symptom = input.join(' ');
                return sendMessage(symptom + " 증상을 갖고 계시는 군요. 해당 진료과 의사를 찾겠습니다.", 'left');
            } else {
                return sendMessage('죄송합니다. 무슨 말인지 잘 모르겠어요.', 'left');
            }
        },
        error: function (request, status, error) {
            console.log(error);
            return sendMessage('죄송합니다. 서버 연결에 실패했습니다.', 'left');
        }
    });
}

function onSendButtonClicked() {
    let messageText = getMessageText();
    console.log("유저 입력: " + messageText);
    sendMessage(messageText, 'right');

    if (userName == null) {
        userName = setUserName(messageText);
    } else {
        if (messageText.includes('안녕')) {
            setTimeout(function () {
                return sendMessage("안녕하세요. 저는 Dr.Pick챗봇입니다.", 'left');
            }, 1000);
        } else if (messageText.includes('고마워')) {
            setTimeout(function () {
                return sendMessage("천만에요. 더 물어보실 건 없나요?", 'left');
            }, 1000);
        } else if (messageText.includes('없어')) {
            setTimeout(function () {
                return sendMessage("그렇군요. 알겠습니다!", 'left');
            }, 1000);
        } else if (state.includes('REQUIRE')) {
            return requestChat(messageText, 'fill_slot');
        } else {
            return requestChat(messageText, 'request_chat');
        }
    }
}

function ChatbotPage() {
    useEffect(() => {
        greet();
        onClickAsEnter();
    }, []);

    return (
        <html lang="en">
            <head>
                <meta charset="UTF-8" />
                <title>Dr.Pick 챗봇</title>
                {/* jquery+bootstrap, bootstrap은 추후 삭제*/}
                <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
                <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
                <link href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css" />
            </head>

            <body>
                <div className="chat_window">
                    <div className="top_menu">
                        <div className="buttons">
                            <div className="button close_button"></div>
                            <div className="button minimize"></div>
                            <div className="button maximize"></div>
                        </div>
                        <div className="title">Dr.Pick챗봇</div>
                    </div>
                    <ul className="messages"></ul>
                    <div className="bottom_wrapper clearfix">
                        <div className="message_input_wrapper">
                            <input
                                className="message_input"
                                onKeyUp={(event) => onClickAsEnter(event)}
                                placeholder="내용을 입력하세요."
                            />
                        </div>

                        <div
                            className="send_message"
                            id="send_message"
                            onClick={() => onSendButtonClicked()}
                        >
                            <div className="icon"></div>
                            <div className="text">보내기</div>
                        </div>
                    </div>
                </div>
                <div className="message_template">
                    <li className="message">
                        <div className="avatar"></div>
                        <div className="text_wrapper">
                            <div className="text"></div>
                        </div>
                    </li>
                </div>
            </body>
        </html>
    );
};

export default ChatbotPage;
