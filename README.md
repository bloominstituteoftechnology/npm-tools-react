# @bloomtools/react

This tool quickly scaffolds a React project.

## ✨ Requirements

1. Node >= 16.x
2. Git

## ✨ Usage

```bash
npx @bloomtools/react todos # replace "todos" with desired project name

npx @bloomtools/react@0.0.3 todos # to use a specific version of this tool

npx @bloomtools/react # a default project name "react-project" is used
```

### What it Does

1. A folder with your desired name is created in the working directory
    - ❗ The tool will exit with an error if the folder already exists

2. A React project is scaffolded inside the folder

3. A Git repository is initialized and a commit is made
    - ❗ This step is skipped if the tool is used inside a Git repository

## ✨ Post-Usage

```bash
cd todos # or whatever project name you chose
npm install
npm run dev
```

Open the project in your editor, and happy hacking!
