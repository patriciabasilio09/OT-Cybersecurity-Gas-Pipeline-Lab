// ==========================================
// OT Cybersecurity Lab - Node-RED Functions
// ==========================================


// ===============================
// 1. Data Parsing Function
// ===============================
// Extracts pressure, status, valve, and alarm from incoming data

let data = msg.payload;

let pressureMatch = data.match(/Pressure:\s*(\d+)/);
let statusMatch = data.match(/Status:\s*([A-Z]+)/);
let valveMatch = data.match(/Valve:\s*([A-Z]+)/);
let alarmMatch = data.match(/Alarm:\s*([A-Z]+)/);

let pressure = 0;
let status = "UNKNOWN";
let valve = "OFF";
let alarm = "OFF";

if (pressureMatch !== null) {
    pressure = Number(pressureMatch[1]);
}

if (statusMatch !== null) {
    status = statusMatch[1];
}

if (valveMatch !== null) {
    valve = valveMatch[1];
}

if (alarmMatch !== null) {
    alarm = alarmMatch[1];
}

return [
    { payload: pressure },
    { payload: status },
    { payload: valve },
    { payload: alarm }
];


// ===============================
// 2. Attack Injection Function
// ===============================
// Simulates malicious data injection

// Test Scenario #1: 950 pressure should trigger CRITICAL status alarm ON and valve closed if not then an alert comes up as suspicious
//msg.payload = "Pressure: 950 | Status: CRITICAL | Valve: OPEN | Alarm: OFF";
// Test Scenario #2: 750 pressure should trigger HIGH status alarm OFF and valve OPEN if not then an alert comes up as suspicious
//msg.payload = "Pressure: 750 | Status: HIGH | Valve: CLOSED | Alarm: OFF";
// Test Scenario #3: 500 pressure should trigger NORMAL status alarm OFF and valve CLOSED if not then an alert comes up as suspicious
//msg.payload = "Pressure: 500 | Status: NORMAL | Valve: CLOSED | Alarm: OFF";
msg.payload = "Pressure: 100 | Status: LOW | Valve: OPEN | Alarm: OFF";
return msg;


// ===============================
// 3. Detection Function
// ===============================
// Detects inconsistent or suspicious system states

let data2 = msg.payload;

let pressureMatch2 = data2.match(/Pressure:\s*(\d+)/);
let valveMatch2 = data2.match(/Valve:\s*([A-Z]+)/);
let alarmMatch2 = data2.match(/Alarm:\s*([A-Z]+)/);

let pressure2 = 0;
let valve2 = "UNKNOWN";
let alarm2 = "UNKNOWN";

if (pressureMatch2 !== null) {
    pressure2 = Number(pressureMatch2[1]);
}

if (valveMatch2 !== null) {
    valve2 = valveMatch2[1];
}

if (alarmMatch2 !== null) {
    alarm2 = alarmMatch2[1];
}

if (pressure2 < 300 && valve2 === "OPEN") {
    msg.payload = "Suspicious Data Detected: LOW pressure with valve OPEN";
}
else if (pressure2 >= 850 && alarm2 === "OFF") {
    msg.payload = "Suspicious Data Detected: CRITICAL pressure with alarm OFF";
}
else if (pressure2 >= 700 && pressure2 < 850 && valve2 === "CLOSED") {
    msg.payload = "Suspicious Data Detected: HIGH pressure with valve CLOSED";
}
else {
    msg.payload = "Normal";
}

return msg;

// ===============================
// 4. Status Color Formatting
// ===============================
// Adds color styling based on system status

let status = msg.payload;

if (status === "LOW") {
    msg.payload = "<font color='blue'><b>LOW</b></font>";
}
else if (status === "NORMAL") {
    msg.payload = "<font color='green'><b>NORMAL</b></font>";
}
else if (status === "HIGH") {
    msg.payload = "<font color='orange'><b>HIGH</b></font>";
}
else if (status === "CRITICAL") {
    msg.payload = "<font color='red'><b>CRITICAL</b></font>";
}
else{
  msg.payload = "<font color='gray'><b>UNKNOWN</b></font>"

return msg;


// ===============================
// 5. Valve Color Formatting
// ===============================
// Displays valve state visually

let valve = msg.payload;

if (valve === "OPEN") {
    msg.payload = "<font color='green'><b>OPEN</b></font>";
}
else {
    msg.payload = "<font color='gray'><b>CLOSED</b></font>";
}

return msg;


// ===============================
// 6. Alarm Color Formatting
// ===============================
// Highlights alarm state

let alarm = msg.payload;

if (alarm === "ON") {
    msg.payload = "<font color='red'><b>ON</b></font>";
}
else {
    msg.payload = "<font color='green'><b>OFF</b></font>";
}

return msg;
