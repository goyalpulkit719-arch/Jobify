import { useEffect, useState } from "react";
import { Camera, X } from "lucide-react";

function EditProfileModal({ close, user }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    location: "",
    avatar: null,
  });

  const [preview, setPreview] = useState("");

  useEffect(() => {
    setFormData({
      name: user.name || "",
      phone: user.phone || "",
      location: user.location || "",
      avatar: null,
    });

    setPreview(user.avatar || "");
  }, [user]);

  const handleAvatar = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setFormData((prev) => ({
      ...prev,
      avatar: file,
    }));

    setPreview(URL.createObjectURL(file));
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={close}
    >
      <div
        className="w-full max-w-lg rounded-2xl bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}

        <div className="flex items-center justify-between border-b p-6">
          <h2 className="text-2xl font-semibold">
            Edit Profile
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

          {/* Avatar */}

          <div className="flex flex-col items-center">

            {preview ? (
              <img
                src={preview}
                alt="avatar"
                className="h-28 w-28 rounded-full object-cover border"
              />
            ) : (
              <div className="flex h-28 w-28 items-center justify-center rounded-full bg-blue-600 text-5xl font-bold text-white">
                {formData.name.charAt(0).toUpperCase()}
              </div>
            )}

            <label className="mt-4 flex cursor-pointer items-center gap-2 rounded-lg border px-4 py-2 hover:bg-gray-50">
              <Camera size={18} />

              Change Avatar

              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleAvatar}
              />
            </label>

          </div>

          {/* Name */}

          <div>
            <label className="mb-2 block font-medium">
              Name
            </label>

            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
              className="w-full rounded-xl border px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          {/* Phone */}

          <div>
            <label className="mb-2 block font-medium">
              Phone Number
            </label>

            <input
              type="text"
              value={formData.phone}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  phone: e.target.value,
                }))
              }
              className="w-full rounded-xl border px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          {/* Location */}

          <div>
            <label className="mb-2 block font-medium">
              Location
            </label>

            <input
              type="text"
              value={formData.location}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  location: e.target.value,
                }))
              }
              className="w-full rounded-xl border px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

        </div>

        {/* Footer */}

        <div className="flex justify-end gap-3 border-t p-6">

          <button
            onClick={close}
            className="rounded-xl border px-5 py-3 font-medium hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            className="rounded-xl bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700"
          >
            Save Changes
          </button>

        </div>
      </div>
    </div>
  );
}

export default EditProfileModal;