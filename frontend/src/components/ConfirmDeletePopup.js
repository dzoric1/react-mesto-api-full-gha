import PopupWithForm from './PopupWithForm';

const ConfirmDeletePopup = ({ isOpen, onClose, onConfirm, isLoading, deletedCard }) => {

  const handleConfirm = (e) => {
    e.preventDefault();
    onConfirm(deletedCard);
  };

  return (
    <PopupWithForm
      name={'confirm'}
      title={'Вы уверены?'}
      isOpen={isOpen}
      onClose={onClose}
      buttonTitle={isLoading ? 'Удаление...' : 'Да'}
      onSubmit={handleConfirm}
      isValid={true}
    />
  );
};

export default ConfirmDeletePopup;