import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import $ from 'jquery';
import axios from 'axios';
import './chatbot.css';
import { handleTags, handleDefaultResponse } from './ChatbotResponse';

// 변수 (Variables)
let userName = null; // 사용자 이름을 저장하는 변수

// 챗봇 메시지를 만드는 함수
function Message(arg, navigate) {
  this.text = arg.text; // 메시지 텍스트
  this.message_side = arg.message_side; // 메시지가 나타날 측면 (왼쪽 또는 오른쪽)
  this.link = arg.link; // 링크 URL
  this.linkText = arg.linkText; // 링크 텍스트
  this.state = arg.state; // 상태 객체 (쿼리 파라미터로 전달될 수 있음)

  // 메시지를 화면에 그리는 함수
  this.draw = function () {
    let $message = $($('.chatbot_message_template').clone().html());

    $message.addClass(this.message_side);
    $message.find('.chatbot_text').html(this.text);

    // 링크가 있으면 링크 추가
    if (this.link) {
      let href = this.link;
      const $link = $('<a>')
        .attr('href', href)
        .attr('target', '_self')
        .text(this.linkText);

      // Add an onClick event to handle navigation with state
      $link.on('click', (e) => {
        e.preventDefault();
        navigate(href, {
          state: { subject: this.state, selectedType: this.state },
        });
      });

      $message.find('.chatbot_text').append($link);
    }

    $('.chatbot_messages').append($message);
    setTimeout(function () {
      $message.addClass('appeared');
    }, 0);
  };

  return this;
}

// 입력된 메시지를 가져오는 함수
function getMessageText() {
  let $message_input = $('.chatbot_message_input'); // 입력창 선택
  return $message_input.val(); // 입력된 텍스트 반환
}

// 메시지 전송 함수 (링크 텍스트 조건부 포함)
function sendMessage(text, message_side, link, linkText, state, navigate) {
  $('.chatbot_message_input').val(''); // 입력 필드 초기화

  let message = new Message(
    {
      text: text,
      message_side: message_side,
      link: link,
      linkText: linkText,
      state: state,
    },
    navigate,
  );

  message.draw(); // 메시지 창에 표시
  $('.chatbot_messages').animate(
    { scrollTop: $('.chatbot_messages').prop('scrollHeight') },
    300,
  ); // 스크롤 아래로 이동
}

// 사용자 이름 설정 함수
function setUserName(username, navigate) {
  if (username != null && username.replace(' ', '') !== '') {
    sendMessage(
      '반갑습니다, ' + username + '님. 저는 Dr.Pick챗봇입니다.',
      'left',
      null,
      null,
      null,
      navigate,
    ); // 사용자에게 환영 메시지 전송
    setTimeout(function () {
      sendMessage('무엇을 도와드릴까요', 'left', null, null, null, navigate);
    }, 2000); // 추가 메시지 전송
    return username;
  } else {
    sendMessage(
      '올바른 닉네임을 이용해주세요.',
      'left',
      null,
      null,
      null,
      navigate,
    );
    return null;
  }
}

// 사용자 환영 함수
function greet(navigate) {
  userName = localStorage.getItem('userName'); // 로컬 스토리지에서 사용자 이름 가져오기
  if (userName === null) {
    // 사용자 이름이 없는 경우
    setTimeout(function () {
      return sendMessage(
        '로그인을 하지 않으셨습니다. 사용할 닉네임을 알려주세요.',
        'left',
        null,
        null,
        null,
        navigate,
      );
    }, 2000); // 일정 시간 후에 닉네임 요청 메시지 전송
  } else {
    // 사용자 이름이 이미 저장되어 있는 경우
    setTimeout(function () {
      sendMessage(
        '반갑습니다, ' + userName + '님.',
        'left',
        null,
        null,
        null,
        navigate,
      ); // 사용자에게 환영 메시지 전송
      setTimeout(function () {
        sendMessage(
          '안녕하세요,저는 Dr.Pick챗봇입니다.',
          'left',
          null,
          null,
          null,
          navigate,
        );
      }, 1000); // 조금 후에 추가 메시지 전송
      setTimeout(function () {
        sendMessage('무었을 도와드릴까요', 'left', null, null, null, navigate);
      }, 2000); // 조금 후에 추가 메시지 전송
    }, 1000);
  }
}

// 채팅 요청을 보내는 함수
function requestChat(messageText, url_pattern, navigate) {
  axios
    .get(
      // chatbot 실행하는 IP 입력
      `http://118.217.203.47:5000/${url_pattern}/${userName}/${messageText}`,
    )
    .then((response) => {
      const input = response.data.input.join(' ');
      const entity = response.data.entity.join(' ');

      // Entity에 따라 적절한 처리
      let tagResponse;
      if (entity.includes('-SITE')) {
        tagResponse = handleTags(input, 'site');
      } else if (entity.includes('-DEPARTMENT')) {
        tagResponse = handleTags(input, 'department');
      } else if (entity.includes('-SYMPTOM')) {
        tagResponse = handleTags(input, 'symptoms');
      }

      console.log(tagResponse);
      if (tagResponse) {
        // tagResponse에서 text, site, linkText, state 추출
        const { text, site, linkText, state } = tagResponse;
        sendMessage(text, 'left', site, linkText, state, navigate);
      } else {
        sendMessage(
          handleDefaultResponse(),
          'left',
          null,
          null,
          null,
          navigate,
        );
      }
    })
    .catch((error) => {
      console.log(error);
      sendMessage(
        '서버 연결에 실패했습니다.',
        'left',
        null,
        null,
        null,
        navigate,
      );
    });
}

// ChatbotPage 컴포넌트 정의
function ChatbotPage() {
  const navigate = useNavigate();

  useEffect(() => {
    greet(navigate); // 페이지가 로드될 때 사용자 환영 함수 실행
    onClickAsEnter(); // Enter 키 입력 처리 함수 실행
  }, []);

  // 메시지 보내기 버튼을 클릭할 때 처리하는 함수
  function onSendButtonClicked() {
    let messageText = getMessageText(); // 입력된 메시지 텍스트 가져오기
    sendMessage(messageText, 'right', null, null, null, navigate); // 입력된 메시지를 화면에 표시 (사용자가 보낸 메시지)

    if (userName == null) {
      userName = setUserName(messageText, navigate); // 사용자 이름이 없으면 설정
    } else {
      if (messageText.includes('안녕')) {
        setTimeout(function () {
          return sendMessage(
            '안녕하세요. 저는 Dr.Pick챗봇입니다.',
            'left',
            null,
            null,
            null,
            navigate,
          );
        }, 1000); // '안녕' 포함된 경우 환영 메시지 전송
      } else if (messageText.includes('고마워')) {
        setTimeout(function () {
          return sendMessage(
            '천만에요. 더 물어보실 건 없나요?',
            'left',
            null,
            null,
            null,
            navigate,
          );
        }, 1000); // '고마워' 포함된 경우 감사 메시지 전송
      } else if (messageText.includes('없어')) {
        setTimeout(function () {
          return sendMessage(
            '그렇군요. 알겠습니다!',
            'left',
            null,
            null,
            null,
            navigate,
          );
        }, 1000); // '없어' 포함된 경우 확인 메시지 전송
      } else {
        return requestChat(messageText, 'request_chat', navigate); // 일반 대화 요청
      }
    }
  }

  // Enter 키 입력 처리 함수
  function onClickAsEnter(e) {
    if (e && e.keyCode === 13) {
      onSendButtonClicked(); // 메시지 보내기 버튼 클릭과 동일한 행동
    }
  }

  return (
    <div className='chatbot_container'>
      <div className='chatbot_top_menu'>
        <div className='chatbot_buttons'>
          <div className='chatbot_button chatbot_close_button'></div>
          <div className='chatbot_button chatbot_minimize'></div>
          <div className='chatbot_button chatbot_maximize'></div>
        </div>
        <div className='chatbot_title'>Dr.Pick챗봇</div>
      </div>
      <ul className='chatbot_messages'></ul>
      <div className='chatbot_bottom_wrapper'>
        <div className='chatbot_message_input_wrapper'>
          <input
            className='chatbot_message_input'
            onKeyUp={(event) => onClickAsEnter(event)}
            placeholder='여기에 내용을 입력하세요.'
          />
        </div>
        <div
          className='chatbot_send_message'
          id='send_message'
          onClick={() => onSendButtonClicked()}
        >
          <div className='chatbot_text'>보내기</div>
        </div>
      </div>
      <div className='chatbot_message_template' style={{ display: 'none' }}>
        <li className='chatbot_message'>
          <div className='chatbot_avatar'></div>
          <div className='chatbot_text_wrapper'>
            <div className='chatbot_text'></div>
          </div>
        </li>
      </div>
    </div>
  );
}

export default ChatbotPage;
