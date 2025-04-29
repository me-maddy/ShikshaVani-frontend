import React from 'react';
import UserLayout from '../../components/layout/UserLayout';
import FacultyClassSelect from '../../components/user/FacultyClassSelect';

const SelectFacultyClass: React.FC = () => {
  return (
    <UserLayout title="Complete Your Profile">
      <div className="max-w-lg mx-auto">
        <p className="mb-6 text-gray-600">
          Please select your faculty and class to continue.
        </p>
        <FacultyClassSelect />
      </div>
    </UserLayout>
  );
};

export default SelectFacultyClass;