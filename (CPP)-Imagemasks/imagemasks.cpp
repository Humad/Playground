#include "assignment10.h"
#include <time.h>
#include <unistd.h>

using cimg_library::CImg;
using cimg_library::CImgDisplay;
using std::min;
using std::max;
using std::floor;

static int areaColored;

double GetMonotonicTime() {
  timespec ts;
  clock_gettime(CLOCK_MONOTONIC, &ts);
  const double time =
  static_cast<double>(ts.tv_sec) + static_cast<double>(ts.tv_nsec)*(1.0E-9);
  return time;
}

double Rand() {
  return rand() / static_cast<double>(RAND_MAX);
}

ImageMask::ImageMask(const CImg<unsigned char>& source_image) {
  this->source_image = source_image;
  this->current_image.assign(source_image);
}

ImageMask::~ImageMask() {
  for (Shape *mask : masks) {
    delete mask;
  }
}

void ImageMask::AddCircle(int x0, int y0, int x1, int y1) {
  masks.push_back(new Circle(x0, y0, floor(sqrt((x1 - x0) * (x1 - x0) + (y1 - y0) * (y1 - y0)))));
}

void ImageMask::AddRectangle(int x0, int y0, int x1, int y1) {
  masks.push_back(new Rectangle(min(x0, x1), min(y0, y1), abs(x1 - x0), abs(y1 - y0)));
}

void ImageMask::AddRightAngle(int x0, int y0, int x1, int y1) {
  masks.push_back(new RightAngle(min(x0, x1), min(y0, y1), max(x0, x1), max(y0, y1)));
}

void ImageMask::ApplyMasks() {

  bool isRGB = false;
  areaColored = 0;
  unsigned char grey;

  for (int i = 0; i < current_image.width(); i++) {
    for (int j = 0; j < current_image.height(); j++) {
      for (Shape* mask : masks) {
        isRGB ^= mask->IsWithin(i, j);
      }

      if (isRGB) {
        areaColored = areaColored + 1;
        for (int k = 0; k < 3; k++) {
          current_image(i, j, 0, k) = source_image(i, j, 0, k);
        }
      } else {
        grey = ToGray(source_image(i, j, 0, 0), source_image(i, j, 0, 1), source_image(i, j, 0, 2));
        for (int k = 0; k < 3; k++) {
          current_image(i, j, 0, k) = grey;
        }
      }

      isRGB = false;
    }
  }

  for (Shape* mask : masks) {
    mask->DrawOutline(&current_image);
  } 

}

void ImageMask::Clear() {
  for (Shape* mask : masks) {
    delete mask;
  }
  masks.clear();
}

unsigned char ImageMask::ToGray(int R, int G, int B) {
  return floor((R + G + B) / 3);
}

CImg<unsigned char>* ImageMask::GetCurrentImage() {
  return &current_image;
}

std::vector<Shape*> ImageMask::GetMasks() {
  return masks;
}

int ImageMask::GetAreaColored() {
  return areaColored;
}
