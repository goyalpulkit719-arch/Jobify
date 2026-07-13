import { useEffect, useState } from "react";
import { X, Upload } from "lucide-react";
import { toast } from "sonner";
import api from "../../api/axios";

function EditCandidateModal({ close, profile, setProfile }) {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    headline: "",
    bio: "",
    skills: "",
    experience: 0,
    projects: "",
    github: "",
    linkedin: "",
    resume: null,
  });

  const [resumeName, setResumeName] = useState("");

  useEffect(() => {
    setFormData({
      headline: profile.headline || "",
      bio: profile.bio || "",
      skills: profile.skills.join(", "),
      experience: profile.experience || 0,
      projects: profile.projects.join(", "),
      github: profile.github || "",
      linkedin: profile.linkedin || "",
      resume: null,
    });

    if (profile.resume) {
      const parts = profile.resume.split("/");
      setResumeName(parts[parts.length - 1]);
    }
  }, [profile]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleResume = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setFormData((prev) => ({
      ...prev,
      resume: file,
    }));

    setResumeName(file.name);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const data = new FormData();

      data.append("headline", formData.headline);
      data.append("bio", formData.bio);
      data.append("experience", formData.experience);
      data.append("github", formData.github);
      data.append("linkedin", formData.linkedin);

      data.append(
        "skills",
        JSON.stringify(
          formData.skills
            .split(",")
            .map((skill) => skill.trim())
            .filter(Boolean)
        )
      );

      data.append(
        "projects",
        JSON.stringify(
          formData.projects
            .split(",")
            .map((project) => project.trim())
            .filter(Boolean)
        )
      );

      if (formData.resume) {
        data.append("resume", formData.resume);
      }

      const res = await api.patch(
        "/candidate/profile/update",
        data
      );

      setProfile(res.data.data);

      toast.success("Candidate profile updated successfully");

      close();
    } catch (err) {
      console.log(err);

      toast.error(
        err.response?.data?.message ||
          "Unable to update profile"
      );
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
        className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}

        <div className="flex items-center justify-between border-b p-6">
          <h2 className="text-2xl font-semibold">
            Edit Candidate Profile
          </h2>

          <button
            onClick={close}
            className="rounded-lg p-2 hover:bg-gray-100"
          >
            <X />
          </button>
        </div>

        {/* Body */}

        <div className="space-y-6 p-6">
          {/* Headline */}

          <div>
            <label className="mb-2 block font-medium">
              Headline
            </label>

            <input
              type="text"
              name="headline"
              value={formData.headline}
              onChange={handleChange}
              className="w-full rounded-xl border px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          {/* Bio */}

          <div>
            <label className="mb-2 block font-medium">
              Bio
            </label>

            <textarea
              rows={5}
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className="w-full rounded-xl border px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          {/* Skills */}

          <div>
            <label className="mb-2 block font-medium">
              Skills
            </label>

            <input
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              className="w-full rounded-xl border px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          {/* Experience */}

          <div>
            <label className="mb-2 block font-medium">
              Experience (Years)
            </label>

            <input
              type="number"
              min={0}
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              className="w-full rounded-xl border px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          {/* Projects */}

          <div>
            <label className="mb-2 block font-medium">
              Projects
            </label>

            <textarea
              rows={4}
              name="projects"
              value={formData.projects}
              onChange={handleChange}
              className="w-full rounded-xl border px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          {/* Resume */}

          <div>
            <label className="mb-2 block font-medium">
              Resume
            </label>

            <label className="flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 hover:bg-gray-50">
              <Upload size={18} />

              <span>
                {resumeName || "Upload Resume (PDF)"}
              </span>

              <input
                type="file"
                accept=".pdf"
                hidden
                onChange={handleResume}
              />
            </label>
          </div>

          {/* Github */}

          <div>
            <label className="mb-2 block font-medium">
              GitHub
            </label>

            <input
              type="text"
              name="github"
              value={formData.github}
              onChange={handleChange}
              className="w-full rounded-xl border px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          {/* LinkedIn */}

          <div>
            <label className="mb-2 block font-medium">
              LinkedIn
            </label>

            <input
              type="text"
              name="linkedin"
              value={formData.linkedin}
              onChange={handleChange}
              className="w-full rounded-xl border px-4 py-3 outline-none focus:border-blue-500"
            />
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
            className="rounded-xl bg-blue-600 px-5 py-3 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-400"
          >
            {loading
              ? "Saving..."
              : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditCandidateModal;