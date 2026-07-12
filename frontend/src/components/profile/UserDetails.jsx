import { useState } from "react";
import { Mail, Phone, MapPin, Pencil, LogOut, KeyRound } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import EditProfileModal from "./EditProfileModal";
import { useEffect } from "react";
import { toast } from "sonner";
import api from "../../api/axios";
import { update, logout } from "../../store/auth";
import { useNavigate } from "react-router-dom";

function UserDetails() {
  const { isLoggedIn, name, avatar, role } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [passwordOpen, setPasswordOpen] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [updating, setUpdating] = useState(false);

  const [editOpen, setEditOpen] = useState(false);

  const handleLogOut = async () => {
    try {
      const res = await api.post("/auth/logout");

      dispatch(logout());
      toast.success("User logged out succesfully");
      navigate("/");
    } catch (err) {
      const message = err.response?.data?.message || "Error occured";
      toast.error(message);
    }
  };

  const handleChangePassword = async () => {
    setUpdating(true);
    try {
      const res = await api.patch("/auth/password", {
        password: newPassword,
      });

      toast.success("Password Changed succesfully");
      setPasswordOpen(false);
    } catch (err) {
      console.log(err);
      const message = err.response?.data?.message || "Error occured";
      toast.error(message);
    } finally {
      setUpdating(false);
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/auth/me");
        setUser(res.data.data);

        dispatch(
          update({
            isLoggedIn: true,
            role: res.data.data.role,
            name: res.data.data.name,
            avatar: res.data.data.avatar,
            id: res.data.data._id,
          }),
        );
      } catch (err) {
        console.log(err);
        const message =
          err.response?.data?.message || "Unable to fetch from server";
        toast.error(message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <>
      <div className="rounded-2xl bg-white p-8 shadow-sm">
        {/* Avatar */}

        <div className="flex flex-col items-center">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="h-28 w-28 rounded-full border object-cover"
            />
          ) : (
            <div className="flex h-28 w-28 items-center justify-center rounded-full bg-blue-600 text-5xl font-bold text-white">
              {user.name.charAt(0).toUpperCase()}
            </div>
          )}

          <h2 className="mt-5 text-3xl font-bold">{user.name}</h2>

          <span className="mt-2 rounded-full bg-blue-100 px-4 py-1 text-sm font-medium capitalize text-blue-700">
            {user.role}
          </span>
        </div>

        {/* Details */}

        <div className="mt-10 space-y-6">
          <div className="flex items-center gap-4">
            <Mail className="text-blue-600" />

            <div>
              <p className="text-sm text-gray-500">Email</p>

              <p className="font-medium">{user.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Phone className="text-blue-600" />

            <div>
              <p className="text-sm text-gray-500">Phone</p>

              <p className="font-medium">{user.phone || "Not Added Yet"}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <MapPin className="text-blue-600" />

            <div>
              <p className="text-sm text-gray-500">Location</p>

              <p className="font-medium">{user.location || "Not Added Yet"}</p>
            </div>
          </div>
        </div>

        {/* Buttons */}

        <div className="mt-10 flex justify-end gap-4">
          <button
            onClick={() => setEditOpen(true)}
            className="flex items-center gap-2 rounded-xl border border-blue-600 px-5 py-3 font-medium text-blue-600 transition hover:bg-blue-50"
          >
            <Pencil size={18} />
            Edit Profile
          </button>
          <button
            onClick={() => setPasswordOpen(true)}
            className="flex items-center gap-2 rounded-xl border border-amber-500 px-5 py-3 font-medium text-amber-600 transition hover:bg-amber-50"
            disabled={updating}
          >
            <KeyRound size={18} />
            {updating ? "Changing Password..." : "Change Password"}
          </button>
          <button
            className="flex items-center gap-2 rounded-xl bg-red-500 px-5 py-3 font-medium text-white transition hover:bg-red-600"
            onClick={handleLogOut}
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>

      {editOpen && (
        <EditProfileModal
          close={() => setEditOpen(false)}
          user={user}
          setUser={setUser}
        />
      )}

      {passwordOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setPasswordOpen(false)}
        >
          <div
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-semibold">Change Password</h2>

            <p className="mt-2 text-gray-500">Enter your new password below.</p>

            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="New Password"
              className="mt-6 w-full rounded-xl border px-4 py-3 outline-none focus:border-blue-500"
            />

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => {
                  setPasswordOpen(false);
                  setNewPassword("");
                }}
                className="rounded-xl border px-5 py-3 hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                className="rounded-xl bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
                onClick={handleChangePassword}
              >
                Change Password
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default UserDetails;
