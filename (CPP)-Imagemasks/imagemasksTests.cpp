#include <iostream>
#include <gtest/gtest.h>
#include "CImg.h"
#include "assignment10.h"

using cimg_library::CImg;
using cimg_library::CImgDisplay;
using std::cerr;
using std::cout;
using std::endl;
using std::floor;

ImageMask *randMask;

void RandomOverlappingInput(std::vector<Shape*>* masks,
  int* x,
  int *y) {

	*x = (int)(Rand() * 300 + 1);
	*y = (int)(Rand() * 300 + 1);

	srand(time(NULL));

	int z = (int)(floor(3 * Rand()));
	int x1 = *x - 5;
	int x2 = *x + ((int) (200 * Rand() + 1));
	int y1 = *y - 5;
	int y2 = *y + ((int) (200 * Rand() + 1));

	if (z == 0) {
		// circle
		int rad = floor(sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1)));
		masks->push_back(new Circle(*x, *y, rad));
		randMask->AddCircle(x1, y1, x2, y2);
		
	} else if (z == 1) {
		// rectangle
		masks->push_back(new Rectangle(x1, y1, x2, y2));
		randMask->AddRectangle(x1, y1, x2, y2);
	} else {
		// right angle
		randMask->AddRightAngle(x1, y1, x2, y2);
		masks->push_back(new RightAngle(x1, y1, x2, y2));
	}

	z = (int)(floor(3 * Rand()));

	x1 = *x - 5;
	x2 = *x + ((int) (200 * Rand() + 1));
	y1 = *y - 5;
	y2 = *y + ((int) (200 * Rand() + 1));

	if (z == 0) {
		// circle
		int rad = floor(sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1)));
		masks->push_back(new Circle(*x, *y, rad));
		randMask->AddCircle(x1, y1, x2, y2);
		
	} else if (z == 1) {
		// rectangle
		masks->push_back(new Rectangle(x1, y1, x2, y2));
		randMask->AddRectangle(x1, y1, x2, y2);
	} else {
		// right angle
		randMask->AddRightAngle(x1, y1, x2, y2);
		masks->push_back(new RightAngle(x1, y1, x2, y2));
	}
}


TEST(UnitTest, InitTest) {
    Circle c(260, 288, 100);
    ASSERT_EQ(true, c.IsWithin(200, 250));
    ASSERT_EQ(false, c.IsWithin(2, 4));

    Circle d(50, 50, 50);
    ASSERT_EQ(50, d.x);
    ASSERT_EQ(50, d.y);
    ASSERT_EQ(50, d.radius);
    ASSERT_EQ(true, d.IsWithin(100, 50));
    ASSERT_EQ(false, d.IsWithin(-1, 50));
    ASSERT_EQ(true, d.IsWithin(0, 50));

    Rectangle e(260, 288, 100, 100);
    ASSERT_EQ(e.x, 260);
    ASSERT_EQ(e.y, 288);
    ASSERT_EQ(e.width, 100);
    ASSERT_EQ(e.height, 100);
    ASSERT_EQ(true, e.IsWithin(300, 300)); 
    ASSERT_EQ(false, e.IsWithin(2, 4));

    Rectangle f(50, 50, 50, 50);
    ASSERT_EQ(true, f.IsWithin(100, 100));

    Rectangle g(-20, -20, 50, 50);
    ASSERT_EQ(true, g.IsWithin(-1, -1));

    RightAngle h(70, 49, 170, 149);
    ASSERT_EQ(70, h.x0);
    ASSERT_EQ(49, h.y0);
    ASSERT_EQ(170, h.x1);
    ASSERT_EQ(149, h.y1);
    ASSERT_EQ(true, h.IsWithin(90, 69));
    ASSERT_EQ(true, h.IsWithin(70, 49));
    ASSERT_EQ(false, h.IsWithin(69, 49));
    ASSERT_EQ(false, h.IsWithin(150, 79));
    ASSERT_EQ(true, h.IsWithin(90, 129));
    ASSERT_EQ(false, h.IsWithin(91, 128));
}

TEST(UnitTest, AddShapesTest) {
	CImg<unsigned char> image(500, 500, 1, 3);
    ImageMask i(image);

    i.AddCircle(145, 92, 155, 92);
    ASSERT_EQ(((Circle*)(i.GetMasks()[0]))->x , 145);
    ASSERT_EQ(((Circle*)(i.GetMasks()[0]))->y, 92);
    ASSERT_EQ(((Circle*)(i.GetMasks()[0]))->radius, 10);
    ASSERT_EQ(1, i.GetMasks().size());

    i.AddRectangle(100, 100, 200, 200);
    ASSERT_EQ(((Rectangle *)(i.GetMasks()[1]))->x, 100);
    ASSERT_EQ(((Rectangle *)(i.GetMasks()[1]))->y, 100);
    ASSERT_EQ(((Rectangle *)(i.GetMasks()[1]))->width, 100);
    ASSERT_EQ(((Rectangle *)(i.GetMasks()[1]))->height, 100);
    ASSERT_EQ(2, i.GetMasks().size());

    i.AddRightAngle(145, 92, 155, 92);
    ASSERT_EQ(((RightAngle*)(i.GetMasks()[2]))->x0, 145);
    ASSERT_EQ(((RightAngle*)(i.GetMasks()[2]))->y1, 92);
    ASSERT_EQ(3, i.GetMasks().size());

    i.ApplyMasks();
    i.Clear();
    ASSERT_EQ(0, i.GetMasks().size());

    ASSERT_EQ(3, i.ToGray(3, 3, 3));
}

TEST(UnitTest, OutlineTest) {
	CImg<unsigned char> image(500, 500, 1, 3);
    ImageMask i(image);

    i.AddCircle(145, 92, 155, 92);
    i.AddRectangle(100, 100, 200, 200);
    i.AddRightAngle(145, 92, 155, 92);
    ((Circle*)(i.GetMasks()[0]))->DrawOutline(i.GetCurrentImage());
    ((Rectangle*)(i.GetMasks()[1]))->DrawOutline(i.GetCurrentImage());
    ((RightAngle*)(i.GetMasks()[2]))->DrawOutline(i.GetCurrentImage());

    ASSERT_EQ(255, (*i.GetCurrentImage())(145, 92, 0, 0));
    ASSERT_EQ(255, (*i.GetCurrentImage())(145, 92, 0, 1));
    ASSERT_EQ(255, (*i.GetCurrentImage())(145, 92, 0, 2));

    ASSERT_EQ(255, (*i.GetCurrentImage())(100, 100, 0, 0));
    ASSERT_EQ(255, (*i.GetCurrentImage())(100, 100, 0, 1));
    ASSERT_EQ(255, (*i.GetCurrentImage())(100, 100, 0, 2));
}

TEST(UnitTest, MaskTest) {
	CImg<unsigned char> image(500, 500, 1, 3, {30, 30, 30});
    ImageMask i(image);

    i.AddCircle(100, 100, 50, 50);
    i.AddRectangle(100, 100, 200, 200);
    i.AddRightAngle(100, 100, 200, 200);

    i.ApplyMasks();

    // 2 overlap
    ASSERT_EQ(30, (*i.GetCurrentImage())(190, 190, 0, 0));
    ASSERT_EQ(30, (*i.GetCurrentImage())(190, 190, 0, 1));
    ASSERT_EQ(30, (*i.GetCurrentImage())(190, 190, 0, 2));
    
    // grey, not affected by masks
	ASSERT_EQ(30, (*i.GetCurrentImage())(1, 1, 0, 0));
	ASSERT_EQ(30, (*i.GetCurrentImage())(1, 1, 0, 1));
	ASSERT_EQ(30, (*i.GetCurrentImage())(1, 1, 0, 2));
    
    // colored, 3 overlap
    ASSERT_EQ(image(101, 101, 0, 0), (*i.GetCurrentImage())(101, 101, 0, 0));
    ASSERT_EQ(image(101, 101, 0, 1), (*i.GetCurrentImage())(101, 101, 0, 1));
    ASSERT_EQ(image(101, 101, 0, 2), (*i.GetCurrentImage())(101, 101, 0, 2));
}

TEST(RandomTest, Rand1) {
  	CImg<unsigned char> image(500, 500, 1, 3);
	int x = -1;
  	int y = -1;

  	for (int i = 0; i < image.width(); i++) {
  		for (int j = 0; j < image.height(); j++) {
  			image(i, j, 0, 0) = 128;
  			image(i, j, 0, 1) = 64;
  			image(i, j, 0, 2) = 32;
  		}
  	}


  	randMask = new ImageMask(image);
  	std::vector<Shape *> masks;

  	RandomOverlappingInput(&masks, &x, &y);
  	ASSERT_EQ(2, masks.size());
  	randMask->ApplyMasks();

  	ASSERT_EQ(randMask->ToGray(128, 64, 32), (*randMask->GetCurrentImage())(x, y, 0, 0));
  	ASSERT_EQ(randMask->ToGray(128, 64, 32), (*randMask->GetCurrentImage())(x, y, 0, 1));
  	ASSERT_EQ(randMask->ToGray(128, 64, 32), (*randMask->GetCurrentImage())(x, y, 0, 2));

  	for (Shape *mask : masks) {
  		delete mask;
  	}

  	delete randMask;
}








int main(int argc, char * argv[]) {
  ::testing::InitGoogleTest(&argc, argv);
  return RUN_ALL_TESTS();
}