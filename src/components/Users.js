// src/components/Users.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserForm from './UserForm';
import { Container, List, ListItem, ListItemText, IconButton, Typography, Paper } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import './Users.css';

const listItemVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, y: 20, transition: { duration: 0.5 } }
};

const Users = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await axios.get('http://localhost:3001/users');
    setUsers(response.data);
  };

  const addUser = async (data) => {
    const response = await axios.post('http://localhost:3001/users', data);
    setUsers([...users, response.data]);
  };

  const updateUser = async (data) => {
    const response = await axios.put(`http://localhost:3001/users/${editingUser.id}`, data);
    setUsers(users.map((user) => (user.id === editingUser.id ? response.data : user)));
    setEditingUser(null);
  };

  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:3001/users/${id}`);
    setUsers(users.filter((user) => user.id !== id));
  };

  const handleEdit = (user) => {
    setEditingUser(user);
  };

  const handleSubmit = (data) => {
    editingUser ? updateUser(data) : addUser(data);
  };

  return (
    <Container>
      <Typography variant="h1" color="primary">CRUD Form</Typography>
      <UserForm onSubmit={handleSubmit} initialData={editingUser || { name: '', email: '', city: '', pincode: '', country: '', gender: '' }} />
      <Paper elevation={3} className="user-list">
        <List>
          <AnimatePresence>
            {users.map((user) => (
              <motion.div
                key={user.id}
                variants={listItemVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <ListItem secondaryAction={
                  <>
                    <IconButton edge="end" color="primary" onClick={() => handleEdit(user)}>
                      <Edit />
                    </IconButton>
                    <IconButton edge="end" color="secondary" onClick={() => deleteUser(user.id)}>
                      <Delete />
                    </IconButton>
                  </>
                }>
                  <ListItemText primary={`${user.name} - ${user.email} - ${user.city} - ${user.pincode} - ${user.country} - ${user.gender}`} />
                </ListItem>
              </motion.div>
            ))}
          </AnimatePresence>
        </List>
      </Paper>
    </Container>
  );
};

export default Users;
