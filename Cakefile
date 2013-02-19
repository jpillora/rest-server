fs            = require 'fs'
{print}       = require 'util'
which         = require 'which'
{spawn, exec} = require 'child_process'
_             = require 'lodash'

# ANSI Terminal Colors
bold  = '\x1B[0;1m'
red   = '\x1B[0;31m'
green = '\x1B[0;32m'
reset = '\x1B[0m'

debug = false

pkg = JSON.parse fs.readFileSync('./package.json')

option '-d', '--debug [COFFEE DEBUG ARG]', 'activate debug mode'
option '-b', '--break [COFFEE DEBUG BEAK ARG]', 'activate debug mode with 1st line break'

log = (message, color = green, explanation) ->
  console.log "#{color} #{message} #{reset} #{(explanation or '')}"

task 'dev', 'start dev env', (options) ->

  debugBreak = options.break isnt `undefined`
  debug = options.debug isnt `undefined` or debugBreak

  if debug
    #node inspector
    inspector = spawn 'node', ['./node_modules/node-inspector/bin/inspector.js', '--web-port=5859']
    inspector.stdout.pipe process.stdout
    inspector.stderr.pipe process.stderr
    setTimeout ->
      spawn 'open', ['http://localhost:5859']
    , 2000

  cmdOpts = {
    env: _.extend {}, process.env, { NODE_ENV: 'dev' }
  }

  execArray = [
    './node_modules/supervisor/lib/cli-wrapper.js'
    '-w'
    '.'
    '--no-restart-on'
    'exit'
    '-e'
    'coffee|jade' 
  ]
  execArray.push("--debug") if debug
  execArray.push("--debug-brk") if debugBreak
  execArray.push 'server'

  supervisor = spawn 'node', execArray, cmdOpts
  supervisor.stdout.pipe process.stdout
  supervisor.stderr.pipe process.stderr
  log "Watching js files and running server #{ debug ? ' in debug mode' : ''}", green
