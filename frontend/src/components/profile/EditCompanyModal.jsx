import { useState, useEffect } from "react";
import { X, Camera, Building2 } from "lucide-react";
import api from "../../api/axios";
import { toast } from "sonner";

function EditCompanyModal({ close, refreshDashboard, company }) {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    industry: "",
    location: "",
    description: "",
    employees: "",
    founded: "",
    logo: null,
    jobTypes: [],
    workModes: [],
  });

  useEffect(() => {
    setFormData({
      industry: company.industry || "",
      location: company.location || "",
      description: company.description || "",
      employees: company.employees || "",
      founded: company.founded || "",
      logo: null,
      jobTypes: company.jobTypes || [],
      workModes: company.workModes || [],
    });

    setPreview(company.logo || "");
  }, [company]);

  const [preview, setPreview] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogo = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setFormData((prev) => ({
      ...prev,
      logo: file,
    }));

    setPreview(URL.createObjectURL(file));
  };

  const handleJobType = (type) => {
    setFormData((prev) => ({
      ...prev,
      jobTypes: prev.jobTypes.includes(type)
        ? prev.jobTypes.filter((t) => t !== type)
        : [...prev.jobTypes, type],
    }));
  };

  const handleWorkMode = (mode) => {
    setFormData((prev) => ({
      ...prev,
      workModes: prev.workModes.includes(mode)
        ? prev.workModes.filter((m) => m !== mode)
        : [...prev.workModes, mode],
    }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const data = new FormData();

      data.append("industry", formData.industry);
      data.append("location", formData.location);
      data.append("description", formData.description);
      data.append("employees", formData.employees);
      data.append("founded", formData.founded);

      data.append("jobTypes", JSON.stringify(formData.jobTypes));

      data.append("workModes", JSON.stringify(formData.workModes));

      if (formData.logo) {
        data.append("logo", formData.logo);
      }

      const res = await api.patch(`/company/edit/${company._id}`, data);

      toast.success(res.data.message);

      close();

      await refreshDashboard();
    } catch (err) {
      console.log(err);

      toast.error(err.response?.data?.message || "Unable to update company.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={close}
    >
      <div
        className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}

        <div className="flex items-center justify-between border-b p-6">
          <h2 className="text-2xl font-semibold">Create Company</h2>

          <button onClick={close} className="rounded-lg p-2 hover:bg-gray-100">
            <X />
          </button>
        </div>

        {/* Body */}

        <div className="space-y-6 p-6">
          {/* Logo */}

          <div className="flex flex-col items-center">
            {preview ? (
              <img
                src={preview}
                alt="logo"
                className="h-28 w-28 rounded-full border object-cover"
              />
            ) : (
              <div className="flex h-28 w-28 items-center justify-center rounded-full bg-blue-600 text-white">
                <Building2 size={50} />
              </div>
            )}

            <label className="mt-4 flex cursor-pointer items-center gap-2 rounded-lg border px-4 py-2 hover:bg-gray-50">
              <Camera size={18} />
              Upload Logo
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleLogo}
              />
            </label>
          </div>

          {/* Row 1 */}

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block font-medium">Industry *</label>

              <input
                type="text"
                required
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                className="w-full rounded-xl border px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium">Location *</label>

              <input
                type="text"
                required
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full rounded-xl border px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Row 2 */}

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block font-medium">Employees</label>

              <input
                type="number"
                name="employees"
                value={formData.employees}
                onChange={handleChange}
                className="w-full rounded-xl border px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium">Founded</label>

              <input
                type="number"
                name="founded"
                value={formData.founded}
                onChange={handleChange}
                className="w-full rounded-xl border px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Description */}

          <div>
            <label className="mb-2 block font-medium">Description</label>

            <textarea
              rows={5}
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full rounded-xl border px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          {/* Job Types */}

          <div>
            <label className="mb-3 block font-medium">Job Types</label>

            <div className="grid gap-3 sm:grid-cols-2">
              {["Full-time", "Part-time", "Internship", "Contract"].map(
                (type) => (
                  <label
                    key={type}
                    className="flex items-center gap-3 rounded-xl border p-3"
                  >
                    <input
                      type="checkbox"
                      checked={formData.jobTypes.includes(type)}
                      onChange={() => handleJobType(type)}
                    />

                    {type}
                  </label>
                ),
              )}
            </div>
          </div>

          {/* Work Modes */}

          <div>
            <label className="mb-3 block font-medium">Work Modes</label>

            <div className="grid gap-3 sm:grid-cols-3">
              {["Remote", "Hybrid", "On-site"].map((mode) => (
                <label
                  key={mode}
                  className="flex items-center gap-3 rounded-xl border p-3"
                >
                  <input
                    type="checkbox"
                    checked={formData.workModes.includes(mode)}
                    onChange={() => handleWorkMode(mode)}
                  />

                  {mode}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}

        <div className="flex justify-end gap-3 border-t p-6">
          <button
            onClick={close}
            className="rounded-xl border px-5 py-3 hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="rounded-xl bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
          >
            {loading ? "Saving.." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditCompanyModal;
