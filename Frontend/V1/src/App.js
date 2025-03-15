import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [policies, setPolicies] = useState([]);
  const [menu, setMenu] = useState('read');

  useEffect(() => {
    fetchPoliciesHandler();
  }, []);

  async function fetchPoliciesHandler() {
    try {
      const response = await fetch(`http://localhost:3000/query?channelid=mychannel&chaincodeid=basic&function=GetAllInsurancePolicys&_=${Date.now()}`);
      if (response.ok) {
        const text = await response.text();
        const jsonData = text.replace('Response: ', '');
        const data = JSON.parse(jsonData);
        const GetAllInsurancePolicies = data.map(policy => ({
          condition: policy.condition,
          coverageAmount: policy.coverageAmount,
          farmerID: policy.farmerID,
          farmerName: policy.farmerName,
          payoutAmount: policy.payoutAmount,
          planName: policy.planName,
          policyID: policy.policyID,
          premiumAmount: policy.premiumAmount,
          status: policy.status
        }));
        setPolicies(GetAllInsurancePolicies);
      } else {
        console.error('Error fetching policies:', response.status);
      }
    } catch (error) {
      console.error('Error fetching policies:', error);
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-4">
      <h1 className="text-3xl font-bold text-blue-400 mb-6">Smart Contract: Micro Insurance</h1>
      <nav className="mb-6">
        <ul className="flex space-x-4">
          {['create', 'read', 'update', 'delete'].map((item) => (
            <li key={item}>
              <button
                onClick={() => setMenu(item)}
                className={`px-4 py-2 rounded-md transition duration-300 ${menu === item ? 'bg-blue-500' : 'bg-gray-700 hover:bg-gray-600'}`}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)} Policy
              </button>
            </li>
          ))}
        </ul>
      </nav>
      {menu === 'create' && <CreatePolicy />}
      {menu === 'read' && <ReadPolicies policies={policies} />}
      {menu === 'update' && <UpdatePolicy />}
      {menu === 'delete' && <DeletePolicy />}
    </div>
  );
}

function ReadPolicies({ policies }) {
  return (
    <div className="w-full max-w-6xl overflow-x-auto">
      <h2 className="text-2xl font-semibold text-blue-300 mb-4">Insurance Policies</h2>
      <table className="w-full border-collapse bg-gray-800 text-white rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-700">
            {['Policy ID', 'Farmer ID', 'Farmer Name', 'Plan Name', 'Condition', 'Coverage', 'Payout', 'Premium', 'Status'].map(header => (
              <th key={header} className="py-2 px-4 border-b">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {policies.map((policy, index) => (
            <tr key={index} className="even:bg-gray-700">
              {Object.values(policy).map((value, i) => (
                <td key={i} className="py-2 px-4 border-b">{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CreatePolicy() {
  const [form, setForm] = useState({
    policyID: '', farmerID: '', farmerName: '', planName: '',
    condition: '', coverageAmount: '', payoutAmount: '', premiumAmount: '', status: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Submitting:', form);
    // Handle API request here
  };

  return (
    <div className="w-full max-w-lg">
      <h2 className="text-2xl font-semibold text-blue-300 mb-4">Create New Policy</h2>
      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-md">
        {Object.keys(form).map((key) => (
          <div key={key} className="mb-4">
            <label className="block text-gray-300 mb-1">{key.replace(/([A-Z])/g, ' $1').trim()}:</label>
            <input
              type="text"
              name={key}
              value={form[key]}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-md bg-gray-900 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}
        <button type="submit" className="w-full bg-blue-500 py-2 rounded-md hover:bg-blue-400 transition duration-300">Create Policy</button>
      </form>
    </div>
  );
}

function UpdatePolicy() {
  return <div className="text-gray-400">Update Policy Coming Soon...</div>;
}

function DeletePolicy() {
  return <div className="text-gray-400">Delete Policy Coming Soon...</div>;
}

export default App;
