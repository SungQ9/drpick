// React 및 필요한 라이브러리와 CSS 가져오기
import React, { useEffect, useState } from "react";
import $ from "jquery";
import axios from "axios";
import "./chatbot.css";
import {
  handleTags,
  handleDefaultResponse,
  site,
  department,
} from "./ChatbotResponse";

// 사용자 이름을 저장할 변수 선언
let userName = null;

// 챗봇 메시지 객체 정의
function Message(arg) {
  // 메시지의 내용, 위치(왼쪽 혹은 오른쪽), 링크, 링크 텍스트, 상태 저장
  this.text = arg.text;
  this.message_side = arg.message_side;
  this.link = arg.link;
  this.linkText = arg.linkText;
  this.state = arg.state;

  // 메시지를 화면에 그리는 함수
  this.draw = function () {
    let $message = $($(".chatbot_message_template").clone().html());

    $message.addClass(this.message_side);
    $message.find(".chatbot_text").html(this.text);

    if (this.link) {
      let href = this.link;
      if (this.state) {
        // 상태 객체를 URL 쿼리 파라미터로 변환
        const queryParams = new URLSearchParams(this.state).toString();
        href += `?${queryParams}`;
      }
      const $link = $("<a>")
        .attr("href", href)
        .attr("target", "_blank")
        .text(this.linkText);
      $message.find(".chatbot_text").append($link);
    }

    $(".chatbot_messages").append($message);
    setTimeout(function () {
      $message.addClass("appeared");
    }, 0);
  };

  return this;
}

// 입력된 메시지 텍스트를 가져오는 함수
function getMessageText() {
  let $message_input = $(".chatbot_message_input");
  return $message_input.val();
}

// 메시지 전송 함수
function sendMessage(text, message_side, link, linkText, state) {
  $(".chatbot_message_input").val("");

  let message = new Message({
    text: text + ": ",
    message_side: message_side,
    link: link,
    linkText: linkText,
    state: state,
  });

  message.draw();
  $(".chatbot_messages").animate(
    { scrollTop: $(".chatbot_messages").prop("scrollHeight") },
    300
  );
}

// Enter 키 이벤트 처리 함수
function onClickAsEnter(e) {
  if (e && e.keyCode === 13) {
    onSendButtonClicked();
  }
}

// 사용자 이름 설정 함수
function setUserName(username) {
  if (username != null && username.replace(" ", "") !== "") {
    sendMessage(
      "반갑습니다, " + username + "님. 저는 Dr.Pick챗봇입니다.",
      "left",
      null,
      null,
      null
    );
    setTimeout(function () {
      sendMessage("무엇을 도와드릴까요", "left", null, null, null);
    }, 2000);
    return username;
  } else {
    sendMessage("올바른 닉네임을 이용해주세요.", "left", null, null, null);
    return null;
  }
}

// 사용자 환영 함수
function greet() {
  userName = localStorage.getItem("userName");
  if (userName === null) {
    setTimeout(function () {
      return sendMessage(
        "로그인을 하지 않으셨습니다. 사용할 닉네임을 알려주세요.",
        "left",
        null,
        null,
        null
      );
    }, 2000);
  } else {
    setTimeout(function () {
      sendMessage("반갑습니다, " + userName + "님.", "left", null, null, null);
      setTimeout(function () {
        sendMessage(
          "안녕하세요,저는 Dr.Pick챗봇입니다.",
          "left",
          null,
          null,
          null
        );
      }, 1000);
      setTimeout(function () {
        sendMessage("무엇을 도와드릴까요", "left", null, null, null);
      }, 2000);
    }, 1000);
  }
}

// 채팅 요청을 서버에 보내는 함수
function requestChat(messageText, url_pattern, state) {
  console.log(
    "AJAX요청 전송: " +
      "http://118.217.203.47:5000/" +
      url_pattern +
      "/" +
      userName +
      "/" +
      messageText
  );
  axios
    .get(
      "http://118.217.203.47:5000/" +
        url_pattern +
        "/" +
        userName +
        "/" +
        messageText
    )
    .then((response) => {
      const input = response.data.input.join(" ");
      let foundEntity = false;
      let entity = response.data.entity.join(" ");

      console.log("input:", input, "entity:", entity);

      // 엔티티 타입에 따라 적절한 메시지 전송
      if (entity.includes("-SITE")) {
        // 여기에 로직 구현
      }
      // 다른 엔티티 타입에 대한 로직 추가
      // ...

      if (!foundEntity) {
        sendMessage(handleDefaultResponse(), "left", null, null, state);
      }
    })
    .catch((error) => {
      console.log(error);
      sendMessage(
        "죄송합니다. 서버 연결에 실패했습니다.",
        "left",
        null,
        null,
        state
      );
    });
}

// 메시지 보내기 버튼 클릭 처리 함수
function onSendButtonClicked() {
  let messageText = getMessageText();
  sendMessage(messageText, "right", null, null, null);

  // 사용자 이름 설정 및 대화 로직
  if (userName == null) {
    // 여기에 로직 구현
  } else {
    // 여기에 로직 구현
  }
}

// ChatbotPage 컴포넌트 정의
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
