import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Container, MenuItem, FormControl, InputLabel, Select, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { motion } from 'framer-motion';
import Balloons from './Balloons';
import './UserForm.css';

const formVariant = {
  hidden: { opacity: 0, y: -50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const UserForm = ({ onSubmit, initialData }) => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: initialData,
  });
  const [buttonColor, setButtonColor] = useState('secondary');
  const [submittedData, setSubmittedData] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [showBalloons, setShowBalloons] = useState(false);

  React.useEffect(() => {
    reset(initialData);
  }, [initialData, reset]);

  const handleFormSubmit = (data) => {
    setSubmittedData(data);
    setButtonColor('success');
    setOpenDialog(true);
    setShowBalloons(true);
    onSubmit(data);
    setTimeout(() => {
      setButtonColor('secondary');
      setShowBalloons(false);
    }, 2000); // Reset color and hide balloons after 2 seconds
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <motion.div
      variants={formVariant}
      initial="hidden"
      animate="visible"
    >
      <Container maxWidth="sm" className="form-container">
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="mb-3">
            <TextField
              label="Name"
              fullWidth
              variant="outlined"
              color="primary"
              {...register('name', { required: true })}
            />
          </div>
          <div className="mb-3">
            <TextField
              label="Email"
              fullWidth
              variant="outlined"
              color="primary"
              {...register('email', { required: true })}
            />
          </div>
          <div className="mb-3">
            <TextField
              label="City"
              fullWidth
              variant="outlined"
              color="primary"
              {...register('city', { required: true })}
            />
          </div>
          <div className="mb-3">
            <TextField
              label="Pincode"
              fullWidth
              variant="outlined"
              color="primary"
              {...register('pincode', { required: true })}
            />
          </div>
          <div className="mb-3">
            <TextField
              label="Country"
              fullWidth
              variant="outlined"
              color="primary"
              {...register('country', { required: true })}
            />
          </div>
          <div className="mb-3">
            <FormControl fullWidth variant="outlined">
              <InputLabel>Gender</InputLabel>
              <Select
                label="Gender"
                {...register('gender', { required: true })}
                defaultValue=""
                color="primary"
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
            </FormControl>
          </div>
          <Button type="submit" variant="contained" color={buttonColor} fullWidth>
            Submit
          </Button>
        </form>

        {showBalloons && <Balloons />}

        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Submitted Data</DialogTitle>
          <DialogContent>
            <div className="data-display">
              <ul>
                {submittedData && Object.entries(submittedData).map(([key, value]) => (
                  <li key={key}>
                    <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}
                  </li>
                ))}
              </ul>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </motion.div>
  );
};

export default UserForm;
