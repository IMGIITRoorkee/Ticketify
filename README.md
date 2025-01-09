# Simple Ticketing App

This is a simple ticketing app where you can track the progress of your tickets.

## Features
- Create new tickets
- Update existing tickets
- Track progress, priority, and status
- Categorize tickets into predefined categories

## Setup Instructions

### 1. Clone the Repository
```bash
git clone <repository-url>
cd <repository-folder>
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up MongoDB
1. Create a MongoDB account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a cluster and obtain the connection string (MongoDB URI).
3. Add your IP address to the network access whitelist in MongoDB Atlas.

### 4. Create `.env.local` File
1. Inside the project directory, create a file named `.env.local`.
2. Add the following environment variables:
   ```env
   MONGODB_URI=<your-mongodb-atlas-uri>
   ```
   Replace `<your-mongodb-atlas-uri>` with the connection string you obtained from MongoDB Atlas.
   
   ```env
   TICKETS_NO=<no-of-tickets-to-be-shown-per-page-by-default>
   ```

   Replace `<no-of-tickets-to-be-shown-per-page-by-default>` with the number of tickets you want to show by default per page.

### 5. Start the Development Server
```bash
npm run dev
```

### 6. Access the App
Open your browser and go to `http://localhost:3000` to access the app.

## Contribution Guidelines


We welcome contributions to improve the project! Before contributing, please follow the guidelines below:

### How to Contribute

1. **Describe Your Approach**  
   Start by explaining your approach to the issue in the issue page's comments section. Detail how you plan to address the problem and the specific changes you intend to make.  
   - If you're uncertain about where to start or need guidance, feel free to ask for direction in the comments. The reviewers are there to guide you at each step.  
   - Wait for approval or feedback on your proposed implementation before proceeding to open a PR and make changes.
2. **Fork the Repository**  
   Fork the original repository to your own GitHub account.
3. **Clone Your Fork**  
   Clone the forked repository to your local machine. Then, create a new branch to work on the issue:  
   ```bash
   git clone <your-fork-repository-url>
   git checkout -b branch-name
   ```
   Branch Name: Use the format `<feature_or_issue_description>#<issue_no>` (e.g., `add-login-page#42`) to clearly indicate the issue and work being done. The branch name should provide a (short) description of the issue. Branch without issue number will not be accepted.

4. **Commit Your Changes**  
   After making changes, stage and commit them:  
   ```bash
   git add .
   git commit -m "Describe your changes concisely"
   git push origin branch-name
   ```

5. **Open a Pull Request (PR)**  
   Open a Pull Request (PR) from your branch to the main branch of the original repository. Ensure the following before creating the PR:  
   - Your code adheres to the code style guidelines.  
   - Relevant documentation or comments are added if necessary.  
   - Include a descriptive title and a detailed description of your changes in the PR.
   - See MergeFest-Hacker's [CONTRIBUTING.md](https://github.com/IMGIITRoorkee/MergeFest-Hacker/blob/main/CONTRIBUTORS.md) for sample PR Template.

### Code Style Guidelines
- JavaScript/Node.js: Follow best practices for JavaScript (ES6+).
- Code Formatting: Ensure that your code is properly formatted and follows a consistent style (use tools like Prettier or ESLint if necessary).
- Documentation: Update the README or comments if your changes impact the documentation or functionality.
Testing
- Contributors: Don't forget to add yourself on the [CONTRIBUTORS.md](https://github.com/IMGIITRoorkee/Ticketify/blob/master/CONTRIBUTORS.md) file.

### Proof of Work
Please include a video or screenshot demonstrating the feature you've added or the bug you've fixed. This helps the reviewers understand the functionality and ensures your changes work as expected.

### Review Process
Once your pull request is created, it will be reviewed by the maintainers. We might request further changes or improvements before merging it into the main codebase.















