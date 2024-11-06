import { Modal, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import './ModalTaskForbidden.css'

const ModalTaskForbidden = ({ showF, handleCloseF, messageF }) => {
    const { t } = useTranslation();
  return (
    <Modal show={showF} onHide={handleCloseF} centered>
      <Modal.Header closeButton>
        <Modal.Title> {messageF}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* <p>{messageF}</p> */}
      </Modal.Body>
      <Modal.Footer>
      <Button className='alart-btn border-0' onClick={handleCloseF}>
       OK
        {/* {t('ok')} */}
      </Button>
      </Modal.Footer>
    </Modal>
  );
};

// PropTypes validation
ModalTaskForbidden.propTypes = {
  showF: PropTypes.bool.isRequired,
  handleCloseF: PropTypes.func.isRequired,
};

export default ModalTaskForbidden;