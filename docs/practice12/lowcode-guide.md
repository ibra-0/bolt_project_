# Real low-code implementation - not a simulation

Node-RED 5.0.10 and FlowFuse Dashboard 1.37.0 were installed locally from npm,
without purchasing subscriptions or creating cloud accounts. The flow was
configured through JSON and imported into a real Node-RED runtime; the native
visual editor was inspected. No claim of manual drag-and-drop authoring is made.

Native ui-form provides start, numeric duration and blocked controls; Change
provides fixed context and rejection outputs; Switch nodes handle blocked/future
branches; three small Function nodes normalize input, check overlap and assemble
the result. A native JSONata text binding displays decision/code/message. This
is low-code, not no-code. The local HTTP test input enters the same workflow.

Restore this folder, run npm ci --ignore-scripts, then:
node node_modules/node-red/red.js --userDir . --settings settings.js
Open http://127.0.0.1:1887/dashboard/room and /editor/ for the visual graph.
flows.json is directly importable in compatible Node-RED with FlowFuse Dashboard.
The code-based demo is a separate static build; it does not emulate Node-RED.

The runtime/editor are deliberately bound to 127.0.0.1. They have no public
authentication setup and must not be exposed to the internet. No connectors,
credentials or real databases are used. Runtime .config files and generated
credentials are excluded from exports. Keep package-lock.json for repeatability.
