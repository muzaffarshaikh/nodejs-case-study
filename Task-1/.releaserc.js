module.exports = {
  plugins: [
    "@semantic-release/commit-analyzer",
    "@semantic-release/github",
    [
      "@semantic-release/release-notes-generator",
      {
        parserOpts: {
          noteKeywords: ["BREAKING CHANGE", "BREAKING CHANGES"],
        },
        writerOpts: {
          commitsSort: ["subject", "scope"],
        },
      },
    ],
  ],
  branches: ["main", { name: "dev", prerelease: "dev", channel: "dev" }],
};
