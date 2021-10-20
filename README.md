# dombserver

React component to detect DOM modifications and renders users content (for
example a warning) when detected.

This component could be used on sites where for example scammers do DOM
modifications with victims computer to warn them.

This work is very much in progress and was mainly created to try out
MutationObserver.

## Example

Run the server with

```bash
npm start
```
See src/App.js

## Building package

```bash
npm build
```

## TODO

* Handle DOM changes better (react hooks and/or filtering)
* More options to component user what to track
* Improve unnecessary rendering and DOM checks after modification detected
