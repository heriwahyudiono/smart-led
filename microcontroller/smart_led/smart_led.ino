#include <ESP8266WiFi.h>
#include <FirebaseESP8266.h>

#define WIFI_SSID "Galaxy A05"
#define WIFI_PASSWORD "12345678"

#define FIREBASE_HOST "smartled-5d29e-default-rtdb.asia-southeast1.firebasedatabase.app"
#define FIREBASE_API_KEY "AIzaSyCIXk_jZ3tqc5yRti3TMY1C-ojCrjsiEDE"

#define LED_PIN D1

FirebaseData firebaseData;
FirebaseConfig config;
FirebaseAuth auth;

void setup() {
  Serial.begin(115200);
  pinMode(LED_PIN, OUTPUT);
  digitalWrite(LED_PIN, HIGH);  

  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }
  Serial.println("WiFi Connected");

  config.host = FIREBASE_HOST;
  config.api_key = FIREBASE_API_KEY;

  if (Firebase.signUp(&config, &auth, "", "")) {
    Serial.println("Sign-up successful (Anonymous)");
  } else {
    Serial.printf("Sign-up failed, reason: %s\n", config.signer.signupError.message.c_str());
  }

  Firebase.begin(&config, &auth);
  Firebase.reconnectWiFi(true);
}

void turnOnLED() {
  digitalWrite(LED_PIN, LOW);  
  Serial.println("LED On");
}

void turnOffLED() {
  digitalWrite(LED_PIN, HIGH);  
  Serial.println("LED Off");
}

void loop() {
  if (Firebase.getBool(firebaseData, "/led/status")) {  
    if (firebaseData.boolData()) {
      turnOnLED();
    } else {
      turnOffLED();
    }
  } else {
    Serial.println("Failed to read data from Firebase");
    Serial.println(firebaseData.errorReason());
  }

  delay(1000);
}
