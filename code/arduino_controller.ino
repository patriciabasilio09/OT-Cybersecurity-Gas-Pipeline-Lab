// OT Cybersecurity Lab - Arduino PLC Simulation
// Reads pressure input from potentiometer
// Determines system state (LOW, NORMAL, HIGH, CRITICAL)
// Controls valve and alarm logic
// Sends formatted data to Raspberry Pi via serial communication

void setup() {
  // initialize serial communication at 9600 bits per second:
  Serial.begin(9600);
  pinMode(7, OUTPUT); //Valve LED
  pinMode(8, OUTPUT); //Alarm LED
}

// the loop routine runs over and over again forever:
void loop() {
  // read the input on analog pin 0:
  int sensorValue = analogRead(A0);
  Serial.print("Pressure: ");
  Serial.print(sensorValue);
  // print out the value you read:
  if (sensorValue < 300){
    Serial.println(" | Status: LOW | Valve: CLOSED | ALARM: OFF");
    digitalWrite(7, LOW);
    digitalWrite(8, LOW);
  }
  else if (sensorValue < 700){
    Serial.println(" | Status: NORMAL | Valve: CLOSED | ALARM: OFF");
    digitalWrite(7, LOW);
    digitalWrite(8, LOW);
  }
   else if (sensorValue < 850){
    Serial.println(" | Status: HIGH | Valve: OPEN | ALARM: OFF");
    digitalWrite(7, HIGH);
    digitalWrite(8, LOW);
  }
else{
    Serial.println(" | Status: CRITICAL | Valve: CLOSED | Alarm: ON");
    digitalWrite(7, LOW);
    digitalWrite(8, HIGH);
}

  delay(500);  // delay in between reads for stability
}
