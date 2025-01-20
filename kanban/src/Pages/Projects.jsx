import { useState } from 'react';
import NavBar from './../Components/NavBar';

function Projects() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    projectName: '',
    projectDescription: '',
    team: '',
  });

  const teams = ['Team Alpha', 'Team Beta', 'Team Gamma']; // Example team options

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);
    setIsModalOpen(false); // Close the modal after submission
    setFormData({ projectName: '', projectDescription: '', team: '' }); // Reset the form
  };

  return (
    <>
      <NavBar />
      <div className="container px-4 py-8 mx-auto mt-10">
        {/* Header */}
        <div className="flex flex-col items-start justify-between w-full mb-6 space-y-4 md:space-y-0 md:flex-row md:items-center">
          <h1 className="text-2xl font-bold">Projects</h1>
          <div className="flex items-center space-x-2">
            <button
              className="flex items-center px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5 mr-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 6h8.25m-8.25 6h5.25m-5.25 6h8.25m-13.5-3.75H4.5m2.25-6H4.5m2.25-6H4.5"
                />
              </svg>
              Filter
            </button>
            <button
              className="px-4 py-2 text-white bg-purple-600 rounded-md hover:bg-purple-700"
              onClick={() => setIsModalOpen(true)}
            >
              + New Project
            </button>
          </div>
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Example project cards */}
          <div className="p-4 bg-white border border-gray-200 rounded-md shadow-sm hover:shadow-md">
            <h2 className="text-lg font-semibold">Project 1</h2>
            <p className="text-sm text-gray-600">Description of project 1...</p>
            <p className="text-sm text-gray-600">Team Name</p>
          </div>
          <div className="p-4 bg-white border border-gray-200 rounded-md shadow-sm hover:shadow-md">
            <h2 className="text-lg font-semibold">Project 2</h2>
            <p className="text-sm text-gray-600">Description of project 2...</p>
          </div>
          <div className="p-4 bg-white border border-gray-200 rounded-md shadow-sm hover:shadow-md">
            <h2 className="text-lg font-semibold">Project 3</h2>
            <p className="text-sm text-gray-600">Description of project 3...</p>
          </div>
        </div>
      </div>

      {/* Modal for Adding a New Project */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
            <h2 className="mb-4 text-xl font-bold">Add New Project</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="projectName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Project Name
                </label>
                <input
                  type="text"
                  id="projectName"
                  name="projectName"
                  value={formData.projectName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="projectDescription"
                  className="block text-sm font-medium text-gray-700"
                >
                  Project Short Description
                </label>
                <textarea
                  id="projectDescription"
                  name="projectDescription"
                  value={formData.projectDescription}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                  rows="3"
                  required
                ></textarea>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="team"
                  className="block text-sm font-medium text-gray-700"
                >
                  Team
                </label>
                <select
                  id="team"
                  name="team"
                  value={formData.team}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                  required
                >
                  <option value="" disabled>
                    Select a team
                  </option>
                  {teams.map((team, index) => (
                    <option key={index} value={team}>
                      {team}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-white bg-purple-600 rounded-md hover:bg-purple-700"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Projects;
