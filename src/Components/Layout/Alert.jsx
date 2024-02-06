import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const useAlert = () => {
  const Alert = (title, text, icon) => {
    return MySwal.fire({
      title: title,
      html: "<div class='alert-text'>" + text + '</div>',
      icon: icon,
      timer: 5000,
      confirmButtonText: '확인',
      cancelButtonText: '취소',
      customClass: {
        confirmButton: 'my-confirm-button',
        cancelButton: 'my-cancel-button',
      },
      buttonsStyling: false,
    });
  };
  const Question = async (title, text, icon) => {
    const result = await MySwal.fire({
      title: title,
      html: "<div class='questionAlert-text'>" + text + '</div>',
      icon: icon,
      showCancelButton: true,
      confirmButtonText: '확인',
      cancelButtonText: '취소',
      customClass: {
        confirmButton: 'my-confirm-button',
        cancelButton: 'my-cancel-button',
      },
      buttonsStyling: false,
    });

    if (result.isConfirmed) {
      return '확인';
    } else if (result.isDismissed) {
      return '취소';
    } else {
      return '아무 버튼도 누르지 않음';
    }
  };

  return { Alert, Question };
};

export default useAlert;
