import React, { useState, useEffect } from "react";
import Button from "../common/Button";
import Modal, { ConfirmModal } from "../common/Modal";
import Card from "../common/Card";
import Input from "../common/Input";
import Select from "../common/Select";
import { api } from "../../utils/api";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../common/Toast";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { validateRequired } from "../../utils/validation";

interface Class {
  id: string;
  name: string;
  facultyId: string;
}

interface Subject {
  id: number;
  name: string;
  classId: number;
}

const SubjectsTab: React.FC = () => {
  const { faculty } = useAuth();
  const { showToast } = useToast();

  const [classes, setClasses] = useState<Class[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [selectedClass, setSelectedClass] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingSubject, setEditingSubject] = useState<Subject | null>(null);
  const [subjectToDelete, setSubjectToDelete] = useState<number | null>(null);

  const [formData, setFormData] = useState<{
    name: string;
    classId: null | number;
  }>({
    name: "",
    classId: null,
  });

  const [errors, setErrors] = useState({
    name: "",
    classId: "",
  });

  useEffect(() => {
    if (faculty) {
      fetchClasses();
    }
  }, [faculty]);

  useEffect(() => {
    if (selectedClass) {
      fetchSubjects(selectedClass);
    } else {
      setSubjects([]);
    }
  }, [selectedClass]);

  const fetchClasses = async () => {
    if (!faculty) return;

    setIsLoading(true);
    try {
      const response = await api.getFacultyClasses();
      if (response.success && response.data) {
        setClasses(response.data);
        if (response.data.length > 0 && !selectedClass) {
          setSelectedClass(response.data[0].id);
        }
      }
    } catch (error) {
      console.error("Error fetching classes:", error);
      showToast("Failed to load classes", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSubjects = async (classId: number) => {
    setIsLoading(true);
    try {
      const response = await api.getSubjects(classId);
      if (response.success && response.data) {
        setSubjects(response.data);
      }
    } catch (error) {
      console.error("Error fetching subjects:", error);
      showToast("Failed to load subjects", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClassChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedClass(Number(e.target.value));
  };

  const handleOpenModal = (subject?: Subject) => {
    if (subject) {
      setEditingSubject(subject);
      setFormData({
        name: subject.name,
        classId: subject.classId,
      });
    } else {
      setEditingSubject(null);
      setFormData({
        name: "",
        classId: selectedClass,
      });
    }
    setErrors({ name: "", classId: "" });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingSubject(null);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error for field
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    if (!validateRequired(formData.name)) {
      newErrors.name = "Subject name is required";
      isValid = false;
    }

    if (!formData.classId) {
      newErrors.classId = "Please select a class";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    console.log("Hey there");
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      let response;
      if (editingSubject) {
        response = await api.updateSubject(editingSubject.id, formData.name);
      } else {
        response = await api.addSubject(formData.name, formData.classId!);
      }

      if (response.success) {
        showToast(
          `Subject ${editingSubject ? "updated" : "added"} successfully!`,
          "success"
        );
        if (formData.classId === selectedClass || editingSubject) {
          fetchSubjects(selectedClass!);
        }
        handleCloseModal();
      } else {
        showToast(response.error || "Operation failed", "error");
      }
    } catch (error) {
      showToast("Something went wrong", "error");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConfirmDelete = (subjectId: number) => {
    setSubjectToDelete(subjectId);
    setIsConfirmModalOpen(true);
  };

  const handleDelete = async () => {
    if (!subjectToDelete) return;

    setIsSubmitting(true);

    try {
      const response = await api.deleteSubject(subjectToDelete);

      if (response.success) {
        showToast("Subject deleted successfully!", "success");
        setSubjects((prev) =>
          prev.filter((subject) => subject.id !== subjectToDelete)
        );
      } else {
        showToast(response.error || "Deletion failed", "error");
      }
    } catch (error) {
      showToast("Something went wrong", "error");
      console.error(error);
    } finally {
      setIsSubmitting(false);
      setIsConfirmModalOpen(false);
      setSubjectToDelete(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3">
        <h2 className="text-xl font-semibold">Subjects</h2>
        <div className="flex flex-col md:flex-row gap-3 items-center">
          <Select
            id="class-select"
            value={selectedClass ?? ""}
            onChange={handleClassChange}
            options={classes.map((cls) => ({
              value: cls.id,
              label: cls.name,
            }))}
            disabled={isLoading || classes.length === 0}
            fullWidth={false}
            className="min-w-[200px]"
            label="Select Class"
          />
          <Button
            variant="secondary"
            onClick={() => handleOpenModal()}
            disabled={!selectedClass}
            className="flex items-center gap-1 h-fit"
          >
            <Plus size={16} />
            Add Subject
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-10">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900"></div>
        </div>
      ) : !selectedClass ? (
        <div className="py-10 text-center">
          <p className="text-gray-500">
            Please select a class to view subjects.
          </p>
        </div>
      ) : subjects.length === 0 ? (
        <div className="py-10 text-center">
          <p className="text-gray-500">
            No subjects found for this class. Add your first subject!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {subjects.map((subject) => (
            <Card
              key={subject.id}
              className="hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-center">
                <h3 className="font-medium text-lg">{subject.name}</h3>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleOpenModal(subject)}
                    className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => handleConfirmDelete(subject.id)}
                    className="p-1.5 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingSubject ? "Edit Subject" : "Add New Subject"}
        footer={
          <div className="flex space-x-2">
            <Button
              variant="outline"
              onClick={handleCloseModal}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              variant="secondary"
              onClick={handleSubmit}
              isLoading={isSubmitting}
            >
              {editingSubject ? "Update" : "Create"}
            </Button>
          </div>
        }
      >
        <Input
          id="subject-name"
          name="name"
          label="Subject Name"
          placeholder="Enter subject name"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          required
        />

        {!editingSubject && (
          <Select
            id="subject-class"
            name="classId"
            label="Class"
            options={classes.map((cls) => ({
              value: cls.id,
              label: cls.name,
            }))}
            value={formData.classId!}
            onChange={handleChange}
            error={errors.classId}
            required
          />
        )}
      </Modal>

      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={handleDelete}
        title="Delete Subject"
        message="Are you sure you want to delete this subject? This action cannot be undone."
        confirmText="Delete"
        isLoading={isSubmitting}
      />
    </div>
  );
};

export default SubjectsTab;
