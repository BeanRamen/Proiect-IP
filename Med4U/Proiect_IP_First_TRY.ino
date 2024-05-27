#include <DHT.h>
#include <ESP8266WiFi.h>
#include <PubSubClient.h>

// Pin Definitions
#define dhtPin D4           
#define dhtType DHT11
#define ecgPinP D2
#define ecgPinN D3
#define ecgPin A0 

// Global Objects
DHT dht(dhtPin, dhtType);
WiFiClient espClient;
PubSubClient client(espClient);

float humidityVal;           
float tempValC;                         
float heatIndexC; 
unsigned long lastMsg = 0;
#define MSG_BUFFER_SIZE (100)
char msg[MSG_BUFFER_SIZE];
int value = 0;

unsigned long lastRRTime = 0; 
unsigned long currentRRTime = 0;
float HR = 0; 

// WiFi Configuration
const char* ssid = "iPhone - Haideea";
const char* password = "201008maarh";
const char* mqtt_server = "test.mosquitto.org";

unsigned long previousMillis = 0;
const long interval = 500; 

// Function Declarations
void setup_wifi();
void reconnect();
void publishData(const char* topic, const char* payload);
int readECG();
float readTemperature();
float readHumidity();
float generateRandomPulse();
void callback(char* topic, byte* payload, unsigned int length);

void setup() {
  Serial.begin(115200);
  pinMode(BUILTIN_LED, OUTPUT); // Initialize the BUILTIN_LED pin as an output
  dht.begin();
  // ECG
  pinMode(ecgPinP, INPUT);
  pinMode(ecgPinN, INPUT);

  Serial.println("Starting setup...");
  setup_wifi();
  client.setServer(mqtt_server, 1883);
  client.setCallback(callback);
  Serial.println("Setup complete");
}

void loop() {
  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("WiFi not connected, retrying...");
    setup_wifi();
  }

  if (WiFi.status() == WL_CONNECTED) {
    if (!client.connected()) {
      reconnect();
    }
    client.loop();

    // Read sensor values
    unsigned long currentMillis = millis();

    if (currentMillis - previousMillis >= interval) {
      previousMillis = currentMillis;

      // Temperatură și umiditate
      humidityVal = dht.readHumidity();       
      tempValC = dht.readTemperature();       

      if (isnan(humidityVal) || isnan(tempValC)) {
        Serial.println("Eroare la citire!");
        return;
      }

      heatIndexC = dht.computeHeatIndex(tempValC, humidityVal, false);

      int ecgValue = readECG();
      
      // ECG
      if (ecgValue != 1024) { // Verificăm dacă valoarea nu este maximă constantă
        Serial.println(ecgValue);

        if ((digitalRead(ecgPinP) == HIGH) || (digitalRead(ecgPinN) == HIGH)) {
          Serial.print('!');
        } else {
          ecgValue = readECG();
          Serial.println(ecgValue);

          currentRRTime = millis();
          unsigned long RRInterval = currentRRTime - lastRRTime;
          lastRRTime = currentRRTime;

          const unsigned long minRRInterval = 600; // 0.6 seconds
          const unsigned long maxRRInterval = 1200; // 1.2 seconds

          if (RRInterval >= minRRInterval && RRInterval <= maxRRInterval) {
            HR = 60000.0 / (float)RRInterval;
          } else {
            HR = 0; // Valorile RR in afara intervalului normal sunt ignorate
          }
        }

        unsigned long now = millis();
        if (now - lastMsg > 2000) {
          lastMsg = now;
          float randomPulse = generateRandomPulse();
          snprintf(msg, MSG_BUFFER_SIZE, "Temperatura : %.2f; Puls: %.2f; ECG: %d; Umiditate: %.2f", tempValC, randomPulse, ecgValue, humidityVal);
          Serial.print("Publish message: ");
          Serial.println(msg);
          client.publish("test", msg);
        }
      } else {
        Serial.println("Valoare ECG constantă maximă detectată, posibilă problemă hardware.");
      }

      delay(2000); // ajustăm delay-ul după nevoie
    } else {
      Serial.println("WiFi connection lost, trying to reconnect...");
      delay(5000); // Așteaptăm înainte de a încerca din nou
    }
  }
}

void setup_wifi() {
  delay(10);
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);

  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);

  int retry_count = 0;
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
    retry_count++;
    if (retry_count >= 60) { // Încercăm pentru 30 secunde
      Serial.println();
      Serial.println("Failed to connect to WiFi");
      return;
    }
  }

  Serial.println();
  Serial.println("WiFi connected");
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());
}

void callback(char* topic, byte* payload, unsigned int length) {
  Serial.print("Message arrived [");
  Serial.print(topic);
  Serial.print("] ");
  for (int i = 0; i < length; i++) {
    Serial.print((char)payload[i]);
  }
  Serial.println();
}

void reconnect() {
  // Loop until we're reconnected
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    // Create a random client ID
    String clientId = "ESP8266Client-";
    clientId += String(random(0xffff), HEX);
    // Attempt to connect
    if (client.connect(clientId.c_str())) {
      Serial.println("connected");
      // Once connected, publish an announcement...
      client.publish("test", "hey: 78");
      // ... and resubscribe
      client.subscribe("test");
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      // Wait 5 seconds before retrying
      delay(5000);
    }
  }
}

void publishData(const char* topic, const char* payload) {
  if (client.connected()) {
    client.publish(topic, payload);
  }
}

int readECG() {
  int ecgValue = analogRead(ecgPin);
  return ecgValue;
}

float readTemperature() {
  float temperature = dht.readTemperature();
  return temperature;
}

float readHumidity() {
  float humidity = dht.readHumidity();
  return humidity;
}

float generateRandomPulse() {
  float randomPulse = 60 + static_cast<float>(rand()) / (static_cast<float>(RAND_MAX / (110 - 60)));
  return randomPulse;
}
