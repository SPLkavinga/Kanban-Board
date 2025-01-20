import { useState, useEffect } from "react";
import NavBar from "../Components/NavBar";
import axios from "axios";

const TeamPage = () => {
  const [isCreateTeamModalOpen, setIsCreateTeamModalOpen] = useState(false);
  const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false);
  const [members, setMembers] = useState([]); // List of all members in the database
  const [newMember, setNewMember] = useState({ name: "", role: "" }); // New member data
  const [newTeam, setNewTeam] = useState({
    name: "",
    description: "",
    leader: "",
    selectedMembers: [],
  }); // New team data

  // Fetch members from the database
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/members")
      .then((res) => setMembers(res.data))
      .catch((err) => console.error("Error fetching members:", err));
  }, []);

  // Handle adding a new member to the database
  const handleAddNewMember = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/members", newMember)
      .then((res) => {
        setMembers((prev) => [...prev, res.data]); // Update members list
        setIsAddMemberModalOpen(false); // Close modal
        setNewMember({ name: "", role: "" }); // Reset form
      })
      .catch((err) => console.error("Error adding member:", err));
  };

  // Handle creating a new team
  const handleCreateNewTeam = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/teams", newTeam)
      .then((res) => {
        console.log("Team created:", res.data);
        setIsCreateTeamModalOpen(false); // Close modal
        setNewTeam({
          name: "",
          description: "",
          leader: "",
          selectedMembers: [],
        }); // Reset form
      })
      .catch((err) => console.error("Error creating team:", err));
  };

  return (
    <>
      <NavBar />

      {/* Main Content */}
      <div className="px-8 mt-20">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Teams</h1>
          <div className="flex space-x-4">
            <button
              className="px-4 py-2 text-white bg-gray-600 rounded-lg hover:bg-gray-700"
              onClick={() => console.log("Filter clicked")}
            >
              Filter
            </button>
            <button
              className="px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700"
              onClick={() => setIsAddMemberModalOpen(true)}
            >
              Add New Member
            </button>
            <button
              className="px-4 py-2 text-white bg-purple-600 rounded-lg hover:bg-purple-700"
              onClick={() => setIsCreateTeamModalOpen(true)}
            >
              Create New Team
            </button>
          </div>
        </div>

        {/* Teams Section */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Example Team Cards */}
          <div className="p-4 bg-white border rounded-lg shadow-md hover:shadow-lg">
            <h2 className="text-lg font-semibold">Team 1</h2>
            <p className="mt-2 text-gray-500">
              This is a placeholder for the team description.
            </p>
            <div className="flex mt-4 space-x-2">
              <img
                src="https://via.placeholder.com/40"
                alt="Member"
                className="w-8 h-8 rounded-full"
              />
              <img
                src="https://via.placeholder.com/40"
                alt="Member"
                className="w-8 h-8 rounded-full"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Add New Member Modal */}
      {isAddMemberModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50"
          onClick={() => setIsAddMemberModalOpen(false)}
        >
          <div
            className="p-6 bg-white rounded-lg w-96"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="mb-4 text-xl font-bold">Add New Member</h2>
            <form onSubmit={handleAddNewMember}>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium">Name</label>
                <input
                  type="text"
                  value={newMember.name}
                  onChange={(e) =>
                    setNewMember({ ...newMember, name: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-green-400"
                  placeholder="Enter member name"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium">Role</label>
                <input
                  type="text"
                  value={newMember.role}
                  onChange={(e) =>
                    setNewMember({ ...newMember, role: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-green-400"
                  placeholder="Enter member role"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700"
              >
                Save Member
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Create New Team Modal */}
      {isCreateTeamModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50"
          onClick={() => setIsCreateTeamModalOpen(false)}
        >
          <div
            className="p-6 bg-white rounded-lg w-96"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="mb-4 text-xl font-bold">Create New Team</h2>
            <form onSubmit={handleCreateNewTeam}>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium">
                  Team Name
                </label>
                <input
                  type="text"
                  value={newTeam.name}
                  onChange={(e) =>
                    setNewTeam({ ...newTeam, name: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-purple-400"
                  placeholder="Enter team name"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium">
                  Team Description
                </label>
                <textarea
                  value={newTeam.description}
                  onChange={(e) =>
                    setNewTeam({ ...newTeam, description: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-purple-400"
                  rows="3"
                  placeholder="Enter team description"
                  required
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium">
                  Team Leader
                </label>
                <select
                  value={newTeam.leader}
                  onChange={(e) =>
                    setNewTeam({ ...newTeam, leader: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-purple-400"
                  required
                >
                  <option value="">Select Team Leader</option>
                  {members.map((member) => (
                    <option key={member._id} value={member.name}>
                      {member.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium">
                  Add Members
                </label>
                <select
                  multiple
                  value={newTeam.selectedMembers}
                  onChange={(e) =>
                    setNewTeam({
                      ...newTeam,
                      selectedMembers: [...e.target.selectedOptions].map(
                        (option) => option.value
                      ),
                    })
                  }
                  className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-purple-400"
                >
                  {members.map((member) => (
                    <option key={member._id} value={member.name}>
                      {member.name}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 text-white bg-purple-600 rounded-lg hover:bg-purple-700"
              >
                Save Team
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default TeamPage;
