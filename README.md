<p align="center">
  <a href="https://github.com/kibibit/stacker" target="blank"><img src="http://kibibit.io/kibibit-assets/stacker.png" width="150" ></a>
  <h2 align="center">
    @kibibit/stacker
  </h2>
</p>
<p align="center">
  <a href="https://www.npmjs.com/package/@kibibit/stacker"><img src="https://img.shields.io/npm/v/@kibibit/stacker/latest.svg?style=for-the-badge&logo=npm&color=CB3837"></a>
</p>
<p align="center">
  <a href="https://www.npmjs.com/package/@kibibit/stacker"><img src="https://img.shields.io/npm/v/@kibibit/stacker/next.svg?style=flat-square&logo=npm&color=CB3837"></a>
  <a href="https://travis-ci.org/Kibibit/stacker">
  <img src="https://travis-ci.org/Kibibit/stacker.svg?branch=master">
  </a>
  <a href="https://coveralls.io/github/Kibibit/stacker?branch=master">
  <img src="https://coveralls.io/repos/github/Kibibit/stacker/badge.svg?branch=master">
  </a>
  <a href="https://salt.bountysource.com/teams/kibibit"><img src="https://img.shields.io/endpoint.svg?url=https://monthly-salt.now.sh/kibibit&style=flat-square"></a>
</p>
<p align="center">
  creates a stack for your repository with everything you need for a stack page
</p>
<hr>

<!-- GENERAL DESCRIPTION IF NEEDED -->

## How to install

Install this package as a dev dependency:
```shell
npm install --save-dev @kibibit/stacker
```

## How to use

Run the command from the root folder of your project. This will create a `project-stack.json` & `project-stack.html` files with a list of dependencies and their icons.

you can include more things in your stack by adding them to your `package.json` file:
```javascript
{
  "name": "my-package",
  "version": "2.4.3",
  // ...
  "extra-stack": {
    "add": [
      "Visual Studio Code",
      "heroku",
      "javascript",
      "probot",
      "travis",
      "jenkins",
      "IntelliJ IDEA",
      "Node.js",
      "mongoDB",
      "bash"
    ],
    "ignore": []
  }
}
```

## Contributing

If you have suggestions for how stacker could be improved, or want to report a bug, open an issue! We'd love all and any contributions.

For more, check out the [Contributing Guide](CONTRIBUTING.md).

## Contributors

Thanks goes to our contributors! ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
<table>
  <tr>
    <td align="center"><a href="http://thatkookooguy.kibibit.io"><img src="https://avatars3.githubusercontent.com/u/10427304?v=4" width="100px;" alt="Neil Kalman"/><br /><sub><b>Neil Kalman</b></sub></a><br /><a href="#infra-Thatkookooguy" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/kibibit/stacker/commits?author=Thatkookooguy" title="Code">💻</a> <a href="#ideas-Thatkookooguy" title="Ideas, Planning, & Feedback">🤔</a> <a href="#projectManagement-Thatkookooguy" title="Project Management">📆</a></td>
  </tr>
</table>

<!-- ALL-CONTRIBUTORS-LIST:END -->

## License

[MIT](LICENSE) © 2019 Neil Kalman <neilkalman@gmail.com>
