import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import FacultyLayout from '../../components/layout/FacultyLayout';
import ClassesTab from '../../components/faculty/ClassesTab';
import SubjectsTab from '../../components/faculty/SubjectsTab';
import FeedbacksTab from '../../components/faculty/FeedbacksTab';

const Dashboard: React.FC = () => {
  return (
    <FacultyLayout>
      <Routes>
        <Route path="classes" element={<ClassesTab />} />
        <Route path="subjects" element={<SubjectsTab />} />
        <Route path="feedbacks" element={<FeedbacksTab />} />
        <Route path="/" element={<Navigate to="classes" replace />} />
      </Routes>
    </FacultyLayout>
  );
};

export default Dashboard;