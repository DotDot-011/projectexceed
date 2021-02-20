#include<WiFi.h>
#include<HTTPClient.h>
#include<ArduinoJson.h>
#include<ESP32Servo.h>

#define tckMs portTICK_PERIOD_MS

Servo myservo;
const char* ssid = "PonPond";
const char* password = "12345678";


const char* urlpost = "http://158.108.182.1:2255/restroom";
const char* urlget = "http://158.108.182.1:2255/cleaning";


int ledred=13;
int ledgreen=12;
int a=5; 
int b=22; 
int c=4; 
int d=23; 
int e=21; 
int f=19; 
int g=18;
int ldr=34;
int motor=14;
int PIR1=15;
int PIR2=2;

int total=0;
int num = 0;
int clean = 0;
int start=0;
int first=0;
int post=0;

//global parameter
char str[60];

const int _size = 2 * JSON_OBJECT_SIZE(3);

StaticJsonDocument<_size> JSONPost;
StaticJsonDocument<_size> JSONGet;

static TaskHandle_t taskLED = NULL;
static TaskHandle_t taskGet = NULL;
static TaskHandle_t taskDetect = NULL;
static TaskHandle_t taskGel = NULL;

//display number 1
void display1(void) 
{ 
  digitalWrite(b,HIGH);
  digitalWrite(c,HIGH);
  digitalWrite(a,LOW);
  digitalWrite(g,LOW);;
  digitalWrite(d,LOW);  
  digitalWrite(e,LOW);  
  digitalWrite(f,LOW);
} 
//display number2
void display2(void) 
{
  digitalWrite(a,HIGH);
  digitalWrite(b,HIGH);
  digitalWrite(g,HIGH);
  digitalWrite(e,HIGH);
  digitalWrite(d,HIGH);
  digitalWrite(c,LOW);
  digitalWrite(f,LOW);
} 
// display number3
void display3(void) 
{ 
    digitalWrite(a,HIGH);
    digitalWrite(b,HIGH);
    digitalWrite(c,HIGH);
    digitalWrite(d,HIGH);
    digitalWrite(g,HIGH); 
    digitalWrite(e,LOW);  
    digitalWrite(f,LOW);
} 
// display number4
void display4(void) 
{ 
    digitalWrite(f,HIGH);
    digitalWrite(b,HIGH);
    digitalWrite(g,HIGH);
    digitalWrite(c,HIGH);
    digitalWrite(a,LOW);
    digitalWrite(d,LOW);  
    digitalWrite(e,LOW);  
  
} 
// display number5
void display5(void) 
{ 
    digitalWrite(a,HIGH);
    digitalWrite(f,HIGH);
    digitalWrite(g,HIGH);
    digitalWrite(c,HIGH);
    digitalWrite(d,HIGH);
    digitalWrite(b,LOW);  
    digitalWrite(e,LOW);  
} 
// display number6
void display6(void) 
{ 
    digitalWrite(a,HIGH);
    digitalWrite(f,HIGH);
    digitalWrite(g,HIGH);
    digitalWrite(c,HIGH);
    digitalWrite(d,HIGH);  
    digitalWrite(e,HIGH);  
    digitalWrite(b,LOW);
} 
// display number7
void display7(void) 
{   
    digitalWrite(a,HIGH);
    digitalWrite(b,HIGH);
    digitalWrite(c,HIGH);
    digitalWrite(g,LOW);
    digitalWrite(d,LOW);  
    digitalWrite(e,LOW);  
    digitalWrite(f,LOW);
} 
// display number8
void display8(void) 
{ 
    digitalWrite(a,HIGH);
    digitalWrite(b,HIGH);
    digitalWrite(g,HIGH);
    digitalWrite(c,HIGH);
    digitalWrite(d,HIGH);  
    digitalWrite(e,HIGH);  
    digitalWrite(f,HIGH);  
} 
void clearDisplay(void) 
{ 
    digitalWrite(a,LOW);
    digitalWrite(b,LOW);
    digitalWrite(g,LOW);
    digitalWrite(c,LOW);
    digitalWrite(d,LOW);  
    digitalWrite(e,LOW);  
    digitalWrite(f,LOW);  
} 
void display9(void) 
{ 
    digitalWrite(a,HIGH);
    digitalWrite(b,HIGH);
    digitalWrite(g,HIGH);
    digitalWrite(c,HIGH);
    digitalWrite(d,HIGH);  
    digitalWrite(f,HIGH);  
    digitalWrite(e,LOW);  
} 
void display0(void) 
{ 
    digitalWrite(a,HIGH);
    digitalWrite(b,HIGH);
    digitalWrite(c,HIGH);
    digitalWrite(d,HIGH);  
    digitalWrite(e,HIGH);  
    digitalWrite(f,HIGH);
    digitalWrite(g,LOW);
} 

void WiFi_Connect(){
  WiFi.disconnect();
  WiFi.begin(ssid,password);

  while(WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to  WiFi");
  }
  Serial.println("Connected to the WiFi network");
  Serial.println("IP Address :");
  Serial.println(WiFi.localIP());
}

void _post(void){
  post = 0;
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;

    http.begin(urlpost);
    http.addHeader("Content-Type","application/json");
    int httpCode;
    
    JSONPost["t"] = total;
    JSONPost["p"] = num;
    serializeJson(JSONPost,str);
    Serial.println(str);
    httpCode = http.POST(str);
    if (httpCode == HTTP_CODE_OK){
      String payload = http.getString();
      Serial.println(httpCode);
      Serial.println(payload);
    }
    else {
      Serial.println(httpCode);
      Serial.println("ERROR on HTTP Request");
    }
  }
  else {
    WiFi_Connect();
  }
}

void _get(void *param){
  while(1){
    if (WiFi.status() == WL_CONNECTED) {
      HTTPClient http;
  
      http.begin(urlget);
  
      int httpCode = http.GET();
  
      if (httpCode == HTTP_CODE_OK) {
        String payload = http.getString();
        DeserializationError err = deserializeJson(JSONGet,payload);
        if (err) {
          Serial,printf("deserializeJson() failed with code");
          Serial.println(err.c_str());
        }
        else {
          Serial.println(httpCode);
          Serial.print("cleaning time : ");
          Serial.println((int)JSONGet["clean"]);
          clean = (int)JSONGet["clean"];
          if (clean){
            total = 0;
            num = 0;
            _7seqment();
          }
        }
      }
      else {
        Serial.println(httpCode);
        Serial.println("ERROR on HTTP Request");
      }
    }
    else {
      WiFi_Connect();
    }
    vTaskDelay(1000/tckMs);
  }
}

void _7seqment(){
//  while (1) {
//    //led
    if (!clean){
      digitalWrite(ledred,LOW);
      digitalWrite(ledgreen,HIGH);
    }
    else {
      digitalWrite(ledred,HIGH);
      digitalWrite(ledgreen,LOW);
      num=0;
    }

    //7seqment
    if (num<0){
      num=0;
    }
    if (num==0) {
      display0();
    }
    else if (num==1) {
      display1();
    }
    else if (num==2){
      display2();
    }
    else if (num==3){
      display3();
    }
    else if (num==4){
      display4();
    }
    else if (num==5){
      display5();
    }
    else if (num==6) {
      display6();
    }
    else if (num==7){
      display7();
    }
    else if (num==8){
      display8();
    }
    else if (num==9){
      display9();
    }
//    vTaskDelay(1000/tckMs);
//  }
}

int value1;
int value2;

void detect(void *param){
  while(1) {
    if (!clean) {
      pinMode(PIR1,INPUT);
      pinMode(PIR2,INPUT);
      value1=digitalRead(PIR1);
      value2=digitalRead(PIR2);
      //Serial.println(value1);
      //Serial.println(value2);
       if (value1==HIGH && value2==LOW){
          num++;
          total++;
          post = 1;
          num=num%10;
          _7seqment();
          //_post();
          vTaskDelay(1800/tckMs);
        }
        else if (value2==HIGH && value1==LOW){
          num=num-1;
          num=num%10;
          _7seqment();
          //_post();
          vTaskDelay(1800/tckMs);
        }
    }
    vTaskDelay(200/tckMs);
  }
}

int pos,light;

void _Gel(void *param){
  while (1){
    light = analogRead(ldr);
    Serial.print("light : ");
    Serial.println(light);
    if (light >= 1500){
      myservo.attach(motor);
      myservo.write(0);
      vTaskDelay(750/tckMs);
      myservo.write(150);
      vTaskDelay(750/tckMs);
      myservo.detach();
    }  
    vTaskDelay(1000/tckMs);
  }
}

void setup() {
 pinMode(PIR1,INPUT);
 pinMode(PIR2,INPUT);
 pinMode(ldr,INPUT);
 pinMode(a,OUTPUT);
 pinMode(b,OUTPUT);
 pinMode(c,OUTPUT);
 pinMode(d,OUTPUT);
 pinMode(e,OUTPUT);
 pinMode(f,OUTPUT);
 pinMode(g,OUTPUT);
 pinMode(ledred,OUTPUT);
 pinMode(ledgreen,OUTPUT);
 display0();
 myservo.attach(motor);
 myservo.write(0);
 myservo.detach();
 Serial.begin(115200);
 WiFi_Connect();

 digitalWrite(ledred,LOW);
 digitalWrite(ledgreen,HIGH);
 xTaskCreatePinnedToCore(&_get,"Get",1024*32,NULL,3,&taskGet,1);
 xTaskCreatePinnedToCore(&detect,"detect",1024*32,NULL,2,&taskDetect,1);
 xTaskCreatePinnedToCore(&_Gel,"Gel",1024,NULL,1,&taskGel,0);
}

void loop() {
   
}
