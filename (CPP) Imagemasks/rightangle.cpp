#include <CImg.h>
#include "rightangle.h"

using cimg_library::CImg;

RightAngle::RightAngle(int x0, int y0, int x1, int y1) {
	this->x0 = x0;
	this->x1 = x1;
	this->y0 = y0;
	this->y1 = y1;
}

void RightAngle::DrawOutline(CImg<unsigned char>* image) {
	image->draw_line(this->x0, this->y0, this->x0, this->y1, this->kObstacleColor, 1, ~0U);
	image->draw_line(this->x0, this->y1, this->x1, this->y1, this->kObstacleColor, 1, ~0U);
	image->draw_line(this->x0, this->y0, this->x0 + ((this->x1 - this->x0) / 5), this->y0, this->kObstacleColor, 1, ~0U);
	image->draw_line(this->x1, this->y1, this->x1, this->y1 - ((this->y1 - this->y0) / 5), this->kObstacleColor, 1, ~0U);
	image->draw_line(this->x0 + ((this->x1 - this->x0) / 5), this->y0, this->x0 + ((this->x1 - this->x0) / 5), this->y1 - ((this->y1 - this->y0) / 5), this->kObstacleColor, 1, ~0U);
	image->draw_line(this->x0 + ((this->x1 - this->x0) / 5), this->y1 - ((this->y1 - this->y0) / 5), this->x1, this->y1 - ((this->y1 - this->y0) / 5), this->kObstacleColor, 1, ~0U);
}

bool RightAngle::IsWithin(int x, int y) {
	if (x < this->x0 || y < this->y0 || y > this->y1 || x > this->x1) {
		return false;
	}

	if (x > (this->x0 + (this->x1 - this->x0) / 5) && y < (this->y1 - (this->y1 - this->y0) / 5)) {
		return false;
	}

	return true;
}
