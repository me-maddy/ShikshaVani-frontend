import React from 'react';
import UserLayout from '../../components/layout/UserLayout';
import FeedbackForm from '../../components/user/FeedbackForm';

const Main: React.FC = () => {
  return (
    <UserLayout title="Submit Feedback">
      <div className="max-w-lg mx-auto">
        <p className="mb-6 text-gray-600">
          Please select a subject and provide your valuable feedback.
        </p>
        <FeedbackForm />
      </div>
    </UserLayout>
  );
};

export default Main;