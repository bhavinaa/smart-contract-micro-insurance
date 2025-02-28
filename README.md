# Microinsurance Smart Contract on Hyperledger Fabric


This project was initially developed for a Hackathon to provide a blockchain-powered micro-insurance system for small farmers in India. The goal is to leverage smart contracts to automate insurance payouts based on real-time weather data, reducing bureaucratic delays and ensuring timely financial relief during natural disasters like droughts and floods.

Currently, the system supports adding records for insurance transactions.

## Motivation

The motivation behind this project stems from an interest in blockchain technology and its potential to solve real-world inefficiencies. Traditional insurance systems are often plagued by bureaucratic delays, leaving farmers financially vulnerable when they need support the most. By utilizing smart contracts, we aim to streamline payouts, ensuring that farmers receive assistance immediately after a disaster rather than months later.

## Problem Statement

Why is this relevant for India?

- Small farmers often experience delayed insurance payouts due to bureaucratic inefficiencies.

- Traditional insurance processes are slow, causing financial distress after natural disasters.

A blockchain-powered parametric insurance system can help by automating payouts based on weather conditions.

Current Implementation:

- Farmers can add insurance records through a smart contract.
- Future enhancements will integrate real-time weather data to automate payouts.


## 📌 Overview
This project implements a **Microinsurance Solution for Farmers** on **Hyperledger Fabric**. It consists of:
- A **Java-based smart contract** that manages insurance policies and claims.
- A **Java application gateway** to interact with the deployed smart contract.
- A **Go-based REST API** to expose endpoints for external applications.
- A **React frontend** to interact with the system via the API.

---

## 🛠 Prerequisites
Ensure the following are installed on your system:

- **Docker**
- **Hyperledger Fabric Samples** (`fabric-samples`)
- **Java 11+**
- **Gradle**
- **Go 1.16+**
- **Node.js & npm**

### 📌 Verify Installations
Run the following commands to ensure prerequisites are installed:
```sh
docker -v  # Check Docker version
java -version  # Check Java version
go version  # Check Go version
node -v && npm -v  # Check Node.js & npm version
```

---

## 🚀 Setup & Deployment

### **Step 1: Set Up and Start the Fabric Network**
1. Navigate to the **Fabric test network** directory:
   ```sh
   cd fabric-samples/test-network
   ```
2. Bring down any previous network:
   ```sh
   ./network.sh down
   ```
3. Start the Fabric network and create a channel:
   ```sh
   ./network.sh createChannel -c mychannel
   ```

---

### **Step 2: Deploy the Smart Contract**
1. Navigate to the **Java smart contract directory**:
   ```sh
   cd fabric-samples/asset-transfer-basic/chaincode-microinsurance
   ```
2. Build the smart contract:
   ```sh
   ./gradlew build
   ```
3. Deploy the smart contract to the Fabric network:
   ```sh
   cd ../../test-network
   ./network.sh deployCC -ccn basic -ccp ../asset-transfer-basic/chaincode-microinsurance/ -ccl java
   ```

---

### **Step 3: Run the Java Application Gateway**
1. Navigate to the **application gateway directory**:
   ```sh
   cd ../asset-transfer-basic/application-gateway-microinsurance
   ```
2. Run the Java application:
   ```sh
   ./gradlew run
   ```

This application interacts with the deployed smart contract.

---

### **Step 4: Start the Go Backend (REST API)**
1. Navigate to the **Go API directory**:
   ```sh
   cd ../rest-api-go
   ```
2. Build the Go API:
   ```sh
   go build
   ```
3. Run the API server:
   ```sh
   go run main.go
   ```
The API will now be running and exposing endpoints.

---

### **Step 5: Start the React Frontend**
1. Navigate to the React project directory:
   ```sh
   cd path-to-your-react-app
   ```
2. Start the frontend:
   ```sh
   npm run start -cy
   ```
Ensure the React app is configured to communicate with the running Go API.

---

## 🛠 Testing the Smart Contract
After deployment, test the smart contract:
1. Open the **Fabric CLI**:
   ```sh
   docker exec -it cli bash
   ```
2. Query all insurance policies:
   ```sh
   peer chaincode query -C mychannel -n basic -c '{"Args":["GetAllInsurancePolicys"]}'
   ```
3. Create a new policy:
   ```sh
   peer chaincode invoke -o orderer.example.com:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile "$ORDERER_CA" -C mychannel -n basic -c '{"Args":["CreateInsurancePolicy", "policy4", "farmer999", "Alice", "Plan D", "Excellent", "5000", "20000", "800", "Active"]}'
   ```

---

## 🎯 Summary
This guide walks you through setting up a **Hyperledger Fabric** microinsurance system. The **smart contract** stores policies, the **Java backend** interacts with Fabric, the **Go API** exposes endpoints, and the **React frontend** provides a UI.

🔹 **Follow the steps carefully to deploy and test the system.** 🚀
