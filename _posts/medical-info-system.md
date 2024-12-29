---
title: 'Developing a Secure Medical Record System Using Hyperledger Fabric'
excerpt: "This document outlines the development of a secure medical record management system."
coverImage: '/assets/blog/preview/cover.jpg'
date: '2024-09-25T02:35:07.322Z'
author:
  name: Ian
  picture: "/assets/blog/authors/me.jpeg"
ogImage:
  url: "/assets/blog/media-query-failed/cover.jpg"
tags: ["blackchain"]
---

## Overview
This document outlines the development of a secure medical record management system utilizing Hyperledger Fabric for blockchain functionalities, Java for chaincode, Spring Boot for backend services, and React with NextUI for the frontend.

## Objective
Develop a blockchain-based solution to securely manage electronic medical records, ensuring high data privacy and integrity, and facilitating easy access for authorized users.

## Overall Workflow Overview

### Doctor Submits a Case Report:

Doctors submit case reports through the frontend, including patient ID, diagnostic information, report content, etc.

### Backend Processing and Data Validation:

The backend receives the request, verifies the identities and permissions of the doctor and patient.
It preprocesses the case report data and generates content to be submitted to IPFS.

### Uploading Report to IPFS:

The backend uploads the processed report content to IPFS.
IPFS returns a unique content hash value, serving as a permanent identifier for the report.

### Recording IPFS Hash on Blockchain:

The backend invokes blockchain chaincode to record information such as patient ID, report ID, and IPFS hash on the blockchain.
This confirms the data's storage and immutability via blockchain.

### Confirming Submission Result:

The backend returns the blockchain transaction results and IPFS hash to the frontend as confirmation of the report submission.

## Detailed Steps and Boundary Controls

### 1. Doctor Submits a Case Report (Frontend to Backend)

Operation: Doctors fill out a case report form in the frontend application (such as Web or mobile app), including patient ID, report content, diagnostic information, etc.
Boundary Control: The frontend performs form validation to ensure required fields are not empty. It can also authenticate the doctor's identity through OAuth or JWT to ensure the user is an authorized doctor.

### 2. Backend Receives Request and Verifies Identity (Backend)

Operation: Once the backend receives the frontend's request, it performs a secondary identity verification (such as checking JWT or Session).

Boundary Control: The backend verifies doctor's identity and permissions from the authentication and authorization system and checks if the request contains a valid patient ID. If invalid, an error message is returned.

Data Processing: Preprocess the case report, such as checking the format of the report content, filtering sensitive information, etc.

### 3. Uploading Report to IPFS (Backend and IPFS Service)

Operation: The backend uploads the case report content to IPFS using an IPFS client (such as HTTP API). Typically, this involves converting the report's textual content into JSON format or uploading the document as binary data.

Boundary Control: During the IPFS upload, ensure the data's legality (e.g., content does not contain malicious code).

IPFS Return: IPFS returns a unique content hash (CID), representing the report's storage location. This hash ensures the report's uniqueness and integrity, such that any tampering with the report changes its hash, thereby failing verification.

### 4. Storing IPFS Hash in Blockchain (Backend and Blockchain Network)

Operation: The backend invokes Hyperledger Fabric chaincode to write the following information into the blockchain:

Patient ID: Identifier associated with the patient

Report ID: Generated unique report ID (can be UUID)

IPFS Hash: Identifier for the report's storage in IPFS

Other metadata: Such as submission time, doctor ID, etc.

Permission Control: Only doctors or authorized users with specific permissions can execute this chaincode call.

Transaction Consistency: The execution of the chaincode needs to go through Hyperledger Fabric's transaction process, including endorsement and ordering, to ensure consistency of data across multiple nodes.

Chaincode Logic: The chaincode contains record verification logic, such as checking the uniqueness of patient ID and report ID, ensuring the integrity of data on the chain.

### 5. Confirm Submission Result and Return to Frontend (Backend to Frontend)

Operation: Once the backend receives the successful transaction information from the blockchain, it returns the IPFS hash and confirmation status to the frontend.

Boundary Control: After confirming the transaction's success, the backend sends the returned hash and other confirmation information to the frontend.

Frontend Display: Upon receiving the results, the frontend can show the doctor that the report has been successfully submitted, including the IPFS hash and the submission timestamp, serving as an archival proof.

## Detailed Boundary Controls Explanation

Throughout the entire process, the following are the main boundary control measures:

### Identity Authentication and Permission Verification:

The frontend authenticates the doctor's identity (e.g., OAuth, JWT) when submitting the report.
The backend performs a secondary verification to ensure the authenticity of the doctor's identity and the validity of permissions.

### Data Integrity and Legality Check:

Both the frontend and backend perform checks on the data's legality and integrity to prevent illegal data submission.
Before IPFS upload, the data content is verified to ensure it meets format specifications.

### Reliability of IPFS and Blockchain Interactions:

The generation and storage of IPFS hashes ensure the data's uniqueness and immutability.
Using blockchain to write IPFS hash and metadata into the chaincode ensures report persistence and security with patient ID and other information.
Transaction Traceability and Immutability:

In Hyperledger Fabric, all chaincode transactions are traceable, and once a transaction is successfully committed, the data on the chain cannot be changed. This ensures a trustworthy historical record of the report submission process.

## Key Technology Choices

Frontend Authentication: OAuth, JWT, and other identity authentication mechanisms ensure the legality of the doctor's identity.

Backend and IPFS Interaction: Use an IPFS client or HTTP API to upload case reports to IPFS and obtain a unique content hash.

Hyperledger Fabric Chaincode: Store patient ID, report ID, IPFS hash, and metadata in the chaincode to ensure data persistence and security.

Data Query and Access Control: Provide read-only interfaces through chaincode to allow the frontend to access case report information. When the frontend needs to query data, it can call the chaincode to retrieve the report's hash and metadata.