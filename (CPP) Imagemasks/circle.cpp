#include <CImg.h>
#include "circle.h"

using cimg_library::CImg;

Circle::Circle(int x,
  int y,
  int r) {
  this->x = x;
  this->y = y;
  radius = r;
}

void Circle::DrawOutline(CImg<unsigned char>* image) {
	image->draw_circle(this->x, this->y, this->radius, this->kObstacleColor, 1, ~0U);
}

bool Circle::IsWithin(int x, int y) {

	float distance = ((x - this->x) * (x - this->x)) + ((y - this->y) * (y - this->y));
	float radiusSquared = this->radius * this->radius;
	return distance <= radiusSquared;
}
