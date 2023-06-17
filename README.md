# Technical Test for Volta Medical

The goal of this project is to create a clock app with alarms using Electron.

More details about the technologies:
- [x] Electron
- [x] React / Typescript Frontend
- [x] Fonctional Component
- [ ] Alarms persistence with SQLite

Steps:
- [x] Create a first Electron App
- [x] Open a window
- [ ] Containerize with Docker?
- [x] Use ReactJS
- [ ] Do a basic frontend design
- [ ] Link with database
- [ ] Improve frontend

Note that I'll probably not do the Docker part because I know from experience how painful it can sometimes be to open a window from a container.

## How to install

You must have at least NodeJS 18 installed.

Just clone this repository and run: ````npm install --force```` (or ````yarn```` but you'll have to replace "npm" by "yarn" in package.json scripts).

## Notes

After discovering Electron, which by the way is fast to understand, the question was: what is the best way to integrate React?
So I did my researches, I found several boilerplates, and I choosed [this one](https://github.com/romankurnovskii/electron-react-template) because of it's simplicity and because I was ok with the architecture.

I would like to precise that before adding react-scripts, there were 0 vulnerabilities... But I don't have time to search solutions about this, maybe later.

## Author
* **Lucas GOIFFON** - [lucas-goiffon](https://lucas-goiffon.eu/)