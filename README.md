# ICSA 2025 - OpenAPI Security Documentation Analysis

### This code is for data visualization in D3.js
(The D3.js library is directly included in the `index.html` file.)

---

## Overview

The purpose of this project is to provide a detailed analysis and visualization of security schemes in the context of the OpenAPI Specification (OAS). Using D3.js, this project visualizes various data points associated with different security schemes. 

This document explains how to set up and run the project locally.

---

## Installation Instructions

### Prerequisites

To run this project, you need to have **npm** (Node Package Manager) installed. **npm** is a package manager for JavaScript that helps you install and manage libraries and dependencies.

#### Checking npm Installation

To check if you have **npm** installed, open your terminal or command prompt and run the following command:

```bash
npm --version
``` 

If npm is not installed, you can follow the steps below to install it.


### Installing npm
You can download and install npm from the [Node.js official website](https://nodejs.org/). The installation of npm is bundled with Node.js, so installing Node.js will also install npm.


1.Go to Node.js download page.
2.Download the recommended version for your operating system.
3.Follow the installation instructions to install Node.js and npm.



Git LFS (Large File Storage)
This project includes large files, which are stored using Git LFS (Large File Storage). To properly clone and manage the repository, you need to have Git LFS installed.

Installing Git LFS

To install Git LFS, follow the steps below depending on your operating system:

macOS: You can install Git LFS using Homebrew:

```bash
brew install git-lfs
``` 

Enabling Git LFS in Your Repository

Once Git LFS is installed, you need to run the following command in the project directory to set up Git LFS for the repository:

```bash
git lfs install
``` 



Install Dependencies
Once npm is installed, you can install the necessary packages globally for the project.

Open your terminal or command prompt.
Run the following command to install the http-server package globally:

```bash
npm install -g http-server
``` 

Running the Project
After the dependencies are installed and Git LFS is set up, you can start the server to run the project locally with the following command:

```bash
http-server
``` 