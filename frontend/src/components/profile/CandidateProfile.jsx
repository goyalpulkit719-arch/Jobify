import { useEffect, useState } from "react";
import {
  Briefcase,
  Code2,
  FileText,
  GitBranch,
  Link,
  FolderGit2,
  FileBadge,
  Pencil,
} from "lucide-react";
import { toast } from "sonner";
import api from "../../api/axios";
import EditCandidateModal from "./EditCandidateModal";

function CandidateProfile() {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [editOpen, setEditOpen] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await api.get("/candidate/profile");
      setProfile(res.data.data);
    } catch (err) {
      console.log(err);
      toast.error(
        err.response?.data?.message || "Unable to fetch profile"
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="mt-8 flex justify-center">
        Loading...
      </div>
    );
  }

  return (
    <>
      <div className="mt-8 rounded-2xl bg-white p-8 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold">
            Candidate Profile
          </h2>

          <button
            onClick={() => setEditOpen(true)}
            className="flex items-center gap-2 rounded-xl border border-blue-600 px-5 py-3 font-medium text-blue-600 transition hover:bg-blue-50"
          >
            <Pencil size={18} />
            Edit Profile
          </button>
        </div>

        {/* Headline */}

        <div className="mt-8">
          <div className="mb-2 flex items-center gap-2">
            <Briefcase className="text-blue-600" />
            <h3 className="font-semibold text-lg">
              Headline
            </h3>
          </div>

          <p>
            {profile.headline || "Not Added Yet"}
          </p>
        </div>

        {/* Bio */}

        <div className="mt-8">
          <div className="mb-2 flex items-center gap-2">
            <FileText className="text-blue-600" />
            <h3 className="font-semibold text-lg">
              Bio
            </h3>
          </div>

          <p className="whitespace-pre-wrap">
            {profile.bio || "Not Added Yet"}
          </p>
        </div>

        {/* Skills */}

        <div className="mt-8">
          <div className="mb-3 flex items-center gap-2">
            <Code2 className="text-blue-600" />
            <h3 className="font-semibold text-lg">
              Skills
            </h3>
          </div>

          <div className="flex flex-wrap gap-3">
            {profile.skills.length ? (
              profile.skills.map((skill, index) => (
                <span
                  key={index}
                  className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700"
                >
                  {skill}
                </span>
              ))
            ) : (
              <p>Not Added Yet</p>
            )}
          </div>
        </div>

        {/* Experience */}

        <div className="mt-8">
          <div className="mb-2 flex items-center gap-2">
            <Briefcase className="text-blue-600" />
            <h3 className="font-semibold text-lg">
              Experience
            </h3>
          </div>

          <p>
            {profile.experience} Year(s)
          </p>
        </div>

        {/* Projects */}

        <div className="mt-8">
          <div className="mb-2 flex items-center gap-2">
            <FolderGit2 className="text-blue-600" />
            <h3 className="font-semibold text-lg">
              Projects
            </h3>
          </div>

          {profile.projects.length ? (
            <ul className="list-disc pl-6 space-y-2">
              {profile.projects.map((project, index) => (
                <li key={index}>
                  {project}
                </li>
              ))}
            </ul>
          ) : (
            <p>Not Added Yet</p>
          )}
        </div>

        {/* Resume */}

        <div className="mt-8">
          <div className="mb-2 flex items-center gap-2">
            <FileBadge className="text-blue-600" />
            <h3 className="font-semibold text-lg">
              Resume
            </h3>
          </div>

          {profile.resume ? (
            <a
              href={profile.resume}
              target="_blank"
              rel="noreferrer"
              className="font-medium text-blue-600 hover:underline"
            >
              View Resume
            </a>
          ) : (
            <p>Not Uploaded Yet</p>
          )}
        </div>

        {/* Links */}

        <div className="mt-8 grid gap-6 md:grid-cols-2">

          <div>
            <div className="mb-2 flex items-center gap-2">
              <GitBranch className="text-blue-600" />
              <h3 className="font-semibold">
                GitHub
              </h3>
            </div>

            {profile.github ? (
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 hover:underline"
              >
                {profile.github}
              </a>
            ) : (
              <p>Not Added Yet</p>
            )}
          </div>

          <div>
            <div className="mb-2 flex items-center gap-2">
              <Link className="text-blue-600" />
              <h3 className="font-semibold">
                LinkedIn
              </h3>
            </div>

            {profile.linkedin ? (
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 hover:underline"
              >
                {profile.linkedin}
              </a>
            ) : (
              <p>Not Added Yet</p>
            )}
          </div>

        </div>
      </div>

      {editOpen && (
        <EditCandidateModal
          close={() => setEditOpen(false)}
          profile={profile}
          setProfile={setProfile}
        />
      )}
    </>
  );
}

export default CandidateProfile;