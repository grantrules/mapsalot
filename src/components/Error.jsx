import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

export default function Error() {
  return (
    <>
      <Typography>Something went wrong</Typography>
      <Button
        variant="contained"
        color="primary"
      >
  Retry
      </Button>
    </>
  );
}
