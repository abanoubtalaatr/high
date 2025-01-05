import React, { useState } from 'react';
import { Modal, Button, Form } from 'antd';

const EditModal = ({ isOpen, onClose, onSubmit, branchDetails }) => {
  const [form] = Form.useForm();

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        onSubmit(values);
        form.resetFields();
        onClose();
      })
      .catch((info) => {
        console.error('Validation Failed:', info);
      });
  };

  return (
    <Modal
      title="Edit Branch Details"
      visible={isOpen}
      onOk={handleOk}
      onCancel={onClose}
    >
      <Form form={form} initialValues={branchDetails}>
        <Form.Item
          label="Branch Name"
          name="name"
          rules={[{ required: true, message: 'Please input the branch name!' }]}
        >
          <Form.Input placeholder="Enter branch name" />
        </Form.Item>
        <Form.Item
          label="Branch Address"
          name="address"
          rules={[{ required: true, message: 'Please input the address!' }]}
        >
          <Form.Input placeholder="Enter branch address" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditModal;
