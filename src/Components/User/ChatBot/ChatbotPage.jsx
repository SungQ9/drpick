import React, { useEffect, useState } from "react";
import $ from "jquery";
import axios from "axios";
import "./chatbot.css";
import { handleTags, handleDefaultResponse, site, department } from "./ChatbotResponse";

// 변수 (Variables)
let userName = null; // 사용자 이름을 저장하는 변수

// 챗봇 메시지를 만드는 함수
function Message(arg) {
  this.text = arg.text;
  this.message_side = arg.message_side;
  this.link = arg.link;
  this.linkText = arg.linkText;

  this.draw = (function (_this) {
    return function () {
      let $message = $($(".chatbot_message_template").clone().html());

  
      $message.addClass(_this.message_side);
      $message.find(".chatbot_text").html(_this.text);

      if (_this.link) {
        const $link = $('<a>').attr('href', _this.link).attr('target', '_blank').text(_this.linkText);
        $message.find(".chatbot_text").append($link);
      }

      $(".chatbot_messages").append($message);
      setTimeout(function () {
        $message.addClass("appeared");
      }, 0);
    };
  })(this);

  return this;
}

// 입력된 메시지를 가져오는 함수
function getMessageText() {
  let $message_input;
  $message_input = $(".chatbot_message_input"); // 입력창 선택
  return $message_input.val(); // 입력된 텍스트 반환
}

// Modify the sendMessage function to include linkText conditionally
function sendMessage(text, message_side, link, linkText, state) {
  let $messages, message;
  $(".chatbot_message_input").val(""); // Clear the input field

  $messages = $(".chatbot_messages"); // Select the chat messages container
  message = new Message({
    text: text+": ", // Include linkText conditionally
    message_side: message_side,
    link: link,
    linkText: linkText,
  });

  if (link && state) {
    link += `?state=${state}`;
  }

  message.draw(); // Display the message in the chat window
  $messages.animate({ scrollTop: $messages.prop("scrollHeight") }, 300); // Scroll to the bottom

  // Check if a link is provided
  if (link) {
    // Modify the anchor tag to open in the current tab
    $messages.find(".chatbot_text a").attr("target", "_self");
  }
}


// Enter 키를 눌렀을 때 처리하는 함수
function onClickAsEnter(e) {
  if (e && e.keyCode === 13) {
    onSendButtonClicked(); // 메시지 보내기 버튼 클릭과 동일한 동작
  }
}

// 사용자 이름을 설정하는 함수
function setUserName(username) {
  if (username != null && username.replace(" ", "") !== "") {
    // 유효한 사용자 이름인지 확인
    sendMessage(
      "반갑습니다, " + username + "님. 저는 Dr.Pick챗봇입니다.",
      "left",
      null,
      null,
      null
    ); // 사용자에게 환영 메시지 전송
    setTimeout(function () {
      sendMessage("무었을 도와드릴까요", "left", null, null, null);
    }, 2000); // 조금 후에 추가 메시지 전송
    return username;
  } else {
    sendMessage("올바른 닉네임을 이용해주세요.", "left", null, null, null);
    return null;
  }
}

// 사용자를 환영하는 함수
function greet() {
  userName = localStorage.getItem("userName"); // 로컬 스토리지에서 사용자 이름 가져오기
  if (userName === null) {
    // 사용자 이름이 없는 경우
    setTimeout(function () {
      return sendMessage(
        "로그인을 하지 않으셨습니다. 사용할 닉네임을 알려주세요.",
        "left",
        null,
        null,
        null
      );
    }, 2000); // 일정 시간 후에 닉네임 요청 메시지 전송
  } else {
    // 사용자 이름이 이미 저장되어 있는 경우
    setTimeout(function () {
      sendMessage("반갑습니다, " + userName + "님.", "left", null, null, null); // 사용자에게 환영 메시지 전송
      setTimeout(function () {
        sendMessage(
          "안녕하세요,저는 Dr.Pick챗봇입니다.",
          "left",
          null,
          null,
          null
        );
      }, 1000); // 조금 후에 추가 메시지 전송
      setTimeout(function () {
        sendMessage("무었을 도와드릴까요", "left", null, null, null);
      }, 2000); // 조금 후에 추가 메시지 전송
    }, 1000);
  }
}

// 채팅 요청을 보내는 함수
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

      console.log("input:",input,"entity:",entity)

      // Check if the entity ends with "-SITE"
      if (entity.includes("-SITE")) {
        const { text: siteText, site: siteSite, linkText: siteLinkText } = handleTags(input, "site");
        console.log("text: ",siteText,"Site:", siteSite, "linkText:", siteLinkText)
        sendMessage(siteText, "left", siteSite, siteLinkText, state);
        foundEntity = true;
      }
      // Check if the entity ends with "-DEPARTMENT"
      else if (entity.includes("-DEPARTMENT")) {
        const { text: deptText, site: deptSite, linkText: deptLinkText } = handleTags(input, "department");
        sendMessage(deptText, "left", deptSite, deptLinkText, state);
        foundEntity = true;
      }
      // Check if the entity ends with "-SYMPTOM"
      else if (entity.includes("-SYMPTOM")) {
        const { text: symText, site: symSite, linkText: symLinkText } = handleTags(input, "symptoms");
        sendMessage(symText, "left", symSite, symLinkText, state);
        foundEntity = true;
      }

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
      ); // 오류 발생 시 메시지 전송
    });
}

// 메시지 보내기 버튼을 클릭할 때 처리하는 함수
function onSendButtonClicked() {
  let messageText = getMessageText(); // 입력된 메시지 텍스트 가져오기
  sendMessage(messageText, "right", null, null, null); // 입력된 메시지를 화면에 표시 (사용자가 보낸 메시지)

  if (userName == null) {
    userName = setUserName(messageText); // 사용자 이름이 없으면 설정
  } else {
    if (messageText.includes("안녕")) {
      setTimeout(function () {
        return sendMessage(
          "안녕하세요. 저는 Dr.Pick챗봇입니다.",
          "left",
          null,
          null,
          null
        );
      }, 1000); // '안녕' 포함된 경우 환영 메시지 전송
    } else if (messageText.includes("고마워")) {
      setTimeout(function () {
        return sendMessage(
          "천만에요. 더 물어보실 건 없나요?",
          "left",
          null,
          null,
          null
        );
      }, 1000); // '고마워' 포함된 경우 감사 메시지 전송
    } else if (messageText.includes("없어")) {
      setTimeout(function () {
        return sendMessage("그렇군요. 알겠습니다!", "left", null, null, null);
      }, 1000); // '없어' 포함된 경우 확인 메시지 전송
    } else {
      return requestChat(messageText, "request_chat", null); // 일반 대화 요청
    }
  }
}

// ChatbotPage 컴포넌트 정의
function ChatbotPage() {
  useEffect(() => {
    greet(); // 페이지가 로드될 때 사용자 환영 함수 실행
    onClickAsEnter(); // Enter 키 입력 처리 함수 실행
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
