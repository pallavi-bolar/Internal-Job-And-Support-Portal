import React, { useState } from 'react';
import './UpdateStatus.css';
import HRService from '../services/HRService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; 

function UpdateJobApplicationStatus() {
  const [employeeId, setEmployeeId] = useState('');
  const [applicationId, setApplicationId] = useState('');
  const [newStatus, setNewStatus] = useState('');
  
  const handleUpdateStatus = async () => {
    confirmAlert({
      title: 'Confirm Update',
      message: 'Are you sure you want to update the job application status?',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            try {
              await HRService.updateJobApplicationStatus(
                employeeId,
                applicationId,
                newStatus
              );
              toast.success('Job application status updated successfully', {
                position: toast.POSITION.TOP_RIGHT,
              });
            } catch (error) {
              toast.error('Error updating job application status', {
                position: toast.POSITION.TOP_RIGHT,
              });
            }
          },
        },
        {
          label: 'No',
          onClick: () => {},
        },
      ],
    });
  };

  const statusOptions = [
    'APPLIED',
    'IN_PROGRESS',
    'SELECTED_FOR_INTERVIEW',
    'ACCEPTED',
    'REJECTED',
    'EXPIRED'
    
  ];

  return (
    <div className='update-container'>
      <h2 className='form-heading'>Update Job Application Status</h2> {/* Heading above form */}
      <div className='update-form'>
        <div className='update-form-label'>
          <label htmlFor='empId'>Employee ID</label>
          <input
            type='number'
            placeholder='Employee ID'
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            required
          />
          <label htmlFor='applicationId'>Application ID</label>
          <input
            type='number'
            placeholder='Application ID'
            value={applicationId}
            onChange={(e) => setApplicationId(e.target.value)}
                  required
          />
          <label htmlFor='status'>Status</label>
          <select
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
          >
            <option value=''>Select Status</option>
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
        <button className='statusbtn' onClick={handleUpdateStatus}>
          Update Status
        </button>
      </div>
    </div>
  );
}

export default UpdateJobApplicationStatus;
