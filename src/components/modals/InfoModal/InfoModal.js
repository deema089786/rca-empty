import React, {PureComponent} from 'react';
import PropTypes              from 'prop-types';
import Button                 from '@material-ui/core/Button';
import Dialog                 from '@material-ui/core/Dialog';
import DialogActions          from '@material-ui/core/DialogActions';
import DialogContent          from '@material-ui/core/DialogContent';
import DialogContentText      from '@material-ui/core/DialogContentText';
import DialogTitle            from '@material-ui/core/DialogTitle';
import SuccessIcon            from '@material-ui/icons/CheckCircleOutline';
import FailIcon               from '@material-ui/icons/ErrorOutline';
import Modals                 from 'lib/modals';

export default class InfoModal extends PureComponent {
  render() {
    const {onClose, title, message, type} = this.props;
    return (
      <Dialog
        open={true}
        onClose={onClose || Modals.closeModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">
          {title}
        </DialogTitle>
        <DialogContent className="modal-content">
          <DialogContentText>
            {message}
          </DialogContentText>
        </DialogContent>
        <div className="info-modal-icon-container">
          {type ? (type === InfoModal.types.SUCCESS ?
            <SuccessIcon fontSize={'inherit'}/> :
            <FailIcon fontSize={'inherit'}/>) : null}
        </div>
        <DialogActions>
          <Button onClick={onClose || Modals.closeModal} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

InfoModal.propTypes = {
  onClose: PropTypes.func,
  title: PropTypes.string,
  message: PropTypes.string,
  type: PropTypes.string,
};

InfoModal.types = {SUCCESS: 'SUCCESS', FAIL: 'FAIL'};
