import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { toast } from "sonner";
import api from "../../api/axios";

function JobModal({ job, onClose, onJobUpdated }) {
  const isEdit = !!job;
  const [formData, setFormData] = useState({
    title: "",
    employmentType: "Full-time",
    minSalary: "",
    maxSalary: "",
    location: "",
    workMode: "Hybrid",
    benefits: [],
    description: "",
  });

  const [benefitInput, setBenefitInput] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!job) return;

    setFormData({
      employmentType: job.employmentType || "",
      minSalary: job.minSalary ?? "",
      maxSalary: job.maxSalary ?? "",
      location: job.location || "",
      workMode: job.workMode || "",
      benefits: job.benefits || [],
      description: job.description || "",
    });
  }, [job]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addBenefit = () => {
    const value = benefitInput.trim();

    if (!value) return;

    if (formData.benefits.includes(value)) {
      toast.info("Benefit already added");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      benefits: [...prev.benefits, value],
    }));

    setBenefitInput("");
  };

  const removeBenefit = (index) => {
    setFormData((prev) => ({
      ...prev,
      benefits: prev.benefits.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      formData.minSalary !== "" &&
      formData.maxSalary !== "" &&
      Number(formData.minSalary) >= Number(formData.maxSalary)
    ) {
      return toast.error("Minimum salary must be less than maximum salary.");
    }

    try {
      setLoading(true);

      let res;
      if (isEdit) {
        console.log(formData);
        res = await api.patch(`/job/edit/${job._id}`, formData);
      } else {
        console.log(formData);
        res = await api.post(`/job/register`, formData);
      }

      toast.success(res.data.message);
      onJobUpdated();
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || (isEdit ? "Failed to update job." : "Failed to create job."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}

        <div className="flex justify-between items-center border-b px-6 py-4">
          <h2 className="text-2xl font-semibold">
            {isEdit ? "Edit Job" : "Create Job"}
          </h2>

          <button onClick={onClose}>
            <IoClose size={26} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Title */}
          {!isEdit && (
            <div>
              <label className="block font-medium mb-2">Job Title</label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
                required
              />
            </div>
          )}

          {/* Employment Type */}

          <div>
            <label className="block font-medium mb-2">Employment Type</label>

            <select
              name="employmentType"
              value={formData.employmentType || ""}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            >
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Internship">Internship</option>
              <option value="Contract">Contract</option>
            </select>
          </div>

          {/* Work Mode */}

          <div>
            <label className="block font-medium mb-2">Work Mode</label>

            <select
              name="workMode"
              value={formData.workMode}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            >
              <option value="Remote">Remote</option>
              <option value="On-site">On-site</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>

          {/* Salary */}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-2">Min Salary (LPA)</label>

              <input
                type="number"
                name="minSalary"
                value={formData.minSalary}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
              />
            </div>

            <div>
              <label className="block font-medium mb-2">Max Salary (LPA)</label>

              <input
                type="number"
                name="maxSalary"
                value={formData.maxSalary}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
              />
            </div>
          </div>

          {/* Location */}

          <div>
            <label className="block font-medium mb-2">Location</label>

            <input
              type="text"
              name="location"
              value={formData.location}
              required={!isEdit}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />
          </div>

          {/* Benefits */}

          <div>
            <label className="block font-medium mb-2">Benefits</label>

            <div className="flex gap-2">
              <input
                value={benefitInput}
                onChange={(e) => setBenefitInput(e.target.value)}
                placeholder="Add benefit..."
                className="flex-1 border rounded-lg p-3"
              />

              <button
                type="button"
                onClick={addBenefit}
                className="bg-blue-600 text-white px-5 rounded-lg"
              >
                Add
              </button>
            </div>

            <div className="flex flex-wrap gap-2 mt-3">
              {formData.benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full flex items-center gap-2"
                >
                  {benefit}

                  <button type="button" onClick={() => removeBenefit(index)}>
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Description */}

          <div>
            <label className="block font-medium mb-2">Description</label>

            <textarea
              rows={5}
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 resize-none"
            />
          </div>

          {/* Footer */}

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="border px-5 py-2 rounded-lg hover:bg-gray-100"
            >
              Cancel
            </button>

            <button type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg disabled:opacity-50"
            >
              {loading
                ? isEdit
                  ? "Updating..."
                  : "Creating..."
                : isEdit
                  ? "Update Job"
                  : "Create Job"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default JobModal;
