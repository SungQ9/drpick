import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const useAlert = () => {
  const Alert = (title, text, icon) => {
    return MySwal.fire({
      title: title,
      text: text,
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

  return Alert;
};

export default useAlert;
