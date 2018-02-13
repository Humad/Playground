#include <CImg.h>
#include "rectangle.h"

using cimg_library::CImg;

Rectangle::Rectangle(int x, int y, int w, int h) {
	this->x = x;
	this->y = y;
	this->width = w;
	this->height = h;
}

void Rectangle::DrawOutline(CImg<unsigned char>* image) {
	image->draw_rectangle(this->x, this->y, this->width + this->x, this->height + this->y, this->kObstacleColor, 1, ~0U);
}

bool Rectangle::IsWithin(int x, int y) {
	return x >= this->x && x <= (this->x + width) && y >= this->y && y <= (this->y + height);
	return false;
}
