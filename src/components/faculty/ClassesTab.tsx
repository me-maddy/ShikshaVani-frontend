import React, { useState, useEffect } from "react";
import Button from "../common/Button";
import Modal, { ConfirmModal } from "../common/Modal";
import Card from "../common/Card";
import Input from "../common/Input";
import { api } from "../../utils/api";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../common/Toast";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { validateRequired } from "../../utils/validation";

interface Class {
  id: string;
  name: string;
  faculty_id: string;
}

const ClassesTab: React.FC = () => {
  const { faculty } = useAuth();
  const { showToast } = useToast();

  const [classes, setClasses] = useState<Class[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingClass, setEditingClass] = useState<Class | null>(null);
  const [classToDelete, setClassToDelete] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
  });

  const [errors, setErrors] = useState({
    name: "",
  });

  useEffect(() => {
    if (faculty) {
      fetchClasses();
    }
  }, [faculty]);

  const fetchClasses = async () => {
    if (!faculty) return;

    setIsLoading(true);
    try {
      const response = await api.getFacultyClasses();
      if (response.success && response.data) {
        setClasses(response.data);
      }
    } catch (error) {
      console.error("Error fetching classes:", error);
      showToast("Failed to load classes", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenModal = (cls?: Class) => {
    if (cls) {
      setEditingClass(cls);
      setFormData({ name: cls.name });
    } else {
      setEditingClass(null);
      setFormData({ name: "" });
    }
    setErrors({ name: "" });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingClass(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      newErrors.name = "Class name is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    if (!validateForm() || !faculty) return;

    setIsSubmitting(true);

    try {
      let response;
      if (editingClass) {
        response = await api.updateClass(editingClass.id, formData.name);
      } else {
        response = await api.addClass(formData.name);
      }

      if (response.success) {
        showToast(
          `Class ${editingClass ? "updated" : "added"} successfully!`,
          "success"
        );
        fetchClasses();
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

  const handleConfirmDelete = (classId: string) => {
    setClassToDelete(classId);
    setIsConfirmModalOpen(true);
  };

  const handleDelete = async () => {
    if (!classToDelete) return;

    setIsSubmitting(true);

    try {
      const response = await api.deleteClass(classToDelete);

      if (response.success) {
        showToast("Class deleted successfully!", "success");
        setClasses((prev) => prev.filter((cls) => cls.id !== classToDelete));
      } else {
        showToast(response.error || "Deletion failed", "error");
      }
    } catch (error) {
      showToast("Something went wrong", "error");
      console.error(error);
    } finally {
      setIsSubmitting(false);
      setIsConfirmModalOpen(false);
      setClassToDelete(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Classes</h2>
        <Button
          variant="secondary"
          onClick={() => handleOpenModal()}
          className="flex items-center gap-1"
        >
          <Plus size={16} />
          Add Class
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-10">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900"></div>
        </div>
      ) : classes.length === 0 ? (
        <div className="py-10 text-center">
          <p className="text-gray-500">
            No classes found. Add your first class!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {classes.map((cls) => (
            <Card key={cls.id} className="hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-center">
                <h3 className="font-medium text-lg">{cls.name}</h3>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleOpenModal(cls)}
                    className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => handleConfirmDelete(cls.id)}
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
        title={editingClass ? "Edit Class" : "Add New Class"}
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
              {editingClass ? "Update" : "Create"}
            </Button>
          </div>
        }
      >
        <Input
          id="class-name"
          name="name"
          label="Class Name"
          placeholder="Enter class name"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          required
        />
      </Modal>

      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={handleDelete}
        title="Delete Class"
        message="Are you sure you want to delete this class? This action cannot be undone."
        confirmText="Delete"
        isLoading={isSubmitting}
      />
    </div>
  );
};

export default ClassesTab;
