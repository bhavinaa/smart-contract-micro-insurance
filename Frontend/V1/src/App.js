import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [policies, setPolicies] = useState([]);
  const [menu, setMenu] = useState('read');

  useEffect(() => {
    fetchPoliciesHandler();
  }, []);

  async function fetchPoliciesHandler(){
    try {
      const response = await fetch('http://localhost:3000/query?channelid=mychannel&chaincodeid=basic&function=GetAllInsurancePolicys&_=${Date.now()');
      if (response.ok) {
        const text = await response.text();
        console.log(response.message);
        console.log(response.text);
        const jsonData = text.replace('Response: ', ''); // Remove the prefix
        const data = JSON.parse(jsonData); // Parse the remaining string as JSON
        const GetAllInsurancePolicies = data.map((policy) => {
          return {
            condition: policy.condition,
            coverageAmount: policy.coverageAmount,
            farmerID: policy.farmerID,
            farmerName: policy.farmerName,
            payoutAmount: policy.payoutAmount,
            planName: policy.planName,
            policyID: policy.policyID,
            premiumAmount: policy.premiumAmount,
            status: policy.status
          };
        });
        console.log(GetAllInsurancePolicies);
        setPolicies(GetAllInsurancePolicies);
      } else {
        console.error('Error fetching policies:', response.status);
      }
    } catch (error) {
      console.error('Error fetching policies:', error);
    }
  }

  return (
    <div className="dark-theme">
    <h1 className="blue-text">Smart Contract: Micro Insurance</h1>
    <nav>
      <ul>
        <li>
          <button onClick={() => setMenu('create')}>Create Policy</button>
        </li>
        <li>
          <button onClick={() => setMenu('read')}>Read Policies</button>
        </li>
        <li>
          <button onClick={() => setMenu('update')}>Update Policy</button>
        </li>
        <li>
          <button onClick={() => setMenu('delete')}>Delete Policy</button>
        </li>
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
    <div>
      <h2>Get All Insurance Policies</h2>
      <table className="blue-table">
        <thead>
          <tr>
            <th>Policy ID</th>
            <th>Farmer ID</th>
            <th>Farmer Name</th>
            <th>Plan Name</th>
            <th>Condition</th>
            <th>Coverage Amount</th>
            <th>Payout Amount</th>
            <th>Premium Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {policies.map((policy, index) => (
            <tr key={index}>
              <td>{policy.policyID}</td>
              <td>{policy.farmerID}</td>
              <td>{policy.farmerName}</td>
              <td>{policy.planName}</td>
              <td>{policy.condition}</td>
              <td>{policy.coverageAmount}</td>
              <td>{policy.payoutAmount}</td>
              <td>{policy.premiumAmount}</td>
              <td>{policy.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CreatePolicy() {
  const [policyID, setPolicyID] = useState('');
  const [farmerID, setFarmerID] = useState('');
  const [farmerName, setFarmerName] = useState('');
  const [planName, setPlanName] = useState('');
  const [condition, setCondition] = useState('');
  const [coverageAmount, setCoverageAmount] = useState('');
  const [payoutAmount, setPayoutAmount] = useState('');
  const [premiumAmount, setPremiumAmount] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const args = [
        policyID,
        farmerID,
        farmerName,
        planName,
        condition,
        coverageAmount,
        payoutAmount,
        premiumAmount,
        status
      ];
      const url = `http://localhost:3000/invoke?channelid=mychannel&chaincodeid=basic&function=CreateInsurancePolicy&args=${policyID}&args=${farmerID}&args=${farmerName}&args=${planName}&args=${condition}&args=${coverageAmount}&args=${payoutAmount}&args=${premiumAmount}&args=${status}`;
      console.log('Request URL:', url);
    console.log('Request Args:', args);
    const response = await fetch(url);
      if (response.ok) {
        console.log('Policy created successfully');
      } else {
        console.error('Error creating policy:', response.status);
      }
    } catch (error) {
      console.error('Error creating policy:', error);
    }
  };

  return (
    <div>
      <h2>Create Policy</h2>
      <form onSubmit={handleSubmit}>
        <label>Policy ID:</label>
        <input type="text" value={policyID} onChange={(event) => setPolicyID(event.target.value)} />
        <br />
        <label>Farmer ID:</label>
        <input type="text" value={farmerID} onChange={(event) => setFarmerID(event.target.value)} />
        <br />
        <label>Farmer Name:</label>
        <input type="text" value={farmerName} onChange={(event) => setFarmerName(event.target.value)} />
        <br />
        <label>Plan Name:</label>
        <input type="text" value={planName} onChange={(event) => setPlanName(event.target.value)} />
        <br />
        <label>Condition:</label>
        <input type="text" value={condition} onChange={(event) => setCondition(event.target.value)} />
        <br />
        <label>Coverage Amount:</label>
        <input type="text" value={coverageAmount} onChange={(event) => setCoverageAmount(event.target.value)} />
        <br />
        <label>Payout Amount:</label>
        <input type="text" value={payoutAmount} onChange={(event) => setPayoutAmount(event.target.value)} />
        <br />
        <label>Premium Amount:</label>
        <input type="text" value={premiumAmount} onChange={(event) => setPremiumAmount(event.target.value)} />
        <br />
        <label>Status:</label>
        <input type="text" value={status} onChange={(event) => setStatus(event.target.value)} />
        <br />
        <button type="submit">Create Policy</button>
      </form>
    </div>
  );
}
function UpdatePolicy() {
  // Update policy form and logic here
}

function DeletePolicy() {
  // Delete policy form and logic here
}

export default App;