// src/components/ApplicationDisplay.jsx
import React from 'react';

const ApplicationDisplay = ({ application, handleApprove, handleReject }) => {
  return (
    <div className="application-card">
      <h5>{application.title}</h5>
      <p>{application.description}</p>
      <button onClick={() => handleApprove(application._id)}>Approve</button>
      <button onClick={() => handleReject(application._id)}>Reject</button>
    </div>
  );
};

export default ApplicationDisplay;
