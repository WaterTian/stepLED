
#include <FastLED.h>          // 此示例程序需要使用FastLED库
 
#define NUM_LEDS 144             // LED灯珠数量
//#define DATA_PIN 7              // Arduino输出控制信号引脚
//#define LED_TYPE WS2811         // LED灯带型号
//#define COLOR_ORDER GRB         // RGB灯珠中红色、绿色、蓝色LED的排列顺序
//uint8_t max_bright = 128;       // LED亮度控制变量，可使用数值为 0 ～ 255， 数值越大则光带亮度越高

CRGB leds[3][NUM_LEDS];  // 建立光带leds
//CRGB leds[NUM_LEDS];     // 建立光带leds       


void setup() {
  Serial.begin(9600); // open serial port, set the baud rate to 9600 bps
  delay(2000);


  FastLED.addLeds<WS2811, 4>(leds[0], NUM_LEDS);
  FastLED.addLeds<WS2811, 7>(leds[1], NUM_LEDS);
  FastLED.addLeds<WS2811, 11>(leds[2], NUM_LEDS);

  
//  FastLED.addLeds<LED_TYPE, DATA_PIN, COLOR_ORDER>(leds, NUM_LEDS);  // 初始化光带 
  
  FastLED.setBrightness(32);                              // 设置光带亮度
}

void loop() {
  FastLED.clear();  





    
  //  for (int i = 0; i < NUM_LEDS; i++) {
  //    leds[i - 3].setRGB(0, 0, 0);
  //    leds[i - 2].setRGB(60, 60, 60);
  //    leds[i - 1].setRGB(180, 180, 180);
  //    leds[i].setRGB(255, 255, 255);
  //    FastLED.show();
  //    delay(1);
  //  }
  //  FastLED.clear();
  
  
  

  int a0 = analogRead(0);
  int a1 = analogRead(2);
  int a2 = analogRead(3);

  FastLED.clear();

  if(a0<100)
  {
    fill_solid(leds[0], NUM_LEDS, CRGB::White);
  }else{
    fill_solid(leds[0], NUM_LEDS, CRGB::Black);
  }


  if(a1<100)
  {
    fill_solid(leds[1], NUM_LEDS, CRGB::White);
  }else{
    fill_solid(leds[1], NUM_LEDS, CRGB::Black);
  }


  if(a2<100)
  {
    fill_solid(leds[2], NUM_LEDS, CRGB::White);
  }else{
    fill_solid(leds[2], NUM_LEDS, CRGB::Black);
  }
  
  FastLED.show();


}
