import { Modal, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';


const ModalTaskCompleted = ({ show, handleClose }) => {
  const { t } = useTranslation();


  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Task Completed</Modal.Title>
        {/* <Modal.Title>{t('task_completed_2')}</Modal.Title> */}
      </Modal.Header>
      <Modal.Body>
        <p>Task Completed Withdraw.</p>
        {/* <p>{t('task_completed')}.</p> */}
      </Modal.Body>
      <Modal.Footer>
        <Button className='alart-btn border-0' onClick={handleClose}>
      OK
      {/* {t('ok')} */}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

// PropTypes validation
ModalTaskCompleted.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default ModalTaskCompleted;