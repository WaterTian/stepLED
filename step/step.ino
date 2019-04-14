#include <FastLED.h>

#define NUM_LEDS 144 //每条led数
#define NUM_STEPS 5 //台阶数
#define FRAMES_PER_SECOND  90  //FPS

//CRGB leds[NUM_LEDS];     // 创建光带leds
CRGB leds[NUM_STEPS][NUM_LEDS];

int aPins[NUM_STEPS] = {0, 2, 3}; //a口s

float lifes[NUM_STEPS]; //0~1

CRGBPalette16 currentPalette = CloudColors_p;

void setup() {
  Serial.begin(9600);
  delay(2000);

  //FastLED.addLeds<WS2812B, 7>(leds, NUM_LEDS); //型号,信号引脚,(已创建的光带,LED灯珠数量)
  FastLED.setBrightness(64);// 设置光带亮度 0～255


  FastLED.addLeds<WS2812B, 4>(leds[0], NUM_LEDS);
  FastLED.addLeds<WS2812B, 7>(leds[1], NUM_LEDS);
  FastLED.addLeds<WS2812B, 11>(leds[2], NUM_LEDS);




  startClear();
}
void startClear() {
  FastLED.clear();
  for (int i = 0; i < NUM_STEPS; i++) {
    fill_solid(leds[i], NUM_LEDS, CRGB::White);
    FastLED.show();
    delay(100);
    fill_solid(leds[i], NUM_LEDS, CRGB::Black);
    FastLED.show();
  }
}






void FillPaletteColors(int id, uint8_t colorIndex)
{
  if (lifes[id] <= 0)
  {
    fill_solid(leds[id], NUM_LEDS, CRGB::Black);
    return;
  }


  uint8_t brightness = 255 * lifes[id];

  for ( int i = 0; i < NUM_LEDS; i++) {
    leds[id][i] = ColorFromPalette( currentPalette, colorIndex, brightness, LINEARBLEND);
    colorIndex += 3;
  }

  if (lifes[id] > 0.9)addGlitter(id, 60);


}

void addGlitter(int id, fract8 chanceOfGlitter)
{
  if ( random8() < chanceOfGlitter) {
    leds[id][ random16(NUM_LEDS) ] += CRGB::White;
  }
}

void loop() {

  static uint8_t startIndex = 0;
  startIndex = startIndex + 1; /* motion speed */


  FastLED.clear();

  for (int i = 0; i < NUM_STEPS; i++) {
    int _a = analogRead(aPins[i]);

    
    if (_a < 100) {
      lifes[i] = lifes[i] < 1 ? lifes[i] += 0.25 : 1;

      FillPaletteColors(i, startIndex);
    }
    else {
      lifes[i] = lifes[i] > 0 ? lifes[i] -= 0.05 : 0;

      FillPaletteColors(i, startIndex);

    }

  }



  //  Serial.println("____");
  //  Serial.print(lifes[2]);

  FastLED.show();
  FastLED.delay(1000 / FRAMES_PER_SECOND);







}
