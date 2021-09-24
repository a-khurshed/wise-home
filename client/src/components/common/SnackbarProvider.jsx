import React, { createRef } from 'react';
import { SnackbarProvider as NotistackSnackbarProvider } from 'notistack';
import { IconButton, makeStyles } from '@material-ui/core';
import {
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Warning as WarningIcon,
  Info as InfoIcon,
  Close as CloseIcon,
} from '@material-ui/icons';

const SnackbarProvider = (props) => {
  const { children, ...rest } = props;
  const classes = useStyles();
  const ref = createRef();

  return (
    <NotistackSnackbarProvider
      iconVariant={{
        success: <CheckCircleIcon className={classes.icon} />,
        error: <ErrorIcon className={classes.icon} />,
        warning: <WarningIcon className={classes.icon} />,
        info: <InfoIcon className={classes.icon} />,
      }}
      action={(key) => (
        <IconButton
          onClick={() => ref.current.closeSnackbar(key)}
          className={classes.iconButton}
        >
          <CloseIcon className={classes.closeIcon} />
        </IconButton>
      )}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      classes={{
        contentRoot: classes.contentRoot,
        variantSuccess: classes.success,
        variantError: classes.error,
        variantWarning: classes.warning,
        variantInfo: classes.info,
      }}
      {...rest}
      ref={ref}
    >
      {children}
    </NotistackSnackbarProvider>
  );
};

const useStyles = makeStyles((theme) => ({
  icon: {
    fontSize: theme.typography.pxToRem(22),
    marginRight: theme.spacing(1),
  },
  closeIcon: {
    fontSize: theme.typography.pxToRem(18),
  },
  iconButton: {
    color: theme.palette.common.white,
  },
  contentRoot: {
    flexWrap: 'nowrap',
  },
  success: {
    backgroundColor: `${theme.palette.success.main} !important`,
  },
  error: {
    backgroundColor: `${theme.palette.error.main} !important`,
  },
  warning: {
    backgroundColor: `${theme.palette.warning.main} !important`,
  },
  info: {
    backgroundColor: `${theme.palette.info.main} !important`,
  },
}));

export default SnackbarProvider;
