import React, { useEffect } from "react";
import $ from "jquery";
import styles from "./chatbot.css";

// 변수
let userName = null;
let state = "SUCCESS";

// Javascript 함수
function Message(arg) {
  this.text = arg.text;
  this.message_side = arg.message_side;

  this.draw = (function (_this) {
    return function () {
      let $message;
      $message = $($(".chatbot_message_template").clone().html());
      $message
        .addClass(_this.message_side)
        .find(".chatbot_text")
        .html(_this.text);
      $(".chatbot_messages").append($message);

      return setTimeout(function () {
        return $message.addClass("appeared");
      }, 0);
    };
  })(this);
  return this;
}

function getMessageText() {
  let $message_input;
  $message_input = $(".chatbot_message_input");
  return $message_input.val();
}

function sendMessage(text, message_side) {
  console.log(text);
  let $messages, message;
  $(".chatbot_message_input").val("");
  $messages = $(".chatbot_messages");
  message = new Message({
    text: text,
    message_side: message_side,
  });
    
  message.draw();
  $messages.animate({ scrollTop: $messages.prop("scrollHeight") }, 300);
}

function greet() {
  if (userName === null) {
    setTimeout(function () {
      return sendMessage("사용할 닉네임을 알려주세요.", "left");
    }, 2000);
  }
}

function onClickAsEnter(e) {
  if (e && e.keyCode === 13) {
    onSendButtonClicked();
  }
}

function setUserName(username) {
  if (username != null && username.replace(" ", "" !== "")) {
    sendMessage("반갑습니다, " + username + "님. 닉네임이 설정되었습니다.", "left", 1000);
    setTimeout(function () {
      sendMessage("안녕하세요,저는 Dr.Pick챗봇입니다.", "left");
    }, 1000);
    setTimeout(function () {
      sendMessage("어디가 아프신가요", "left");
    }, 2000);
    return username;
  } else {
    sendMessage("올바른 닉네임을 이용해주세요.", "left");
    return null;
  }
}


function requestChat(messageText, url_pattern) {
  console.log(
    "AJAX요청 전송: " +
      "http://118.217.203.47:5000/" +
      url_pattern +
      "/" +
      userName +
      "/" +
      messageText
  );
  $.ajax({
    url:
      "http://118.217.203.47:5000/" +
      url_pattern +
      "/" +
      userName +
      "/" +
      messageText,
    type: "GET",
    dataType: "json",
    success: function (data) {
      console.log("받은 JSON Data: " + JSON.stringify(data));
      return sendMessage(
        data.entity,
        "left"
      );
    },
    error: function (request, status, error) {
      console.log(error);
      return sendMessage("죄송합니다. 서버 연결에 실패했습니다.", "left");
    },
  });
}

function onSendButtonClicked() {
  let messageText = getMessageText();
  console.log("유저 입력: " + messageText);
  sendMessage(messageText, "right");

  if (userName == null) {
    userName = setUserName(messageText);
  } else {
    if (messageText.includes("안녕")) {
      setTimeout(function () {
        return sendMessage("안녕하세요. 저는 Dr.Pick챗봇입니다.", "left");
      }, 1000);
    } else if (messageText.includes("고마워")) {
      setTimeout(function () {
        return sendMessage("천만에요. 더 물어보실 건 없나요?", "left");
      }, 1000);
    } else if (messageText.includes("없어")) {
      setTimeout(function () {
        return sendMessage("그렇군요. 알겠습니다!", "left");
      }, 1000);
    } else if (state.includes("REQUIRE")) {
      return requestChat(messageText, "fill_slot");
    } else {
      return requestChat(messageText, "request_chat");
    }
  }
}

function ChatbotPage() {
  useEffect(() => {
    greet();
    onClickAsEnter();
  }, []);

  return (
    <div className="chatbot_container">
        <div className="chatbot_top_menu">
          <div className="chatbot_buttons">
            <div className="chatbot_button chatbot_close_button"></div>
            <div className="chatbot_button chatbot_minimize"></div>
            <div className="chatbot_button chatbot_maximize"></div>
          </div>
          <div className="chatbot_title">Dr.Pick챗봇</div>
        </div>
        <ul className="chatbot_messages"></ul>
        <div className="chatbot_bottom_wrapper">
          <div className="chatbot_message_input_wrapper">
            <input
              className="chatbot_message_input"
              onKeyUp={(event) => onClickAsEnter(event)}
              placeholder="여기에 내용을 입력하세요."
            />
          </div>
          <div
            className="chatbot_send_message"
            id="send_message"
            onClick={() => onSendButtonClicked()}
          >
            <div className="chatbot_text">보내기</div>
          </div>
        </div>
        <div className="chatbot_message_template" style={{ display: "none" }}>
          <li className="chatbot_message">
            <div className="chatbot_avatar"></div>
            <div className="chatbot_text_wrapper">
              <div className="chatbot_text"></div>
            </div>
          </li>
        </div>
    </div>
  );
}

export default ChatbotPage;
