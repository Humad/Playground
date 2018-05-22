#ifndef ASSIGNMENT10_H
#define ASSIGNMENT10_H
#include <CImg.h>
#include <vector>

#include "shape.h"
#include "circle.h"
#include "rectangle.h"
#include "rightangle.h"

class ImageMask {
public:
  ImageMask(const cimg_library::CImg<unsigned char>& source_image);
  ~ImageMask();
  void AddCircle(int x0, int y0, int x1, int y1);
  void AddRectangle(int x0, int y0, int x1, int y1);
  void AddRightAngle(int x0, int y0, int x1, int y1);
  void ApplyMasks();
  void Clear();
  unsigned char ToGray(int R, int G, int B);
  cimg_library::CImg<unsigned char>* GetCurrentImage();
  std::vector<Shape*> GetMasks();
  int GetAreaColored();
private:
  std::vector<Shape*> masks;
  cimg_library::CImg<unsigned char> current_image;
  cimg_library::CImg<unsigned char> source_image;
};

double GetMonotonicTime();
double Rand();

#endif // ASSIGNMENT10_H
